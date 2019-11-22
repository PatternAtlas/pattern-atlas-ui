import {ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, ElementRef, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UriConverter} from '../util/uri-converter';
import {MatDialog} from '@angular/material';
import Pattern from '../model/pattern.model';
import {PatternLanguageService} from '../service/pattern-language.service';
import PatternLanguage from '../model/hal/pattern-language.model';
import {D3Service} from '../../graph/service/d3.service';
import {CardrendererComponent} from '../component/cardrenderer/cardrenderer.component';
import {GraphDisplayComponent} from '../component/graph-display/graph-display.component';
import {EMPTY, forkJoin, Observable, Subscription} from 'rxjs';
import {Embedded} from '../model/hal/embedded';
import {DirectedEdesResponse} from '../model/hal/directed-edes-response.interface';
import {switchMap, tap} from 'rxjs/operators';
import {UndirectedEdesResponse} from '../model/hal/undirected-edes-response.interface';
import {DirectedEdge} from '../model/hal/directed-edge.model';
import {UndirectedEdge} from '../model/hal/undirected-edge.model';
import * as _ from 'lodash';
import {CreatePatternRelationComponent} from '../component/create-pattern-relation/create-pattern-relation.component';
import {PatternRelationDescriptorService} from '../service/pattern-relation-descriptor.service';
import {ToasterService} from 'angular2-toaster';

@Component({
    selector: 'pp-default-pl-renderer',
    templateUrl: './default-pl-renderer.component.html',
    styleUrls: ['./default-pl-renderer.component.scss']
})
export class DefaultPlRendererComponent implements OnInit, OnDestroy {


    patterns: Pattern[] = [];
    patternLanguage: PatternLanguage;
    isLoading = true;
    patternLanguageURI: string;
    @ViewChild('graphWrapper') graph: ElementRef;
    @ViewChild('cardsView') cardsView: ElementRef;
    @ViewChild('displayPLContainer', {read: ViewContainerRef}) loadRenderer;
    rendererComponentInstance: GraphDisplayComponent | CardrendererComponent;
    graphVisible = true;
    isLoadingDataForRenderer: boolean;
    private componentRef: ComponentRef<any>;
    private cardcomponentSubscription: Subscription;
    private directedPatternRelations: DirectedEdge[] = [];
    private undirectedPatternRelations: UndirectedEdge[] = [];
    private copyEdgesForSimulation = [];


    constructor(private activatedRoute: ActivatedRoute,
                private cdr: ChangeDetectorRef,
                private dialog: MatDialog,
                private patternLanguageService: PatternLanguageService,
                private patternRelationDescriptorService: PatternRelationDescriptorService,
                private d3Service: D3Service,
                private router: Router,
                private componentFactoryResolver: ComponentFactoryResolver,
                private toasterService: ToasterService) {
    }

    ngOnInit() {
        this.loadData();
    }


    private loadData(): void {
        this.isLoadingDataForRenderer = true;
        this.patternLanguageURI = UriConverter.doubleDecodeUri(this.activatedRoute.snapshot.paramMap.get('patternLanguageUri'));
        if (this.patternLanguageURI) {
            this.patternLanguageService.getPatternLanguageByEncodedUri(this.patternLanguageURI).pipe(
                tap(patternlanguage => this.patternLanguage = patternlanguage),
                switchMap(() => this.retrievePatterRelationDescriptorData())).subscribe(
                () => {
                    this.isLoading = false;
                    this.loadRendererForData();
                });


        }
    }

    private initGraph(graphRenderComponent: GraphDisplayComponent = null): void {
        if (this.patternLanguage.patterns.length === 0) {
            return;
        }

        let links = [];
        links = links.concat(this.undirectedPatternRelations);
        links = links.concat(this.directedPatternRelations);
        this.copyEdgesForSimulation = _.clone(links);
        if (graphRenderComponent) {
            graphRenderComponent.data = {patterns: this.patternLanguage.patterns, edges: links, copyOfLinks: this.copyEdgesForSimulation};
            this.isLoadingDataForRenderer = false;
        }


    }

    private getDirectededges(): Observable<Embedded<DirectedEdesResponse>> {
        if (!this.patternLanguage) {
            return EMPTY;
        }
        return this.patternLanguageService.getDirectedEdges(this.patternLanguage).pipe(
            tap((edges) => {
                this.directedPatternRelations = edges._embedded ? edges._embedded.directedEdges : [];
            }));
    }

    private getUndirectededges(): Observable<Embedded<UndirectedEdesResponse>> {
        if (!this.patternLanguage) {
            return EMPTY;
        }
        return this.patternLanguageService.getUndirectedEdges(this.patternLanguage).pipe(
            tap((edges) => {
                this.undirectedPatternRelations = edges._embedded ? edges._embedded.undirectedEdges : [];
            }));
    }


    detectChanges() {
        this.cdr.detectChanges();
    }

    retrievePatterRelationDescriptorData(): Observable<any> {
        const $getDirectedEdges = this.getDirectededges();
        const $getUndirectedEdges = this.getUndirectededges();
        return forkJoin($getDirectedEdges, $getUndirectedEdges);
    }


    toggleRendereringComponent(value: boolean) {
        this.graphVisible = value;
        if (this.cardcomponentSubscription) {
            this.cardcomponentSubscription.unsubscribe();
        }
        this.loadRendererForData();
    }

    reloadCurrentRenderingComponent() {
        this.toggleRendereringComponent(this.graphVisible);
    }

    loadRendererForData() {
        this.isLoadingDataForRenderer = true;
        const componentFactory = this.graphVisible ? this.componentFactoryResolver.resolveComponentFactory(GraphDisplayComponent) :
            this.componentFactoryResolver.resolveComponentFactory(CardrendererComponent);

        const viewContainerRef = this.loadRenderer;
        viewContainerRef.clear();

        this.componentRef = viewContainerRef.createComponent(componentFactory);
        const componentInstance = this.componentRef.instance;
        this.rendererComponentInstance = componentInstance;

        if (componentInstance instanceof CardrendererComponent) {
            (<CardrendererComponent>componentInstance).uriEntities = this.patternLanguage.patterns;
            this.cardcomponentSubscription = (<CardrendererComponent>componentInstance).createEntityClicked.subscribe(() => this.router.navigate(['create-patterns'],
                {relativeTo: this.activatedRoute}));
            this.isLoadingDataForRenderer = false;
        }

        if (componentInstance instanceof GraphDisplayComponent) {
            this.initGraph(<GraphDisplayComponent>componentInstance);
        }
    }


    createLink() {
        const dialogRef = this.dialog.open(CreatePatternRelationComponent, {
            data: {
                patterns: this.patternLanguage.patterns,
                patternlanguage: this.patternLanguage
            }
        });

        dialogRef.afterClosed().pipe(
            switchMap((edge) => {
                const url = edge instanceof DirectedEdge ? this.patternLanguage._links.directedEdges.href : this.patternLanguage._links.undirectedEdges.href;
                return edge ? this.patternRelationDescriptorService.savePatternRelation(url, edge) : EMPTY;
            }),
            switchMap((res) => res ? this.retrievePatterRelationDescriptorData() : EMPTY))
            .subscribe(res => {
                if (res) {
                    this.toasterService.pop('success', 'Added relation');
                    if (this.graphVisible) {
                        this.reloadCurrentRenderingComponent();
                    }
                }
            });
    }

    ngOnDestroy(): void {
        if (this.cardcomponentSubscription) {
            this.cardcomponentSubscription.unsubscribe();
        }
    }
}



