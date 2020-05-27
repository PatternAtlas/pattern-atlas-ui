import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UriConverter} from '../util/uri-converter';
import {MatDialog} from '@angular/material/dialog';
import {PatternLanguageService} from '../service/pattern-language.service';
import PatternLanguage from '../model/hal/pattern-language.model';
import {D3Service} from '../../graph/service/d3.service';
import {GraphDisplayComponent} from '../component/graph-display/graph-display.component';
import {EMPTY, forkJoin, Observable} from 'rxjs';
import {Embedded} from '../model/hal/embedded';
import {DirectedEdesResponse} from '../model/hal/directed-edes-response.interface';
import {switchMap, tap} from 'rxjs/operators';
import {UndirectedEdesResponse} from '../model/hal/undirected-edes-response.interface';
import {DirectedEdgeModel} from '../model/hal/directed-edge.model';
import {UndirectedEdgeModel} from '../model/hal/undirected-edge.model';
import {CreatePatternRelationComponent} from '../component/create-pattern-relation/create-pattern-relation.component';
import {PatternRelationDescriptorService} from '../service/pattern-relation-descriptor.service';
import {ToasterService} from 'angular2-toaster';
import {PatternService} from '../service/pattern.service';
import Pattern from '../model/hal/pattern.model';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'pp-default-pl-renderer',
  templateUrl: './default-pl-renderer.component.html',
  styleUrls: ['./default-pl-renderer.component.scss']
})
export class DefaultPlRendererComponent implements OnInit {
    patterns: Array<Pattern> = [];
    patternsForCardsView: Array<Pattern> = [];
    patternLanguage: PatternLanguage;
    patternLanguageId: string;
    @ViewChild('graphWrapper') graph: ElementRef;
    @ViewChild('cardsView') cardsView: ElementRef;
    @ViewChild('searchField') searchField: ElementRef;
    @ViewChild(GraphDisplayComponent, {static: false}) graphDisplayComponent: GraphDisplayComponent;
    @ViewChild('displayPLContainer', {read: ViewContainerRef}) loadRenderer;
    graphVisible = false;
    isLoadingPatternData = true;
    isLoadingLinkData = true;
    toggleBeforeDataLoaded = false;
    filter: FormControl;
    private directedPatternRelations: Array<DirectedEdgeModel> = [];
    private undirectedPatternRelations: Array<UndirectedEdgeModel> = [];
    private patternLinks: Array<UndirectedEdgeModel | DirectedEdgeModel>;

    constructor(private activatedRoute: ActivatedRoute,
                private cdr: ChangeDetectorRef,
                private dialog: MatDialog,
                private patternLanguageService: PatternLanguageService,
                private patternService: PatternService,
                private patternRelationDescriptorService: PatternRelationDescriptorService,
                private d3Service: D3Service,
                private router: Router,
                private componentFactoryResolver: ComponentFactoryResolver,
                private toasterService: ToasterService) {
    }

    ngOnInit() {
      this.loadData();
      this.filter = new FormControl('');
      this.filter.valueChanges.subscribe((filterText: string) => {
        if (this.graphVisible || !this.patterns || this.patterns.length === 0) {
          return;
        }
        this.patternsForCardsView = this.patterns.filter(pattern => pattern.name.toLowerCase().includes(filterText.toLowerCase()));
      });
    }

    detectChanges() {
      this.cdr.detectChanges();
    }

    getPatternLinks(): Observable<any> {
      const $getDirectedEdges = this.getDirectedEdges();
      const $getUndirectedEdges = this.getUndirectedEdges();
      return forkJoin([$getDirectedEdges, $getUndirectedEdges]).pipe(
        tap((edges) => {
          this.patternLinks = [];
          this.patternLinks.push(...this.directedPatternRelations);
          this.patternLinks.push(...this.undirectedPatternRelations);
        }));
    }

    public addPattern(): void {
      this.router.navigate(['create-patterns'], {relativeTo: this.activatedRoute});
    }

    public addLink() {
      // Todo: Make patternlanguage camelcase
      const dialogRef = this.dialog.open(CreatePatternRelationComponent, {
        data: {
          patterns: this.patterns,
          patternlanguage: this.patternLanguage
        }
      });
      dialogRef.afterClosed().pipe(
        switchMap((edge) => {
          return edge ? this.insertEdge(edge) : EMPTY;
        })).subscribe(res => {
        if (res) {
          this.toasterService.pop('success', 'Added Relation');
          this.detectChanges();
        }
      });
    }

    insertEdge(edge): Observable<any> {
      return this.patternRelationDescriptorService.addRelationToPL(this.patternLanguage, edge).pipe(
        tap((res) => res ? this.getPatternByLink(edge, res) : EMPTY));
    }

    getPatternByLink(edge: DirectedEdgeModel | UndirectedEdgeModel, res: any) {
      const url = res.url + '/' + res.body.id;
      this.patternRelationDescriptorService.getEdgeByUrl(url, edge)
        .subscribe(
          edgeResult => {
            this.patternLinks.push(edgeResult);
          }
        );
    }

    linkAddedInGraphEditor(edge) {
      this.insertEdge(edge).subscribe(res => {
        this.toasterService.pop('success', 'Added Relation');
        this.graphDisplayComponent.updateSideMenu();
        this.detectChanges();
      });
    }

    reloadGraph() {
      this.graphDisplayComponent.reformatGraph();
    }

    setGraphVisible(newValueGraphVisible: boolean) {
      if (newValueGraphVisible) { // reset the search field so all patterns are shown in the graph
        this.filter.setValue('');
      }
      this.graphVisible = newValueGraphVisible;
      // if user toggled to early, we will retrigger
      this.toggleBeforeDataLoaded = this.isLoadingLinkData && this.isLoadingPatternData;
    }

    private loadData(): void {
      this.isLoadingPatternData = true;
      this.patternLanguageId = UriConverter.doubleDecodeUri(this.activatedRoute.snapshot.paramMap.get('patternLanguageId'));
      if (this.patternLanguageId) {
        this.patternLanguageService.getPatternLanguageByID(this.patternLanguageId)
          .pipe(
            tap(patternlanguage => this.patternLanguage = patternlanguage),
            switchMap(() => this.loadPatterns()),
            switchMap(() => this.getPatternLinks())
          ).subscribe(() => {
            this.isLoadingLinkData = false;
            this.detectChanges();
          });
      }
    }

    private getDirectedEdges(): Observable<Embedded<DirectedEdesResponse>> {
      if (!this.patternLanguage) {
        return EMPTY;
      }
      return this.patternLanguageService.getDirectedEdges(this.patternLanguage).pipe(
        tap((edges) => {
          this.directedPatternRelations = edges._embedded ? edges._embedded.directedEdgeModels : [];
        }));
    }

    private getUndirectedEdges(): Observable<Embedded<UndirectedEdesResponse>> {
      if (!this.patternLanguage) {
        return EMPTY;
      }
      return this.patternLanguageService.getUndirectedEdges(this.patternLanguage).pipe(
        tap((edges) => {
          this.undirectedPatternRelations = edges._embedded ? edges._embedded.undirectedEdgeModels : [];
        }));
    }

    private loadPatterns(): Observable<any[]> {
      return this.patternService.getPatternsByUrl(this.patternLanguage._links.patterns.href).pipe(
        tap(patterns => {
          this.patterns = patterns;
          this.patternsForCardsView = this.patterns;
          this.isLoadingPatternData = false;
        }));
    }
}
