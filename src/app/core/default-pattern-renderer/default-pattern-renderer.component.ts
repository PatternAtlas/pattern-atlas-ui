import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IriConverter } from '../util/iri-converter';
import { ActivatedRoute } from '@angular/router';
import { DefaultPatternLoaderService } from '../service/loader/default-pattern-loader.service';
import { DefaultPlLoaderService } from '../service/loader/default-pl-loader.service';
import { PatternOntologyService } from '../service/pattern-ontology.service';
import { PatternProperty } from '../service/data/PatternProperty.interface';
import { ToasterService } from 'angular2-toaster';
import { SectionResponse } from '../service/data/SectionResponse.interface';

@Component({
  selector: 'pp-default-pattern-renderer',
  templateUrl: './default-pattern-renderer.component.html',
  styleUrls: ['./default-pattern-renderer.component.scss']
})
export class DefaultPatternRendererComponent implements OnInit {

  constructor(private patternLoaderService: DefaultPatternLoaderService, private plLoader: DefaultPlLoaderService, private activatedRoute: ActivatedRoute,
              private pos: PatternOntologyService, private toasterService: ToasterService, private cdr: ChangeDetectorRef) {
  }

  plIri: string;
  patternIri: string;
  patternProperties: PatternProperty[];
  sectionInfos: SectionResponse[];
  isLoadingPattern = true;
  isLoadingSection = true;


  ngOnInit() {

    this.plIri = IriConverter.convertIdToIri(this.activatedRoute.snapshot.paramMap.get('plid'));
    this.patternIri = IriConverter.convertIdToIri(this.activatedRoute.snapshot.paramMap.get('pid'));
    this.patternLoaderService.supportedIRI = this.patternIri;

    const importedPatternIris = [{token: this.patternIri, value: IriConverter.getFileName(this.patternIri)}];
    this.pos.loadUrisToStore(importedPatternIris).then(() => {
      this.toasterService.pop('success', 'Loaded Pattern Infos');
      this.patternLoaderService.selectContentFromStore().then((result) => {
        this.patternProperties = result;
        this.isLoadingPattern = false;
      });

      this.plLoader.getPLSections(this.plIri).then((result: SectionResponse[]) => {
        this.sectionInfos = result;
        this.isLoadingSection = false;
      });
    });


  }

  getSectionName(iri: string): string {
    return IriConverter.getSectionName(iri);
  }

  getSectionInfo(iri: string): SectionResponse {
    if (!iri || !this.sectionInfos) {
      return;
    }
    return this.sectionInfos.filter(s => s.property.value === iri)[0];
  }

}
