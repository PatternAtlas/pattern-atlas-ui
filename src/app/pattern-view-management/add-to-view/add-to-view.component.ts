import {Component, Inject, OnInit} from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MAT_DIALOG_DATA, MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material';
import PatternLanguage from '../../core/model/hal/pattern-language.model';

interface AddItemNode {
  name: string;
  patterns?: AddItemNode[];
}

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'pp-add-to-view',
  templateUrl: './add-to-view.component.html',
  styleUrls: ['./add-to-view.component.scss']
})
export class AddToViewComponent implements OnInit {

  private _transformer = (node: AddItemNode, level: number) => {
    return {
      expandable: !!node.patterns && node.patterns.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.patterns);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(@Inject(MAT_DIALOG_DATA) public data: PatternLanguage[]) {
    this.dataSource.data = data;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit() {
  }

  todoLeafItemSelectionToggle(node: any) {

  }
}
