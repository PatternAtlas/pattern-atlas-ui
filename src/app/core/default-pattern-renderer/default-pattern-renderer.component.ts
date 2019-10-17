import { ChangeDetectorRef, Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { PatternpropertyDirective } from '../component/markdown-content-container/patternproperty.directive';
import { UriConverter } from '../util/uri-converter';
import { DividerComponent } from '../component/divider/divider.component';
import { DataRenderingComponent } from '../component/markdown-content-container/interfaces/DataRenderingComponent.interface';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material';
import { CreatePatternRelationComponent, DialogDataResult } from '../component/create-pattern-relation/create-pattern-relation.component';
import Pattern from '../model/pattern.model';
import { DirectedPatternRelationDescriptorIndividual } from '../model/directed-pattern-relation-descriptor-individual';
import { PatternRelationDescriptorDirection } from '../model/pattern-relation-descriptor-direction.enum';
import { UndirectedPatternRelationDescriptorIndividual } from '../model/undirected-pattern-relation-descriptor-individual';
import { PatternRelations } from '../model/pattern-relations';
// tslint:disable-next-line:max-line-length
import { MarkdownPatternSectioncontentComponent } from '../component/markdown-content-container/markdown-pattern-sectioncontent/markdown-pattern-sectioncontent.component';
import { PatternLanguageRelations } from '../model/pattern-language-relations.model';
import { switchMap, tap } from 'rxjs/internal/operators';
import { EMPTY } from 'rxjs';

@Component({
    selector: 'pp-default-pattern-renderer',
    templateUrl: './default-pattern-renderer.component.html',
    styleUrls: ['./default-pattern-renderer.component.scss']
})
export class DefaultPatternRendererComponent implements OnInit {
    private pattern: Pattern;
    private directedPatternRelations: DirectedPatternRelationDescriptorIndividual[];
    private undirectedPatternRelations: UndirectedPatternRelationDescriptorIndividual[];
    private allRelations: PatternRelations = new PatternRelations();
    private patternList: Pattern[];
    @ViewChild(PatternpropertyDirective) ppPatternproperty: PatternpropertyDirective;
    plIri: string;
    patternIri: string;
    sections: string[];
    isLoading = true;
    isEditingEnabled = false;

    constructor(private activatedRoute: ActivatedRoute,
                private toasterService: ToasterService, private cdr: ChangeDetectorRef,
                private componentFactoryResolver: ComponentFactoryResolver,
                private cookieService: CookieService,
                public dialog: MatDialog) {
    }


    ngOnInit(): void {

        this.plIri = UriConverter.doubleDecodeUri(this.activatedRoute.snapshot.paramMap.get('plid'));
        this.patternIri = UriConverter.doubleDecodeUri(this.activatedRoute.snapshot.paramMap.get('pid'));
        this.isEditingEnabled = !!this.cookieService.get('patternpedia_github_token');

        this.loadInfosAndInitPage();


    }


    loadInfosAndInitPage(): void {
        // this.completePatternLanguageLoadingService.loadCompletePatternLanguage(this.plIri).then(completePL => {
        //     this.plLoader.supportedIRI = this.plIri;
        //     this.patternList = completePL.patterns;
        //     this.pattern = this.patternList.find(pat => pat.uri === this.patternIri);
        //     this.isLoading = false;
        //
        //     this.allRelations = completePL.patternRelations;
        //     console.log(this.allRelations);
        //
        //     this.updateUIForPatternRelations();
        //     this.sections = completePL.patternlanguage.sections;
        //
        //     const viewContainerRef = this.ppPatternproperty.viewContainerRef;
        //     viewContainerRef.clear();
        //
        //     const componentDividerFactory = this.componentFactoryResolver.resolveComponentFactory(DividerComponent);
        //     this.sections.forEach((sec: string) => {
        //         this.createSectionComponent(sec, viewContainerRef, componentDividerFactory);
        //     });
        //
        //     this.isLoading = false;
        // });
    }

    private createSectionComponent(section: string, viewContainerRef: any, componentDividerFactory) {
        const properties = this.pattern.sectionsProperties.get(section);
        if (section.indexOf('#has') !== -1 && properties) {
            const sectionTitle = section.split('#has')[1].replace(/([A-Z])/g, ' $1').trim();

            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(MarkdownPatternSectioncontentComponent);
            const componentRef = viewContainerRef.createComponent(componentFactory);
            const instance = (<DataRenderingComponent>componentRef.instance);
            instance.data = properties.join('\n');
            instance.title = sectionTitle;
            instance.isEditingEnabled = this.isEditingEnabled;
            instance.changeContent.subscribe((data) => {
                this.pattern.sectionsProperties.set(section, [data]);
                const patternIndex = this.patternList.findIndex(pat => pat.uri === this.patternIri);
                this.patternList[patternIndex] = this.pattern;
                instance.data = data;
                this.savePatterns();
            });

            viewContainerRef.createComponent(componentDividerFactory); // create divider
        }
    }

    private savePatterns(): void {
    }

    addLink() {
        const dialogRef = this.dialog.open(CreatePatternRelationComponent, {
                data: {patternName: this.pattern.name, patterns: this.patternList}
            }
        );
        let relationAdded = false;
        let patternRelations;
        dialogRef.afterClosed().pipe(
            tap((result: DialogDataResult) => {
                relationAdded = this.addRelationCreatedByDialog(result);
                patternRelations = new PatternLanguageRelations(UriConverter.getRelationListIriForPLIri(this.plIri), this.plIri, this.allRelations);
            }),
            switchMap(() =>
                    // relationAdded ? this.githubPersistenceService.updatePLRelations(patternRelations) :
                        EMPTY)).subscribe(
                    () => {
                        if (relationAdded) {
                            this.toasterService.pop('success', 'Created new Relation');
                        }
                    },
                (error) => this.toasterService.pop('error', 'Could not create new relation: ', error));
    }

    // adds a relation created by the dialog to the local data and returns whether this was successful (or not, e.g. when simply closing the dialog)
    addRelationCreatedByDialog(dialogResult: DialogDataResult): boolean {
        if (!dialogResult || !dialogResult.toPattern || !dialogResult.direction) {
            return false;
        }
        switch (dialogResult.direction.name) {
            case PatternRelationDescriptorDirection.DirectedRight:
                this.allRelations.directed.push(new DirectedPatternRelationDescriptorIndividual(this.pattern, dialogResult.toPattern,
                    dialogResult.description ? dialogResult.description : null, dialogResult.relationType ? dialogResult.relationType : null));
                break;
            case PatternRelationDescriptorDirection.DirectedLeft:
                this.allRelations.directed.push(new DirectedPatternRelationDescriptorIndividual(dialogResult.toPattern, this.pattern,
                    dialogResult.description ? dialogResult.description : null, dialogResult.relationType ? dialogResult.relationType : null));
                break;
            case PatternRelationDescriptorDirection.UnDirected:
                this.allRelations.undirected.push(new UndirectedPatternRelationDescriptorIndividual(this.pattern, dialogResult.toPattern,
                    dialogResult.description ? dialogResult.description : null, dialogResult.relationType ? dialogResult.relationType : null));
                break;
            default:
                return false;
        }
        this.updateUIForPatternRelations();
        return true;
    }


    private updateUIForPatternRelations() {
        this.directedPatternRelations = this.allRelations.directed.filter((rel: DirectedPatternRelationDescriptorIndividual) =>
            rel.source.uri === this.patternIri || rel.target.uri === this.patternIri);
        this.undirectedPatternRelations = this.allRelations.undirected.filter((rel: UndirectedPatternRelationDescriptorIndividual) =>
            rel.hasPattern.some((pat) => pat.uri === this.patternIri));
        this.cdr.detectChanges();
    }

}
