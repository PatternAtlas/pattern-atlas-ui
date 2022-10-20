import {
  AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { PatternPropertyDirective } from '../component/markdown-content-container/pattern-property.directive';
import { MatDialog } from '@angular/material/dialog';
import { CreatePatternRelationComponent, GroupedPatterns } from '../component/create-pattern-relation/create-pattern-relation.component';
import Pattern from '../model/hal/pattern.model';
import { PatternLanguageService } from '../service/pattern-language.service';
import PatternLanguage from '../model/hal/pattern-language.model';
import { PatternService } from '../service/pattern.service';
import { MarkdownPatternSectionContentComponent } from '../component/markdown-content-container/markdown-pattern-sectioncontent/markdown-pattern-section-content.component'; // eslint-disable-line max-len
import { DataChange } from '../component/markdown-content-container/interfaces/DataRenderingComponent.interface';
import PatternSectionSchema from '../model/hal/pattern-section-schema.model';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { EMPTY, forkJoin, Observable, of, Subscription } from 'rxjs';
import { PatternRelationDescriptorService } from '../service/pattern-relation-descriptor.service';
import { DirectedEdgeModel } from '../model/hal/directed-edge.model';
import { Embedded } from '../model/hal/embedded';
import { DirectedEdgesResponse } from '../model/hal/directed-edes-response.interface';
import { UndirectedEdgesResponse } from '../model/hal/undirected-edes-response.interface';
import { UndirectedEdgeModel } from '../model/hal/undirected-edge.model';
import { globals } from '../../globals';
import { UriConverter } from '../util/uri-converter';
import { EditUrlDialogComponent } from '../component/edit-url-dialog/edit-url-dialog.component';
import {
  PatternAtlasUiRepositoryConfigurationService, UiFeatures
} from '../directives/pattern-atlas-ui-repository-configuration.service';
import { PrivilegeService } from '../../authentication/_services/privilege.service';
import { TextfieldDialogComponent } from '../component/textfield-dialog/textfield-dialog.component';
import { ImplementationDialogComponent } from '../component/implementation-dialog/implementation-dialog.component';
import PatternImplementation from '../model/pattern-implementation.model';
import { DeleteConfirmationDialogComponent } from '../../core/component/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { precisionFixed } from 'd3';

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
  groupedPatterns: GroupedPatterns[];
  tags: string[];
  private directedPatternRelations: Array<DirectedEdgeModel>;
  private undirectedPatternRelations: Array<UndirectedEdgeModel>;
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
    this.getGroupedPatterns();
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
    // check if pattern is specified via UUIID or URI and load it accordingly
    if (UriConverter.isUUID(this.patternId)) {
      return this.patternService.getPatternById(this.patternLanguage, this.patternId).pipe(
        tap(pattern => {
          this.pattern = pattern;
          this.pattern.id = this.patternId;
          this.setTags();
        }),
        switchMap(() => this.getPatternSectionContent()));
    } else {
      return this.patternService.getPatternByEncodedUri(this.patternId).pipe(
        tap(pattern => {
          this.pattern = pattern;
          this.setTags();
        }),
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

  private getDirectedEdges(): Observable<Embedded<DirectedEdgesResponse>> {
    if (!this.patternLanguage) {
      return EMPTY;
    }
    return this.patternRelationDescriptorService.getDirectedEdgeByInvolvedPatternId(this.patternId).pipe(
      tap((edges) => {
        this.directedPatternRelations = edges && edges._embedded ? edges._embedded.directedEdgeModels : [];
      }), catchError(err => of(err.status)));
  }

  private getUndirectedEdges(): Observable<Embedded<UndirectedEdgesResponse>> {
    if (!this.patternLanguage) {
      return EMPTY;
    }
    return this.patternRelationDescriptorService.getUndirectedEdgeByInvolvedPatternId(this.patternId).pipe(
      tap((edges) => {
        this.undirectedPatternRelations = edges && edges._embedded ? edges._embedded.undirectedEdgeModels : [];
      }), catchError(err => of(err.status)));
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
      .subscribe(res => this.cdr.detectChanges());
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
    if (this.groupedPatterns != undefined) {
      const dialogRef = this.dialog.open(CreatePatternRelationComponent,
        { data: { firstPattern: this.pattern, groupedPatterns: this.groupedPatterns } }
      );
      const dialogSubscription = dialogRef.afterClosed().pipe(
        switchMap((edge) => {
          return edge ? this.insertEdge(edge) : EMPTY;
        }))
        .subscribe(
          data => {
            this.toasterService.pop('success', 'Created new Relation');
          }
        );
      this.subscriptions.add(dialogSubscription);
    }
  }

  private getGroupedPatterns() {
    this.groupedPatterns = [];
    this.patternLanguageService.getPatternLanguages().subscribe(languages => {
      languages.forEach(language => {
        this.patternService.getPatternsById(language.id).subscribe(patterns => {
          this.groupedPatterns.push({ id: language.id, name: language.name, patterns: patterns });
        })
      })
    })
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
        this.pattern.iconUrl = result.icon;
        this.pattern.name = result.name;
        this.pattern.paperRef = result.paperRef;
        this.patternService.updatePattern(this.pattern._links.self.href, this.pattern).subscribe();
      }
    });
  }

  editCategory() {
    const dialogRef = this.dialog.open(TextfieldDialogComponent, {
      width: '50%',
      data: {
        title: 'Edit Category', textfieldLabel: 'Category', value: this.pattern.category
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.pattern.category = result.value;
        this.patternService.updatePattern(this.pattern._links.self.href, this.pattern).subscribe();
      }
    });
  }


  editTags() {
    const dialogRef = this.dialog.open(TextfieldDialogComponent, {
      width: '50%',
      data: {
        title: 'Edit Tags', textfieldLabel: 'Tags', value: this.pattern.tags
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        const tagValue = result.value.replace(/\s/g, '');
        this.pattern.tags = tagValue;
        this.setTags();
        this.patternService.updatePattern(this.pattern._links.self.href, this.pattern).subscribe();
      }
    });
  }

  setTags() {
    this.tags = this.pattern.tags ? this.pattern.tags.split(',') : [];
  }

  addImplementation() {
    const dialogRef = this.dialog.open(ImplementationDialogComponent, {
      width: '50%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.patternService.savePatternImplementation(this.pattern.id, result)
          .subscribe(response => this.pattern.patternImplementations.push(response.body));
      }
    });
  }

  deleteImplementation(implementation: PatternImplementation) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: { id: implementation.id }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.patternService.deletePatternImplementation(implementation.id)
          .subscribe(() => this.pattern.patternImplementations = this.pattern.patternImplementations.filter(imp => imp.id !== implementation.id));
      }
    });
  }

  editImplementation(implementation: PatternImplementation) {
    const dialogRef = this.dialog.open(ImplementationDialogComponent, {
      data: { type: implementation.type, link: implementation.link }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        implementation.link = result.link;
        implementation.type = result.type;
        this.patternService.updatePatternImplementation(implementation)
          .subscribe(response => {
            const body = response.body;
            this.pattern.patternImplementations.forEach(imp => {
              if (imp.id === body.id) {
                imp.link = body.link;
                imp.type = body.type;
              }
            })
          });
      }
    });
  }

  private getPatternObservable(): Observable<Pattern> {
    return UriConverter.isUUID(this.patternId) ?
      this.patternService.getPatternById(this.patternLanguage, this.patternId) :
      this.patternService.getPatternByEncodedUri(this.patternId).pipe(
        tap(pattern => {
          this.pattern = pattern;
          this.setTags();
        }));
  }
}
