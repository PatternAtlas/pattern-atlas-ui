import {ActivatedRoute, Router} from '@angular/router';
import {FilterFactoryService} from 'src/app/filter/service/filter-factory.service';
import {UriConverter} from 'src/app/core/util/uri-converter';
import {ChangeDetectorRef, Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {PatternRenderingComponentInterface} from 'src/app/core/model/pattern-rendering-component.interface';
import {Link, Node, NodeInfo, Pattern} from '../../model';
import {FilterViewComponent} from 'src/app/filter/component/filter-view/filter-view.component';
import * as d3 from 'd3';
import { MatDialog } from '@angular/material/dialog';
import LinkData from '../../model/link-data';

@Component({
    selector: 'pp-pattern-graph-template',
    templateUrl: './pattern-graph-template.component.html',
    styleUrls: ['./pattern-graph-template.component.scss']
})
export class PatternGraphTemplateComponent<T extends Pattern> implements PatternRenderingComponentInterface, OnInit {

    // the loader the loads ALL patterns of a specific language
    patternLoader = null;
    // the uri of the language in form of <language#Language>
    languageUri = '';
    // the name of the language that will be displayed
    languageName = '';

    // id of the patterns that is currently selected. We use the Network-Graph for displaying individual patterns too. Via Infobox.
    pId: string;

    all_data: Array<T>;
    groups: any;

    data: { nodes: Node[], links: Link[], id?: string };

    patternMap: Map<string, any>;
    linkMap: Map<string, Link>;

    nodes: Node[];
    links: Link[];

    @ViewChild('graph') graph;

    constructor(
        public dialog: MatDialog,
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public zone: NgZone,
        public filterFactory: FilterFactoryService,
        public cdr: ChangeDetectorRef) {
    }

    createPattern(value: any): T {
        return null;
    }

    extractSummary(value: any): string {
        return '';
    }

    private async loadPatternData(): Promise<void> {
        const uri = UriConverter.getFileName(this.languageUri);

        // we cut the patternlanguage of the set supportedIRI to create the uris of the patterns and relations file
        const index = uri.lastIndexOf('/') + 1;

        const base = uri;
        const p = `${uri}/${uri.substr(index)}-Patterns`;
        const r = `${uri}/${uri.substr(index)}-Relations`;
        return null;
        // return this.pos.loadUrisToStore([{ value: 'https://purl.org/patternpedia'}])
        //   .then(() => {
        //     // load base file
        //     console.log('load base file');
        //     return this.pos.loadUrisToStore([{ value: base }]);
        //   })
        //   .then(() => {
        //     // load patterns and relations
        //     console.log('load patterns and relations');
        //     return this.pos.loadUrisToStore([{ value: p }, { value: r }]);
        //   })
        //   .then(() => {
        //     // get all views
        //     console.log('get all views');
        //     return this.loader.loadViews(this.languageUri);
        //   })
        //   .then(views => {
        //     // load all views and their relations
        //     console.log('load all views and their relations');
        //     const viewBase = [];
        //     const viewRelation = [];
        //     for (const v of views) {
        //       const uri = UriConverter.getFileName(v);
        //
        //       viewBase.push({ value: uri });
        //
        //       const relation = `${uri}/${uri.substr(uri.lastIndexOf('/') + 1)}-Relations`;
        //       viewRelation.push({ value: relation });
        //     }
        //
        //     return Promise.all([
        //       this.pos.loadUrisToStore(viewBase),
        //       this.pos.loadUrisToStore(viewRelation)
        //     ]);
        //   })
        //   .then(() => {
        //     // get all neighbour languages
        //     console.log('get all neighbour languages');
        //     return this.loader.loadReferredLanguages(this.languageUri);
        //   })
        //   .then(languages => {
        //     // load all base, patterns and relation files from the neighbour languages
        //     console.log('load all base, patterns and relation files from the neighbour languages');
        //     const uris = [];
        //     for (const l of languages) {
        //       const uri = UriConverter.getFileName(l);
        //
        //       const base = uri;
        //       const p = `${uri}/${uri.substr(index)}-Patterns`;
        //       const r = `${uri}/${uri.substr(index)}-Relations`;
        //
        //       uris.push({ value: base });
        //       uris.push({ value: p });
        //       uris.push({ value: r });
        //     }
        //     return this.pos.loadUrisToStore(uris);
        //   });
    }

    ngOnInit() {
        // load patterns data manually
        // this.loadPatternData().then(() => {
        //     // other data will be loaded indirectly via PatternDataLoaderService
        //     Promise.all([this.patternLoader.loadContentFromStore(),
        //         this.loader.loadDirectedLinks(this.languageUri),
        //         this.loader.loadGroups(this.languageUri),
        //         this.loader.loadPatternClrs(this.languageUri)
        //     ]).then(values => {
        //         this.patternMap = values[0];
        //         this.linkMap = values[1];
        //         const groupMap = values[2];
        //         const patternClrs = values[3];
        //
        //         // collect all data
        //         const links = Array.from(this.linkMap.values());
        //         this.all_data = [];
        //
        //         this.patternMap.forEach((value) => {
        //             const p = this.createPattern(value);
        //
        //             p.relations = new Array<PatternRelation>();
        //             // if there is an entry for this patterns in the map, it has clrs
        //             p.hasClrs = patternClrs.has(UriConverter.doubleDecodeUri(p.id));
        //
        //             // all links that have the current node either as source or target
        //             const relations = links.filter(l => {
        //                 const s = (l.source instanceof Node) ? l.source.id : l.source;
        //                 const t = (l.target instanceof Node) ? l.target.id : l.target;
        //
        //                 return s === p.id || t === p.id;
        //             });
        //
        //             relations.forEach(r => {
        //                 const relation = new PatternRelation();
        //                 relation.id = r.id;
        //                 relation.sourceId = (r.source instanceof Node) ? r.source.id : '' + r.source;
        //                 relation.targetId = (r.target instanceof Node) ? r.target.id : '' + r.target;
        //                 relation.weight = r.weight;
        //                 relation.description = r.description;
        //                 relation.isCLR = false;
        //
        //                 p.relations.push(relation);
        //             });
        //
        //             this.all_data.push(p);
        //         });
        //
        //         // groups
        //         this.groups = {};
        //         groupMap.forEach(value => {
        //             this.groups[value.groupName] = value.patterns;
        //         });
        //
        //         this.data = this.transformGraphData(this.all_data);
        //         this.nodes = this.data.nodes;
        //         this.links = this.data.links;
        //         this.cdr.detectChanges();
        //
        //         this.filterAllData();
        //     });
        // });
    }

    private groupOf(patternId: string) {
        return Object.keys(this.groups).find(groupName => this.groups[groupName].includes(patternId));
    }

    private getColorFunction() {
        // for coloring of nodes
        const groupIds = Array.from(Object.keys(this.groups));
        const scale = d3.scaleOrdinal(d3.schemeCategory10);
        const color = function (d: any) {
            if (d) {
                return scale('' + groupIds.indexOf(d));
            }
            return scale('0');
        };
        return color;
    }

    private transformGraphData(data: Array<Pattern>): { nodes: Node[], links: Link[], id?: string } {
        const color = this.getColorFunction();

        const nodes = new Array<Node>();
        const links = new Array<Link>();

        for (const p of data) {
            const n = new Node(p.id);
            n.name = p.name;

            const g = this.groupOf(p.id);
            n.color = color(g);

            nodes.push(n);

            for (const r of p.relations) {
                const l = new Link(
                    r.sourceId,
                    r.targetId,
                    r.weight,
                    r.description
                );
                links.push(l);
            }
        }

        const result = {
            nodes: nodes,
            links: links,
            id: this.pId
        };
        return result;
    }

    private checkIfInList(nodeId: string): boolean {
        const node = this.data.nodes.find(i => i.id === nodeId);
        return Boolean(node);
    }

    // called when a node from the network graph was selected
    async selectNode(nodeId: string) {
        console.log(`Selected [${nodeId}] from the graph`);

        if (this.data.nodes && !this.checkIfInList(nodeId)) {
            // given id is from another language!
            // determine language, and navigate to it
            const pattern = UriConverter.doubleDecodeUri(nodeId);
            const language = UriConverter.getFileName(pattern);

            // implement langauge loader
            // const languageUri = await this.loader.loadLanguage(language);
            // const languageId = UriConverter.doubleEncodeUri(Array.from(languageUri.values())[0]);

            // const route = `patternlanguages/${languageId}/${nodeId}`;
            // this.zone.run(() => {
            //     this.router.navigate(['/patternlanguages', languageId, nodeId]);
            //     // changing the route will not trigger the change of the view!
            //     this.cdr.markForCheck();
            // });

            // console.log('Routing to: ' + route);

            return;
        }

        // should not be relative, as we might click multiple nodes!
        this.zone.run(() => {
            const route = this.pId ? ['..', nodeId] : [nodeId];
            this.router.navigate(route, {relativeTo: this.activatedRoute});
        });
    }

    // called when a node was unselected i.e. when clicked somewhere else
    unselectNode() {
        // TODO navigate back to language level
    }

    navigateBack(): void {
        this.zone.run(() => {
            this.router.navigate(['..'], {relativeTo: this.activatedRoute});
        });
    }

    openFilterDialog() {
        const dialogRef = this.dialog.open(FilterViewComponent, {
            width: '600px',
            data: UriConverter.getFileName(this.languageUri)
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.filterAllData();
            }
        });
    }

    private filterAllData() {
        this.filterFactory.createFilter(UriConverter.getFileName(this.languageUri)).then(filter => {
            const filtered = filter.filterPatterns(this.all_data);
            const all = this.all_data.map(p => p.id);
            const keep = filtered.map(p => p.id);

            const filterIds = all.filter(id => !keep.includes(id));

            if (this.graph) {
                this.graph.filterNodes(filterIds);
            }
        });
    }

    /**
     * This closure returns the nodeinfo from the loader.
     * Important: It has to be a closure to use 'this' correctly, otherwise it won't work.
     * Refer to this: https://stackoverflow.com/a/39981813
     * Thank you Isaac
     */
    getNodeInfo = async (id: string): Promise<NodeInfo> => {
        const uri = UriConverter.doubleDecodeUri(id);


        // let pattern;
        // let outgoing;
        // let incoming;
        // let clrs;
        //
        // let start;
        // let millis;

        // await this.patternLoader.loadContentFromStore()
        //     .then(v => {
        //         // load patterns data: 1860ms
        //         pattern = v.get(uri);
        //         return this.loader.loadOutgoingLinks(this.languageUri, uri);
        //     })
        //     .then(v => {
        //         // load outgoing link data: 372ms
        //         outgoing = Array.from(v.values());
        //         return this.loader.loadIncomingLinks(this.languageUri, uri);
        //     })
        //     .then(v => {
        //         // load incoming link data: 270ms
        //         incoming = Array.from(v.values());
        //
        //         start = Date.now();
        //         return this.loader.loadCLRs(this.languageUri, uri);
        //     })
        //     .then(v => {
        //         // load clr data: 46988ms this takes ages!!
        //         clrs = Array.from(v.values());
        //
        //         millis = Date.now() - start;
        //         console.log(`Load CLRs: ${millis}ms`);
        //     });

        const info = new NodeInfo();
        // info.name = pattern.name;
        // info.group = this.groupOf(pattern.id);
        //
        // info.summary = this.extractSummary(pattern); // patterns.intent.value;
        //
        // info.languageRelations = [
        //     {
        //         languageId: UriConverter.getFileName(this.languageUri), // 'https//purl.org/patternpedia/patternlanguages/cloudcomputingpatterns',
        //         languageName: this.languageName, // 'Cloud Computing Patterns',
        //         relations: outgoing.concat(incoming)
        //     }
        // ];
        //
        // clrs.forEach(lr => info.languageRelations.push(lr));

        return Promise.resolve(info);
    }

    /**
     * Returns loaded Link data for the given link Id.
     */
    getLinkInfo = async (id: string): Promise<LinkData> => {
        const uri = UriConverter.doubleDecodeUri(id);
        // const links = await this.loader.loadLink(this.languageUri, uri);

        // const data = links.get(uri);
        return null;
    }
}
