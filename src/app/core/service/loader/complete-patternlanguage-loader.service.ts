import { Injectable } from '@angular/core';
import { IriConverter } from '../../util/iri-converter';
import { PatternOntologyService } from '../pattern-ontology.service';
import { DefaultPlLoaderService } from './default-pl-loader.service';
import PatternLanguage from '../../model/pattern-language.model';
import { DefaultPatternDirectedRelationsLoaderService } from './pattern-language-loader/default-pattern-directed-relations-loader.service';
import { DefaultPatternUndirectedRelationsLoaderService } from './pattern-language-loader/default-pattern-undirected-relations-loader.service';
import { PatternRelations } from '../../model/pattern-relations';
import Pattern from '../../model/pattern.model';
import { PlRestrictionLoaderService } from './pattern-language-loader/pl-restriction-loader.service';
import { CompletePatternlanguage } from '../../model/complete-patternlanguage.interface';
import { Logo } from '../data/Logo.interface';
import { SectionResponse } from '../data/SectionResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class LoadCompletePatternlanguageService {

  constructor(private pos: PatternOntologyService, private plLoader: DefaultPlLoaderService, private directedRelationsLoaderService: DefaultPatternDirectedRelationsLoaderService,
              private undirectedRelationsLoaderService: DefaultPatternUndirectedRelationsLoaderService, private  sectionRestriction: PlRestrictionLoaderService) { }

  // loads everything for a patternlanguage: base infos, patterns, links
  // return every info needed to reconstruct all 3 turtle files
  async loadCompletePatternLanguage(plIri): Promise<CompletePatternlanguage>{

    await this.pos.loadUrisToStore([{token: null, value: plIri}]);

    // load patternlanguage and patternlanguage-Patterns/-Relations file into graph storage
    const imports = await this.pos.getOWLImports(plIri);
    const importedFileIris = imports.map(i => i.import);
    await  this.pos.loadUrisToStore(importedFileIris);


    // load section restrictions to be able to get the type for a section
    this.sectionRestriction.supportedIRI = plIri;
    const sectionRestritions = await this.sectionRestriction.loadContentFromStore();

    // get logo data
    const logoResult: Logo[] = await this.plLoader.getPLLogo(plIri);
    const plLogos = logoResult.map((it: Logo) => it.logo.value);

    // get ordered sections
    const sectionsresult = await this.plLoader.getPLSections(plIri);
    const sections = sectionsresult.map((secResult: SectionResponse) => {
      return secResult.section.value;
    });

    //  load patterns from patternlanguage
    this.plLoader.supportedIRI = plIri;
    const patterns = await this.plLoader.loadContentFromStore();
    let patternList: Pattern[];
    patternList = Array.from(patterns.values()).map(it => it.toPattern(plIri));

    // load pattern relations (links)
    this.directedRelationsLoaderService.supportedIRI = IriConverter.getRelationListIriForPLIri(plIri);
    this.directedRelationsLoaderService.patterns = patternList;
    const allRelations = new PatternRelations( Array.from((await this.directedRelationsLoaderService.loadContentFromStore()).values()));


    this.undirectedRelationsLoaderService.supportedIRI = IriConverter.getRelationListIriForPLIri(plIri);
    this.undirectedRelationsLoaderService.patterns = patternList;
    allRelations.undirected = Array.from((await this.undirectedRelationsLoaderService.loadContentFromStore()).values());
    const plName = IriConverter.extractIndividualNameFromIri(plIri);
    const patternIris = patternList.map((pat: Pattern) => pat.iri);

    const pl =  new PatternLanguage(plIri, plName, plLogos, patternIris, sections, sectionRestritions);

    return Promise.resolve(<CompletePatternlanguage>{patternlanguage: pl, patternRelations: allRelations, patterns: patternList});
  }
}
