import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { PatternPropertyDirective } from '../component/markdown-content-container/pattern-property.directive';
import { UriConverter } from '../util/uri-converter';
import { MatDialog } from '@angular/material/dialog';
import { CreatePatternRelationComponent } from '../component/create-pattern-relation/create-pattern-relation.component';
import Pattern from '../model/hal/pattern.model';
import { PatternLanguageService } from '../service/pattern-language.service';
import PatternLanguage from '../model/hal/pattern-language.model';
import { PatternService } from '../service/pattern.service';
// tslint:disable-next-line:max-line-length
import { MarkdownPatternSectionContentComponent } from '../component/markdown-content-container/markdown-pattern-sectioncontent/markdown-pattern-section-content.component';
import { DataChange } from '../component/markdown-content-container/interfaces/DataRenderingComponent.interface';
import PatternSectionSchema from '../model/hal/pattern-section-schema.model';
import { map, switchMap, tap } from 'rxjs/operators';
import { EMPTY, forkJoin, Observable } from 'rxjs';
import { PatternRelationDescriptorService } from '../service/pattern-relation-descriptor.service';
import { DirectedEdgeModel } from '../model/hal/directed-edge.model';
import { Embedded } from '../model/hal/embedded';
import { DirectedEdesResponse } from '../model/hal/directed-edes-response.interface';
import { UndirectedEdesResponse } from '../model/hal/undirected-edes-response.interface';
import { UndirectedEdgeModel } from '../model/hal/undirected-edge.model';

@Component({
    selector: 'pp-default-pattern-renderer',
    templateUrl: './default-pattern-renderer.component.html',
    styleUrls: ['./default-pattern-renderer.component.scss']
})
export class DefaultPatternRendererComponent implements AfterViewInit {
    @ViewChild(PatternPropertyDirective) ppPatternProperty: PatternPropertyDirective;
    isLoading = true;
    isEditingEnabled = true;
    patternLanguage: PatternLanguage;
    pattern: Pattern;
    patterns: Array<Pattern>;
    private directedPatternRelations: Array<DirectedEdgeModel>;
    private undirectedPatternRelations: Array<UndirectedEdgeModel>;
    private viewContainerRef;
    private patternLanguageId: string;
    private patternUri: string;

    constructor(private activatedRoute: ActivatedRoute,
                private toasterService: ToasterService,
                private cdr: ChangeDetectorRef,
                private componentFactoryResolver: ComponentFactoryResolver,
                private patternLanguageService: PatternLanguageService,
                private patternService: PatternService,
                private patternRelationDescriptorService: PatternRelationDescriptorService,
                private dialog: MatDialog,
                private router: Router) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    ngAfterViewInit(): void {
        this.viewContainerRef = this.ppPatternProperty.viewContainerRef;
        this.patternLanguageId = this.activatedRoute.snapshot.paramMap.get('id');
        this.patternUri = UriConverter.doubleDecodeUri(this.activatedRoute.snapshot.paramMap.get('patternUri'));
        this.getData();
    }

    doubleEncodeUri(uri: string): string {
        return UriConverter.doubleEncodeUri(uri);
    }

    addLink() {
        const dialogRef = this.dialog.open(CreatePatternRelationComponent, {
                data: {firstPattern: this.pattern, patterns: this.patterns}
            }
        );
        dialogRef.afterClosed().pipe(
            switchMap(result => {
                return result ? this.addContentInfoToPattern(result) : EMPTY;
            }),
            switchMap((edge) => {
                const url = edge instanceof DirectedEdgeModel ?
                    this.patternLanguage._links.directedEdges.href : this.patternLanguage._links.undirectedEdges.href;
                return edge ? this.patternRelationDescriptorService.addRelationToPL(this.patternLanguage, edge) : EMPTY;
            }),
            switchMap((edgeCreated) => {
                return edgeCreated ? this.retrievePatternLanguageData() : EMPTY;
            }),
        ).subscribe(
            () => {
                this.toasterService.pop('success', 'Created new Relation');

            },
            (error) => {
                this.toasterService.pop('error', 'Could not create new relation: ', error);
                console.log(error);
            });
    }

    // Todo Manuela: make it work!
    navigateToPattern(uri: string): void {
        if (uri) {
            this.router.navigate(['..', UriConverter.doubleEncodeUri(uri)], {relativeTo: this.activatedRoute});
        }
    }

    addContentInfoToPattern(edge: DirectedEdgeModel | UndirectedEdgeModel): Observable<DirectedEdgeModel | UndirectedEdgeModel> {
        const toPattern = edge instanceof DirectedEdgeModel ? edge.targetPatternId : edge.pattern2Id;
        return this.patternService.getPatternContentByPattern(this.patterns.find(it => it.id === toPattern)).pipe(
            map((patterncontent) => {
                const targetPatternContent = patterncontent.content;
                // edge instanceof DirectedEdgeModel ? edge.content = targetPatternContent : edge.p2.content = targetPatternContent;
                return edge;
            }));
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

    retrievePatternLanguageData(): Observable<any> {
        const $getDirectedEdges = this.getDirectedEdges();
        const $getUndirectedEdges = this.getUndirectedEdges();
        return forkJoin([$getDirectedEdges, $getUndirectedEdges]);
    }

    private createSectionComponent(section: string) {
        if (!this.pattern.content) {
            return;
        }
        const properties = this.pattern.content[section];

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(MarkdownPatternSectionContentComponent);
        const componentRef = this.viewContainerRef.createComponent(componentFactory);
        const instance = (<MarkdownPatternSectionContentComponent>componentRef.instance);
        instance.data = properties;
        instance.title = section;
        instance.isEditingEnabled = this.isEditingEnabled;
        instance.changeContent.subscribe((dataChange: DataChange) => {
            this.pattern.content[section] = dataChange.currentValue;
            this.cdr.detectChanges();
            this.savePattern(section, dataChange.previousValue, instance);

        });
    }

    private getDirectedEdges(): Observable<Embedded<DirectedEdesResponse>> {
        if (!this.patternLanguage) {
            return EMPTY;
        }
        return this.patternLanguageService.getDirectedEdges(this.patternLanguage).pipe(
            tap((edges) => {
                this.directedPatternRelations = edges._embedded ?
                    edges._embedded.directedEdgeModels.filter(edge => edge.sourcePatternId === this.pattern.id ||
                        edge.targetPatternId === this.pattern.id) : [];
            }));
    }

    private getUndirectedEdges(): Observable<Embedded<UndirectedEdesResponse>> {
        if (!this.patternLanguage) {
            return EMPTY;
        }
        return this.patternLanguageService.getUndirectedEdges(this.patternLanguage).pipe(
            tap((edges) => {
                this.undirectedPatternRelations = edges._embedded ?
                    edges._embedded.undirectedEdgeModels.filter(edge => edge.pattern1Id === this.pattern.id || edge.pattern2Id === this.pattern.id) : [];
            }));
    }

    private savePattern(section: string, previousContent: any, instance: MarkdownPatternSectionContentComponent) {
        this.patternService.updatePattern(this.pattern._links.self.href, this.pattern).subscribe(() => this.toasterService.pop('success', 'Saved pattern'),
            (error) => {
                this.toasterService.pop('error', 'Could not save pattern, resetting content', error.message);
                // reset text of the section:
                this.pattern.content[section] = previousContent;
                instance.changeText(previousContent);
                this.cdr.detectChanges();
            });
    }

    private getData(): void {
        this.patternLanguageService.getPatternLanguageById(this.patternLanguageId).pipe(
            tap((patternLanguage) => this.patternLanguage = patternLanguage),
            switchMap(() => this.getPatternInfos()),
            switchMap(() => this.retrievePatternLanguageData())
        ).subscribe((patternLanguage: any) => {
            this.patternLanguage.patternSchema.patternSectionSchemas.forEach((sec: PatternSectionSchema) => {
                this.createSectionComponent(sec.name);
            });
            this.cdr.detectChanges();
            this.isLoading = false;
        });
    }
}
