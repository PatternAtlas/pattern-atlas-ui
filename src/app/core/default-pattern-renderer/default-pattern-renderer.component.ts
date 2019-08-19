import { ChangeDetectorRef, Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DefaultPatternLoaderService } from '../service/loader/default-pattern-loader.service';
import { DefaultPlLoaderService } from '../service/loader/default-pl-loader.service';
import { PatternOntologyService } from '../service/pattern-ontology.service';
import { PatternProperty } from '../service/data/PatternProperty.interface';
import { ToasterService } from 'angular2-toaster';
import { SectionResponse } from '../service/data/SectionResponse.interface';
import { PlRestrictionLoaderService } from '../service/loader/pattern-language-loader/pl-restriction-loader.service';
import { PatternpropertyDirective } from '../component/type-templates/patternproperty.directive';
import { PatternLanguageSectionRestriction } from '../model/PatternLanguageSectionRestriction.model';
import PatternPedia from '../model/pattern-pedia.model';
import { IriConverter } from '../util/iri-converter';
import { DividerComponent } from '../component/type-templates/divider/divider.component';
import { DataRenderingComponent } from '../component/type-templates/interfaces/DataRenderingComponent.interface';
import { StringComponent } from '../component/type-templates/xsd/string/string.component';
import { IntegerComponent } from '../component/type-templates/xsd/integer/integer.component';
import { DateComponent } from '../component/type-templates/xsd/date/date.component';
import { ImageComponent } from '../component/type-templates/dcmitype/image/image.component';

@Component({
  selector: 'pp-default-pattern-renderer',
  templateUrl: './default-pattern-renderer.component.html',
  styleUrls: ['./default-pattern-renderer.component.scss']
})
export class DefaultPatternRendererComponent implements OnInit {
  private sectionRestritions: Map<string, PatternLanguageSectionRestriction[]>;

  constructor(private patternLoaderService: DefaultPatternLoaderService,
              private sectionLoader: PlRestrictionLoaderService, private plLoader: DefaultPlLoaderService, private activatedRoute: ActivatedRoute,
              private pos: PatternOntologyService, private toasterService: ToasterService, private cdr: ChangeDetectorRef,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  plIri: string;
  patternIri: string;
  patternProperties: PatternProperty[];
  sections: SectionResponse[];
  isLoadingPattern = true;
  isLoadingSection = true;
  @ViewChild(PatternpropertyDirective) ppPatternproperty: PatternpropertyDirective;

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

    this.loadInfos().then(() => {
      const viewContainerRef = this.ppPatternproperty.viewContainerRef;
      viewContainerRef.clear();

      const componentDividerFactory = this.componentFactoryResolver.resolveComponentFactory(DividerComponent);
      this.patternProperties.forEach((property: PatternProperty) => {

        const sectionRestrictions = this.sectionRestritions.get(property.property.value);
        if (property.property.value.indexOf('#has') !== -1) {
          const sectionTitle = property.property.value.split('#has')[1].replace(/([A-Z])/g, ' $1').trim();

          const type = (sectionRestrictions && !!sectionRestrictions[0] && sectionRestrictions[0].type) ? sectionRestrictions[0].type : this.xsdPrefix + 'string';
          let component = this.defaultComponentForType.get(type) ? this.defaultComponentForType.get(type) : StringComponent;

          const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
          const componentRef = viewContainerRef.createComponent(componentFactory);
          const instance = (<DataRenderingComponent>componentRef.instance);
          instance.data = property.predicate.value;
          instance.title = sectionTitle;
          instance.changeContent.subscribe((data) => console.log('Trigger saving new data :' + data));

          viewContainerRef.createComponent(componentDividerFactory); // create divider
        }

      });
    });


  }

  getSectionName(iri: string): string {
    return IriConverter.getSectionName(iri);
  }

  getSectionInfo(iri: string): SectionResponse {
    if (!iri || !this.sections) {
      return;
    }
    return this.sections.filter(s => s.section.value === iri)[0];
  }

  private async loadInfos(): Promise<any> {


    await this.pos.loadUrisToStore([{token: this.plIri, value: this.plIri}]);

    // load patternlanguage and patternlanguage-Patterns file
    const imports = await this.pos.getOWLImports(this.plIri);
    const importedPatternIris = imports.map(i => i.import);
    await  this.pos.loadUrisToStore(importedPatternIris);

    this.patternLoaderService.patternIri = this.patternIri;
    this.patternLoaderService.supportedIRI = IriConverter.getPatternListIriForPLIri(this.plIri);
    this.sectionLoader.supportedIRI = this.plIri;
    const loadingResult = await this.patternLoaderService.selectContentFromStore();
    this.patternProperties = Array.from(loadingResult.values());
    this.isLoadingPattern = false;

    // not that we loaded the data for the pattern, load all the data from patternlanguage

    this.plLoader.supportedIRI = this.plIri;
    await this.plLoader.loadContentFromStore();

    this.sectionRestritions = await this.sectionLoader.loadContentFromStore();

    this.sections = await this.plLoader.getPLSections(this.plIri);
    this.isLoadingSection = false;

    if (!this.patternProperties) {
      this.toasterService.pop('success', 'Loaded all infos');
      Promise.reject(null);

    } else {
      Promise.resolve(null);
    }
  }
}
