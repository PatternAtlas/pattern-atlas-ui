import {
  AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { PatternPropertyDirective } from '../component/markdown-content-container/pattern-property.directive';
import { MatDialog } from '@angular/material/dialog';
import { CreatePatternRelationComponent } from '../component/create-pattern-relation/create-pattern-relation.component';
import Pattern from '../model/hal/pattern.model';
import { PatternLanguageService } from '../service/pattern-language.service';
import PatternLanguage from '../model/hal/pattern-language.model';
import { PatternService } from '../service/pattern.service';
import { MarkdownPatternSectionContentComponent } from '../component/markdown-content-container/markdown-pattern-sectioncontent/markdown-pattern-section-content.component'; // eslint-disable-line max-len
import { DataChange } from '../component/markdown-content-container/interfaces/DataRenderingComponent.interface';
import PatternSectionSchema from '../model/hal/pattern-section-schema.model';
import { map, switchMap, tap } from 'rxjs/operators';
import { EMPTY, forkJoin, Observable, Subscription } from 'rxjs';
import { PatternRelationDescriptorService } from '../service/pattern-relation-descriptor.service';
import { DirectedEdgeModel } from '../model/hal/directed-edge.model';
import { Embedded } from '../model/hal/embedded';
import { DirectedEdesResponse } from '../model/hal/directed-edes-response.interface';
import { UndirectedEdgesResponse } from '../model/hal/undirected-edes-response.interface';
import { UndirectedEdgeModel } from '../model/hal/undirected-edge.model';
import { globals } from '../../globals';
import { UriConverter } from '../util/uri-converter';
import { EditUrlDialogComponent } from '../component/edit-url-dialog/edit-url-dialog.component';
import {
  PatternAtlasUiRepositoryConfigurationService, UiFeatures
} from '../directives/pattern-atlas-ui-repository-configuration.service';
import { PrivilegeService } from '../../authentication/_services/privilege.service';

@Component({
  selector: 'pp-default-pattern-renderer',
  templateUrl: './default-pattern-renderer.component.html',
  styleUrls: ['./default-pattern-renderer.component.scss']
})
export class DefaultPatternRendererComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild(PatternPropertyDirective) ppPatternProperty: PatternPropertyDirective;
  isLoading = true;
  isLoadingLinks = true;
  isEditingEnabled = false;
  patternLanguage: PatternLanguage;
  pattern: Pattern;
  patterns: Array<Pattern>;
  directedPatternRelations: Array<DirectedEdgeModel>;
  undirectedPatternRelations: Array<UndirectedEdgeModel>;
  private viewContainerRef;
  private patternLanguageId: string;
  private patternId: string;
  subscriptions: Subscription = new Subscription();
  showActionButtons: boolean;
  readonly UiFeatures = UiFeatures;

  constructor(private activatedRoute: ActivatedRoute,
              private toasterService: ToasterService,
              private cdr: ChangeDetectorRef,
              private componentFactoryResolver: ComponentFactoryResolver,
              private patternLanguageService: PatternLanguageService,
              private patternService: PatternService,
              private patternRelationDescriptorService: PatternRelationDescriptorService,
              private dialog: MatDialog,
              private router: Router,
              private configurationService: PatternAtlasUiRepositoryConfigurationService,
              private p: PrivilegeService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.isEditingEnabled = this.configurationService.configuration.features[UiFeatures.EDITING]
  }

  ngOnInit() {
    if(this.isEditingEnabled) {
      this.p.hasPrivilege('APPROVED_PATTERN_EDIT_ALL')
        .subscribe(res => {
          this.isEditingEnabled = res;
        });
    }
  }

  ngAfterViewInit(): void {
    this.viewContainerRef = this.ppPatternProperty.viewContainerRef;
    this.patternLanguageId = this.activatedRoute.snapshot.paramMap.get(globals.pathConstants.patternLanguageId);
    this.patternId = this.activatedRoute.snapshot.paramMap.get('patternId');
    this.getData();
  }

  addLink() {
    if (!this.patterns || this.patterns.length === 0) {
      let patternSubscription = this.patternService.getPatternsByUrl(this.patternLanguage._links.patterns.href).subscribe((patterns) => {
        this.patterns = patterns;
        this.patterns.sort((p1, p2) => p1.name.localeCompare(p2.name));
        this.showAndHandleLinkDialog();
      });
      this.subscriptions.add(patternSubscription);
    } else {
      this.showAndHandleLinkDialog();
    }
  }

  getPatternData(): Observable<Pattern> {
    if (!this.patternLanguage) {
      console.log('tried to get patterns before the pattern language object with the url was instanciated');
      return EMPTY;
    }
    // check if pattern is specified via UUID or URI and load it accordingly
    if (UriConverter.isUUID(this.patternId)) {
      return this.patternService.getPatternById(this.patternLanguage, this.patternId).pipe(
        tap(pattern => this.pattern = pattern),
        switchMap(() => this.getPatternSectionContent()));
    } else {
      return this.patternService.getPatternByEncodedUri(this.patternId).pipe(
        tap(pattern => this.pattern = pattern),
        switchMap(() => this.getPatternSectionContent()));
    }
  }

  getPatternSectionContent(): Observable<Pattern> {
    const content = this.patternService.getPatternContentByPattern(this.pattern);
    const renderedContent = this.patternService.getPatternRenderedContentByPattern(this.pattern);
    return forkJoin([content, renderedContent]).pipe(
      map((patternContent) => {
        this.pattern.renderedContent = patternContent[1].renderedContent;
        return this.pattern.content = patternContent[0].content;
      }));
  }

  getPatternLanguageLinks(): Observable<any> {
    const $getDirectedEdges = this.getDirectedEdges();
    const $getUndirectedEdges = this.getUndirectedEdges();
    return forkJoin([$getDirectedEdges, $getUndirectedEdges]).pipe(tap(() => this.isLoadingLinks = false));
  }

  getPatternByLink(edge: DirectedEdgeModel | UndirectedEdgeModel, res: any) {
    const url = res.url + '/' + res.body.id;
    let relationSubscription = this.patternRelationDescriptorService.getEdgeByUrl(url, edge).subscribe(
      edgeResult => {
        edge instanceof DirectedEdgeModel ?
          this.directedPatternRelations.push(edgeResult as DirectedEdgeModel) :
          this.undirectedPatternRelations.push(edgeResult as UndirectedEdgeModel);
      }
    );
    this.subscriptions.add(relationSubscription);
  }

  private createSectionComponent(section: string) {
    let renderedContent;
    if (!this.pattern.renderedContent [section]) {
      renderedContent = this.pattern.content[section];
    } else {
      renderedContent = this.pattern.renderedContent[section];
    }

    const content = this.pattern.content[section];

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(MarkdownPatternSectionContentComponent);
    const componentRef = this.viewContainerRef.createComponent(componentFactory);
    const instance = (<MarkdownPatternSectionContentComponent>componentRef.instance);
    instance.renderedData = renderedContent;
    instance.data = content;
    instance.title = section;
    instance.patternLanguageId = this.patternLanguageId;
    instance.isEditingEnabled = this.isEditingEnabled;
    instance.showCommentButton = false;
    const changeSubscription = instance.changeContent.subscribe((dataChange: DataChange) => {
      this.pattern.content[section] = dataChange.currentValue;
      this.cdr.detectChanges();
      this.savePattern(section, dataChange.previousValue, instance);
    });
    this.subscriptions.add(changeSubscription);
  }

  private getDirectedEdges(): Observable<Embedded<DirectedEdesResponse>> {
    if (!this.patternLanguage) {
      return EMPTY;
    }
    return this.patternLanguageService.getDirectedEdges(this.patternLanguage).pipe(
      tap((edges) => {
        this.directedPatternRelations = edges && edges._embedded ?
          edges._embedded.directedEdgeModels.filter(edge => edge.sourcePatternId === this.patternId ||
            edge.targetPatternId === this.patternId) : [];
      }));
  }

  private getUndirectedEdges(): Observable<Embedded<UndirectedEdgesResponse>> {
    if (!this.patternLanguage) {
      return EMPTY;
    }
    return this.patternLanguageService.getUndirectedEdges(this.patternLanguage).pipe(
      tap((edges) => {
        this.undirectedPatternRelations = edges && edges._embedded ?
          edges._embedded.undirectedEdgeModels.filter(edge => edge.pattern1Id === this.patternId || edge.pattern2Id === this.patternId) : [];
      }));
  }

  private savePattern(section: string, previousContent: any, instance: MarkdownPatternSectionContentComponent) {
    const updateSubscription = this.patternService.updatePattern(this.pattern._links.self.href, this.pattern).subscribe(
      data => {
        this.pattern.renderedContent[section] = data.body.renderedContent[section];
        instance.changeText(this.pattern.renderedContent[section]);
        this.toasterService.pop('success', 'Saved pattern');
      },
      (error) => {
        this.toasterService.pop('error', 'Could not save pattern, resetting content', error.message);
        // reset text of the section:
        this.pattern.content[section] = previousContent;
        instance.changeText(previousContent);
        this.cdr.detectChanges();
      });
    this.subscriptions.add(updateSubscription);
  }

  private getData(): void {

    // first load pattern language object with all the hal links / ids that we may need
    let dataObservable = UriConverter.isUUID(this.patternLanguageId) ? this.patternLanguageService.getPatternLanguageByID(this.patternLanguageId)
      : this.patternLanguageService.getPatternLanguageByEncodedUri(this.patternLanguageId);
    let subscription = dataObservable.pipe(
      tap((patternLanguage) => this.patternLanguage = patternLanguage),
      // load the rest: get our individual pattern and the links in parallel
      switchMap(() => forkJoin([this.getPatternObservable(), this.fillPatternSectionData(), this.getPatternLanguageLinks()])))
      .subscribe(() => this.cdr.detectChanges());
    this.subscriptions.add(subscription);

  }

  private fillPatternSectionData() {
    return this.getPatternData().pipe(
      tap(() => {
        this.patternLanguage.patternSchema.patternSectionSchemas.forEach((sec: PatternSectionSchema) => {
          this.createSectionComponent(sec.name);
        });
        this.isLoading = false;
      }));
  }

  private showAndHandleLinkDialog() {
    const dialogRef = this.dialog.open(CreatePatternRelationComponent,
      { data: { firstPattern: this.pattern, patterns: this.patterns, callerPatternId: this.patternId } }
    );
    const dialogSubscription = dialogRef.afterClosed().pipe(
      switchMap((edge) => {
        return edge ? this.insertEdge(edge) : EMPTY;
      }))
      .subscribe(
        () => {
          this.toasterService.pop('success', 'Created new Relation');
        }
      );
    this.subscriptions.add(dialogSubscription);
  }

  private insertEdge(edge): Observable<any> {
    return this.patternRelationDescriptorService.addRelationToPL(this.patternLanguage, edge).pipe(
      tap((res) => res ? this.getPatternByLink(edge, res) : EMPTY));
  }

  ngOnDestroy(): void {
    this.cdr.detach();
    this.subscriptions.unsubscribe();
  }

  editIcon() {
    const dialogRef = this.dialog.open(EditUrlDialogComponent, {
      width: '50%',
      data: {
        pattern: this.pattern, icon: this.pattern.iconUrl, name: this.pattern.name, paperRef: this.pattern.paperRef
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.patternService.updatePattern(this.pattern._links.self.href, this.pattern).subscribe();
      }
    });
  }

  private getPatternObservable(): Observable<Pattern> {
    return UriConverter.isUUID(this.patternId) ?
      this.patternService.getPatternById(this.patternLanguage, this.patternId) :
      this.patternService.getPatternByEncodedUri(this.patternId).pipe(
        tap(pattern => this.pattern = pattern));
  }
}
