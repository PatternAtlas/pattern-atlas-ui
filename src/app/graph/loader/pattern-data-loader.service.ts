import { IriConverter } from 'src/app/core/util/iri-converter';
import { QueriedData } from './../../core/service/data/QueriedData.interface';
import { LinkLoaderService } from './link-loader.service';
import { GroupLoaderService } from './group-loader.service';
import { OutgoingLinkLoaderService } from './outgoing-link-loader.service';
import { IncomingLinkLoaderService } from './incoming-link-loader.service';
import { ClrLoaderService } from './clr-loader.service';
import { Injectable } from '@angular/core';
import { Link, Relation, LanguageRelation } from 'src/app/graph/model';
import Group from '../model/group';
import { PatternOntologyService } from 'src/app/core/service/pattern-ontology.service';
import { LanguageLoaderService } from './language-loader.service';
import { LinkInfoLoaderService } from './link-info-loader.service';
import { PatternClrCheckLoaderService } from './pattern-clr-check-loader.service';

@Injectable({
  providedIn: 'root'
})
/**
 * This service acts as facade for the other pattern loader services.
 * With this, all the other services do not have to be injected manually every time.
 */
export class PatternDataLoaderService {

  constructor(private pos: PatternOntologyService,
    private linkLoader: LinkLoaderService,
    private groupLoader: GroupLoaderService,
    private outgoingLinkLoader: OutgoingLinkLoaderService,
    private incomingLinkLoader: IncomingLinkLoaderService,
    private clrLoader: ClrLoaderService,
    private languageLoader: LanguageLoaderService,
    private linkInfoLoader: LinkInfoLoaderService,
    private patternClrLoader: PatternClrCheckLoaderService) { }

  /**
   * Loads the directed relations from the given langauge uri from the store.
   * @param languageUri the URI of the language whos directed relations should be loaded from the store
   * @returns the links contained in a map, mapping link id to the actual link.
   */
  async loadDirectedLinks(languageUri: string): Promise<Map<string, Link>> {
    this.linkLoader.supportedIRI = languageUri;
    return this.linkLoader.loadContentFromStore();
  }

  /**
   * Loads the pattern groups contained in hyperedges from the store via the given language uri.
   * @param languageUri the URI of the language whos pattern groups should be loaded from the store
   * @returns the groups contained in a map, mapping group URI to the actual group.
   */
  async loadGroups(languageUri: string): Promise<Map<string, Group>> {
    this.groupLoader.supportedIRI = languageUri;
    return this.groupLoader.loadContentFromStore();
  }

  /**
   * Loads the outgoing relations from the given pattern.
   * @param languageUri the URI of the language containing the given pattern
   * @param patternUri the URI of the pattern whos outgoing relations should be loaded from the store
   * @returns the relations contained in a map, mapping related pattern ids to the relation of that other pattern, i.e. the target patterns.
   */
  async loadOutgoingLinks(languageUri: string, patternUri: string): Promise<Map<string, Relation>> {
    this.outgoingLinkLoader.supportedIRI = languageUri;
    return this.outgoingLinkLoader.loadContentFromStore(patternUri);
  }

  /**
   * Loads the incoming relations from the given pattern.
   * @param languageUri the URI of the language containing the given pattern
   * @param patternUri the URI of the pattern whos incoming relations should be loaded from the store
   * @returns the relations contained in a map, mapping related pattern ids to the relation of that other pattern, i.e. the source patterns.
   */
  async loadIncomingLinks(languageUri: string, patternUri: string): Promise<Map<string, Relation>> {
    this.incomingLinkLoader.supportedIRI = languageUri;
    return this.incomingLinkLoader.loadContentFromStore(patternUri);
  }

  /**
   * Loads all the cross language relations for the given pattern.
   * @param languageUri the URI of the language containing the given pattern
   * @param patternUri the URI of the pattern whos cross language relations should be loaded
   */
  async loadCLRs(languageUri: string, patternUri: string): Promise<Map<string, LanguageRelation>> {
    this.clrLoader.supportedIRI = languageUri;
    return this.clrLoader.loadContentFromStore(patternUri);
  }

  /**
   * Loads the language URI for the given language ontology uri.
   * Example: For the following given URI 'https://purl.org/patternlanguages/samplelanguage'
   * it returns 'https://purl.org/patternlanguages/samplelanguage#SampleLanguage'.
   * @param languageUri the URI of the ontology of the language in form of <language>
   * @returns the URI of the language in form of <language#Language>
   */
  loadLanguage(languageUri: string): Promise<Map<string, string>> {
    return this.languageLoader.loadContentFromStore(languageUri);
  }

  async loadLink(languageUri: string, linkUri: string) {
    this.linkInfoLoader.supportedIRI = languageUri;
    return this.linkInfoLoader.loadContentFromStore(linkUri);
  }

  /**
   * Returns all views specified in the given language in form of <view#View>.
   * @param languageUri the URI of the language whos views should be returned
   * @returns all views specified in the given language in form of <view#View>
   */
  async loadViews(languageUri: string): Promise<Array<string>> {
    const qry = `SELECT ?view
      WHERE {
        <${languageUri}> <https://purl.org/patternpedia#referredByView> ?view .
      }`;

    const graphs = [IriConverter.getFileName(languageUri)];
    const triples = await this.pos.exec(qry, graphs);

    const data = [];
    for (const t of triples) {
      data.push(t.view.value);
    }

    return Promise.resolve(data);
  }

  /**
   * Returns all referred languages of the given language in form of <language#Language>.
   * Referred Languages are the other language mentioned in a view, i.e. not the given language.
   * @param languageUri the URI of the language whos referred languages should be returned
   * @returns all referred languages of the given language in form of <language#Language>
   */
  async loadReferredLanguages(languageUri: string): Promise<Array<string>> {
    // get all languages referred in the views, except the given language
    const qry = `SELECT ?lang
      WHERE {
        <${languageUri}> pp:referredByView ?view .
        ?view pp:containsPatternGraph ?lang .
        FILTER(?lang != <${languageUri}>) .
      }`;

    const graphs = [ IriConverter.getFileName(languageUri) ];
    const views = await this.loadViews(languageUri);
    for (const v of views) {
      graphs.push(IriConverter.getFileName(v));
    }
    const triples = await this.pos.exec(qry, graphs);

    const data = [];
    for (const t of triples) {
      data.push(t.lang.value);
    }
    return Promise.resolve(data);
  }

  /**
   * Returns a map containing all patterns that are contained in a clr.
   * The Map has the following structure: Pattern URI -> true.
   * If a pattern is not present in the list, the pattern does not have any clrs.
   * @param languageUri the URI of the language whos patterns should be checked for clrs
   * @returns a map containing all patterns that are contained in a clr
   */
  async loadPatternClrs(languageUri: string): Promise<Map<string, boolean>> {
    this.patternClrLoader.supportedIRI = languageUri;
    return this.patternClrLoader.loadContentFromStore();
  }
}
