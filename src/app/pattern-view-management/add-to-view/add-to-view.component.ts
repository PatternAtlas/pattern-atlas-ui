import {Component, Inject} from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MAT_DIALOG_DATA, MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material';
import {BehaviorSubject, Observable} from 'rxjs';
import PatternLanguage from '../../core/model/hal/pattern-language.model';
import {PatternService} from '../../core/service/pattern.service';
import Pattern from '../../core/model/hal/pattern.model';
import {SelectionModel} from '@angular/cdk/collections';

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
export class LoazyLoadedFlatNode {
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
    nodeMap = new Map<string, LoazyLoadedFlatNode>();
    treeControl: FlatTreeControl<LoazyLoadedFlatNode>;
    treeFlattener: MatTreeFlattener<LoadmoreNode, LoazyLoadedFlatNode>;
    // Flat tree data source
    dataSource: MatTreeFlatDataSource<LoadmoreNode, LoazyLoadedFlatNode>;
    LOAD_MORE = 'LOAD_MORE';
    nodes: LoadmoreNode[];


    constructor(@Inject(MAT_DIALOG_DATA) public data: { patternlanguages: PatternLanguage[], patternmode: boolean, title: string },
                private patternService: PatternService) {
        this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
            this.isExpandable, this.getChildren);

        this.treeControl = new FlatTreeControl<LoazyLoadedFlatNode>(this.getLevel, this.isExpandable);

        this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
        this.nodes = data.patternlanguages.map(pl => new LoadmoreNode(pl));
        this.dataSource.data = this.nodes;

    }


    checklistSelection = new SelectionModel<LoazyLoadedFlatNode>(true /* multiple */);
    getChildren = (node: LoadmoreNode): Observable<LoadmoreNode[]> => node.childrenChange;

    transformer = (node: LoadmoreNode, level: number) => {
        const existingNode = this.nodeMap.get(node.item.id);

        if (existingNode) {
            return existingNode;
        }

        const newNode = new LoazyLoadedFlatNode(node.item, level, node.hasChildren, node.loadMoreParentItem);
        this.nodeMap.set(node.item.id, newNode);
        return newNode;
    };

    getLevel = (node: LoazyLoadedFlatNode) => node.level;

    isExpandable = (node: LoazyLoadedFlatNode) => node.level === 0;

    hasChild = (_: number, _nodeData: LoazyLoadedFlatNode) => _nodeData.level === 0;


    isLoadMore = (_: number, _nodeData: LoazyLoadedFlatNode) => _nodeData.item.id === this.LOAD_MORE; // ?

    /** Load more nodes from data source */
    loadMore(node: LoazyLoadedFlatNode) {

        const treenode: LoadmoreNode = this.nodes.find(it => it.item.id === node.item.id);
        if (treenode.children.length > 0) {
            treenode.childrenChange.next(treenode.children);
            return;
        }
        this.patternService.getPatternsByUrl(node.item._links['patterns']['href']).subscribe((patterns) => {
            const dummy = {id: this.LOAD_MORE, name: '', uri: '', content: null, _links: null};
            const childnodes = patterns.length > 0 ? patterns.map(it => new LoadmoreNode(it)) : [new LoadmoreNode(
                dummy)];

            treenode.childrenChange.next(childnodes);
            this.dataSource.data = this.nodes;
            const descendants = this.treeControl.getDescendants(node);
            if (this.checklistSelection.isSelected(node)) {
                this.checklistSelection.select(...descendants);
            }
        });
    }

    loadChildren(node: LoazyLoadedFlatNode) {
        this.loadMore(node);
    }

    todoLeafItemSelectionToggle(node: any) {
        this.checklistSelection.toggle(node);
        this.checkAllParentsSelection(node);
    }

    /* Checks all the parents when a leaf node is selected/unselected */
    checkAllParentsSelection(node: LoazyLoadedFlatNode): void {
        let parent: LoazyLoadedFlatNode | null = this.getParentNode(node);
        while (parent) {
            this.checkRootNodeSelection(parent);
            parent = this.getParentNode(parent);
        }
    }


    /** Whether part of the descendants are selected */
    descendantsPartiallySelected(node: LoazyLoadedFlatNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        const result = descendants.some(child => this.checklistSelection.isSelected(child));
        return result && !this.descendantsAllSelected(node);
    }

    /** Whether all the descendants of the node are selected. */
    descendantsAllSelected(node: LoazyLoadedFlatNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        const descAllSelected = descendants.every(child =>
            this.checklistSelection.isSelected(child)
        );
        return descAllSelected && descendants.length > 0;
    }

    /** Check root node checked state and change it accordingly */
    checkRootNodeSelection(node: LoazyLoadedFlatNode): void {
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

    /* Get the parent node of a node */
    getParentNode(node: LoazyLoadedFlatNode): LoazyLoadedFlatNode | null {
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


    /** Toggle the to-do item selection. Select/deselect all the descendants node */
    todoItemSelectionToggle(node: LoazyLoadedFlatNode): void {
        this.checklistSelection.toggle(node);
        const descendants = this.treeControl.getDescendants(node);
        this.checklistSelection.isSelected(node)
            ? this.checklistSelection.select(...descendants)
            : this.checklistSelection.deselect(...descendants);

        // if a pattern language is selected that hasn't been loaded, load the children
        if (this.checklistSelection.isSelected(node) && descendants.length === 0) {
            this.loadMore(node);
        }

        // Force update for the parent
        descendants.every(child =>
            this.checklistSelection.isSelected(child)
        );
        this.checkAllParentsSelection(node);
    }

    getPatterns() {
        return this.checklistSelection.selected.filter((node) => node.level === 1);
    }
}
