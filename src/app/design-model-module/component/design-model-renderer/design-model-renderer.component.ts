import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DesignModelService } from '../../service/design-model.service';
import { PatternViewService } from '../../../core/service/pattern-view.service';
import { PatternLanguageService } from '../../../core/service/pattern-language.service';
import { GraphInputData } from '../../../core/model/graph-input-data.interface';


@Component({
  selector: 'pp-design-model-renderer',
  templateUrl: './design-model-renderer.component.html',
  styleUrls: ['./design-model-renderer.component.scss']
})
export class DesignModelRendererComponent implements OnInit {

  isLoading = true;


  graphData: GraphInputData = {
    patterns: [],
    edges: [],
    copyOfLinks: [],
    patternLanguage: null,
    patternContainer: null,
    patternLanguages: []
  };


  private designModelId: [];


  constructor(private activatedRoute: ActivatedRoute,
              private designModelService: DesignModelService,
              private patternLanguageService: PatternLanguageService) {
  }


  ngOnInit(): void {
    this.patternLanguageService.getPatternLanguages().subscribe(patternLanguages => {
      this.patchGraphData({
        patternLanguages: patternLanguages
      });

      this.isLoading = false;
    });


    this.activatedRoute.params.subscribe(pathParams => {
      this.loadDesignModel(pathParams.designModelUri);
    });
  }


  private patchGraphData(data?: object): void {
    if (data) {
      Object.keys(data).forEach(key => {
        this.graphData[ key ] = data[ key ];
      });
    }

    console.debug('New graphData is', this.graphData);
  }


  private loadDesignModel(id): void {
    this.designModelId = id;
    this.designModelService.getDesignModelByUuid(id).subscribe(dm => {
      console.debug('Fetched design model is:', dm);
      this.patchGraphData({ patternContainer: dm, patterns: dm.patterns });
    });
  }


  addedEdgeInGraphView(event) {
    console.error('TODO: IMPLEMENT', this);
  }


  reloadGraph() {
    this.loadDesignModel(this.designModelId);
  }
}
