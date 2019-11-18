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
import {Subscription} from 'rxjs';

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
  private nodes: any[];
  graphVisible: boolean;
  isLoadingDataForRenderer: boolean;
  private componentRef: ComponentRef<any>;
  private cardcomponentSubscription: Subscription;



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
      this.patternLanguageService.getPatternLanguageByEncodedUri(this.patternLanguageURI).subscribe(
        (patternlanguage) => {
          this.patternLanguage = patternlanguage;
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
        id: i,
        title: this.patternLanguage.patterns[i].name,
        type: 'red',
        x: 0,
        y: 0
      };
      nodes.push(node);


    }
    const networkGraph = this.d3Service.getNetworkGraph(nodes, [], {width: 1450, height: 600});
    networkGraph.ticker.subscribe((d: any) => {
      this.nodes = networkGraph.nodes;
      if (graphRenderComponent) {
        graphRenderComponent.nodes = this.nodes;
        this.isLoadingDataForRenderer = false;
      }
      this.cdr.markForCheck();
    });

  }

  detectChanges() {
    this.cdr.detectChanges();
  }


  onToggle(value: boolean) {
    this.graphVisible = value;
    if(this.cardcomponentSubscription){
      this.cardcomponentSubscription.unsubscribe();
    }
    if(this.rendererComponentInstance instanceof GraphDisplayComponent){
        (<GraphDisplayComponent> this.rendererComponentInstance).clear();
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
      if(!this.nodes){
        this.initGraph();
      }
    }

    if (componentInstance instanceof GraphDisplayComponent) {
      if (this.nodes) {
        (<GraphDisplayComponent>componentInstance).nodes = this.nodes;
        this.isLoadingDataForRenderer = false;
      } else {
        this.initGraph(<GraphDisplayComponent>componentInstance);
      }

    }
  }
}
