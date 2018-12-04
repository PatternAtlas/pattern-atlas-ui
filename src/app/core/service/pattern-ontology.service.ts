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
import { forkJoin, Observable, of, throwError } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import PatternLanguage from '../model/pattern-language.model';
import { SparqlExecutor } from '../model/sparql.executor';

@Injectable()
export class PatternOntologyService implements SparqlExecutor {
    private _store;

    constructor(private http: HttpClient) {
        this.createNewStore()
            .subscribe(store => this._store = store);
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
        store.registerDefaultNamespace('pp', 'http://purl.org/patternpedia#');
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
    createNewStore(): Observable<any> {
        return Observable.create(observer => {
            rdfstore.create((err, store) => {
                if (!err) {
                    this.registerDefaultNameSpaces(store);
                    observer.next(store);
                    observer.complete();
                } else {
                    observer.error(err);
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
     * Loads the ontology at the given IRI to the give store if it is not yet present. The default store is used if no store is given.
     * All imported ontologies are checked and are also loaded recursively with this function.
     * @param iri
     * @param store
     */
    loadOntologyWithImportsToStore(iri: string, store: any = null): Observable<any> {
        // 1. check if ontology is not yet loaded
        // 2. load ontology to store
        // 3. load owl:imports triple {?s owl:imports ?o}
        // 4. for each loaded import-triple call loadOntologyWithImportsToStore
        if (!store) {
            console.log('Using default store');
            store = this.store;
        }
        return this.ontologyAlreadyLoaded(iri, store)
            .pipe(
                flatMap(alreadyLoaded => {
                    return !alreadyLoaded.loaded ? this.loadOntologyToStore(iri, store) : of(null);
                }),
                flatMap(result => result ? this.loadImportTriple(store) : of(result)),
                flatMap(importTriple => {
                    const triples = importTriple as Array<any>;
                    if (importTriple && triples.length > 0) {
                        const observables = [];
                        for (const it of importTriple as Array<any>) {
                            observables.push(this.loadOntologyWithImportsToStore(it.o.value, store));
                        }
                        return forkJoin(observables);
                    } else {
                        return of(null);
                    }
                })
            );
    }

    /**
     * Checks if an ontology is already loaded by checking 'ASK { <${iri}> a owl:Ontology }'.
     * @param {string} iri
     * @param store
     * @returns {Observable<{iri: string; loaded: boolean}>}
     */
    ontologyAlreadyLoaded(iri: string, store: any = null): Observable<{ iri: string, loaded: boolean }> {
        if (!store) {
            console.log('Using default store');
            store = this.store;
        }
        return this.ask(`ASK { <${iri}> a owl:Ontology }`, store)
            .pipe(
                map(result => {
                    return {iri: iri, loaded: result};
                })
            );
    }

    /**
     * Loads triples that suffice { ?s owl:imports ?o } from the store
     * @param store
     * @returns {Observable<Array<any>>}
     */
    loadImportTriple(store): Observable<Array<any>> {
        return this.exec('SELECT ?s ?o WHERE { ?s owl:imports ?o }', store);
    }

    /**
     * Loads an turtle ontology located at the given IRI and stores it to the given store.
     * If no store is given the default store is used.
     * @param {string} iri
     * @param store
     * @returns {Observable<number>}
     */
    loadOntologyToStore(iri: string, store: any = null): Observable<number> {
        console.log('Loading Ontology:', iri);
        if (!store) {
            console.log('Using default store');
            store = this.store;
        }
        return this.loadRawOntology(iri).pipe(
            flatMap(rawText => {
                return Observable.create(observer => {
                        store.load('text/turtle', rawText, (loadErr, loadResult) => {
                            if (!loadErr) {
                                console.log('Loading succeded', loadResult);
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
     * This function loads ontologies locally hosted for development
     */
    loadLocallyHostedOntos(): Observable<any> {
        console.log('Loading locally hosted Ontologies');
        const observables = [
            this.loadOntologyToStore('assets/patternpedia.ttl'),
            this.loadOntologyToStore('assets/cloudcomputingpatterns.ttl'),
            this.loadOntologyToStore('assets/internetofthingspatterns.ttl')
        ];
        return forkJoin(observables)
            .pipe(
                map(result => {
                    console.log('Loaded locally hosted Ontologies: ', result);
                    return result;
                }));
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
                            observables.push(this.exec(`SELECT * WHERE { <${entry.patternlanguage.value}> ?p ?o }`)
                                .pipe(
                                    map(loadPLDetailsResult => {
                                        console.log('--->', loadPLDetailsResult);
                                        const pl = new PatternLanguage(entry.patternlanguage.value, null, []);
                                        for (const propEntry of loadPLDetailsResult) {
                                            if ('http://purl.org/patternpedia#hasLogo' === propEntry.p.value) {
                                                pl.logos.push(propEntry.o.value);
                                            } else if ('http://purl.org/patternpedia#hasName' === propEntry.p.value) {
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
        return this.exec(
            `SELECT DISTINCT ?type ?pattern ?predicate ?property
                 WHERE {
                    <${patternLanguageIRI}> pp:containsPattern ?pattern .
                    ?pattern ?predicate ?property .
                    ?pattern a ?type .
                    FILTER (?type != owl:NamedIndividual && ?predicate != rdf:type)
                    }
                 ORDER BY ?pattern`
            , store)
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

    // /**
    //  * Executes the given query on the given store. If no store is given the default store is used.
    //  * @param {string} qry
    //  * @param store
    //  * @returns {Observable<Array<any>>}
    //  */
    // exec(qry: string, store: any = null): Observable<Array<any>> {
    //     return new Observable<Array<any>>(observer => {
    //         if (!store) {
    //             console.log('Using default store for query execution');
    //             store = this.store;
    //         }
    //         console.log('EXECUTING Query:', qry);
    //         store.execute(qry, (execErr, execResult) => {
    //             if (!execErr) {
    //                 observer.next(execResult);
    //                 observer.complete();
    //             } else {
    //                 observer.error(execErr);
    //             }
    //         });
    //     });
    // }

    /**
     * Executes the given query on the given store. If no store is given the default store is used.
     * @param {string} qry
     * @param store
     * @returns {Observable<Array<any>> | Observable<boolean>}
     */
    exec(qry: string, store: any = null): Observable<Array<any>> {
        return new Observable<Array<any>>(observer => {
            if (!store) {
                console.log('Using default store for query execution');
                store = this.store;
            }
            store.execute(qry, (execErr, execResult) => {
                if (!execErr) {
                    observer.next(execResult);
                    observer.complete();
                } else {
                    observer.error(execErr);
                }
            });
        });
    }

    /**
     * Execute an ask query on the give store. If no store is given the default store is used.
     * @param askStatement
     * @param store
     */
    ask(askStatement: string, store: any = null): Observable<boolean> {
        return new Observable<boolean>(observer => {
            if (!store) {
                console.log('Using default store for query execution');
                store = this.store;
            }
            store.execute(askStatement, (execErr, execResult) => {
                if (!execErr) {
                    observer.next(execResult);
                    observer.complete();
                } else {
                    observer.error(execErr);
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
        // TODO: Add tripple that connect pattern language individual with a PatternPedia Instance
        // (plId pp:containsPatternLanguage NewPatternLanguageIndividualIRI)
        if (!store) {
            console.log('Use default store');
            store = this.store;
        }
        pl = !pl ? new PatternLanguage(
            'http://purl.org/patternpedia#InternetOfThingsPatterns',
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
}
