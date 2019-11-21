import {ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, ElementRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
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
import {NetworkLink} from '../model/network-link.interface';
import * as _ from 'lodash';

@Component({
  selector: 'pp-default-pl-renderer',
  templateUrl: './default-pl-renderer.component.html',
  styleUrls: ['./default-pl-renderer.component.scss']
})
export class DefaultPlRendererComponent implements OnInit {

  patterns: Pattern[] = [];
  patternLanguage: PatternLanguage;
  isLoading = true;
  patternLanguageURI: string;
  @ViewChild('graphWrapper') graph: ElementRef;
  @ViewChild('cardsView') cardsView: ElementRef;
  @ViewChild('displayPLContainer', {read: ViewContainerRef}) loadRenderer;
  rendererComponentInstance: GraphDisplayComponent | CardrendererComponent;
  private simulationResult: any;
  graphVisible = true;
  isLoadingDataForRenderer: boolean;
  private componentRef: ComponentRef<any>;
  private cardcomponentSubscription: Subscription;
  private directedPatternRelations: DirectedEdge[] = [];
  private undirectedPatternRelations: UndirectedEdge[] = [];
  private edgesForSimulation = [];
  private copyEdgesForSimulation = [];
  private nodesForSimulation = [];


  constructor(private activatedRoute: ActivatedRoute,
              private cdr: ChangeDetectorRef,
              private dialog: MatDialog,
              private patternLanguageService: PatternLanguageService,
              private d3Service: D3Service,
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver) {
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
    const nodes = [];
    for (let i = 0; i < this.patternLanguage.patterns.length; i++) {

      const node = {
        id: this.patternLanguage.patterns[i].id,
        title: this.patternLanguage.patterns[i].name,
        type: 'red',
        x: 0,
        y: 0
      };
      nodes.push(node);
    }
    let links = [];
    links = links.concat(this.undirectedPatternRelations);
    links = links.concat(this.directedPatternRelations);
    this.nodesForSimulation = links;
    this.edgesForSimulation = this.mapPatternLinksToEdges(links);
    this.copyEdgesForSimulation = _.clone(this.mapPatternLinksToEdges(links));
    if (graphRenderComponent) {
      graphRenderComponent.data = {nodes: nodes, links: this.edgesForSimulation, copyOfLinks: this.copyEdgesForSimulation};
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


  onToggle(value: boolean) {
    this.graphVisible = value;
    if (this.cardcomponentSubscription) {
      this.cardcomponentSubscription.unsubscribe();
    }
    if (this.rendererComponentInstance instanceof GraphDisplayComponent) {
      (<GraphDisplayComponent>this.rendererComponentInstance).clear();
    }

    this.loadRendererForData();
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

  private mapPatternLinksToEdges(links: any[]): NetworkLink[] {
    const edges = [];
    for (let i = 0; i < links.length; i++) {
      const currentlink = links[i];
      if (currentlink.source) {
// markers: [
//                     {template: 'arrow', positionOnLine: 1, scale: 0.5, relativeRotation: 0, clickEventKey: 'HelloWorld'},
        edges.push({
          'source': currentlink.source.id, 'target': currentlink.target.id,
          'markers': [
            {template: 'arrow', positionOnLine: 1, scale: 0.5, relativeRotation: 0, clickEventKey: 'HelloWorld'}
          ]
        });
      } else { // undirected link
        edges.push(<NetworkLink>{'source': currentlink.p1.id, 'target': currentlink.p2.id});
        edges.push(<NetworkLink>{'source': currentlink.p2.id, 'target': currentlink.p1.id});
      }
    }
    return edges;
  }
}

