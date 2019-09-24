/*
 * Copyright (c) 2018 University of Stuttgart.
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0, or the Apache Software License 2.0
 * which is available at https://www.apache.org/licenses/LICENSE-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, from, Observable, of, throwError } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import PatternLanguage from '../model/pattern-language.model';
import { SparqlExecutor } from '../model/sparql.executor';
import { IriConverter } from '../util/iri-converter';
import { PatternGraphContainedInPP } from './data/PatternGraphContainedInPP.interface';
import { Logo } from './data/Logo.interface';
import { Import } from './data/Import.interface';
import { QueriedData } from './data/QueriedData.interface';
import { SectionResponse } from './data/SectionResponse.interface';
import { CookieService } from 'ngx-cookie-service';
import { GithubPersistenceService } from './github-persistence.service';
import { GithubFileResponse } from './data/GithubFileResponse.interface';
import { RestrictionResponse } from './data/RestrictionResponse.interface';
import { PatternProperty } from './data/PatternProperty.interface';
import { DirectedPatternRelationDescriptorResponse } from './data/DirectedPatternRelationDescriptorResponse.interface';
import { UndirectedPatternRelationDescriptorResponse, } from './data/UndirectedPatternRelationDescriptorResponse.interface';

@Injectable()
export class PatternOntologyService implements SparqlExecutor {
  private _store;

  constructor(private http: HttpClient, private cookieService: CookieService, private githubPersistenceService: GithubPersistenceService) {
    this.createNewStore()
      .then(() => console.log('Created new Store'));
  }

  /**
   * Registers default namespaces to given store.
   * @param store
   */
  registerDefaultNameSpaces(store: any): void {
    store.registerDefaultNamespace('owl', 'http://www.w3.org/2002/07/owl#');
    store.registerDefaultNamespace('rdf', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#');
    store.registerDefaultNamespace('rdfs', 'http://www.w3.org/2000/01/rdf-schema#');
    store.registerDefaultNamespace('xsd', 'http://www.w3.org/2001/XMLSchema#');
    store.registerDefaultNamespace('pp', 'https://purl.org/patternpedia#');
  }

  /**
   * Returns the default store.
   * @returns {any}
   */
  get store() {
    return this._store;
  }

  /**
   * Creates a new store with registered default namespaces.
   */
  async createNewStore(): Promise<any> {
    console.log('Creating new store');
    return new Promise((resolve, reject) => {
      rdfstore.create((err, store) => {
        if (!err) {
          this.registerDefaultNameSpaces(store);
          this._store = store;
          resolve(store);
        } else {
          reject(err);
        }
      });
    });
  }

  /**
   * Loads the file located at the given IRI via http.
   * @param {string} iri
   * @returns {Observable<string>}
   */
  loadRawOntology(iri: string): Observable<string> {
    console.log('Fetching raw data from:', iri);
    return this.http.get(iri, {responseType: 'text'});
  }

  /**
   * Loads the ontology at the given URL to the give store if it is not yet present. The default store is used if no store is given.
   * All imported ontologies are checked and are also loaded recursively with this function.
   * @param url URL of the ontology file
   * @param iri IRI of the represented entity in ontology file
   * @param store
   */
  loadOntologyWithImportsToStore(url: string, iri: string, store: any = null): Promise<any> {
    // 1. check if ontology is not yet loaded
    // 2. load ontology to store
    // 3. load owl:imports triple {?s owl:imports ?o}
    // 4. for each loaded import-triple call loadOntologyWithImportsToStore
    if (!store) {
      console.log('Using default store');
      store = this.store;
    }
    return this.ontologyAlreadyLoaded(iri, store)
      .then(alreadyLoaded => {
        return !alreadyLoaded.loaded ? this.loadOntologyToStore(url, iri, store) : Promise.resolve(null);
      })
      .then(result => result ? this.loadImportTriple(store) : Promise.resolve(result))
      .then(importTriple => {
        const triples = importTriple as Array<any>;
        if (importTriple && triples.length > 0) {
          const promises = [];
          for (const it of importTriple as Array<any>) {
            promises.push(this.loadOntologyWithImportsToStore(it.o.value, store));
          }
          return Promise.all(promises);
        } else {
          return Promise.resolve(null);
        }
      });
  }

  /**
   * Checks if an ontology is already loaded by checking 'ASK { <${iri}> a owl:Ontology }'.
   * @param {string} iri
   * @param store
   * @returns {Observable<{iri: string; loaded: boolean}>}
   */
  ontologyAlreadyLoaded(iri: string, store: any = null): Promise<{ iri: string, loaded: boolean }> {
    if (!store) {
      console.log('Using default store');
      store = this.store;
    }
    return this.ask(`ASK { <${iri}> a owl:Ontology }`, store)
      .then(
        result => {
          return {iri: iri, loaded: result};
        }
      );
  }

  /**
   * Loads triples that suffice { ?s owl:imports ?o } from the store
   * @param store
   * @returns {Observable<Array<any>>}
   */
  loadImportTriple(store): Promise<Array<any>> {
    return this.exec('SELECT ?s ?o WHERE { ?s owl:imports ?o }', store);
  }

  /**
   * Loads an turtle ontology located at the given IRI and stores it to the given store.
   * If no store is given the default store is used.
   * @param {string} url URL of the file to be loaded
   * @param {string} graphIri IRI of graph to store triples to
   * @param store
   * @returns {Observable<number>}
   */
  loadOntologyToStore(url: string, graphIri: string, store: any = null): Observable<any> {
    console.log('Loading ontology:', url, 'for entity ', graphIri, ' from ', url);
    if (!store) {
      console.log('Using default store');
      store = this.store;
    }
    return this.loadRawOntology(url).pipe(
      flatMap(rawText => {
        return Observable.create(observer => {
            store.load('text/turtle', rawText, graphIri, (loadErr, loadResult) => {
              if (!loadErr) {
                console.log('Loading of ', url, 'succeeded: ', loadResult);
                observer.next(loadResult);
                observer.complete();
              } else {
                console.error(loadErr);
                observer.error(loadErr);
              }
            });
          }
        );
      })
    );
  }

  /**
   * This function loads the patterngraph of the given Uris
   */
  loadPatternGraphsByUri(uri?: string[]): Observable<any> {
    if (!uri) {
      return of(null);
    }
    const observables = uri.map((iri) => {
      if (this.cookieService.get('patternpedia_github_token')) {
        const githubApiFileUrl = IriConverter.getGithubAPIURLForURI(iri);
        return this.githubPersistenceService.getFile(githubApiFileUrl).pipe(
          map((fileResponse: GithubFileResponse) => {
            return atob(fileResponse.content);
          }));
      }
      return this.http.get(iri, {responseType: 'text'});
    });

    return forkJoin(observables);
  }

  /**
   * This function loads ontologies locally hosted for development
   */
  loadLocallyHostedOntosRaw(): Observable<any> {
    const observables = [
      this.http.get('assets/patternpedia.ttl', {responseType: 'text'}),
      // this.http.get('assets/cloudcomputingpatterns/cloudcomputingpatterns.ttl', {responseType: 'text'}),
      // this.http.get('assets/cloudcomputingpatterns/elasticinfrastructure.ttl', {responseType: 'text'}),
      // this.http.get('assets/cloudcomputingpatterns/elasticloadbalancer.ttl', {responseType: 'text'}),
      this.http.get('assets/cloudcomputingpatterns/Cloud Computing Patterns.ttl', {responseType: 'text'}),
      this.http.get('assets/cloudcomputingpatterns/Cloud Computing Patterns-links.ttl', {responseType: 'text'}),
      this.http.get('assets/cloudcomputingpatterns/Cloud Computing Patterns-nodes.ttl', {responseType: 'text'}),
      this.http.get('assets/internetofthingspatterns/internetofthingspatterns.ttl', {responseType: 'text'}),
      this.http.get('assets/internetofthingspatterns/deviceshadow.ttl', {responseType: 'text'}),
      this.http.get('assets/internetofthingspatterns/devicegateway.ttl', {responseType: 'text'}),
      this.http.get('assets/enterpriseintegrationpatterns/Enterprise Integration Patterns.ttl', {responseType: 'text'}),
      this.http.get('assets/enterpriseintegrationpatterns/Enterprise Integration Patterns-nodes.ttl', {responseType: 'text'}),
      this.http.get('assets/enterpriseintegrationpatterns/Enterprise Integration Patterns-links.ttl', {responseType: 'text'})
    ];
    return forkJoin(observables);
  }

  async loadLocallyHostedOntos() {
    console.log('LOADING Ontologies...');
    const loadResult = await this.loadLocallyHostedOntosRaw().toPromise();
    console.log('LOADED Ontologies!');
    const store = this.store;
    this.registerDefaultNameSpaces(store);
    console.log('LOADING https://purl.org/patternpedia to store');
    console.log('Result: ', await this.loadToStore('text/turtle',
      loadResult[0], 'https://purl.org/patternpedia'));

    // loading the enterprise integration patterns turtle file
    console.log('LOADING https://purl.org/patternpedia/cloudcomputingpatterns');
    console.log('Result: ', await this.loadToStore('text/turtle',
      loadResult[1], 'https://purl.org/patternpedia/cloudcomputingpatterns'));
    // loading the nodes
    console.log('LOADING NODES OF https://purl.org/patternpedia/cloudcomputingpatterns');
    console.log('Result: ', await this.loadToStore('text/turtle',
      loadResult[2], 'https://purl.org/patternpedia/cloudcomputingpatterns'));
    // loading the links
    console.log('LOADING EDGES OF https://purl.org/patternpedia/cloudcomputingpatterns');
    console.log('Result: ', await this.loadToStore('text/turtle',
      loadResult[3], 'https://purl.org/patternpedia/cloudcomputingpatterns'));

    console.log('LOADING https://purl.org/patternpedia/internetofthingspatterns/ to store');
    console.log('Result: ', await this.loadToStore('text/turtle',
      loadResult[4], 'https://purl.org/patternpedia/internetofthingspatterns'));
    console.log('LOADING https://purl.org/patternpedia/internetofthingspatterns/deviceshadow to store');
    console.log('Result: ', await this.loadToStore('text/turtle',
      loadResult[5], 'https://purl.org/patternpedia/internetofthingspatterns/devicegateway'));
    console.log('Result: ', await this.loadToStore('text/turtle',
      loadResult[6], 'https://purl.org/patternpedia/internetofthingspatterns/devicegateway'));

    // loading the enterprise integration patterns turtle file
    console.log('LOADING https://purl.org/patternpedia/enterpriseintegrationpatterns');
    console.log('Result: ', await this.loadToStore('text/turtle',
      loadResult[7], 'https://purl.org/patternpedia/enterpriseintegrationpatterns'));
    // loading the nodes
    console.log('LOADING NODES OF https://purl.org/patternpedia/enterpriseintegrationpatterns');
    console.log('Result: ', await this.loadToStore('text/turtle',
      loadResult[8], 'https://purl.org/patternpedia/enterpriseintegrationpatterns'));
    // loading the links
    console.log('LOADING EDGES OF https://purl.org/patternpedia/enterpriseintegrationpatterns');
    console.log('Result: ', await this.loadToStore('text/turtle',
      loadResult[9], 'https://purl.org/patternpedia/enterpriseintegrationpatterns'));
  }


  async loadLinkedOpenPatternGraphs() {
    const githubUrl = this.githubPersistenceService.githubBaseUrl;
    let patternpediaResult = await this.http.get(githubUrl + '/patternpedia.ttl').toPromise();
    const loadedResult = atob((<GithubFileResponse>patternpediaResult).content);
    console.log('Result: ', await this.loadToStore('text/turtle',
      loadedResult, 'https://purl.org/patternpedia'));
    const store = this.store;
    this.registerDefaultNameSpaces(store);
    console.log('LOADING Ontologies...');
    const patternGraphList: PatternGraphContainedInPP[] = await this.getPatternGraphsOfLinkedOpenPatterns();
    console.log(`These are the patternlanguages that we have to load dynamically:`);
    console.log(patternGraphList);
    await this.loadUrisToStore(patternGraphList.map(it => it.patterngraph));
  }

  async loadUrisToStore(patternGraphList: QueriedData[]) {
    console.log(`Load imported graphs to the store:`);
    console.log(patternGraphList);
    const loadResult = await this.loadPatternGraphsByUri(IriConverter.extractDataValue(patternGraphList)).toPromise();
    if (!loadResult) {
      return;
    }
    for (let i = 0; i < loadResult.length; i++) {
      console.log('Result: ', await
        this.loadToStore('text/turtle', loadResult[i], IriConverter.getFileName(patternGraphList[i].value)));

    }
    console.log('LOADED Uri Dependencies!');
  }

  loadToStore(mediaType: string, data: string, graphIri: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.store.load(mediaType, data, graphIri, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          console.log('error while loading ' + graphIri);
          reject(err);
        }
      });
    });
  }

  // clear graph to remove locally stored data, so loading the URI into the graph storage will show only the updated data
  clearGraph(graphIri: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.store.clear(graphIri, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          console.log('error while loading ' + graphIri);
          reject(err);
        }
      });
    });
  }

  /**
   * Selects triples that suffice { <${ppInstanceIRI}> pp:containsPatternLanguage ?patternlanguage } and converts them into
   * PatternLanguage objects.
   * @param {string} ppInstanceIRI
   * @returns {Observable<Array<PatternLanguage>>}
   */
  getPatternLanguages(ppInstanceIRI: string): Observable<Array<PatternLanguage>> {
    return Observable.create(observer => {
      this.store.execute(`SELECT ?patternlanguage WHERE { <${ppInstanceIRI}> pp:containsPatternLanguage ?patternlanguage }`,
        (execErr, sparqlResult) => {
          if (!execErr) {
            console.log('Found following pattern languages:', sparqlResult);
            const observables = [];
            for (const entry of sparqlResult) {
              observables.push(from(this.exec(`SELECT * WHERE { <${entry.patternlanguage.value}> ?p ?o }`, [ppInstanceIRI]))
                .pipe(
                  map(loadPLDetailsResult => {
                    console.log('--->', loadPLDetailsResult);
                    const pl = new PatternLanguage(entry.patternlanguage.value, null, []);
                    for (const propEntry of loadPLDetailsResult) {
                      if ('https://purl.org/patternpedia#hasLogo' === propEntry.p.value) {
                        pl.logos.push(propEntry.o.value);
                      } else if ('https://purl.org/patternpedia#hasName' === propEntry.p.value) {
                        pl.name = propEntry.o.value;
                      }
                    }
                    return pl;
                  })
                ));
            }
            forkJoin(observables)
              .subscribe(aryResult => observer.next(aryResult), error1 => observer.error(error1));
          } else {
            console.error(execErr);
            observer.error(execErr);
          }
        });
    });
  }

  /**
   * Load patterns of given pattern language
   * @param patternLanguageIRI
   * @param store
   */
  getPatternsOfPatternLanguage(patternLanguageIRI: string, store: any = null): Observable<any> {
    if (!store) {
      console.log('Using default store');
      store = this.store;
    }
    return from(this.exec(
      `SELECT DISTINCT ?type ?pattern ?predicate ?property
                 WHERE {
                    <${patternLanguageIRI}> pp:containsPattern ?pattern .
                    ?pattern ?predicate ?property .
                    ?pattern a ?type .
                    FILTER (?type != owl:NamedIndividual && ?predicate != rdf:type)
                    }
                 ORDER BY ?pattern`
      , store))
      .pipe(
        map(result => {
            if (result && result.length > 0) {
              const patterns = {};
              for (const row of result) {
                // row.pattern.value = PatternIndividual IRI
                if (!patterns[row.pattern.value]) {
                  patterns[row.pattern.value] = {iri: row.pattern.value, type: row.type.value};
                }
                if (!patterns[row.pattern.value][row.predicate.value]) {
                  patterns[row.pattern.value][row.predicate.value] = {
                    name: row.predicate.value,
                    value: row.property.value,
                    type: row.property.type
                  };
                } else if (!patterns[row.pattern.value][row.predicate.value].isArray()) {
                  const temp = patterns[row.pattern.value][row.predicate.value];
                  patterns[row.pattern.value][row.predicate.value] = [temp,
                    {
                      name: row.predicate.value,
                      value: row.property.value,
                      type: row.property.type
                    }];
                } else if (patterns[row.pattern.value][row.predicate.value].isArray()) {
                  patterns[row.pattern.value][row.predicate.value].push({
                    name: row.predicate.value,
                    value: row.property.value,
                    type: row.property.type
                  });
                }
              }
              return patterns;
            } else {
              return {};
            }
          }
        )
      );
  }


  /**
   * Executes the given query on the given store. If no store is given the default store is used.
   * @param {string} qry
   * @param {Array<string>} graphs
   * @param store
   * @returns {Promise<Array<any>> | Promise<boolean>}
   */
  async exec(qry: string, graphs: Array<string>): Promise<Array<any>> {
    if (!this.store) {
      await this.createNewStore();
    }
    return new Promise<Array<any>>((resolve, reject) => {
      this.store.execute(qry, graphs, [], (execErr, execResult) => {
        if (!execErr) {
          resolve(execResult);
        } else {
          reject(execErr);
        }
      });
    });
  }

  /**
   * Execute an ask query on the give store. If no store is given the default store is used.
   * @param askStatement
   * @param {Array<string>} graphs
   * @param store
   * @returns {Promise<boolean>}
   */
  async ask(askStatement: string, graphs: Array<string>): Promise<boolean> {
    if (!this.store) {
      await this.createNewStore();
    }
    return new Promise<boolean>((resolve, reject) => {
      this.store.execute(askStatement, graphs, (execErr, execResult) => {
        if (!execErr) {
          resolve(execResult);
        } else {
          reject(execErr);
        }
      });
    });
  }

  getOntologyAsTurtle(): Observable<string> {
    return Observable.create(observer => {
      this.store.graph((err, result) => {
        if (!err) {
          observer.next(result.toNT());
          observer.complete();
        } else {
          observer.error(err);
        }
      });
    });
  }

  /**
   * Insert given pattern language to store given store. If no store is given the default store is used.
   * @param pl Pattern language to insert
   * @param store Store the new pattern language is inserted to
   */
  insertNewPatternLanguageIndividual(pl: PatternLanguage, store: any = null): Observable<boolean> {
    // TODO: Add triple that connect pattern language individual with a PatternPedia Instance
    // (plId pp:containsPatternLanguage NewPatternLanguageIndividualIRI)
    if (!store) {
      console.log('Use default store');
      store = this.store;
    }
    pl = !pl ? new PatternLanguage(
      'https://purl.org/patternpedia#InternetOfThingsPatterns',
      'Internet of Things Patterns',
      new Array<string>('http://placekitten.com/150/151')
    ) : pl;

    // prepare logo query part
    let logoQry = '';
    for (const logo of pl.logos) {
      logoQry += '<' + pl.iri + '> pp:hasLogo "' + logo + '"^^xsd:anyURI . ';
    }
    logoQry += ' }';
    let qry = `INSERT DATA { <${pl.iri}> rdf:type owl:NamedIndividual . \
                                   <${pl.iri}> rdf:type pp:PatternLanguage . \
                                   <${pl.iri}> pp:hasName "${pl.name}"^^xsd:string . `;
    qry += logoQry;
    console.log('Executing Query:', qry);
    return Observable.create(observer => {
      this.store.execute(qry, (err, result) => {
        if (!err) {
          observer.next(result);
          observer.complete();
        } else {
          throwError(err);
        }
      });
    });
  }


  async getPatternGraphsOfLinkedOpenPatterns(): Promise<PatternGraphContainedInPP[]> {
    // Function taken from Loader
    // TODO: move functionality to avoid duplicate code
    const supportedIRI = 'https://purl.org/patternpedia#LinkedOpenPatterns';
    const qryPatternGraphs = `SELECT DISTINCT ?patterngraph
                                      WHERE {
                                          <${supportedIRI}> <https://purl.org/patternpedia#containsPatternGraph> ?patterngraph
                                      }`;
    const patternGraphs = await this.exec(qryPatternGraphs, [IriConverter.getFileName(supportedIRI)]);

    return this.exec(qryPatternGraphs, [IriConverter.getFileName(supportedIRI)]);
  }

  async getRestrictionsOfPL(graphIri: string): Promise<RestrictionResponse[]> {
    const qryPatternGraphs = `SELECT DISTINCT  ?property ?exactCardinality ?minCardinality 
        ?maxCardinality ?dataRange ?allValuesdataRange ?someValuesdataRange 
        WHERE {
            {
              ?patternLanguageIndividual a owl:Class . 
              ?patternLanguageIndividual rdfs:subClassOf ?restrictionClass .
              ?restrictionClass a owl:Restriction . 
              ?restrictionClass owl:onProperty ?property .
              ?property a owl:DatatypeProperty .
              optional { ?restrictionClass owl:allValuesFrom ?allValuesdataRange .} 
              optional { ?restrictionClass owl:onDataRange   ?dataRange .}
              optional { ?restrictionClass owl:someValuesFrom ?someValuesdataRange .}
              optional { ?restrictionClass owl:qualifiedCardinality ?exactCardinality . } 
              optional { ?restrictionClass owl:minCardinality  ?minCardinality . }  
              optional { ?restrictionClass owl:maxCardinality  ?maxCardinality . }
            }
            UNION
              {
              
              ?patternLanguageIndividual a owl:Class . 
              ?patternLanguageIndividual rdfs:subClassOf ?restrictionClass .
              ?restrictionClass a owl:Restriction . 
              ?restrictionClass owl:onProperty ?property .
              ?property a pp:DatatypePropertyListItem .
              optional { ?restrictionClass owl:allValuesFrom ?allValuesdataRange .} 
              optional { ?restrictionClass owl:onDataRange   ?dataRange .}
              optional { ?restrictionClass owl:someValuesFrom ?someValuesdataRange .}
              optional { ?restrictionClass owl:qualifiedCardinality ?exactCardinality . } 
              optional { ?restrictionClass owl:minCardinality  ?minCardinality . }  
              optional { ?restrictionClass owl:maxCardinality  ?maxCardinality . }
              }
        }`;

    return this.exec(qryPatternGraphs, [IriConverter.getFileName(graphIri)]);
  }

  async getPLLogo(graphIri: string): Promise<Logo[]> {
    const qryPatternGraphs = `SELECT ?logo
        WHERE {
            ?pl rdf:type owl:NamedIndividual .
            ?pl <https://purl.org/patternpedia#hasLogo> ?logo .
        }`;

    return this.exec(qryPatternGraphs, [IriConverter.getFileName(graphIri)]);
  }

  async getOWLImports(graphIri: string): Promise<Import[]> {
    const qryPatternGraphs = `SELECT ?import
        WHERE {
            ?pl rdf:type owl:Ontology .
            ?pl  owl:imports ?import .
        }`;
    return this.exec(qryPatternGraphs, [IriConverter.getFileName(graphIri)]);
  }


  async getPatternProperties(graphIri: string, patternIri: string): Promise<PatternProperty[]> {
    const qryPatternGraph = `SELECT DISTINCT ?pattern ?property ?predicate WHERE {
            { <${patternIri}> a owl:NamedIndividual . 
              <${patternIri}> ?property ?predicate
                FILTER(?property != rdf:type)
            }
        } `;
    return this.exec(qryPatternGraph, [IriConverter.getFileName(graphIri)]);
  }

  async allTriples(graphIri: string): Promise<any[]> {
    const qryPatternGraph = `SELECT * WHERE {
            ?subject ?predicate ?object .
        } `;
    return this.exec(qryPatternGraph, [IriConverter.getFileName(graphIri)]);
  }

  async getDataPropertyList(graphIri: string): Promise<any[]> {
    // get position: count the nodes between the start of the list (:DatatypePropertyList) and the current list element
    const qryPatternGraph = `SELECT (count(?innerNodes)-1 as ?position) ?element where { 
      :DatatypePropertyList :list/rdf:rest* ?innerNodes . 
  	  ?innerNodes rdf:rest* ?node .
      ?node rdf:first ?element .
    }
    group by ?node ?dataProperty ?element
    order by ?position`;
    return this.exec(qryPatternGraph, [IriConverter.getFileName(graphIri)]);
  }

  getPLSections(graphIri: string): Promise<SectionResponse[]> {
    const qryPatternGraph = `SELECT DISTINCT ?section ?index
    WHERE {
    {
     ?section a owl:DatatypeProperty .
    }
    UNION
      {
    ?section a pp:DatatypePropertyListItem .
    optional{ ?section pp:hasListIndex  ?index .}
    }
    }
    ORDER BY ?index`;
    return this.exec(qryPatternGraph, [IriConverter.getFileName(graphIri)]);
  }

  getDirectedPatternRelations(supportedIRI: string): Promise<DirectedPatternRelationDescriptorResponse[]> {
    const qryPatternGraph = `SELECT ?source ?target ?description WHERE {
     ?relationlink a owl:NamedIndividual .
     ?relationlink a pp:DirectedPatternRelationDescriptor .
     ?relationlink 	pp:hasSource ?source .
     ?relationlink 	pp:hasTarget ?target . 
      optional {?relationlink pp:hasDescription ?description .}
    }
`;
    return this.exec(qryPatternGraph, [IriConverter.getFileName(supportedIRI)]);
  }

  getUndirectedPatternRelations(supportedIRI: string): Promise<UndirectedPatternRelationDescriptorResponse[]> {
    const qryPatternGraph = `SELECT ?relationlink ?pattern
    WHERE {
     ?relationlink a owl:NamedIndividual .
     ?relationlink a pp:UndirectedPatternRelationDescriptor .
     ?relationlink 	pp:hasPattern ?pattern .
      optional {?relationlink pp:hasDescription ?description .}
    }
`;
    return this.exec(qryPatternGraph, [IriConverter.getFileName(supportedIRI)]);
  }
}
