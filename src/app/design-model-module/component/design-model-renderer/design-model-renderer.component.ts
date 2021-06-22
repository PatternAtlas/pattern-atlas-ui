import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DesignModelService } from '../../service/design-model.service';
import { PatternLanguageService } from '../../../core/service/pattern-language.service';
import { GraphInputData } from '../../../core/model/graph-input-data.interface';
import { ConcreteSolutionService } from '../../service/concrete-solution.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Pattern } from '../../../graph/model';

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

  showConcreteSolutions = false;

  concreteSolutionsUnfiltered;

  concreteSolutions;

  userQueryCurrentValue: string;
  userQueryInput = new FormControl('');

  aggregationAssignments: { [key: string]: string } = {};

  private designModelId: string;
  private designModelPatterns: Pattern[];

  static concreteSolutionFulfills(concreteSolutionProperties, userQuery: string): boolean {
    if (!userQuery.length) {
      return true;
    }

    const result = Function('"use strict"; return ((cs) => { return ' + userQuery + '})')()(concreteSolutionProperties);
    console.debug(userQuery, result, !!result, concreteSolutionProperties);
    return !!result;
  }

  constructor(private activatedRoute: ActivatedRoute,
              private designModelService: DesignModelService,
              private concreteSolutionService: ConcreteSolutionService,
              private patternLanguageService: PatternLanguageService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.patternLanguageService.getPatternLanguages().subscribe(patternLanguages => {
      this.patchGraphData({
        patternLanguages
      });

      this.isLoading = false;
    });

    this.activatedRoute.params.subscribe(pathParams => {
      this.loadDesignModel(pathParams.designModelUri);
    });

    this.userQueryInput.valueChanges.subscribe(userQuery => this.filterConcreteSolutions(userQuery));
  }

  private patchGraphData(data?: object): void {
    const newGraphData = {
      patterns: [],
      edges: [],
      copyOfLinks: [],
      patternLanguage: null,
      patternContainer: null,
      patternLanguages: []
    };

    if (data) {
      Object.keys(this.graphData).forEach(key => {
        newGraphData[key] = this.graphData[key];
      });

      Object.keys(data).forEach(key => {
        newGraphData[key] = data[key];
      });

      this.graphData = newGraphData;
    }

    console.debug('New graphData is', this.graphData);
  }

  private loadDesignModel(id): void {
    this.designModelId = id;

    this.designModelService.getPatternContainerByUuid(id).subscribe(patternContainer => {
      console.debug('Fetched pattern container is:', patternContainer);

      this.designModelPatterns = patternContainer.patterns;

      this.patchGraphData({ patternContainer, patterns: patternContainer });

      this.designModelService.getEdges().subscribe(edges => this.patchGraphData({ edges }));
    });

    this.loadConcreteSolutions();
  }

  addedEdgeInGraphView(event) {
    this.designModelService.addEdge(event).then(
      () => this.reloadGraph()
    ).catch(reason => console.error(reason));
  }

  removedEdgeInGraphView(event) {
    this.designModelService.deleteEdge(event);
  }

  reloadGraph() {
    this.loadDesignModel(this.designModelId);
  }

  toggleShowConcreteSolutions() {
    this.showConcreteSolutions = !this.showConcreteSolutions;
    if (this.showConcreteSolutions) {
      this.reloadGraph();
    }
  }

  deletePatternInstance(uuid: string): void {
    this.designModelService.deletePattern(uuid).subscribe(
      () => this.reloadGraph()
    );
  }

  loadConcreteSolutions(): void {
    this.concreteSolutionService.getConcreteSolutionSet(this.designModelId).subscribe(cs => {
      this.concreteSolutionsUnfiltered = cs;
      this.filterConcreteSolutions(this.userQueryInput.value);
    });
  }

  aggregationAssignmentsUpdate(aggregationAssignments: { [key: string]: string }): void {
    console.warn(aggregationAssignments);
    this.aggregationAssignments = aggregationAssignments;
  }

  aggregateConcreteSolutions(): void {
    this.concreteSolutionService.aggregateDesignModel(this.designModelId, this.aggregationAssignments);
  }

  filterConcreteSolutions(userQuery: string): void {
    if (this.userQueryCurrentValue === userQuery) {
      return;
    }
    this.userQueryCurrentValue = userQuery;

    try {
      this.concreteSolutions = this.concreteSolutionsUnfiltered.map(cs => {
        cs.fulfills = DesignModelRendererComponent.concreteSolutionFulfills(cs, userQuery);
        return cs;
      });
      this.reloadGraph();
    } catch (e) {
      this.userQueryInput.setErrors({ invalidSyntax: true });
    }
  }
}
