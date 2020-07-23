import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DesignModelService } from '../../service/design-model.service';
import { PatternLanguageService } from '../../../core/service/pattern-language.service';
import { GraphInputData } from '../../../core/model/graph-input-data.interface';
import { UndirectedEdgeModel } from '../../../core/model/hal/undirected-edge.model';
import { DirectedEdgeModel } from '../../../core/model/hal/directed-edge.model';
import { ConcreteSolutionService } from '../../service/concrete-solution.service';
import {
  CreateEditComponentDialogType,
  CreateEditPatternLanguageComponent
} from '../../../core/component/create-edit-pattern-language/create-edit-pattern-language.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TechnologySelectorComponent } from '../technology-selector/technology-selector.component';


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

  previousUserQuery: string = '';
  userQuery: string = '';

  private designModelId: string;


  constructor(private activatedRoute: ActivatedRoute,
              private designModelService: DesignModelService,
              private concreteSolutionService: ConcreteSolutionService,
              private patternLanguageService: PatternLanguageService,
              private dialog: MatDialog) {
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
        newGraphData[ key ] = this.graphData[ key ];
      });

      Object.keys(data).forEach(key => {
        newGraphData[ key ] = data[ key ];
      });

      this.graphData = newGraphData;
    }

    console.debug('New graphData is', this.graphData);
  }


  private loadDesignModel(id): void {
    this.designModelId = id;

    this.designModelService.getPatternContainerByUuid(id).subscribe(patternContainer => {
      console.debug('Fetched pattern container is:', patternContainer);

      this.patchGraphData({ patternContainer: patternContainer, patterns: patternContainer });

      this.designModelService.getEdges().subscribe(edges => this.patchGraphData({ edges: edges }));
    });

    this.loadConcreteSolutions();
  }


  addedEdgeInGraphView(event) {
    this.designModelService.addEdge(event).then(
      () => this.reloadGraph()
    );
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
      this.filterConcreteSolutions();
    });
  }


  selectTechnology(): Promise<{}> {
    return new Promise<{}>(resolve => {
      const response = this.concreteSolutionService.getConcreteSolutionSet(this.designModelId);

      const dialogRef = this.dialog.open(TechnologySelectorComponent, { data: { options: response } });

      dialogRef.componentInstance.getSelectedTechnology().subscribe(technology => {
        dialogRef.close();
        resolve(technology);
      });
    });
  }


  aggregateConcreteSolutions(): void {
    this.selectTechnology().then(technology => {
      this.concreteSolutionService.aggregateDesignModel(this.designModelId, technology);
    });
  }


  filterConcreteSolutions(): void {
    this.concreteSolutions = this.concreteSolutionsUnfiltered.filter(cs => cs.aggregatorType.toLowerCase().indexOf(this.userQuery.toLowerCase()) !== -1);
    if(this.previousUserQuery !== this.userQuery) {
      this.reloadGraph();
    }
    this.previousUserQuery = this.userQuery;
  }
}
