import { Relation, LanguageRelation } from 'src/app/graph/model';
import { Injectable } from '@angular/core';
import { PatternOntologyService } from 'src/app/core/service/pattern-ontology.service';
import Loader from 'src/app/core/model/loader';
import { IriConverter } from 'src/app/core/util/iri-converter';

@Injectable({
  providedIn: 'root'
})
export class ClrLoaderService extends Loader<LanguageRelation> {

  constructor(private pos: PatternOntologyService) {
    super(null, pos);
  }

  async getAllGraphs(): Promise<{viewBase: string[], viewRelations: string[], otherLangsBase: string[], otherLangsPattern: string[]}> {
    const langUri = IriConverter.getFileName(this.supportedIRI);
    
    // view bases
    const viewBaseQry = `SELECT DISTINCT ?view
    WHERE {
      <${this.supportedIRI}> pp:referredByView ?view .
    }`;
    let viewBase = await this.pos.exec(viewBaseQry, [langUri]);
    viewBase = viewBase.map(v => IriConverter.getFileName(v.view.value));

    // view relations
    const viewRelations = [];
    for (const v of viewBase) {
      const uri = v;
      const index = uri.lastIndexOf('/') + 1;
      const r = `${uri}/${uri.substr(index)}-Relations`;
      viewRelations.push(r);
    }

    // all other languages - other languages are the ones mentioned in the views
    const otherLangsBaseQry = `SELECT DISTINCT ?otherLangUri
    WHERE {
      <${this.supportedIRI}> pp:referredByView ?view .
      ?view pp:containsPatternGraph ?otherLangUri .
      FILTER(?otherLangUri != <${this.supportedIRI}>)
    }`;
    let otherLangsBase = await this.pos.exec(otherLangsBaseQry, [langUri].concat(viewBase));
    otherLangsBase = otherLangsBase.map(v => IriConverter.getFileName(v.otherLangUri.value));

    // all other language patterns
    const otherLangsPattern = [];
    for (const o of otherLangsBase) {
      const uri = o;
      const index = uri.lastIndexOf('/') + 1;
      const p = `${uri}/${uri.substr(index)}-Patterns`;
      otherLangsPattern.push(p);
    }

    return Promise.resolve({
      viewBase: viewBase,
      viewRelations: viewRelations,
      otherLangsBase: otherLangsBase,
      otherLangsPattern: otherLangsPattern
    });
  }

  // load all CLRs that contain the given Pattern URI
  async loadContentFromStore(uri?: string): Promise<Map<string, LanguageRelation>> {

    let start = Date.now();
    const allGraphs = await this.getAllGraphs();
    const langUri = IriConverter.getFileName(this.supportedIRI);
    let millis = Date.now() - start;
    console.log(`getGraphs: ${millis}ms`);

    let graphs: string[];

    // 1. get all CLR Relations defined in the views of the given language
    const clrRelationsQry = `SELECT DISTINCT ?linkUri ?sourceUri ?targetUri ?desc
      WHERE {
        <${this.supportedIRI}> pp:referredByView ?view .
        ?view pp:containsPatternRelationDescriptor ?linkUri .
        ?linkUri pp:hasTarget ?targetUri ;
                pp:hasSource ?sourceUri .
        OPTIONAL { ?linkUri pp:hasDescription ?desc . }
        FILTER(?sourceUri = <${uri}> || ?targetUri = <${uri}>) .
      }`;
    graphs = [langUri].concat(allGraphs.viewBase).concat(allGraphs.viewRelations);

    start = Date.now();
    const clrRelations = await this.pos.exec(clrRelationsQry, graphs);
    millis = Date.now() - start;
    console.log(`clrRelations: ${millis}ms`);


    start = Date.now();

    // we need a list of all CLRs here, within the for, we check if we already have an entry for the language, 
    // if not, create new entry and insert it into this list
    const data = new Map<string, any>();

    for (const entry of clrRelations) {
      const otherPatternUri = (entry.sourceUri.value === uri) ? entry.targetUri.value : entry.sourceUri.value;

      // 2. get all languages that contain the other patterns, that is, patterns with uri != the given uri, except the given language
      const otherLangQry = `SELECT DISTINCT ?otherLangUri ?otherLangName
      WHERE {
        ?otherLangUri pp:containsPattern <${otherPatternUri}> .
        ?otherLangUri pp:hasName ?otherLangName .
      }`;
      graphs = allGraphs.otherLangsBase; 
      const otherLang = await this.pos.exec(otherLangQry, graphs);
      
      // build language structure
      if (otherLang && otherLang.length > 0) {
        let language = data.get(otherLang[0].otherLangUri.value);
        if (!language) {
          language = {
            languageId: IriConverter.convertIriToId(otherLang[0].otherLangUri.value),
            languageName: otherLang[0].otherLangName.value,
            relations: []
          };
          data.set(otherLang[0].otherLangUri.value, language);
        }
      }

      // 3. get all names of the other pattern
      const otherNamesQry = `SELECT DISTINCT ?otherPatternName ?otherLangUri
      WHERE {
        ?otherLangUri pp:containsPattern <${otherPatternUri}> .
        <${otherPatternUri}> pp:hasName ?otherPatternName .
      }`;
      graphs = allGraphs.otherLangsBase.concat(allGraphs.otherLangsPattern);
      const otherNames = await this.pos.exec(otherNamesQry, graphs);
      
      // build relations 
      for (const other of otherNames) {
        const relation = {
          label: other.otherPatternName.value,
          patternId: IriConverter.convertIriToId(otherPatternUri),
          direction: (entry.sourceUri.value === uri) ? 'outgoing' : 'incoming',
          relationId: entry.linkUri.value,
          hasDescription: (entry.desc) ? true : false
        };

        let language = data.get(other.otherLangUri.value);
        if (language) {
          language.relations.push(relation);
        }
      }
    }

    millis = Date.now() - start;
    console.log(`build language data: ${millis}ms`);

    return Promise.resolve(data);
  }

  /** NOT IMPLEMENTED */
  async selectContentFromStore(uri?: string): Promise<any> {
    return Promise.resolve(null);
  }

  /** NOT IMPLEMENTED */
  mapTriples(triples: any, uri?: string): Promise<Map<string, LanguageRelation>> {
    return Promise.resolve(null);
  }
}
