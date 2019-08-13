import { Injectable } from '@angular/core';
import CloudComputingPattern from '../model/cloud-computing-pattern';
import Writer from '../../../../core/model/writer';
import { PatternOntologyService } from '../../../../core/service/pattern-ontology.service';
import { IriConverter } from '../../../../core/util/iri-converter';

@Injectable({
    providedIn: 'root'
})
export class CloudComputingPatternsWriterService extends Writer<CloudComputingPattern> {

    constructor(private pos: PatternOntologyService) {
        super('https://purl.org/patternpedia/cloudcomputingpatterns#CloudComputingPatterns', pos);
    }

    async writePatternToStore(pattern: CloudComputingPattern): Promise<void> {
        return new Promise(async (resolve, reject) => {
            // const graphUri = IriConverter.getFileName(pattern.iri);
            // const graph = await this.getGraph(graphUri);
            // console.log(JSON.stringify(graph));
            // graph.triples = pattern.toRdfModelTriples();
            // graph.length = graph.triples.length;
            // try {
            //     await this.clearStore(graphUri);
            //     await this.insertIntoStore(graph, graphUri);
                resolve();
            // } catch (err) {
            //     reject(err);
            // }
        });
    }

    getGraph(graphUri: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.pos.store.graph(graphUri, (err, graph) => {
                if (!err) {
                    resolve(graph);
                } else {
                    reject(err);
                }
            });
        });
    }

    insertIntoStore(graph: any, graphUri: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.pos.store.insert(graph, graphUri, (err) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    clearStore(graphUri): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.pos.store.clear(graphUri, (err) => {
                if (err) {
                    console.error(err);
                    reject(false);
                } else {
                    resolve(true);
                }
            });
        });
    }
}
