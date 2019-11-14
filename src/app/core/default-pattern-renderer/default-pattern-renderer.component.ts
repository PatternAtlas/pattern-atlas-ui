import {ChangeDetectorRef, Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ToasterService} from 'angular2-toaster';
import {PatternpropertyDirective} from '../component/markdown-content-container/patternproperty.directive';
import {UriConverter} from '../util/uri-converter';
import {MatDialog} from '@angular/material';
import {CreatePatternRelationComponent, DialogDataResult} from '../component/create-pattern-relation/create-pattern-relation.component';
import {DirectedPatternRelationDescriptorIndividual} from '../model/directed-pattern-relation-descriptor-individual';
import {UndirectedPatternRelationDescriptorIndividual} from '../model/undirected-pattern-relation-descriptor-individual';
import {PatternRelations} from '../model/pattern-relations';
import Pattern from '../model/hal/pattern.model';
import {PatternLanguageService} from '../service/pattern-language.service';
import PatternLanguage from '../model/hal/pattern-language.model';
import {PatternService} from '../service/pattern.service';
import {MarkdownPatternSectioncontentComponent} from '../component/markdown-content-container/markdown-pattern-sectioncontent/markdown-pattern-sectioncontent.component';
import {DataChange} from '../component/markdown-content-container/interfaces/DataRenderingComponent.interface';
import PatternSectionSchema from '../model/hal/pattern-section-schema.model';
import {switchMap, tap} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {PatternRelationDescriptorService} from '../service/pattern-relation-descriptor.service';
import {Edge} from '../model/hal/edge.model';
import {PatternRelationDescriptorDirection} from '../model/pattern-relation-descriptor-direction.enum';
import {DirectedEdge} from '../model/hal/directed-edge.model';

@Component({
    selector: 'pp-default-pattern-renderer',
    templateUrl: './default-pattern-renderer.component.html',
    styleUrls: ['./default-pattern-renderer.component.scss']
})
export class DefaultPatternRendererComponent implements OnInit {
    private directedPatternRelations: DirectedPatternRelationDescriptorIndividual[];
    private undirectedPatternRelations: UndirectedPatternRelationDescriptorIndividual[];
    private allRelations: PatternRelations = new PatternRelations();
    private patternList: Array<Pattern>;
    @ViewChild(PatternpropertyDirective) ppPatternproperty: PatternpropertyDirective;
  private viewContainerRef;
    isLoading = true;
  isEditingEnabled = true;
  patternLanguage: PatternLanguage;
  pattern: Pattern;

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
        const patternLanguageUri = UriConverter.doubleDecodeUri(this.activatedRoute.snapshot.paramMap.get('patternLanguageUri'));
        const patternUri = UriConverter.doubleDecodeUri(this.activatedRoute.snapshot.paramMap.get('patternUri'));
      this.patternLanguageService.getPatternLanguageByEncodedUri(patternLanguageUri).pipe(
        switchMap((patternLanguage: PatternLanguage) => {
            this.patternLanguage = patternLanguage;
          return this.patternService.getPatternsByUrl(this.patternLanguage._links.patterns.href);
        }),
        switchMap((patterns: any) => {
          this.pattern = patterns.find(pat => pat.uri === patternUri);
          return this.patternService.getPatternContentByPattern(this.pattern);
        })).subscribe((patternContent: any) => {
        this.pattern.content = patternContent.content;
        this.viewContainerRef.clear();

        this.patternLanguage.patternSchema.patternSectionSchemas.forEach((sec: PatternSectionSchema) => {
          this.createSectionComponent(sec.name);
        });

        this.isLoading = false;
      });
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
        data: {patternName: this.pattern.name, patterns: this.patternLanguage.patterns}
      }
    );
    let relation;
    dialogRef.afterClosed().pipe(
      tap((result: DialogDataResult) => {
        relation = this.mapDialogDataToEdge(result);
        console.log(relation);
      }),
      switchMap((result) =>
        result ? this.patternRelationDescriptorService.savePatternRelation(this.patternLanguage._links.patterns.href, relation) :
          EMPTY)).subscribe(
      () => {
        if (relation) {
          this.toasterService.pop('success', 'Created new Relation');
        }
      },
      (error) => this.toasterService.pop('error', 'Could not create new relation: ', error));
  }

  // adds a relation created by the dialog to the local data and returns whether this was successful (or not, e.g. when simply closing the dialog)
  mapDialogDataToEdge(dialogResult: DialogDataResult): Edge {
    if (!dialogResult || !dialogResult.toPattern || !dialogResult.direction) {
      return null;
    }

    const toPattern = dialogResult.toPattern;
    this.patternService.getPatternContentByPattern(toPattern).subscribe(content => {
      toPattern.content = content;
      switch (dialogResult.direction.name) {
        case PatternRelationDescriptorDirection.DirectedRight:
          // ource: Pattern, target: Pattern, patternlanguage: PatternLanguage, description: any, type: string, patternView: PatternView = null
          return new DirectedEdge(this.pattern, toPattern, this.patternLanguage,
            dialogResult.description ? dialogResult.description : null, '', null);
          break;
        case PatternRelationDescriptorDirection.DirectedLeft:
          return new DirectedEdge(toPattern, this.pattern, this.patternLanguage, dialogResult.description ? dialogResult.description : null, '', null);
          break;
        case PatternRelationDescriptorDirection.UnDirected:
          // this.allRelations.undirected.push(new UndirectedPatternRelationDescriptorIndividual(this.pattern, dialogResult.toPattern,
          //   dialogResult.description ? dialogResult.description : null, dialogResult.relationType ? dialogResult.relationType : null));
          break;
        default:
          break;
      }
      return null;
    });

  }


    private updateUIForPatternRelations() {
        // this.directedPatternRelations = this.allRelations.directed.filter((rel: DirectedPatternRelationDescriptorIndividual) =>
        //     rel.source.uri === this.patternIri || rel.target.uri === this.patternIri);
        // this.undirectedPatternRelations = this.allRelations.undirected.filter((rel: UndirectedPatternRelationDescriptorIndividual) =>
        //     rel.hasPattern.some((pat) => pat.uri === this.patternIri));
        // this.cdr.detectChanges();
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
}
