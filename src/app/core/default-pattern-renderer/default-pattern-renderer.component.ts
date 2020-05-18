import {AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToasterService} from 'angular2-toaster';
import {PatternPropertyDirective} from '../component/markdown-content-container/pattern-property.directive';
import {MatDialog} from '@angular/material/dialog';
import {CreatePatternRelationComponent} from '../component/create-pattern-relation/create-pattern-relation.component';
import Pattern from '../model/hal/pattern.model';
import {PatternLanguageService} from '../service/pattern-language.service';
import PatternLanguage from '../model/hal/pattern-language.model';
import {PatternService} from '../service/pattern.service';
// tslint:disable-next-line:max-line-length
import {MarkdownPatternSectionContentComponent} from '../component/markdown-content-container/markdown-pattern-sectioncontent/markdown-pattern-section-content.component';
import {DataChange} from '../component/markdown-content-container/interfaces/DataRenderingComponent.interface';
import PatternSectionSchema from '../model/hal/pattern-section-schema.model';
import {map, switchMap, tap} from 'rxjs/operators';
import {EMPTY, forkJoin, Observable} from 'rxjs';
import {PatternRelationDescriptorService} from '../service/pattern-relation-descriptor.service';
import {DirectedEdgeModel} from '../model/hal/directed-edge.model';
import {Embedded} from '../model/hal/embedded';
import {DirectedEdesResponse} from '../model/hal/directed-edes-response.interface';
import {UndirectedEdesResponse} from '../model/hal/undirected-edes-response.interface';
import {UndirectedEdgeModel} from '../model/hal/undirected-edge.model';

@Component({
    selector: 'pp-default-pattern-renderer',
    templateUrl: './default-pattern-renderer.component.html',
    styleUrls: ['./default-pattern-renderer.component.scss']
})
export class DefaultPatternRendererComponent implements AfterViewInit {
    @ViewChild(PatternPropertyDirective) ppPatternProperty: PatternPropertyDirective;
    isLoading = true;
    isLoadingLinks = true;
    isEditingEnabled = true;
    patternLanguage: PatternLanguage;
    pattern: Pattern;
    patterns: Array<Pattern>;
    private directedPatternRelations: Array<DirectedEdgeModel>;
    private undirectedPatternRelations: Array<UndirectedEdgeModel>;
    private viewContainerRef;
    private patternLanguageId: string;
    private patternId: string;

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
        this.patternLanguageId = this.activatedRoute.snapshot.paramMap.get('patternLanguageId');
        this.patternId = this.activatedRoute.snapshot.paramMap.get('patternId');
        this.getData();
    }

    addLink() {
        if (!this.patterns || this.patterns.length === 0) {
            this.patternService.getPatternsByUrl(this.patternLanguage._links.patterns.href).subscribe((patterns) => {
                this.patterns = patterns;
                this.patterns.sort((p1, p2) => p1.name.localeCompare(p2.name));
                this.showAndHandleLinkDialog();
            });
        } else {
            this.showAndHandleLinkDialog();
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
          console.log('tried to get patterns before the pattern language object with the url was instanciated');
          return EMPTY;
        }
        return this.patternService.getPatternById(this.patternLanguage, this.patternId).pipe(
          tap(pattern => this.pattern = pattern),
          switchMap((pat) => {
            const content = this.patternService.getPatternContentByPattern(this.pattern);
            const renderedContent = this.patternService.getPatternRenderedContentByPattern(this.pattern);
            return forkJoin([content, renderedContent]);
          }),
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
        this.patternRelationDescriptorService.getEdgeByUrl(url, edge)
            .subscribe(
                edgeResult => {
                    edge instanceof DirectedEdgeModel ?
                        this.directedPatternRelations.push(edgeResult as DirectedEdgeModel) :
                        this.undirectedPatternRelations.push(edgeResult as UndirectedEdgeModel);
                }
            );
    }

    private createSectionComponent(section: string) {
        if (!this.pattern.renderedContent) {
            return;
        }
        const renderedContent = this.pattern.renderedContent[section];
        const content = this.pattern.content[section];

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(MarkdownPatternSectionContentComponent);
        const componentRef = this.viewContainerRef.createComponent(componentFactory);
        const instance = (<MarkdownPatternSectionContentComponent>componentRef.instance);
        instance.renderedData = renderedContent;
        instance.data = content;
        instance.title = section;
        instance.isEditingEnabled = this.isEditingEnabled;
        instance.changeContent.subscribe((dataChange: DataChange) => {
            this.pattern.content[section] = dataChange.currentValue;
            this.cdr.detectChanges();
            this.savePattern(section, dataChange.previousValue, instance);
            this.cdr.detectChanges();
        });
    }

    private getDirectedEdges(): Observable<Embedded<DirectedEdesResponse>> {
        if (!this.patternLanguage) {
            return EMPTY;
        }
        return this.patternLanguageService.getDirectedEdges(this.patternLanguage).pipe(
            tap((edges) => {
                this.directedPatternRelations = edges && edges._embedded ?
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
                this.undirectedPatternRelations = edges && edges._embedded ?
                    edges._embedded.undirectedEdgeModels.filter(edge => edge.pattern1Id === this.pattern.id || edge.pattern2Id === this.pattern.id) : [];
            }));
    }

    private savePattern(section: string, previousContent: any, instance: MarkdownPatternSectionContentComponent) {
        this.patternService.updatePattern(this.pattern._links.self.href, this.pattern).subscribe(data => {
            const test = data.body.renderedContent[section];
            this.pattern.renderedContent[section] = test;
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
    }

    private getData(): void {
        // get pattern language object with all the hal links that we need
        this.patternLanguageService.getPatternLanguageByID(this.patternLanguageId).pipe(
            tap((patternLanguage) => this.patternLanguage = patternLanguage),
            // get our individual pattern
            switchMap(() => this.fillPatternSectionData()),
            switchMap(() => this.getPatternLanguageLinks())).subscribe(() =>
            this.cdr.detectChanges());
    }

    private fillPatternSectionData() {
        return this.getPatternInfos().pipe(
            tap(() => {
                this.patternLanguage.patternSchema.patternSectionSchemas.forEach((sec: PatternSectionSchema) => {
                    this.createSectionComponent(sec.name);
                });
                this.isLoading = false;
            }));
    }

    private showAndHandleLinkDialog() {
        const dialogRef = this.dialog.open(CreatePatternRelationComponent, {
                data: {firstPattern: this.pattern, patterns: this.patterns}
            }
        );
        dialogRef.afterClosed().pipe(
            switchMap(result => {
                return result ? this.addContentInfoToPattern(result) : EMPTY;
            }),
            switchMap((edge) => {
                return edge ? this.insertEdge(edge) : EMPTY;
            }))
            .subscribe(
                data => {
                    this.toasterService.pop('success', 'Created new Relation');
                }
            );
    }

    private insertEdge(edge): Observable<any> {
        return this.patternRelationDescriptorService.addRelationToPL(this.patternLanguage, edge).pipe(
            tap((res) => res ? this.getPatternByLink(edge, res) : EMPTY));
    }
}
