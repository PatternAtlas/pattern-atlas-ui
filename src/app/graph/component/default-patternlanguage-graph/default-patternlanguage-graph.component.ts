import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { PatternGraphTemplateComponent } from '../pattern-graph-template/pattern-graph-template.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterFactoryService } from '../../../filter/service/filter-factory.service';
import { MatDialog } from '@angular/material';
import { PatternDataLoaderService } from '../../loader/pattern-data-loader.service';
import { PatternOntologyService } from '../../../core/service/pattern-ontology.service';
import { DefaultPlLoaderService } from '../../../core/service/loader/default-pl-loader.service';
import { IriConverter } from '../../../core/util/iri-converter';

@Component({
  selector: 'pp-default-patternlanguage-graph',
  templateUrl: '../pattern-graph-template/pattern-graph-template.component.html', // ../pattern-graph-template/pattern-graph-template.component.html', // ../../../../../graph/component/pattern-graph-template/pattern-graph-template.component.html
  styleUrls: ['../pattern-graph-template/pattern-graph-template.component.scss']
})
export class DefaultPatternlanguageGraphComponent extends PatternGraphTemplateComponent<any> implements OnInit {

  constructor(public pos: PatternOntologyService,
              public router: Router,
              public activatedRoute: ActivatedRoute,
              public zone: NgZone,
              public dialog: MatDialog,
              public filterFactory: FilterFactoryService,
              public patternLoader: DefaultPlLoaderService,
              public loader: PatternDataLoaderService,
              public cdr: ChangeDetectorRef) {
    super(pos, loader, dialog, router, activatedRoute, zone, filterFactory, cdr);
  }

  createPattern(value: any): any {
    return {id: IriConverter.convertIriToId(value.uri), name: value.toPattern(this.languageUri).name};
  }


  ngOnInit() {
    super.ngOnInit();
  }

}
