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
    private clrLoader: ClrLoaderService) { }

  private async loadData(loader: any): Promise<void> {
    const uris: Array<QueriedData> = [];
    loader.getGraphs().forEach(g => uris.push({ value: g }));
    return this.pos.loadUrisToStore(uris);
  }

  /**
   * Loads the directed relations from the given langauge uri from the store.
   * @param languageUri the URI of the language whos directed relations should be loaded from the store
   * @returns the links contained in a map, mapping link id to the actual link.
   */
  async loadDirectedLinks(languageUri: string): Promise<Map<string, Link>> {
    this.linkLoader.supportedIRI = languageUri;

    return this.loadData(this.linkLoader).then(() => {
      console.log('Loaded DirectedLinks data');
      return this.linkLoader.loadContentFromStore();
    });
  }

  /**
   * Loads the pattern groups contained in hyperedges from the store via the given language uri.
   * @param languageUri the URI of the language whos pattern groups should be loaded from the store
   * @returns the groups contained in a map, mapping group URI to the actual group.
   */
  async loadGroups(languageUri: string): Promise<Map<string, Group>> {
    this.groupLoader.supportedIRI = languageUri;

    return this.loadData(this.groupLoader).then(() => {
      console.log('Loaded Groups data');
      return this.groupLoader.loadContentFromStore();
    });
  }

  /**
   * Loads the outgoing relations from the given pattern.
   * @param languageUri the URI of the language containing the given pattern
   * @param patternUri the URI of the pattern whos outgoing relations should be loaded from the store
   * @returns the relations contained in a map, mapping related pattern ids to the relation of that other pattern, i.e. the target patterns.
   */
  async loadOutgoingLinks(languageUri: string, patternUri: string): Promise<Map<string, Relation>> {
    this.outgoingLinkLoader.supportedIRI = languageUri;

    return this.loadData(this.outgoingLinkLoader).then(() => {
      console.log('Loaded OutgoingLinks data');
      return this.outgoingLinkLoader.loadContentFromStore(patternUri);
    });
  }

  /**
   * Loads the incoming relations from the given pattern.
   * @param languageUri the URI of the language containing the given pattern
   * @param patternUri the URI of the pattern whos incoming relations should be loaded from the store
   * @returns the relations contained in a map, mapping related pattern ids to the relation of that other pattern, i.e. the source patterns.
   */
  async loadIncomingLinks(languageUri: string, patternUri: string): Promise<Map<string, Relation>> {
    this.incomingLinkLoader.supportedIRI = languageUri;

    return this.loadData(this.incomingLinkLoader).then(() => {
      console.log('Loaded IncomingLinks data');
      return this.incomingLinkLoader.loadContentFromStore(patternUri);
    });
  }

  /**
   * Loads all the cross language relations for the given pattern.
   * @param languageUri the URI of the language containing the given pattern
   * @param patternUri the URI of the pattern whos cross language relations should be loaded
   */
  async loadCLRs(languageUri: string, patternUri: string): Promise<Map<string, LanguageRelation>> {
    this.clrLoader.supportedIRI = languageUri;

    return this.loadData(this.clrLoader).then(() => {
      console.log('Loaded CLR data');
      return this.clrLoader.loadContentFromStore(patternUri);
    });
  }

  loadLanguage() {}
}
