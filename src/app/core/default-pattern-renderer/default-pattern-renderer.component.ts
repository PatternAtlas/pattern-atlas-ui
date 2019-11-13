import {ChangeDetectorRef, Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ToasterService} from 'angular2-toaster';
import {PatternpropertyDirective} from '../component/markdown-content-container/patternproperty.directive';
import {UriConverter} from '../util/uri-converter';
import {MatDialog} from '@angular/material';
import {DialogDataResult} from '../component/create-pattern-relation/create-pattern-relation.component';
import {DirectedPatternRelationDescriptorIndividual} from '../model/directed-pattern-relation-descriptor-individual';
import {UndirectedPatternRelationDescriptorIndividual} from '../model/undirected-pattern-relation-descriptor-individual';
import {PatternRelations} from '../model/pattern-relations';
import Pattern from '../model/hal/pattern.model';
import {PatternLanguageService} from '../service/pattern-language.service';
import PatternLanguage from '../model/hal/pattern-language.model';
import {PatternService} from '../service/pattern.service';
import {MarkdownPatternSectioncontentComponent} from '../component/markdown-content-container/markdown-pattern-sectioncontent/markdown-pattern-sectioncontent.component';
import {DataRenderingComponent} from '../component/markdown-content-container/interfaces/DataRenderingComponent.interface';
import PatternSectionSchema from '../model/hal/pattern-section-schema.model';

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
    isEditingEnabled = false;
  patternLanguage: PatternLanguage;
  pattern: Pattern;

    constructor(private activatedRoute: ActivatedRoute,
                private toasterService: ToasterService,
                private cdr: ChangeDetectorRef,
                private componentFactoryResolver: ComponentFactoryResolver,
                private patternLanguageService: PatternLanguageService,
                private patternService: PatternService,
                public dialog: MatDialog) {
    }

    ngOnInit(): void {
      this.viewContainerRef = this.ppPatternproperty.viewContainerRef;
        const patternLanguageUri = UriConverter.doubleDecodeUri(this.activatedRoute.snapshot.paramMap.get('patternLanguageUri'));
        const patternUri = UriConverter.doubleDecodeUri(this.activatedRoute.snapshot.paramMap.get('patternUri'));
        this.patternLanguageService.getPatternLanguageByEncodedUri(patternLanguageUri)
          .subscribe((patternLanguage) => {
            this.patternLanguage = patternLanguage;
            this.pattern = patternLanguage.patterns.find(it => it.uri === patternUri);

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
    const instance = (<DataRenderingComponent>componentRef.instance);
    instance.data = properties;
    instance.title = section;
    instance.isEditingEnabled = this.isEditingEnabled;
    instance.changeContent.subscribe((data) => {
      this.pattern.content[section] = data;
      instance.data = data;
      //this.savePatterns();
    });
  }

  addLink() {
        // const dialogRef = this.dialog.open(CreatePatternRelationComponent, {
        //         data: {patternName: this.pattern.name, patterns: this.patternList}
        //     }
        // );
        // let relationAdded = false;
        // let patternRelations;
        // dialogRef.afterClosed().pipe(
        //     tap((result: DialogDataResult) => {
        //         relationAdded = this.addRelationCreatedByDialog(result);
        //         patternRelations = new PatternLanguageRelations(UriConverter.getRelationListIriForPLIri(this.plIri), this.plIri, this.allRelations);
        //     }),
        //     switchMap(() =>
        //         // relationAdded ? this.githubPersistenceService.updatePLRelations(patternRelations) :
        //         EMPTY)).subscribe(
        //     () => {
        //         if (relationAdded) {
        //             this.toasterService.pop('success', 'Created new Relation');
        //         }
        //     },
        //     (error) => this.toasterService.pop('error', 'Could not create new relation: ', error));
  }

  // adds a relation created by the dialog to the local data and returns whether this was successful (or not, e.g. when simply closing the dialog)
  addRelationCreatedByDialog(dialogResult: DialogDataResult): boolean {
        // if (!dialogResult || !dialogResult.toPattern || !dialogResult.direction) {
        //     return false;
        // }
        // switch (dialogResult.direction.name) {
        //     case PatternRelationDescriptorDirection.DirectedRight:
        //         this.allRelations.directed.push(new DirectedPatternRelationDescriptorIndividual(this.pattern, dialogResult.toPattern,
        //             dialogResult.description ? dialogResult.description : null, dialogResult.relationType ? dialogResult.relationType : null));
        //         break;
        //     case PatternRelationDescriptorDirection.DirectedLeft:
        //         this.allRelations.directed.push(new DirectedPatternRelationDescriptorIndividual(dialogResult.toPattern, this.pattern,
        //             dialogResult.description ? dialogResult.description : null, dialogResult.relationType ? dialogResult.relationType : null));
        //         break;
        //     case PatternRelationDescriptorDirection.UnDirected:
        //         this.allRelations.undirected.push(new UndirectedPatternRelationDescriptorIndividual(this.pattern, dialogResult.toPattern,
        //             dialogResult.description ? dialogResult.description : null, dialogResult.relationType ? dialogResult.relationType : null));
        //         break;
        //     default:
        //         return false;
        // }
        // this.updateUIForPatternRelations();
        return true;
  }


    private updateUIForPatternRelations() {
        // this.directedPatternRelations = this.allRelations.directed.filter((rel: DirectedPatternRelationDescriptorIndividual) =>
        //     rel.source.uri === this.patternIri || rel.target.uri === this.patternIri);
        // this.undirectedPatternRelations = this.allRelations.undirected.filter((rel: UndirectedPatternRelationDescriptorIndividual) =>
        //     rel.hasPattern.some((pat) => pat.uri === this.patternIri));
        // this.cdr.detectChanges();
    }

}
