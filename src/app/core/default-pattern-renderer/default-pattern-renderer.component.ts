import { ChangeDetectorRef, Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { IriConverter } from '../util/iri-converter';
import { ActivatedRoute } from '@angular/router';
import { DefaultPatternLoaderService } from '../service/loader/default-pattern-loader.service';
import { DefaultPlLoaderService } from '../service/loader/default-pl-loader.service';
import { PatternOntologyService } from '../service/pattern-ontology.service';
import { PatternProperty } from '../service/data/PatternProperty.interface';
import { ToasterService } from 'angular2-toaster';
import { SectionResponse } from '../service/data/SectionResponse.interface';
import { PlRestrictionLoaderService } from '../service/loader/pattern-language-loader/pl-restriction-loader.service';
import { IntegerComponent } from '../component/type-templates/xsd/integer/integer.component';
import { PatternpropertyDirective } from '../component/type-templates/patternproperty.directive';
import { PatternLanguageSectionRestriction } from '../model/PatternLanguageSectionRestriction.model';

@Component({
  selector: 'pp-default-pattern-renderer',
  templateUrl: './default-pattern-renderer.component.html',
  styleUrls: ['./default-pattern-renderer.component.scss']
})
export class DefaultPatternRendererComponent implements OnInit {
  private sectionRestritions: Map<string, PatternLanguageSectionRestriction[]>;

  constructor(private patternLoaderService: DefaultPatternLoaderService, private sectionLoader: PlRestrictionLoaderService, private plLoader: DefaultPlLoaderService, private activatedRoute: ActivatedRoute,
              private pos: PatternOntologyService, private toasterService: ToasterService, private cdr: ChangeDetectorRef,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  plIri: string;
  patternIri: string;
  patternProperties: PatternProperty[];
  sections: SectionResponse[];
  isLoadingPattern = true;
  isLoadingSection = true;
  @ViewChild(PatternpropertyDirective, {static: true}) ppPatternproperty: PatternpropertyDirective;


  ngOnInit() {

    this.plIri = IriConverter.convertIdToIri(this.activatedRoute.snapshot.paramMap.get('plid'));
    this.patternIri = IriConverter.convertIdToIri(this.activatedRoute.snapshot.paramMap.get('pid'));

    this.loadInfos().then(() => {
      const viewContainerRef = this.ppPatternproperty.viewContainerRef;
      viewContainerRef.clear();
      this.patternProperties.forEach(property => {

        // TODO: Select component based on section restriction (e.g. xsd:integer, xsd:string, dcmitype:Image)

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(IntegerComponent);
        const componentRef = viewContainerRef.createComponent(componentFactory);
        (<IntegerComponent>componentRef.instance).data = property.predicate.value;
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
    this.patternLoaderService.supportedIRI = this.patternIri;
    this.sectionLoader.supportedIRI = this.plIri;

    await this.pos.loadUriToStore(this.patternIri);


    const loadingResult = await this.patternLoaderService.selectContentFromStore();
    this.patternProperties = Array.from(loadingResult.values());
    this.isLoadingPattern = false;

    // not that we loaded the data for the pattern, load all the data from patternlanguage
    await this.pos.loadUriToStore(this.plIri);
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
