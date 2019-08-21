import { ChangeDetectorRef, Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DefaultPatternLoaderService } from '../service/loader/default-pattern-loader.service';
import { DefaultPlLoaderService } from '../service/loader/default-pl-loader.service';
import { PatternOntologyService } from '../service/pattern-ontology.service';
import { ToasterService } from 'angular2-toaster';
import { SectionResponse } from '../service/data/SectionResponse.interface';
import { PlRestrictionLoaderService } from '../service/loader/pattern-language-loader/pl-restriction-loader.service';
import { PatternpropertyDirective } from '../component/type-templates/patternproperty.directive';
import { PatternLanguageSectionRestriction } from '../model/PatternLanguageSectionRestriction.model';
import PatternPedia from '../model/pattern-pedia.model';
import { IriConverter } from '../util/iri-converter';
import { DividerComponent } from '../component/type-templates/divider/divider.component';
import { StringComponent } from '../component/type-templates/xsd/string/string.component';
import { IntegerComponent } from '../component/type-templates/xsd/integer/integer.component';
import { DateComponent } from '../component/type-templates/xsd/date/date.component';
import { ImageComponent } from '../component/type-templates/dcmitype/image/image.component';
import { DataRenderingComponent } from '../component/type-templates/interfaces/DataRenderingComponent.interface';
import { PatternLanguagePatterns } from '../model/pattern-language-patterns.model';
import { GithubPersistenceService } from '../service/github-persistence.service';
import { CookieService } from 'ngx-cookie-service';
import { DefaultPatternRelationsLoaderService } from '../service/loader/pattern-language-loader/default-pattern-relations-loader.service';
import { DirectedPatternRelationDescriptorResponse } from '../service/data/DirectedPatternRelationDescriptorResponse.interface';
import { MatDialog } from '@angular/material';
import { CreatePatternRelationComponent } from '../component/create-pattern-relation/create-pattern-relation.component';
import Pattern from '../model/pattern.model';

@Component({
  selector: 'pp-default-pattern-renderer',
  templateUrl: './default-pattern-renderer.component.html',
  styleUrls: ['./default-pattern-renderer.component.scss']
})
export class DefaultPatternRendererComponent implements OnInit {
  private sectionRestritions: Map<string, PatternLanguageSectionRestriction[]>;
  private patterns: Map<string, any>;
  private pattern: Pattern;
  private allRelations: DirectedPatternRelationDescriptorResponse[];
  private patternRelations: DirectedPatternRelationDescriptorResponse[];
  private patternList: Pattern[];

  constructor(private patternLoaderService: DefaultPatternLoaderService,
              private sectionLoader: PlRestrictionLoaderService, private plLoader: DefaultPlLoaderService, private activatedRoute: ActivatedRoute,
              private pos: PatternOntologyService, private toasterService: ToasterService, private cdr: ChangeDetectorRef,
              private componentFactoryResolver: ComponentFactoryResolver,
              private githubPersistenceService: GithubPersistenceService,
              private cookieService: CookieService,
              private relationsLoaderService: DefaultPatternRelationsLoaderService,
              public dialog: MatDialog) {
  }

  @ViewChild(PatternpropertyDirective) ppPatternproperty: PatternpropertyDirective;
  plIri: string;
  patternIri: string;
  patternName: string;
  patternNameProperty: string;
  sections: SectionResponse[];
  isLoadingPattern = true;
  isLoadingSection = true;
  isEditingEnabled = false;


  standardPrefixes = new PatternPedia().defaultPrefixes;
  xsdPrefix = this.standardPrefixes.get('xsd').replace('<', '').replace('>', '');
  dcmiPrefix = 'https://purl.org/dc/dcmitype/';


  mappings = [
    {prefix: this.xsdPrefix + 'string', value: StringComponent},
    {prefix: this.xsdPrefix + 'integer', value: IntegerComponent},
    {prefix: this.xsdPrefix + 'positiveInteger', value: IntegerComponent},
    {prefix: this.xsdPrefix + 'nonPositiveInteger', value: IntegerComponent},
    {prefix: this.xsdPrefix + 'nonNegativeInteger', value: IntegerComponent},
    {prefix: this.xsdPrefix + 'negativeInteger', value: IntegerComponent},
    {prefix: this.xsdPrefix + 'date', value: DateComponent},
    {prefix: this.dcmiPrefix + 'Image', value: ImageComponent},
  ];
  defaultComponentForType = new Map(this.mappings.map(x => [x.prefix, x.value] as [string, any]));


  ngOnInit() {

    this.plIri = IriConverter.convertIdToIri(this.activatedRoute.snapshot.paramMap.get('plid'));
    this.patternIri = IriConverter.convertIdToIri(this.activatedRoute.snapshot.paramMap.get('pid'));
    this.isEditingEnabled = !!this.cookieService.get('patternpedia_github_token');

    this.loadInfos().then(() => {
      const viewContainerRef = this.ppPatternproperty.viewContainerRef;
      viewContainerRef.clear();

      const componentDividerFactory = this.componentFactoryResolver.resolveComponentFactory(DividerComponent);
      this.sections.forEach((sec: SectionResponse) => {
        this.createSectionComponent(sec.section.value, viewContainerRef, componentDividerFactory);
      });
    });


  }


  private async loadInfos(): Promise<any> {


    await this.pos.loadUrisToStore([{token: null, value: this.plIri}]);

    // load patternlanguage and patternlanguage-Patterns file
    const imports = await this.pos.getOWLImports(this.plIri);
    const importedPatternIris = imports.map(i => i.import);
    await  this.pos.loadUrisToStore(importedPatternIris);

    // load pattern relations (links)
    this.relationsLoaderService.supportedIRI = IriConverter.getRelationListIriForPLIri(this.plIri);
    this.relationsLoaderService.selectContentFromStore().then((res) => {

        this.allRelations = Array.from(res.values());
      this.patternRelations = this.allRelations.filter(rel => rel.source.value === this.patternIri || rel.target.value === this.patternIri);
        this.cdr.detectChanges();
      }
    );

    //  load all the data from patternlanguage
    this.plLoader.supportedIRI = this.plIri;
    this.patterns = await this.plLoader.loadContentFromStore();
    this.patternList = Array.from(this.patterns.values()).map(it => it.toPattern(this.plIri));
    this.pattern = this.patterns.get(this.patternIri).toPattern(this.plIri);
    this.patternNameProperty = IriConverter.getFileName(this.plIri) + '#hasName';
    this.isLoadingPattern = false;


    // load section restrictions to be able to get the type for a section
    this.sectionLoader.supportedIRI = this.plIri;
    this.sectionRestritions = await this.sectionLoader.loadContentFromStore();


    // get section in order
    this.sections = await this.plLoader.getPLSections(this.plIri);
    this.isLoadingSection = false;


    if (!this.pattern) {
      Promise.reject(null);

    } else {
      Promise.resolve(null);
    }
  }

  getPatternName(uri: string): string {
    if (!uri) {
      return '';
    }
    if (this.patterns.size > 0) {
      return this.patterns.get(uri).sectionProperties.get(this.patternNameProperty)[0];
    }
    return '';

  }

  private createSectionComponent(section: string, viewContainerRef: any, componentDividerFactory) {
    const properties = this.pattern.sectionsProperties.get(section);
    const sectionRestrictions = this.sectionRestritions.get(section);
    if (section.indexOf('#has') !== -1) {
      const sectionTitle = section.split('#has')[1].replace(/([A-Z])/g, ' $1').trim();

      const type = (sectionRestrictions && !!sectionRestrictions[0] && sectionRestrictions[0].type) ? sectionRestrictions[0].type : this.xsdPrefix + 'string';
      const component = this.defaultComponentForType.get(type) ? this.defaultComponentForType.get(type) : StringComponent;

      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
      const componentRef = viewContainerRef.createComponent(componentFactory);
      const instance = (<DataRenderingComponent>componentRef.instance);
      instance.data = properties.join('\n');
      instance.title = sectionTitle;
      instance.isEditingEnabled = this.isEditingEnabled;
      instance.changeContent.subscribe((data) => {
        this.pattern.sectionsProperties.set(section, [data]);
        this.patterns.set(this.patternIri, this.pattern);
        this.patternList = Array.from(this.patterns.values()).map(it => it.toPattern(this.plIri));
        instance.data = data;
        this.savePatterns();
      });

      viewContainerRef.createComponent(componentDividerFactory); // create divider
    }
  }

  private savePatterns() {

    this.githubPersistenceService.updatePLPatterns(new PatternLanguagePatterns(IriConverter.getPatternListIriForPLIri(this.plIri),
      this.plIri, this.patternList)).subscribe(() => this.toasterService.pop('success', 'Updated patterns'),
      (error) => this.toasterService.pop('error', 'could not update patterns' + error.message));
  }

  addLink() {
    this.dialog.open(CreatePatternRelationComponent, {
        data: {patternName: this.pattern.name, patterns: this.patternList}
      }
    );
  }
}
