import { ChangeDetectorRef, Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DefaultPatternLoaderService } from '../service/loader/default-pattern-loader.service';
import { DefaultPlLoaderService } from '../service/loader/default-pl-loader.service';
import { PatternOntologyService } from '../service/pattern-ontology.service';
import { ToasterService } from 'angular2-toaster';
import { PlRestrictionLoaderService } from '../service/loader/pattern-language-loader/pl-restriction-loader.service';
import { PatternpropertyDirective } from '../component/markdown-content-container/patternproperty.directive';
import { IriConverter } from '../util/iri-converter';
import { DividerComponent } from '../component/divider/divider.component';
import { DataRenderingComponent } from '../component/markdown-content-container/interfaces/DataRenderingComponent.interface';
import { PatternLanguagePatterns } from '../model/pattern-language-patterns.model';
import { GithubPersistenceService } from '../service/github-persistence.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material';
import { CreatePatternRelationComponent, DialogDataResult } from '../component/create-pattern-relation/create-pattern-relation.component';
import Pattern from '../model/pattern.model';
import { DirectedPatternRelationDescriptorIndividual } from '../model/directed-pattern-relation-descriptor-individual';
import { PatternRelationDescriptorDirection } from '../model/pattern-relation-descriptor-direction.enum';
import { UndirectedPatternRelationDescriptorIndividual } from '../model/undirected-pattern-relation-descriptor-individual';
import { DefaultPatternDirectedRelationsLoaderService } from '../service/loader/pattern-language-loader/default-pattern-directed-relations-loader.service';
import { PatternRelations } from '../model/pattern-relations';
import { DefaultPatternUndirectedRelationsLoaderService } from '../service/loader/pattern-language-loader/default-pattern-undirected-relations-loader.service';
import { MarkdownPatternSectioncontentComponent } from '../component/markdown-content-container/markdown-pattern-sectioncontent/markdown-pattern-sectioncontent.component';
import { LoadCompletePatternlanguageService } from '../service/loader/complete-patternlanguage-loader.service';
import { PatternLanguageRelations } from '../model/pattern-language-relations.model';
import { EMPTY } from 'rxjs';
import { switchMap, tap } from 'rxjs/internal/operators';

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

  constructor(private patternLoaderService: DefaultPatternLoaderService,
              private sectionLoader: PlRestrictionLoaderService, private plLoader: DefaultPlLoaderService, private activatedRoute: ActivatedRoute,
              private pos: PatternOntologyService, private toasterService: ToasterService, private cdr: ChangeDetectorRef,
              private componentFactoryResolver: ComponentFactoryResolver,
              private githubPersistenceService: GithubPersistenceService,
              private cookieService: CookieService,
              private directedRelationsLoaderService: DefaultPatternDirectedRelationsLoaderService,
              private undirectedRelationsLoaderService: DefaultPatternUndirectedRelationsLoaderService,
              private completePatternLanguageLoadingService: LoadCompletePatternlanguageService,
              public dialog: MatDialog) {
  }


  ngOnInit(): void {

    this.plIri = IriConverter.convertIdToIri(this.activatedRoute.snapshot.paramMap.get('plid'));
    this.patternIri = IriConverter.convertIdToIri(this.activatedRoute.snapshot.paramMap.get('pid'));
    this.isEditingEnabled = !!this.cookieService.get('patternpedia_github_token');

    this.loadInfosAndInitPage();


  }


  loadInfosAndInitPage(): void {
    this.completePatternLanguageLoadingService.loadCompletePatternLanguage(this.plIri).then(completePL => {
      this.plLoader.supportedIRI = this.plIri;
      this.patternList = completePL.patterns;
      this.pattern = this.patternList.find(pat => pat.iri === this.patternIri);
      this.isLoading = false;

      this.allRelations = completePL.patternRelations;

      this.updateUIForPatternRelations();
      this.sections = completePL.patternlanguage.sections;

      const viewContainerRef = this.ppPatternproperty.viewContainerRef;
      viewContainerRef.clear();

      const componentDividerFactory = this.componentFactoryResolver.resolveComponentFactory(DividerComponent);
      this.sections.forEach((sec: string) => {
        this.createSectionComponent(sec, viewContainerRef, componentDividerFactory);
      });

      this.isLoading = false;
    });


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
        const patternIndex = this.patternList.findIndex(pat => pat.iri === this.patternIri);
        this.patternList[patternIndex] = this.pattern;
        instance.data = data;
        this.savePatterns();
      });

      viewContainerRef.createComponent(componentDividerFactory); // create divider
    }
  }

  private savePatterns() {

    this.githubPersistenceService.updatePLPatterns(new PatternLanguagePatterns(IriConverter.getPatternListIriForPLIri(this.plIri),
      this.plIri, this.patternList)).subscribe(() => {
        this.reloadInfoAfterPatternUpdate();
        this.toasterService.pop('success', 'Updated patterns');
      },
      (error) => this.toasterService.pop('error', 'could not update patterns' + error.message));
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
        patternRelations = new PatternLanguageRelations(IriConverter.getRelationListIriForPLIri(this.plIri), this.plIri, this.allRelations);
      }),
      switchMap(() =>
        relationAdded ? this.githubPersistenceService.updatePLRelations(patternRelations) : EMPTY)).subscribe(
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
          dialogResult.description ? dialogResult.description : null));
        break;
      case PatternRelationDescriptorDirection.DirectedLeft:
        this.allRelations.directed.push(new DirectedPatternRelationDescriptorIndividual(dialogResult.toPattern, this.pattern,
          dialogResult.description ? dialogResult.description : null));
        break;
      case PatternRelationDescriptorDirection.UnDirected:
        this.allRelations.undirected.push(new UndirectedPatternRelationDescriptorIndividual(this.pattern, dialogResult.toPattern,
          dialogResult.description ? dialogResult.description : null));
        break;
      default:
        return false;
    }
    this.updateUIForPatternRelations();
    return true;
  }


  private updateUIForPatternRelations() {
    this.directedPatternRelations = this.allRelations.directed.filter((rel: DirectedPatternRelationDescriptorIndividual) =>
      rel.source.iri === this.patternIri || rel.target.iri === this.patternIri);
    this.undirectedPatternRelations = this.allRelations.undirected.filter((rel: UndirectedPatternRelationDescriptorIndividual) =>
      rel.hasPattern.some((pat) => pat.iri === this.patternIri));
    this.cdr.detectChanges();
  }

  private reloadInfoAfterPatternUpdate() {
    // remove the old data for patterns from our local storage, because we just updated it
    this.pos.clearGraph(IriConverter.getPatternListIriForPLIri(this.plIri)).then(
      () =>  // reload the data to get the new values
        this.loadInfosAndInitPage());
  }
}
