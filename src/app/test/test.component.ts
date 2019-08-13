import { Component, OnInit } from '@angular/core';
import { PatternOntologyService } from '../core/service/pattern-ontology.service';
import { forkJoin, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'pp-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

    constructor(private pos: PatternOntologyService,
                private http: HttpClient) {
    }

    ngOnInit() {
        console.log('HELLO');
        this.doStuff();
    }

    async doStuff() {
        console.log('LOADING Ontologies...');
        const loadResult = await this.load().toPromise();
        console.log('LOADED Ontologies!');
        const store = await this.createNewStore().toPromise();
        this.registerDefaultNameSpaces(store);
        console.log('LOADING https://purl.org/patternpedia to store');
        console.log('Result: ', await this.loadToStore(store, 'text/turtle',
            loadResult[0], 'https://purl.org/patternpedia').toPromise());
        console.log('LOADING https://purl.org/patternpedia/cloudcomputingpatterns to store');
        console.log('Result: ', await this.loadToStore(store, 'text/turtle',
            loadResult[1], 'https://purl.org/patternpedia/cloudcomputingpatterns').toPromise());
        console.log('LOADING https://purl.org/patternpedia/cloudcomputingpatterns/elasticinfrastructure to store');
        console.log('Result: ', await this.loadToStore(store, 'text/turtle',
            loadResult[2], 'https://purl.org/patternpedia/cloudcomputingpatterns/elasticinfrastructure').toPromise());
        console.log('LOADING https://purl.org/patternpedia/cloudcomputingpatterns/elasticloadbalancer to store');
        console.log('Result: ', await this.loadToStore(store, 'text/turtle',
            loadResult[3], 'https://purl.org/patternpedia/cloudcomputingpatterns/elasticloadbalancer').toPromise());
        console.log('LOADING https://purl.org/patternpedia/internetofthingspatterns to store');
        console.log('Result: ', await this.loadToStore(store, 'text/turtle',
            loadResult[4], 'https://purl.org/patternpedia/internetofthingspatterns').toPromise());
        // const triples = await this.exportGraphAsTriples(store, 'https://purl.org/patternpedia').toPromise();
        this.selectPatternGraphs(store);
        // this.loadGraph(store);
        // this.loadNode(store);
        // this.updateValue(store);
    }

    updateValue(store: any) {
        store.graph('https://purl.org/patternpedia/cloudcomputingpatterns/elasticloadbalancer', (err, graph) => {
            console.log(graph.toNT());
            console.log('---------------');
            graph.add(
                store.rdf.createTriple(
                    store.rdf.createNamedNode('https://purl.org/patternpedia/cloudcomputingpatterns/elasticloadbalancer#ElasticLoadBalancer'),
                    store.rdf.createNamedNode('https://purl.org/patternpedia/cloudcomputingpatterns#hasContext'),
                    store.rdf.createLiteral('This is the new Context')
                )
            );
            console.log(graph.toNT());
        });
    }

    loadGraph(store: any) {
        store.graph('https://purl.org/patternpedia/cloudcomputingpatterns/elasticloadbalancer', (err, result) => {
            console.log(result.toNT());
        });
    }

    loadNode(store: any) {
        store.node('https://purl.org/patternpedia/cloudcomputingpatterns/elasticloadbalancer#ElasticLoadBalancer',
            'https://purl.org/patternpedia/cloudcomputingpatterns/elasticloadbalancer', (err, result) => {
                console.log(result.toNT());
            });
    }

    selectPatternGraphs(store: any) {
        const mResult = new Map();
        const qry = `SELECT DISTINCT ?patterngraph ?type ?logo ?pattern
                             WHERE {
                                <https://purl.org/patternpedia#LinkedOpenPatterns> pp:containsPatternGraph ?patterngraph .
                                ?patterngraph a ?type .
                                ?patterngraph pp:containsPattern ?pattern .
                                ?patterngraph pp:hasLogo ?logo .
                                FILTER (?type != owl:NamedIndividual)
                              }
                    ORDER BY ?patterngraph`;
        store.execute(qry,
            [
                'https://purl.org/patternpedia',
                'https://purl.org/patternpedia/cloudcomputingpatterns'
            ],
            [],
            (err, result) => {
                console.log(JSON.stringify(result));
                // for (const entry of result) {
                //     mResult.set(entry.patterngraph.value, {name: entry.patterngraph.value});
                // }
            });
        // store.execute('SELECT * { ?s ?p ?o }',
        //     ['https://purl.org/patternpedia',
        //     'https://purl.org/patternpedia/cloudcomputingpatterns',
        //     'https://purl.org/patternpedia/cloudcomputingpatterns/elasticinfrastructure',
        //     'https://purl.org/patternpedia/cloudcomputingpatterns/elasticloadbalancer',
        //     'https://purl.org/patternpedia/internetofthingspatterns'],
        //     [],
        //     (err, result) => {
        //         console.log('-->', result);
        // });
        // store.execute(qry,
        //     ['https://purl.org/patternpedia'],
        //     [],
        //     (err, results) => {
        //         if (!err) {
        //             console.log('->', results);
        //         } else {
        //             console.error('X', err);
        //         }
        //     });
    }

    exportGraphAsTriples(store: any, graphIri: string): Observable<string> {
        return Observable.create(observer => {
            store.graph(graphIri, (err, result) => {
                if (!err) {
                    observer.next(result.toNT());
                    observer.complete();
                } else {
                    observer.error(err);
                }
            });
        });
    }

    loadToStore(store: any, mediaType: string, data: string, graphIri: string): Observable<number> {
        return Observable.create(observer => {
            store.load(mediaType, data, graphIri, (err, result) => {
                if (!err) {
                    observer.next(result);
                    observer.complete();
                } else {
                    observer.error(err);
                }
            });
        });
    }

    load(): Observable<any> {
        const observables = [
            this.http.get('assets/patternpedia.ttl', {responseType: 'text'}),
            this.http.get('assets/cloudcomputingpatterns/cloudcomputingpatterns.ttl', {responseType: 'text'}),
            this.http.get('assets/cloudcomputingpatterns/elasticinfrastructure.ttl', {responseType: 'text'}),
            this.http.get('assets/cloudcomputingpatterns/elasticloadbalancer.ttl', {responseType: 'text'}),
            this.http.get('assets/internetofthingspatterns/internetofthingspatterns.ttl', {responseType: 'text'})
        ];
        return forkJoin(observables);
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

}
