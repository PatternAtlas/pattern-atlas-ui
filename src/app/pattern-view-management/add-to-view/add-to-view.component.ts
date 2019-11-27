import {Component, Inject} from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MAT_DIALOG_DATA, MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material';
import {BehaviorSubject, Observable} from 'rxjs';
import PatternLanguage from '../../core/model/hal/pattern-language.model';
import {PatternService} from '../../core/service/pattern.service';
import Pattern from '../../core/model/hal/pattern.model';

/** Nested node */
export class LoadmoreNode {
    childrenChange = new BehaviorSubject<LoadmoreNode[]>([]);

    get children(): LoadmoreNode[] {
        return this.childrenChange.value;
    }

    constructor(public item: PatternLanguage | Pattern,
                public hasChildren = false,
                public loadMoreParentItem: string | null = null) {
    }
}

/** Flat node with expandable and level information */
export class LoadmoreFlatNode {
    constructor(public item: Pattern | PatternLanguage,
                public level = 1,
                public expandable = false,
                public loadMoreParentItem: string | null = null) {
    }
}


@Component({
    selector: 'pp-add-to-view',
    templateUrl: './add-to-view.component.html',
    styleUrls: ['./add-to-view.component.scss']
})
export class AddToViewComponent {
    nodeMap = new Map<string, LoadmoreFlatNode>();
    treeControl: FlatTreeControl<LoadmoreFlatNode>;
    treeFlattener: MatTreeFlattener<LoadmoreNode, LoadmoreFlatNode>;
    // Flat tree data source
    dataSource: MatTreeFlatDataSource<LoadmoreNode, LoadmoreFlatNode>;
    LOAD_MORE = 'LOAD_MORE';
    nodes: LoadmoreNode[];


    constructor(@Inject(MAT_DIALOG_DATA) public data: { patternlanguages: PatternLanguage[], patternmode: boolean, title: string },
                private patternService: PatternService) {
        this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
            this.isExpandable, this.getChildren);

        this.treeControl = new FlatTreeControl<LoadmoreFlatNode>(this.getLevel, this.isExpandable);

        this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
        this.nodes = data.patternlanguages.map(pl => new LoadmoreNode(pl));
        this.dataSource.data = this.nodes;

    }

    getChildren = (node: LoadmoreNode): Observable<LoadmoreNode[]> => node.childrenChange;

    transformer = (node: LoadmoreNode, level: number) => {
        const existingNode = this.nodeMap.get(node.item.id);

        if (existingNode) {
            return existingNode;
        }

        const newNode = new LoadmoreFlatNode(node.item, level, node.hasChildren, node.loadMoreParentItem);
        this.nodeMap.set(node.item.id, newNode);
        return newNode;
    };

    getLevel = (node: LoadmoreFlatNode) => node.level;

    isExpandable = (node: LoadmoreFlatNode) => node.level === 0;

    hasChild = (_: number, _nodeData: LoadmoreFlatNode) => _nodeData.level === 0;


    isLoadMore = (_: number, _nodeData: LoadmoreFlatNode) => _nodeData.item.id === this.LOAD_MORE; // ?

    /** Load more nodes from data source */
    loadMore(item: PatternLanguage | Pattern) {

        const treenode: LoadmoreNode = this.nodes.find(it => it.item.id === item.id);
        if (treenode.children.length > 0) {
            treenode.childrenChange.next(treenode.children);
            return;
        }
        this.patternService.getPatternsByUrl(item._links['patterns']['href']).subscribe((patterns) => {
            const dummy = {id: this.LOAD_MORE, name: '', uri: '', content: null, _links: null};
            const childnodes = patterns.length > 0 ? patterns.map(it => new LoadmoreNode(it)) : [new LoadmoreNode(
                dummy)];
            treenode.childrenChange.next(childnodes);
            this.dataSource.data = this.nodes;
        });
    }

    loadChildren(node: LoadmoreFlatNode) {
        this.loadMore(node.item);
    }
}


// checklistSelection = new SelectionModel<PatternLanguageFlatNode>(true /* multiple */);
//
// treeControl = new FlatTreeControl<PatternLanguageFlatNode>(
//     node => node.level, node => node.expandable);
//
//
// private _transformer = (node: PatternLanguage | Pattern, level: number) => {
//     return {
//         expandable: node._links && node._links['patterns'],
//         name: node.name,
//         level: level,
//         id: node.id,
//         uri: node.uri,
//         patternsUrl: node._links && node._links['patterns'] ? node._links['patterns'].href : ''
//     };
// };
//
// getChildren = (node: PatternLanguageFlatNode): Observable<any[]> => this.patternService.getPatternsByUrl(node.patternsUrl);
// // .pipe(map(n => n.map(pat => this._transformer(pat, 1))));
//
// treeFlattener = new MatTreeFlattener(
//     this._transformer, node => node.level, node => node.expandable, this.getChildren);
//
//
// dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
// private patternmode: boolean;
//
// constructor(@Inject(MAT_DIALOG_DATA) public data: { patternlanguages: PatternLanguage[], patternmode: boolean, title: string },
//             private patternService: PatternService) {
//     this.dataSource.data = data.patternlanguages;
//     this.patternmode = data.patternmode;
// }
//
// hasChild = (_: number, node: PatternLanguageFlatNode) => node.expandable;
//
// ngOnInit() {
// }
//
// todoLeafItemSelectionToggle(node: any) {
//     this.checklistSelection.toggle(node);
//     this.checkAllParentsSelection(node);
// }
//
// /* Checks all the parents when a leaf node is selected/unselected */
// checkAllParentsSelection(node: PatternLanguageFlatNode): void {
//     let parent: PatternLanguageFlatNode | null = this.getParentNode(node);
//     while (parent) {
//         this.checkRootNodeSelection(parent);
//         parent = this.getParentNode(parent);
//     }
// }
//
//
// /* Get the parent node of a node */
// getParentNode(node: PatternLanguageFlatNode): PatternLanguageFlatNode | null {
//     const currentLevel = node.level;
//
//     if (currentLevel < 1) {
//         return null;
//     }
//
//     const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;
//
//     for (let i = startIndex; i >= 0; i--) {
//         const currentNode = this.treeControl.dataNodes[i];
//
//         if (currentNode.level < currentLevel) {
//             return currentNode;
//         }
//     }
//     return null;
// }
//
// /** Check root node checked state and change it accordingly */
// checkRootNodeSelection(node: PatternLanguageFlatNode): void {
//     const nodeSelected = this.checklistSelection.isSelected(node);
//     const descendants = this.treeControl.getDescendants(node);
//     const descAllSelected = descendants.every(child =>
//         this.checklistSelection.isSelected(child)
//     );
//     if (nodeSelected && !descAllSelected) {
//         this.checklistSelection.deselect(node);
//     } else if (!nodeSelected && descAllSelected) {
//         this.checklistSelection.select(node);
//     }
// }
//
// /** Whether part of the descendants are selected */
// descendantsPartiallySelected(node: PatternLanguageFlatNode): boolean {
//     const descendants = this.treeControl.getDescendants(node);
//     const result = descendants.some(child => this.checklistSelection.isSelected(child));
//     return result && !this.descendantsAllSelected(node);
// }
//
// /** Whether all the descendants of the node are selected. */
// descendantsAllSelected(node: PatternLanguageFlatNode): boolean {
//     const descendants = this.treeControl.getDescendants(node);
//     const descAllSelected = descendants.every(child =>
//         this.checklistSelection.isSelected(child)
//     );
//     return descAllSelected;
// }
//
// /** Toggle the to-do item selection. Select/deselect all the descendants node */
// todoItemSelectionToggle(node: PatternLanguageFlatNode): void {
//     this.checklistSelection.toggle(node);
//     const descendants = this.treeControl.getDescendants(node);
//     this.checklistSelection.isSelected(node)
//         ? this.checklistSelection.select(...descendants)
//         : this.checklistSelection.deselect(...descendants);
//
//     // Force update for the parent
//     descendants.every(child =>
//         this.checklistSelection.isSelected(child)
//     );
//     this.checkAllParentsSelection(node);
// }
//
// getSelectedPatterns() {
//     return this.checklistSelection.selected.filter(node => node.level === 1);
// }
// }
