import {ChangeDetectorRef, Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ToasterService} from 'angular2-toaster';
import {PatternpropertyDirective} from '../component/markdown-content-container/patternproperty.directive';
import {UriConverter} from '../util/uri-converter';
import {MatDialog} from '@angular/material';
import {CreatePatternRelationComponent, DialogDataResult} from '../component/create-pattern-relation/create-pattern-relation.component';
import {PatternRelations} from '../model/pattern-relations';
import Pattern from '../model/hal/pattern.model';
import {PatternLanguageService} from '../service/pattern-language.service';
import PatternLanguage from '../model/hal/pattern-language.model';
import {PatternService} from '../service/pattern.service';
import {MarkdownPatternSectioncontentComponent} from '../component/markdown-content-container/markdown-pattern-sectioncontent/markdown-pattern-sectioncontent.component';
import {DataChange} from '../component/markdown-content-container/interfaces/DataRenderingComponent.interface';
import PatternSectionSchema from '../model/hal/pattern-section-schema.model';
import {map, switchMap, tap} from 'rxjs/operators';
import {EMPTY, forkJoin, Observable} from 'rxjs';
import {PatternRelationDescriptorService} from '../service/pattern-relation-descriptor.service';
import {PatternRelationDescriptorDirection} from '../model/pattern-relation-descriptor-direction.enum';
import {DirectedEdge} from '../model/hal/directed-edge.model';
import {Embedded} from '../model/hal/embedded';
import {DirectedEdesResponse} from '../model/hal/directed-edes-response.interface';
import {UndirectedEdesResponse} from '../model/hal/undirected-edes-response.interface';
import {UndirectedEdge} from '../model/hal/undirected-edge.model';

@Component({
    selector: 'pp-default-pattern-renderer',
    templateUrl: './default-pattern-renderer.component.html',
    styleUrls: ['./default-pattern-renderer.component.scss']
})
export class DefaultPatternRendererComponent implements OnInit {
  private directedPatternRelations: DirectedEdge[];
  private undirectedPatternRelations: UndirectedEdge[];
    private allRelations: PatternRelations = new PatternRelations();
    private patternList: Array<Pattern>;
    @ViewChild(PatternpropertyDirective) ppPatternproperty: PatternpropertyDirective;
  private viewContainerRef;
    isLoading = true;
  isEditingEnabled = true;
  patternLanguage: PatternLanguage;
  pattern: Pattern;
  patterns: Pattern[];
  private patternLanguageUri: string;
  private patternUri: string;

    constructor(private activatedRoute: ActivatedRoute,
                private toasterService: ToasterService,
                private cdr: ChangeDetectorRef,
                private componentFactoryResolver: ComponentFactoryResolver,
                private patternLanguageService: PatternLanguageService,
                private patternService: PatternService,
                private patternRelationDescriptorService: PatternRelationDescriptorService,
                public dialog: MatDialog) {
    }

    ngOnInit(): void {
      this.viewContainerRef = this.ppPatternproperty.viewContainerRef;
      this.patternLanguageUri = UriConverter.doubleDecodeUri(this.activatedRoute.snapshot.paramMap.get('patternLanguageUri'));
      this.patternUri = UriConverter.doubleDecodeUri(this.activatedRoute.snapshot.paramMap.get('patternUri'));
      this.getData();

    }

  private createSectionComponent(section: string,) {
    if (!this.pattern.content) {
      return;
    }
    const properties = this.pattern.content[section];

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(MarkdownPatternSectioncontentComponent);
    const componentRef = this.viewContainerRef.createComponent(componentFactory);
    const instance = (<MarkdownPatternSectioncontentComponent>componentRef.instance);
    instance.data = properties;
    instance.title = section;
    instance.isEditingEnabled = this.isEditingEnabled;
    instance.changeContent.subscribe((dataChange: DataChange) => {
      this.pattern.content[section] = dataChange.currentValue;
      this.cdr.detectChanges();
      this.savePattern(section, dataChange.previousValue, instance);

    });
  }

  addLink() {
    const dialogRef = this.dialog.open(CreatePatternRelationComponent, {
      data: {patternName: this.pattern.name, patterns: this.patterns}
      }
    );
    dialogRef.afterClosed().pipe(
      switchMap(result => {
        return result ? this.addContentInfoToPattern(result) : EMPTY;
      }),
      switchMap((dialogDataResult: DialogDataResult) => {
        const edge = this.mapDialogDataToEdge(dialogDataResult);
        const url = edge instanceof DirectedEdge ? this.patternLanguage._links.directedEdges.href : this.patternLanguage._links.undirectedEdges.href;
        return edge ? this.patternRelationDescriptorService.savePatternRelation(url, edge) : EMPTY;
      }),
      switchMap((edgeCreated) => {
        return edgeCreated ? this.retrievePatternLanguageData() : EMPTY;
      }),
    ).subscribe(
      (edge) => {
        this.toasterService.pop('success', 'Created new Relation');

      },
      (error) => {
        this.toasterService.pop('error', 'Could not create new relation: ', error);
        console.log(error);
      });
  }

  // adds a relation created by the dialog to the local data and returns whether this was successful (or not, e.g. when simply closing the dialog)
  mapDialogDataToEdge(dialogResult: DialogDataResult): DirectedEdge | UndirectedEdge {
    if (!dialogResult || !dialogResult.toPattern || !dialogResult.direction) {
      return null;
    }
      switch (dialogResult.direction.name) {
        case PatternRelationDescriptorDirection.DirectedRight:
          return new DirectedEdge(this.pattern, dialogResult.toPattern, this.patternLanguage,
            dialogResult.description ? dialogResult.description : null, dialogResult.relationType ? dialogResult.relationType : null,
            null);
          break;
        case PatternRelationDescriptorDirection.DirectedLeft:
          return new DirectedEdge(dialogResult.toPattern, this.pattern, this.patternLanguage,
            dialogResult.description ? dialogResult.description : null, dialogResult.relationType ? dialogResult.relationType : null,
            null);
          break;
        case PatternRelationDescriptorDirection.UnDirected:
          return new UndirectedEdge(dialogResult.toPattern, this.pattern, this.patternLanguage,
            dialogResult.description ? dialogResult.description : null, dialogResult.relationType ? dialogResult.relationType : null,
            null);
          break;
        default:
          break;
      }
      return null;

  }

  addContentInfoToPattern(dialogResult: DialogDataResult): Observable<DialogDataResult> {
    return this.patternService.getPatternContentByPattern(dialogResult.toPattern).pipe(
      map((content) => {
        const result = dialogResult;
        result.toPattern.content = content.content;
        return result;
      }));
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

  private savePattern(section: string, previousContent: any, instance: MarkdownPatternSectioncontentComponent) {
    this.patternService.updatePattern(this.pattern._links.self.href, this.pattern).subscribe(() => this.toasterService.pop('success', 'Saved pattern'),
      (error) => {
        this.toasterService.pop('error', 'Could not save pattern, resetting content', error.message);
        // reset text of the section:
        this.pattern.content[section] = previousContent;
        instance.changeText(previousContent);
        this.cdr.detectChanges();
      });
  }

  getPatternInfos(): Observable<Pattern> {
    if (!this.patternLanguage) {
      return EMPTY;
    }
    return this.patternService.getPatternsByUrl(this.patternLanguage._links.patterns.href).pipe(
      tap((patterns) => {
        this.patterns = patterns;
        this.pattern = patterns.find(pat => pat.uri === this.patternUri);
      }),
      switchMap((patterns: any) => {
        this.pattern = patterns.find(pat => pat.uri === this.patternUri);
        return this.patternService.getPatternContentByPattern(this.pattern);
      }),
      map((patternContent) => this.pattern.content = patternContent.content));
  }


  private getData(): void {

    this.patternLanguageService.getPatternLanguageByEncodedUri(this.patternLanguageUri).pipe(
      tap((patternLanguage) => this.patternLanguage = patternLanguage),
      switchMap(() => this.retrievePatternLanguageData())
    ).subscribe((patternLanguage: any) => {
      this.patternLanguage.patternSchema.patternSectionSchemas.forEach((sec: PatternSectionSchema) => {
        this.createSectionComponent(sec.name);
      });
      this.cdr.detectChanges();
      this.isLoading = false;
    });
  }


  retrievePatternLanguageData(): Observable<any> {
    const $getPatternInfos = this.getPatternInfos();
    const $getDirectedEdges = this.getDirectededges();
    const $getUndirectedEdges = this.getUndirectededges();
    return forkJoin($getPatternInfos, $getDirectedEdges, $getUndirectedEdges);
  }


}
