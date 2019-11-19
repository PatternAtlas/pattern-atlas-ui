import {Component, Inject, OnInit} from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MAT_DIALOG_DATA, MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material';
import PatternLanguage from '../../core/model/hal/pattern-language.model';
import {SelectionModel} from '@angular/cdk/collections';
import UriEntity from '../../core/model/hal/uri-entity.model';
import {PatternLanguageFlatNode} from '../../core/model/pattern-language-flat-node.interface';

interface AddItemNode extends UriEntity{
  patterns?: AddItemNode[];
}



@Component({
  selector: 'pp-add-to-view',
  templateUrl: './add-to-view.component.html',
  styleUrls: ['./add-to-view.component.scss']
})
export class AddToViewComponent implements OnInit {


  checklistSelection = new SelectionModel<PatternLanguageFlatNode>(true /* multiple */);

  treeControl = new FlatTreeControl<PatternLanguageFlatNode>(
    node => node.level, node => node.expandable);


  private _transformer = (node: AddItemNode, level: number) => {
    return {
      expandable: !!node.patterns && node.patterns.length > 0,
      name: node.name,
      level: level,
      id: node.id,
      uri: node.uri
    };
  }

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.patterns);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(@Inject(MAT_DIALOG_DATA) public data: PatternLanguage[]) {
    this.dataSource.data = data;
  }

  hasChild = (_: number, node: PatternLanguageFlatNode) => node.expandable;

  ngOnInit() {
  }

  todoLeafItemSelectionToggle(node: any) {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: PatternLanguageFlatNode): void {
    let parent: PatternLanguageFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: PatternLanguageFlatNode): PatternLanguageFlatNode | null {
    const currentLevel = node.level;

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (currentNode.level < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: PatternLanguageFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: PatternLanguageFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: PatternLanguageFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    return descAllSelected;
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: PatternLanguageFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    this.checkAllParentsSelection(node);
  }

  getSelectedPatterns(){
    return this.checklistSelection.selected.filter(node => node.level === 1);
  }
}
