import { IriConverter } from 'src/app/core/util/iri-converter';
import { Injectable } from '@angular/core';
import Loader from 'src/app/core/model/loader';
import { PatternOntologyService } from 'src/app/core/service/pattern-ontology.service';
import { Relation, LanguageRelation } from 'src/app/graph/model';

@Injectable({
  providedIn: 'root'
})
export class GroupClrLoaderService extends Loader<LanguageRelation> {

  constructor(private pos: PatternOntologyService) {
    super('https://purl.org/patternpedia/patternlanguages/enterpriseintegrationpatterns#EnterpriseIntegrationPatterns', pos);
  }

  // load all CLRs that contain the given Pattern URI
  loadContentFromStore(uri?: string): Promise<Map<string, LanguageRelation>> {
    return this.selectContentFromStore(uri)
            .then(
                triples => this.mapTriples(triples, uri)
            );
  }

  private async getGraphs(uri: string): Promise<Array<any>> {
    const graphs = [
      'https://purl.org/patternpedia'
    ];
    graphs.push(IriConverter.getFileName(this.supportedIRI));

    // get all imports from supportedIRI
    const imports = await this.pos.getOWLImports(IriConverter.getFileName(this.supportedIRI));
    imports.map(i => i.import.value).forEach(i => graphs.push(i));

    // get views
    const viewsQry = `SELECT DISTINCT ?view
      WHERE {
        <${this.supportedIRI}> pp:referredByView ?view .
      }`;
    const views = await this.pos.exec(viewsQry, graphs);
    // add view uris to graph
    // for each view: get imports
    views.map(t => t.view.value).forEach(async u => {
      u = IriConverter.getFileName(u);
      // u is uri of view
      const importsQry = `SELECT ?imports
      WHERE {
        <${u}> owl:imports ?imports .
      }`;
      const imports = await this.pos.exec(importsQry, u);
      imports.map(i => i.import.value).forEach(i => graphs.push(i));
      graphs.push(u);
    });

    // get all other pattern languages and their imports
    const otherLangsQry = `SELECT DISTINCT ?otherLang
      WHERE {
        <${this.supportedIRI}> pp:referredByView ?view .
        ?view pp:containsPatternGraph ?otherLang .
        FILTER(?otherLang != <${this.supportedIRI}>) .
      }`;
    const otherLangs = await this.pos.exec(otherLangsQry, graphs);
    // add all imports from the other langauges to the graphs
    otherLangs.map(t => t.otherLang.value).forEach(async u => {
      const imports = await this.pos.getOWLImports(u);
      imports.map(i => i.import.value).forEach(i => graphs.push(i));
      graphs.push(u);
    });

    return Promise.resolve(graphs);
  }

  async selectContentFromStore(uri?: string): Promise<any> {
    // execute the query on:
    // patternpedia, both languages (complete) and the view
    // const graphs = await this.getGraphs(uri);
    const graphs = [
      'https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns',
      'https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns/cloudcomputingpatterns-Patterns',
      'https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns/cloudcomputingpatterns-Relations',
      'https://purl.org/patternpedia/patternlanguages/enterpriseintegrationpatterns',
      'https://purl.org/patternpedia/patternlanguages/enterpriseintegrationpatterns/enterpriseintegrationpatterns-Patterns',
      'https://purl.org/patternpedia/patternlanguages/enterpriseintegrationpatterns/enterpriseintegrationpatterns-Relations',
      'https://purl.org/patternpedia/patternviews/cloudcomputingpatterns-enterpriseintegrationpatterns-view',
      'https://purl.org/patternpedia/patternviews/cloudcomputingpatterns-enterpriseintegrationpatterns-view/cloudcomputingpatterns-enterpriseintegrationpatterns-view-Relations'
    ];

    // this query gets all CLRs that contain the given pattern uri either as source or target
    // it also returns the URI and Name of the other patternlanguage
    // basically contains everything needed for the LanguageRelation
    const qry = `SELECT DISTINCT ?otherLangUri ?otherLangName ?linkUri ?sourceUri ?sourceName ?targetUri ?targetName ?desc
      WHERE {
        <${this.supportedIRI}> pp:referredByView ?view .
        ?view pp:containsPatternRelationDescriptors ?linkUri .
        ?linkUri pp:hasTarget ?targetUri ;
                pp:hasSource ?sourceUri .
        OPTIONAL { ?linkUri pp:hasDescription ?desc . }
        { ?otherLangUri pp:containsPattern ?sourceUri } UNION { ?otherLangUri pp:containsPattern ?targetUri }.
        ?otherLangUri pp:hasName ?otherLangName .
        ?sourceUri pp:hasName ?sourceName .
        ?targetUri pp:hasName ?targetName .
        FILTER(?sourceUri = <${uri}> || ?targetUri = <${uri}>) .
            FILTER(?otherLangUri != <${this.supportedIRI}>) .
      }`;

    return this.executor.exec(qry, graphs);
  }

  mapTriples(triples: any, uri?: string): Promise<Map<string, LanguageRelation>> {
    const data = new Map<string, LanguageRelation>();

    for (const t of triples) {
      const langId = IriConverter.convertIriToId(t.otherLangUri.value);
      let item = data.get(langId);
      if (!item) {
        item = {
          languageId: langId,
          languageName: t.otherLangName.value,
          relations: []
        };
        data.set(langId, item);
      }

      // check if given uri is source or target
      const source = t.sourceUri.value;
      const target = t.targetUri.value;

      const temp: any = {};

      if (uri === source) {
        // target pattern is relevant
        temp.label = t.targetName.value;
        temp.patternId = IriConverter.convertIriToId(t.targetUri.value);
        temp.outgoing = true;
      } else if (uri === target) {
        // source pattern is relevant
        temp.label = t.sourceName.value;
        temp.patternId = IriConverter.convertIriToId(t.sourceUri.value);
        temp.outgoing = false;
      }

      const relation: Relation = {
        relationId: IriConverter.convertIriToId(t.linkUri.value),
        label: temp.label,
        patternId: temp.patternId,
        direction: temp.outgoing ? 'outgoing' : 'incoming',
        hasDescription: (t.desc) ? true : false
      };

      item.relations.push(relation);
    }

    return Promise.resolve(data);
  }
}
