import {Component, Inject} from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import {BehaviorSubject, forkJoin, Observable} from 'rxjs';
import PatternLanguage from '../../core/model/hal/pattern-language.model';
import {PatternService} from '../../core/service/pattern.service';
import Pattern from '../../core/model/hal/pattern.model';
import {SelectionModel} from '@angular/cdk/collections';
import {PatternRelationDescriptorService} from '../../core/service/pattern-relation-descriptor.service';
import {HalLink} from '../../core/model/hal/hal-link.interface';
import {DirectedEdgeModel} from '../../core/model/hal/directed-edge.model';
import {UndirectedEdgeModel} from '../../core/model/hal/undirected-edge.model';

/** Nested node */
export class LoadmoreNode {
    childrenChange = new BehaviorSubject<LoadmoreNode[]>([]);

    get children(): LoadmoreNode[] {
        return this.childrenChange.value;
    }

    constructor(public item: PatternLanguage | Pattern | LinksToOtherPattern,
                public hasChildren = false,
                public loadMoreParentItem: string | null = null) {
    }
}

/** Flat node with expandable and level information */
export class LoazyLoadedFlatNode {
    constructor(public item: Pattern | PatternLanguage | LinksToOtherPattern,
                public level = 1,
                public expandable = false,
                public loadMoreParentItem: string | null = null) {
    }
}

export class LinksToOtherPattern {
    name: string;
    links?: HalLink[];
    edge?: DirectedEdgeModel | UndirectedEdgeModel;
    id: string;
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
    isLinkModal = false;
    patternId: string;


    constructor(@Inject(MAT_DIALOG_DATA) public data: { patternlanguages?: PatternLanguage[], links?: LinksToOtherPattern[], title: string, patternId: string },
                private patternService: PatternService, private patternRelationDescriptorService: PatternRelationDescriptorService) {
        this.isLinkModal = !!data.patternlanguages;
        this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
            this.isExpandable, this.getChildren);

        this.treeControl = new FlatTreeControl<LoazyLoadedFlatNode>(this.getLevel, this.isExpandable);

        this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

        this.nodes = this.isLinkModal ? data.patternlanguages.map(it => new LoadmoreNode(it)) : data.links.map(it => new LoadmoreNode(it));
        this.patternId = data.patternId ? data.patternId : null;
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
        if (node.item['uri']) {
            this.getPatternsAndAddToTree(<PatternLanguage>node.item, treenode, node);

        } else {
            this.getRelatedPatternAndAddToTree(node.item, treenode, node);
        }
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

    private updateTree(node, treenode, childnodes) {
        treenode.childrenChange.next(childnodes);
        this.dataSource.data = this.nodes;
        const descendants = this.treeControl.getDescendants(node);
        if (this.checklistSelection.isSelected(node)) {
            this.checklistSelection.select(...descendants);
        }
    }

    private getPatternsAndAddToTree(item: PatternLanguage, treenode, node) {
        this.patternService.getPatternsByUrl(node.item._links['patterns']['href']).subscribe((patterns) => {
            const dummy = {id: this.LOAD_MORE, name: '', uri: '', content: null, _links: null};
            const childnodes = patterns.length > 0 ? patterns.map(it => new LoadmoreNode(it)) : [new LoadmoreNode(
                dummy)];

            this.updateTree(node, treenode, childnodes);

        });
    }

    private getRelatedPatternAndAddToTree(item: LinksToOtherPattern, treenode: LoadmoreNode, node: LoazyLoadedFlatNode) {
        const edgesObservables = node.item['links'].map(link => this.patternRelationDescriptorService.getEdgeByUrl(link.href));
        forkJoin(edgesObservables).subscribe((edges) => {
            const childnodes = edges.map((edge: DirectedEdgeModel | UndirectedEdgeModel) => new LoadmoreNode(this.mapEdgeToRelatedPattern(edge)));
            this.updateTree(node, treenode, childnodes);
        });
    }

    private mapEdgeToRelatedPattern(edge: DirectedEdgeModel | UndirectedEdgeModel) {
        let name;
        let id;
        let relatedPatternLink;
        let relatedPatternIsSource = false;
        if (edge['sourcePatternId']) {
            edge = <DirectedEdgeModel>edge;
            relatedPatternIsSource = edge.targetPatternId === this.patternId;
            name = relatedPatternIsSource ? edge.sourcePatternName : edge.targetPatternName;
            id = relatedPatternIsSource ? edge.sourcePatternId : edge.targetPatternId;
            relatedPatternLink = relatedPatternIsSource ? edge._links.sourcePattern : edge._links.targetPattern;
        } else {
            edge = <UndirectedEdgeModel>edge;
            relatedPatternIsSource = edge.p1Id === this.patternId;
            name = relatedPatternIsSource ? edge.pattern1Name : edge.pattern2Name;
            id = relatedPatternIsSource ? edge.p1Id : edge.p2Id;
            relatedPatternLink = relatedPatternIsSource ? edge._links.pattern[0] : edge._links.pattern[1];
        }
        return {
            name: name,
            id: id,
            edge: edge,
            linkedPattern: relatedPatternLink
        };
    }
}
