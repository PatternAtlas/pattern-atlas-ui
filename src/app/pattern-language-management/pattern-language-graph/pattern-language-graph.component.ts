import { Component, NgZone, OnInit } from '@angular/core';
import { Link, Node } from 'src/app/graph/model';
import { Router } from '@angular/router';

@Component({
    selector: 'pp-pattern-language-graph',
    templateUrl: './pattern-language-graph.component.html',
    styleUrls: ['./pattern-language-graph.component.scss']
})
export class PatternLanguageGraphComponent implements OnInit {

    data: { nodes: Node[], links: Link[] };

    private nodes: Node[];
    private links: Link[];

    constructor(
        private zone: NgZone,
        private router: Router) {
    }

    private async loadData(): Promise<void> {
        // load patternpedia
        return null;
      //   return this.pos.loadUrisToStore([{value: 'https://purl.org/patternpedia'}])
      //
      //   // load language-base-files
      //   // we first need a query to get all defined languages
      //       .then(() => {
      //           const langsQry = `SELECT ?lang
      //   WHERE {
      //     pp:LinkedOpenPatterns pp:containsPatternGraph ?lang .
      //   }`;
      //           return this.pos.exec(langsQry, ['https://purl.org/patternpedia']);
      //       })
      //       .then(langs => {
      //           const uris = [];
      //           for (const l of langs) {
      //               uris.push({value: UriConverter.getFileName(l.lang.value)});
      //           }
      //
      //           return this.pos.loadUrisToStore(uris);
      //       })
      //
      //       // load view-base-files
      //       // we need all defined languages as graph for the query to get all views
      //       .then(() => {
      //           const langsQry = `SELECT ?lang
      //   WHERE {
      //     pp:LinkedOpenPatterns pp:containsPatternGraph ?lang .
      //   }`;
      //           return this.pos.exec(langsQry, ['https://purl.org/patternpedia']);
      //       })
      //       .then(langs => {
      //           const graphs = ['https://purl.org/patternpedia'];
      //           for (const l of langs) {
      //               graphs.push(UriConverter.getFileName(l.lang.value));
      //           }
      //
      //           const viewsQry = `SELECT ?view
      // WHERE {
      //   pp:LinkedOpenPatterns pp:containsPatternGraph ?lang .
      //   ?lang pp:referredByView ?view .
      // }`;
      //           return this.pos.exec(viewsQry, graphs);
      //       })
      //       .then(views => {
      //           const uris = [];
      //           for (const v of views) {
      //               uris.push({value: UriConverter.getFileName(v.view.value)});
      //           }
      //
      //           return this.pos.loadUrisToStore(uris);
      //       });
    }

    ngOnInit() {
        // load all neccessairy data first: patternpedia, all language-base-files, and all view-base-files
        this.loadData()
        // get data
            .then(() => {
                return Promise.all([
                    // this.nodeLoader.loadContentFromStore(),
                    // this.linkLoader.loadContentFromStore()
                ]);
            })
            // set data
            .then(values => {
                this.nodes = Array.from(values[0].values());
                this.links = Array.from(values[1].values());

                this.data = {
                    nodes: this.nodes,
                    links: this.links
                };
            });
    }

    selectNode(languageId: string) {
        console.log(`Selected: ${languageId}`);
        // navigate to the language
        this.zone.run(() => {
            this.router.navigate(['/patternlanguages', languageId]);
        });
    }

}
