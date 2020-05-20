(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pattern-view-management-pattern-view-management-module-ngfactory"],{

/***/ "./node_modules/@angular/cdk/fesm5/tree.js":
/*!*************************************************!*\
  !*** ./node_modules/@angular/cdk/fesm5/tree.js ***!
  \*************************************************/
/*! exports provided: BaseTreeControl, CDK_TREE_NODE_OUTLET_NODE, CdkNestedTreeNode, CdkTree, CdkTreeModule, CdkTreeNode, CdkTreeNodeDef, CdkTreeNodeOutlet, CdkTreeNodeOutletContext, CdkTreeNodePadding, CdkTreeNodeToggle, FlatTreeControl, NestedTreeControl, getTreeControlFunctionsMissingError, getTreeControlMissingError, getTreeMissingMatchingNodeDefError, getTreeMultipleDefaultNodeDefsError, getTreeNoValidDataSourceError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseTreeControl", function() { return BaseTreeControl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CDK_TREE_NODE_OUTLET_NODE", function() { return CDK_TREE_NODE_OUTLET_NODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CdkNestedTreeNode", function() { return CdkNestedTreeNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CdkTree", function() { return CdkTree; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CdkTreeModule", function() { return CdkTreeModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CdkTreeNode", function() { return CdkTreeNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CdkTreeNodeDef", function() { return CdkTreeNodeDef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CdkTreeNodeOutlet", function() { return CdkTreeNodeOutlet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CdkTreeNodeOutletContext", function() { return CdkTreeNodeOutletContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CdkTreeNodePadding", function() { return CdkTreeNodePadding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CdkTreeNodeToggle", function() { return CdkTreeNodeToggle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FlatTreeControl", function() { return FlatTreeControl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NestedTreeControl", function() { return NestedTreeControl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTreeControlFunctionsMissingError", function() { return getTreeControlFunctionsMissingError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTreeControlMissingError", function() { return getTreeControlMissingError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTreeMissingMatchingNodeDefError", function() { return getTreeMissingMatchingNodeDefError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTreeMultipleDefaultNodeDefsError", function() { return getTreeMultipleDefaultNodeDefsError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTreeNoValidDataSourceError", function() { return getTreeNoValidDataSourceError; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/collections */ "./node_modules/@angular/cdk/fesm5/collections.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/bidi */ "./node_modules/@angular/cdk/fesm5/bidi.js");
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/coercion */ "./node_modules/@angular/cdk/fesm5/coercion.js");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/a11y */ "./node_modules/@angular/cdk/fesm5/a11y.js");









/** Base tree control. It has basic toggle/expand/collapse operations on a single data node. */
var BaseTreeControl = /** @class */ (function () {
    function BaseTreeControl() {
        /** A selection model with multi-selection to track expansion status. */
        this.expansionModel = new _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_1__["SelectionModel"](true);
    }
    /** Toggles one single data node's expanded/collapsed state. */
    BaseTreeControl.prototype.toggle = function (dataNode) {
        this.expansionModel.toggle(dataNode);
    };
    /** Expands one single data node. */
    BaseTreeControl.prototype.expand = function (dataNode) {
        this.expansionModel.select(dataNode);
    };
    /** Collapses one single data node. */
    BaseTreeControl.prototype.collapse = function (dataNode) {
        this.expansionModel.deselect(dataNode);
    };
    /** Whether a given data node is expanded or not. Returns true if the data node is expanded. */
    BaseTreeControl.prototype.isExpanded = function (dataNode) {
        return this.expansionModel.isSelected(dataNode);
    };
    /** Toggles a subtree rooted at `node` recursively. */
    BaseTreeControl.prototype.toggleDescendants = function (dataNode) {
        this.expansionModel.isSelected(dataNode)
            ? this.collapseDescendants(dataNode)
            : this.expandDescendants(dataNode);
    };
    /** Collapse all dataNodes in the tree. */
    BaseTreeControl.prototype.collapseAll = function () {
        this.expansionModel.clear();
    };
    /** Expands a subtree rooted at given data node recursively. */
    BaseTreeControl.prototype.expandDescendants = function (dataNode) {
        var _a;
        var toBeProcessed = [dataNode];
        toBeProcessed.push.apply(toBeProcessed, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(this.getDescendants(dataNode)));
        (_a = this.expansionModel).select.apply(_a, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(toBeProcessed));
    };
    /** Collapses a subtree rooted at given data node recursively. */
    BaseTreeControl.prototype.collapseDescendants = function (dataNode) {
        var _a;
        var toBeProcessed = [dataNode];
        toBeProcessed.push.apply(toBeProcessed, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(this.getDescendants(dataNode)));
        (_a = this.expansionModel).deselect.apply(_a, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(toBeProcessed));
    };
    return BaseTreeControl;
}());

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Flat tree control. Able to expand/collapse a subtree recursively for flattened tree. */
var FlatTreeControl = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(FlatTreeControl, _super);
    /** Construct with flat tree data node functions getLevel and isExpandable. */
    function FlatTreeControl(getLevel, isExpandable) {
        var _this = _super.call(this) || this;
        _this.getLevel = getLevel;
        _this.isExpandable = isExpandable;
        return _this;
    }
    /**
     * Gets a list of the data node's subtree of descendent data nodes.
     *
     * To make this working, the `dataNodes` of the TreeControl must be flattened tree nodes
     * with correct levels.
     */
    FlatTreeControl.prototype.getDescendants = function (dataNode) {
        var startIndex = this.dataNodes.indexOf(dataNode);
        var results = [];
        // Goes through flattened tree nodes in the `dataNodes` array, and get all descendants.
        // The level of descendants of a tree node must be greater than the level of the given
        // tree node.
        // If we reach a node whose level is equal to the level of the tree node, we hit a sibling.
        // If we reach a node whose level is greater than the level of the tree node, we hit a
        // sibling of an ancestor.
        for (var i = startIndex + 1; i < this.dataNodes.length && this.getLevel(dataNode) < this.getLevel(this.dataNodes[i]); i++) {
            results.push(this.dataNodes[i]);
        }
        return results;
    };
    /**
     * Expands all data nodes in the tree.
     *
     * To make this working, the `dataNodes` variable of the TreeControl must be set to all flattened
     * data nodes of the tree.
     */
    FlatTreeControl.prototype.expandAll = function () {
        var _a;
        (_a = this.expansionModel).select.apply(_a, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(this.dataNodes));
    };
    return FlatTreeControl;
}(BaseTreeControl));

/** Nested tree control. Able to expand/collapse a subtree recursively for NestedNode type. */
var NestedTreeControl = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(NestedTreeControl, _super);
    /** Construct with nested tree function getChildren. */
    function NestedTreeControl(getChildren) {
        var _this = _super.call(this) || this;
        _this.getChildren = getChildren;
        return _this;
    }
    /**
     * Expands all dataNodes in the tree.
     *
     * To make this working, the `dataNodes` variable of the TreeControl must be set to all root level
     * data nodes of the tree.
     */
    NestedTreeControl.prototype.expandAll = function () {
        var _a;
        var _this = this;
        this.expansionModel.clear();
        var allNodes = this.dataNodes.reduce(function (accumulator, dataNode) {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(accumulator, _this.getDescendants(dataNode), [dataNode]);
        }, []);
        (_a = this.expansionModel).select.apply(_a, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(allNodes));
    };
    /** Gets a list of descendant dataNodes of a subtree rooted at given data node recursively. */
    NestedTreeControl.prototype.getDescendants = function (dataNode) {
        var descendants = [];
        this._getDescendants(descendants, dataNode);
        // Remove the node itself
        return descendants.splice(1);
    };
    /** A helper function to get descendants recursively. */
    NestedTreeControl.prototype._getDescendants = function (descendants, dataNode) {
        var _this = this;
        descendants.push(dataNode);
        var childrenNodes = this.getChildren(dataNode);
        if (Array.isArray(childrenNodes)) {
            childrenNodes.forEach(function (child) { return _this._getDescendants(descendants, child); });
        }
        else if (Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["isObservable"])(childrenNodes)) {
            // TypeScript as of version 3.5 doesn't seem to treat `Boolean` like a function that
            // returns a `boolean` specifically in the context of `filter`, so we manually clarify that.
            childrenNodes.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])(Boolean))
                .subscribe(function (children) {
                var e_1, _a;
                try {
                    for (var children_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(children), children_1_1 = children_1.next(); !children_1_1.done; children_1_1 = children_1.next()) {
                        var child = children_1_1.value;
                        _this._getDescendants(descendants, child);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (children_1_1 && !children_1_1.done && (_a = children_1.return)) _a.call(children_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            });
        }
    };
    return NestedTreeControl;
}(BaseTreeControl));

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Injection token used to provide a `CdkTreeNode` to its outlet.
 * Used primarily to avoid circular imports.
 * @docs-private
 */
var CDK_TREE_NODE_OUTLET_NODE = new _angular_core__WEBPACK_IMPORTED_MODULE_4__["InjectionToken"]('CDK_TREE_NODE_OUTLET_NODE');
/**
 * Outlet for nested CdkNode. Put `[cdkTreeNodeOutlet]` on a tag to place children dataNodes
 * inside the outlet.
 */
var CdkTreeNodeOutlet = /** @class */ (function () {
    function CdkTreeNodeOutlet(viewContainer, _node) {
        this.viewContainer = viewContainer;
        this._node = _node;
    }
    CdkTreeNodeOutlet.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Directive"], args: [{
                    selector: '[cdkTreeNodeOutlet]'
                },] }
    ];
    /** @nocollapse */
    CdkTreeNodeOutlet.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["ViewContainerRef"] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Inject"], args: [CDK_TREE_NODE_OUTLET_NODE,] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Optional"] }] }
    ]; };
    return CdkTreeNodeOutlet;
}());

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Context provided to the tree node component. */
var CdkTreeNodeOutletContext = /** @class */ (function () {
    function CdkTreeNodeOutletContext(data) {
        this.$implicit = data;
    }
    return CdkTreeNodeOutletContext;
}());
/**
 * Data node definition for the CdkTree.
 * Captures the node's template and a when predicate that describes when this node should be used.
 */
var CdkTreeNodeDef = /** @class */ (function () {
    /** @docs-private */
    function CdkTreeNodeDef(template) {
        this.template = template;
    }
    CdkTreeNodeDef.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Directive"], args: [{
                    selector: '[cdkTreeNodeDef]',
                    inputs: [
                        'when: cdkTreeNodeDefWhen'
                    ],
                },] }
    ];
    /** @nocollapse */
    CdkTreeNodeDef.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["TemplateRef"] }
    ]; };
    return CdkTreeNodeDef;
}());

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Returns an error to be thrown when there is no usable data.
 * @docs-private
 */
function getTreeNoValidDataSourceError() {
    return Error("A valid data source must be provided.");
}
/**
 * Returns an error to be thrown when there are multiple nodes that are missing a when function.
 * @docs-private
 */
function getTreeMultipleDefaultNodeDefsError() {
    return Error("There can only be one default row without a when predicate function.");
}
/**
 * Returns an error to be thrown when there are no matching node defs for a particular set of data.
 * @docs-private
 */
function getTreeMissingMatchingNodeDefError() {
    return Error("Could not find a matching node definition for the provided node data.");
}
/**
 * Returns an error to be thrown when there are tree control.
 * @docs-private
 */
function getTreeControlMissingError() {
    return Error("Could not find a tree control for the tree.");
}
/**
 * Returns an error to be thrown when tree control did not implement functions for flat/nested node.
 * @docs-private
 */
function getTreeControlFunctionsMissingError() {
    return Error("Could not find functions for nested/flat tree in tree control.");
}

/**
 * CDK tree component that connects with a data source to retrieve data of type `T` and renders
 * dataNodes with hierarchy. Updates the dataNodes when new data is provided by the data source.
 */
var CdkTree = /** @class */ (function () {
    function CdkTree(_differs, _changeDetectorRef) {
        this._differs = _differs;
        this._changeDetectorRef = _changeDetectorRef;
        /** Subject that emits when the component has been destroyed. */
        this._onDestroy = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        /** Level of nodes */
        this._levels = new Map();
        // TODO(tinayuangao): Setup a listener for scrolling, emit the calculated view to viewChange.
        //     Remove the MAX_VALUE in viewChange
        /**
         * Stream containing the latest information on what rows are being displayed on screen.
         * Can be used by the data source to as a heuristic of what data should be provided.
         */
        this.viewChange = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]({ start: 0, end: Number.MAX_VALUE });
    }
    Object.defineProperty(CdkTree.prototype, "dataSource", {
        /**
         * Provides a stream containing the latest data array to render. Influenced by the tree's
         * stream of view window (what dataNodes are currently on screen).
         * Data source can be an observable of data array, or a data array to render.
         */
        get: function () { return this._dataSource; },
        set: function (dataSource) {
            if (this._dataSource !== dataSource) {
                this._switchDataSource(dataSource);
            }
        },
        enumerable: true,
        configurable: true
    });
    CdkTree.prototype.ngOnInit = function () {
        this._dataDiffer = this._differs.find([]).create(this.trackBy);
        if (!this.treeControl) {
            throw getTreeControlMissingError();
        }
    };
    CdkTree.prototype.ngOnDestroy = function () {
        this._nodeOutlet.viewContainer.clear();
        this._onDestroy.next();
        this._onDestroy.complete();
        if (this._dataSource && typeof this._dataSource.disconnect === 'function') {
            this.dataSource.disconnect(this);
        }
        if (this._dataSubscription) {
            this._dataSubscription.unsubscribe();
            this._dataSubscription = null;
        }
    };
    CdkTree.prototype.ngAfterContentChecked = function () {
        var defaultNodeDefs = this._nodeDefs.filter(function (def) { return !def.when; });
        if (defaultNodeDefs.length > 1) {
            throw getTreeMultipleDefaultNodeDefsError();
        }
        this._defaultNodeDef = defaultNodeDefs[0];
        if (this.dataSource && this._nodeDefs && !this._dataSubscription) {
            this._observeRenderChanges();
        }
    };
    // TODO(tinayuangao): Work on keyboard traversal and actions, make sure it's working for RTL
    //     and nested trees.
    /**
     * Switch to the provided data source by resetting the data and unsubscribing from the current
     * render change subscription if one exists. If the data source is null, interpret this by
     * clearing the node outlet. Otherwise start listening for new data.
     */
    CdkTree.prototype._switchDataSource = function (dataSource) {
        if (this._dataSource && typeof this._dataSource.disconnect === 'function') {
            this.dataSource.disconnect(this);
        }
        if (this._dataSubscription) {
            this._dataSubscription.unsubscribe();
            this._dataSubscription = null;
        }
        // Remove the all dataNodes if there is now no data source
        if (!dataSource) {
            this._nodeOutlet.viewContainer.clear();
        }
        this._dataSource = dataSource;
        if (this._nodeDefs) {
            this._observeRenderChanges();
        }
    };
    /** Set up a subscription for the data provided by the data source. */
    CdkTree.prototype._observeRenderChanges = function () {
        var _this = this;
        var dataStream;
        if (Object(_angular_cdk_collections__WEBPACK_IMPORTED_MODULE_1__["isDataSource"])(this._dataSource)) {
            dataStream = this._dataSource.connect(this);
        }
        else if (Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["isObservable"])(this._dataSource)) {
            dataStream = this._dataSource;
        }
        else if (Array.isArray(this._dataSource)) {
            dataStream = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(this._dataSource);
        }
        if (dataStream) {
            this._dataSubscription = dataStream.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this._onDestroy))
                .subscribe(function (data) { return _this.renderNodeChanges(data); });
        }
        else {
            throw getTreeNoValidDataSourceError();
        }
    };
    /** Check for changes made in the data and render each change (node added/removed/moved). */
    CdkTree.prototype.renderNodeChanges = function (data, dataDiffer, viewContainer, parentData) {
        var _this = this;
        if (dataDiffer === void 0) { dataDiffer = this._dataDiffer; }
        if (viewContainer === void 0) { viewContainer = this._nodeOutlet.viewContainer; }
        var changes = dataDiffer.diff(data);
        if (!changes) {
            return;
        }
        changes.forEachOperation(function (item, adjustedPreviousIndex, currentIndex) {
            if (item.previousIndex == null) {
                _this.insertNode(data[currentIndex], currentIndex, viewContainer, parentData);
            }
            else if (currentIndex == null) {
                viewContainer.remove(adjustedPreviousIndex);
                _this._levels.delete(item.item);
            }
            else {
                var view = viewContainer.get(adjustedPreviousIndex);
                viewContainer.move(view, currentIndex);
            }
        });
        this._changeDetectorRef.detectChanges();
    };
    /**
     * Finds the matching node definition that should be used for this node data. If there is only
     * one node definition, it is returned. Otherwise, find the node definition that has a when
     * predicate that returns true with the data. If none return true, return the default node
     * definition.
     */
    CdkTree.prototype._getNodeDef = function (data, i) {
        if (this._nodeDefs.length === 1) {
            return this._nodeDefs.first;
        }
        var nodeDef = this._nodeDefs.find(function (def) { return def.when && def.when(i, data); }) || this._defaultNodeDef;
        if (!nodeDef) {
            throw getTreeMissingMatchingNodeDefError();
        }
        return nodeDef;
    };
    /**
     * Create the embedded view for the data node template and place it in the correct index location
     * within the data node view container.
     */
    CdkTree.prototype.insertNode = function (nodeData, index, viewContainer, parentData) {
        var node = this._getNodeDef(nodeData, index);
        // Node context that will be provided to created embedded view
        var context = new CdkTreeNodeOutletContext(nodeData);
        // If the tree is flat tree, then use the `getLevel` function in flat tree control
        // Otherwise, use the level of parent node.
        if (this.treeControl.getLevel) {
            context.level = this.treeControl.getLevel(nodeData);
        }
        else if (typeof parentData !== 'undefined' && this._levels.has(parentData)) {
            context.level = this._levels.get(parentData) + 1;
        }
        else {
            context.level = 0;
        }
        this._levels.set(nodeData, context.level);
        // Use default tree nodeOutlet, or nested node's nodeOutlet
        var container = viewContainer ? viewContainer : this._nodeOutlet.viewContainer;
        container.createEmbeddedView(node.template, context, index);
        // Set the data to just created `CdkTreeNode`.
        // The `CdkTreeNode` created from `createEmbeddedView` will be saved in static variable
        //     `mostRecentTreeNode`. We get it from static variable and pass the node data to it.
        if (CdkTreeNode.mostRecentTreeNode) {
            CdkTreeNode.mostRecentTreeNode.data = nodeData;
        }
    };
    CdkTree.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Component"], args: [{
                    selector: 'cdk-tree',
                    exportAs: 'cdkTree',
                    template: "<ng-container cdkTreeNodeOutlet></ng-container>",
                    host: {
                        'class': 'cdk-tree',
                        'role': 'tree',
                    },
                    encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_4__["ViewEncapsulation"].None,
                    // The "OnPush" status for the `CdkTree` component is effectively a noop, so we are removing it.
                    // The view for `CdkTree` consists entirely of templates declared in other views. As they are
                    // declared elsewhere, they are checked when their declaration points are checked.
                    // tslint:disable-next-line:validate-decorators
                    changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_4__["ChangeDetectionStrategy"].Default
                }] }
    ];
    /** @nocollapse */
    CdkTree.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["IterableDiffers"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["ChangeDetectorRef"] }
    ]; };
    CdkTree.propDecorators = {
        dataSource: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"] }],
        treeControl: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"] }],
        trackBy: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"] }],
        _nodeOutlet: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["ViewChild"], args: [CdkTreeNodeOutlet, { static: true },] }],
        _nodeDefs: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["ContentChildren"], args: [CdkTreeNodeDef, {
                        // We need to use `descendants: true`, because Ivy will no longer match
                        // indirect descendants if it's left as false.
                        descendants: true
                    },] }]
    };
    return CdkTree;
}());
/**
 * Tree node for CdkTree. It contains the data in the tree node.
 */
var CdkTreeNode = /** @class */ (function () {
    function CdkTreeNode(_elementRef, _tree) {
        this._elementRef = _elementRef;
        this._tree = _tree;
        /** Subject that emits when the component has been destroyed. */
        this._destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        /** Emits when the node's data has changed. */
        this._dataChanges = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        /**
         * The role of the node should be 'group' if it's an internal node,
         * and 'treeitem' if it's a leaf node.
         */
        this.role = 'treeitem';
        CdkTreeNode.mostRecentTreeNode = this;
    }
    Object.defineProperty(CdkTreeNode.prototype, "data", {
        /** The tree node's data. */
        get: function () { return this._data; },
        set: function (value) {
            if (value !== this._data) {
                this._data = value;
                this._setRoleFromData();
                this._dataChanges.next();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkTreeNode.prototype, "isExpanded", {
        get: function () {
            return this._tree.treeControl.isExpanded(this._data);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkTreeNode.prototype, "level", {
        get: function () {
            return this._tree.treeControl.getLevel ? this._tree.treeControl.getLevel(this._data) : 0;
        },
        enumerable: true,
        configurable: true
    });
    CdkTreeNode.prototype.ngOnDestroy = function () {
        // If this is the last tree node being destroyed,
        // clear out the reference to avoid leaking memory.
        if (CdkTreeNode.mostRecentTreeNode === this) {
            CdkTreeNode.mostRecentTreeNode = null;
        }
        this._dataChanges.complete();
        this._destroyed.next();
        this._destroyed.complete();
    };
    /** Focuses the menu item. Implements for FocusableOption. */
    CdkTreeNode.prototype.focus = function () {
        this._elementRef.nativeElement.focus();
    };
    CdkTreeNode.prototype._setRoleFromData = function () {
        var _this = this;
        if (this._tree.treeControl.isExpandable) {
            this.role = this._tree.treeControl.isExpandable(this._data) ? 'group' : 'treeitem';
        }
        else {
            if (!this._tree.treeControl.getChildren) {
                throw getTreeControlFunctionsMissingError();
            }
            var childrenNodes = this._tree.treeControl.getChildren(this._data);
            if (Array.isArray(childrenNodes)) {
                this._setRoleFromChildren(childrenNodes);
            }
            else if (Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["isObservable"])(childrenNodes)) {
                childrenNodes.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this._destroyed))
                    .subscribe(function (children) { return _this._setRoleFromChildren(children); });
            }
        }
    };
    CdkTreeNode.prototype._setRoleFromChildren = function (children) {
        this.role = children && children.length ? 'group' : 'treeitem';
    };
    /**
     * The most recently created `CdkTreeNode`. We save it in static variable so we can retrieve it
     * in `CdkTree` and set the data to it.
     */
    CdkTreeNode.mostRecentTreeNode = null;
    CdkTreeNode.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Directive"], args: [{
                    selector: 'cdk-tree-node',
                    exportAs: 'cdkTreeNode',
                    host: {
                        '[attr.aria-expanded]': 'isExpanded',
                        '[attr.aria-level]': 'role === "treeitem" ? level : null',
                        '[attr.role]': 'role',
                        'class': 'cdk-tree-node',
                    },
                },] }
    ];
    /** @nocollapse */
    CdkTreeNode.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["ElementRef"] },
        { type: CdkTree }
    ]; };
    CdkTreeNode.propDecorators = {
        role: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"] }]
    };
    return CdkTreeNode;
}());

/**
 * Nested node is a child of `<cdk-tree>`. It works with nested tree.
 * By using `cdk-nested-tree-node` component in tree node template, children of the parent node will
 * be added in the `cdkTreeNodeOutlet` in tree node template.
 * The children of node will be automatically added to `cdkTreeNodeOutlet`.
 */
var CdkNestedTreeNode = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(CdkNestedTreeNode, _super);
    function CdkNestedTreeNode(_elementRef, _tree, _differs) {
        var _this = _super.call(this, _elementRef, _tree) || this;
        _this._elementRef = _elementRef;
        _this._tree = _tree;
        _this._differs = _differs;
        return _this;
    }
    CdkNestedTreeNode.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._dataDiffer = this._differs.find([]).create(this._tree.trackBy);
        if (!this._tree.treeControl.getChildren) {
            throw getTreeControlFunctionsMissingError();
        }
        var childrenNodes = this._tree.treeControl.getChildren(this.data);
        if (Array.isArray(childrenNodes)) {
            this.updateChildrenNodes(childrenNodes);
        }
        else if (Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["isObservable"])(childrenNodes)) {
            childrenNodes.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this._destroyed))
                .subscribe(function (result) { return _this.updateChildrenNodes(result); });
        }
        this.nodeOutlet.changes.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this._destroyed))
            .subscribe(function () { return _this.updateChildrenNodes(); });
    };
    CdkNestedTreeNode.prototype.ngOnDestroy = function () {
        this._clear();
        _super.prototype.ngOnDestroy.call(this);
    };
    /** Add children dataNodes to the NodeOutlet */
    CdkNestedTreeNode.prototype.updateChildrenNodes = function (children) {
        var outlet = this._getNodeOutlet();
        if (children) {
            this._children = children;
        }
        if (outlet && this._children) {
            var viewContainer = outlet.viewContainer;
            this._tree.renderNodeChanges(this._children, this._dataDiffer, viewContainer, this._data);
        }
        else {
            // Reset the data differ if there's no children nodes displayed
            this._dataDiffer.diff([]);
        }
    };
    /** Clear the children dataNodes. */
    CdkNestedTreeNode.prototype._clear = function () {
        var outlet = this._getNodeOutlet();
        if (outlet) {
            outlet.viewContainer.clear();
            this._dataDiffer.diff([]);
        }
    };
    /** Gets the outlet for the current node. */
    CdkNestedTreeNode.prototype._getNodeOutlet = function () {
        var _this = this;
        var outlets = this.nodeOutlet;
        // Note that since we use `descendants: true` on the query, we have to ensure
        // that we don't pick up the outlet of a child node by accident.
        return outlets && outlets.find(function (outlet) { return !outlet._node || outlet._node === _this; });
    };
    CdkNestedTreeNode.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Directive"], args: [{
                    selector: 'cdk-nested-tree-node',
                    exportAs: 'cdkNestedTreeNode',
                    host: {
                        '[attr.aria-expanded]': 'isExpanded',
                        '[attr.role]': 'role',
                        'class': 'cdk-tree-node cdk-nested-tree-node',
                    },
                    providers: [
                        { provide: CdkTreeNode, useExisting: CdkNestedTreeNode },
                        { provide: CDK_TREE_NODE_OUTLET_NODE, useExisting: CdkNestedTreeNode }
                    ]
                },] }
    ];
    /** @nocollapse */
    CdkNestedTreeNode.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["ElementRef"] },
        { type: CdkTree },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["IterableDiffers"] }
    ]; };
    CdkNestedTreeNode.propDecorators = {
        nodeOutlet: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["ContentChildren"], args: [CdkTreeNodeOutlet, {
                        // We need to use `descendants: true`, because Ivy will no longer match
                        // indirect descendants if it's left as false.
                        descendants: true
                    },] }]
    };
    return CdkNestedTreeNode;
}(CdkTreeNode));

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Regex used to split a string on its CSS units. */
var cssUnitPattern = /([A-Za-z%]+)$/;
/**
 * Indent for the children tree dataNodes.
 * This directive will add left-padding to the node to show hierarchy.
 */
var CdkTreeNodePadding = /** @class */ (function () {
    function CdkTreeNodePadding(_treeNode, _tree, 
    /**
     * @deprecated _renderer parameter no longer being used. To be removed.
     * @breaking-change 11.0.0
     */
    _renderer, _element, _dir) {
        var _this = this;
        this._treeNode = _treeNode;
        this._tree = _tree;
        this._element = _element;
        this._dir = _dir;
        /** Subject that emits when the component has been destroyed. */
        this._destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        /** CSS units used for the indentation value. */
        this.indentUnits = 'px';
        this._indent = 40;
        this._setPadding();
        if (_dir) {
            _dir.change.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this._destroyed)).subscribe(function () { return _this._setPadding(true); });
        }
        // In Ivy the indentation binding might be set before the tree node's data has been added,
        // which means that we'll miss the first render. We have to subscribe to changes in the
        // data to ensure that everything is up to date.
        _treeNode._dataChanges.subscribe(function () { return _this._setPadding(); });
    }
    Object.defineProperty(CdkTreeNodePadding.prototype, "level", {
        /** The level of depth of the tree node. The padding will be `level * indent` pixels. */
        get: function () { return this._level; },
        set: function (value) {
            // Set to null as the fallback value so that _setPadding can fall back to the node level if the
            // consumer set the directive as `cdkTreeNodePadding=""`. We still want to take this value if
            // they set 0 explicitly.
            this._level = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_6__["coerceNumberProperty"])(value, null);
            this._setPadding();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkTreeNodePadding.prototype, "indent", {
        /**
         * The indent for each level. Can be a number or a CSS string.
         * Default number 40px from material design menu sub-menu spec.
         */
        get: function () { return this._indent; },
        set: function (indent) {
            var value = indent;
            var units = 'px';
            if (typeof indent === 'string') {
                var parts = indent.split(cssUnitPattern);
                value = parts[0];
                units = parts[1] || units;
            }
            this.indentUnits = units;
            this._indent = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_6__["coerceNumberProperty"])(value);
            this._setPadding();
        },
        enumerable: true,
        configurable: true
    });
    CdkTreeNodePadding.prototype.ngOnDestroy = function () {
        this._destroyed.next();
        this._destroyed.complete();
    };
    /** The padding indent value for the tree node. Returns a string with px numbers if not null. */
    CdkTreeNodePadding.prototype._paddingIndent = function () {
        var nodeLevel = (this._treeNode.data && this._tree.treeControl.getLevel)
            ? this._tree.treeControl.getLevel(this._treeNode.data)
            : null;
        var level = this._level == null ? nodeLevel : this._level;
        return typeof level === 'number' ? "" + level * this._indent + this.indentUnits : null;
    };
    CdkTreeNodePadding.prototype._setPadding = function (forceChange) {
        if (forceChange === void 0) { forceChange = false; }
        var padding = this._paddingIndent();
        if (padding !== this._currentPadding || forceChange) {
            var element = this._element.nativeElement;
            var paddingProp = this._dir && this._dir.value === 'rtl' ? 'paddingRight' : 'paddingLeft';
            var resetProp = paddingProp === 'paddingLeft' ? 'paddingRight' : 'paddingLeft';
            element.style[paddingProp] = padding || '';
            element.style[resetProp] = '';
            this._currentPadding = padding;
        }
    };
    CdkTreeNodePadding.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Directive"], args: [{
                    selector: '[cdkTreeNodePadding]',
                },] }
    ];
    /** @nocollapse */
    CdkTreeNodePadding.ctorParameters = function () { return [
        { type: CdkTreeNode },
        { type: CdkTree },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Renderer2"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["ElementRef"] },
        { type: _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_5__["Directionality"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Optional"] }] }
    ]; };
    CdkTreeNodePadding.propDecorators = {
        level: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"], args: ['cdkTreeNodePadding',] }],
        indent: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"], args: ['cdkTreeNodePaddingIndent',] }]
    };
    return CdkTreeNodePadding;
}());

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Node toggle to expand/collapse the node.
 */
var CdkTreeNodeToggle = /** @class */ (function () {
    function CdkTreeNodeToggle(_tree, _treeNode) {
        this._tree = _tree;
        this._treeNode = _treeNode;
        this._recursive = false;
    }
    Object.defineProperty(CdkTreeNodeToggle.prototype, "recursive", {
        /** Whether expand/collapse the node recursively. */
        get: function () { return this._recursive; },
        set: function (value) { this._recursive = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_6__["coerceBooleanProperty"])(value); },
        enumerable: true,
        configurable: true
    });
    // We have to use a `HostListener` here in order to support both Ivy and ViewEngine.
    // In Ivy the `host` bindings will be merged when this class is extended, whereas in
    // ViewEngine they're overwritten.
    // TODO(crisbeto): we move this back into `host` once Ivy is turned on by default.
    // tslint:disable-next-line:no-host-decorator-in-concrete
    CdkTreeNodeToggle.prototype._toggle = function (event) {
        this.recursive
            ? this._tree.treeControl.toggleDescendants(this._treeNode.data)
            : this._tree.treeControl.toggle(this._treeNode.data);
        event.stopPropagation();
    };
    CdkTreeNodeToggle.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Directive"], args: [{ selector: '[cdkTreeNodeToggle]' },] }
    ];
    /** @nocollapse */
    CdkTreeNodeToggle.ctorParameters = function () { return [
        { type: CdkTree },
        { type: CdkTreeNode }
    ]; };
    CdkTreeNodeToggle.propDecorators = {
        recursive: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"], args: ['cdkTreeNodeToggleRecursive',] }],
        _toggle: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["HostListener"], args: ['click', ['$event'],] }]
    };
    return CdkTreeNodeToggle;
}());

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var EXPORTED_DECLARATIONS = [
    CdkNestedTreeNode,
    CdkTreeNodeDef,
    CdkTreeNodePadding,
    CdkTreeNodeToggle,
    CdkTree,
    CdkTreeNode,
    CdkTreeNodeOutlet,
];
var CdkTreeModule = /** @class */ (function () {
    function CdkTreeModule() {
    }
    CdkTreeModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["NgModule"], args: [{
                    exports: EXPORTED_DECLARATIONS,
                    declarations: EXPORTED_DECLARATIONS,
                    providers: [_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_7__["FocusMonitor"], CdkTreeNodeDef]
                },] }
    ];
    return CdkTreeModule;
}());

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Generated bundle index. Do not edit.
 */


//# sourceMappingURL=tree.js.map


/***/ }),

/***/ "./node_modules/@angular/material/checkbox/index.ngfactory.js":
/*!********************************************************************!*\
  !*** ./node_modules/@angular/material/checkbox/index.ngfactory.js ***!
  \********************************************************************/
/*! exports provided: _MatCheckboxRequiredValidatorModuleNgFactory, MatCheckboxModuleNgFactory, RenderType_MatCheckbox, View_MatCheckbox_0, View_MatCheckbox_Host_0, MatCheckboxNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_MatCheckboxRequiredValidatorModuleNgFactory", function() { return _MatCheckboxRequiredValidatorModuleNgFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatCheckboxModuleNgFactory", function() { return MatCheckboxModuleNgFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_MatCheckbox", function() { return RenderType_MatCheckbox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_MatCheckbox_0", function() { return View_MatCheckbox_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_MatCheckbox_Host_0", function() { return View_MatCheckbox_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatCheckboxNgFactory", function() { return MatCheckboxNgFactory; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/checkbox */ "./node_modules/@angular/material/fesm5/checkbox.js");
/* harmony import */ var _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/observers */ "./node_modules/@angular/cdk/fesm5/observers.js");
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/bidi */ "./node_modules/@angular/cdk/fesm5/bidi.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/fesm5/core.js");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/a11y */ "./node_modules/@angular/cdk/fesm5/a11y.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/platform */ "./node_modules/@angular/cdk/fesm5/platform.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes,extraRequire}
 * tslint:disable
 */ 










var _MatCheckboxRequiredValidatorModuleNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵcmf"](_angular_material_checkbox__WEBPACK_IMPORTED_MODULE_1__["_MatCheckboxRequiredValidatorModule"], [], function (_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmod"]([_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵCodegenComponentFactoryResolver"], [[8, []], [3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"]], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModuleRef"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_1__["_MatCheckboxRequiredValidatorModule"], _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_1__["_MatCheckboxRequiredValidatorModule"], [])]); });

var MatCheckboxModuleNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵcmf"](_angular_material_checkbox__WEBPACK_IMPORTED_MODULE_1__["MatCheckboxModule"], [], function (_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmod"]([_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵCodegenComponentFactoryResolver"], [[8, []], [3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"]], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModuleRef"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_2__["MutationObserverFactory"], _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_2__["MutationObserverFactory"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_3__["BidiModule"], _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_3__["BidiModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_4__["MatCommonModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_4__["MatCommonModule"], [_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__["HighContrastModeDetector"], [2, _angular_material_core__WEBPACK_IMPORTED_MODULE_4__["MATERIAL_SANITY_CHECKS"]], [2, _angular_common__WEBPACK_IMPORTED_MODULE_6__["DOCUMENT"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_7__["PlatformModule"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_7__["PlatformModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_4__["MatRippleModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_4__["MatRippleModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_2__["ObserversModule"], _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_2__["ObserversModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_1__["_MatCheckboxRequiredValidatorModule"], _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_1__["_MatCheckboxRequiredValidatorModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_1__["MatCheckboxModule"], _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_1__["MatCheckboxModule"], [])]); });

var styles_MatCheckbox = ["@keyframes mat-checkbox-fade-in-background{0%{opacity:0}50%{opacity:1}}@keyframes mat-checkbox-fade-out-background{0%,50%{opacity:1}100%{opacity:0}}@keyframes mat-checkbox-unchecked-checked-checkmark-path{0%,50%{stroke-dashoffset:22.910259}50%{animation-timing-function:cubic-bezier(0, 0, 0.2, 0.1)}100%{stroke-dashoffset:0}}@keyframes mat-checkbox-unchecked-indeterminate-mixedmark{0%,68.2%{transform:scaleX(0)}68.2%{animation-timing-function:cubic-bezier(0, 0, 0, 1)}100%{transform:scaleX(1)}}@keyframes mat-checkbox-checked-unchecked-checkmark-path{from{animation-timing-function:cubic-bezier(0.4, 0, 1, 1);stroke-dashoffset:0}to{stroke-dashoffset:-22.910259}}@keyframes mat-checkbox-checked-indeterminate-checkmark{from{animation-timing-function:cubic-bezier(0, 0, 0.2, 0.1);opacity:1;transform:rotate(0deg)}to{opacity:0;transform:rotate(45deg)}}@keyframes mat-checkbox-indeterminate-checked-checkmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);opacity:0;transform:rotate(45deg)}to{opacity:1;transform:rotate(360deg)}}@keyframes mat-checkbox-checked-indeterminate-mixedmark{from{animation-timing-function:cubic-bezier(0, 0, 0.2, 0.1);opacity:0;transform:rotate(-45deg)}to{opacity:1;transform:rotate(0deg)}}@keyframes mat-checkbox-indeterminate-checked-mixedmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);opacity:1;transform:rotate(0deg)}to{opacity:0;transform:rotate(315deg)}}@keyframes mat-checkbox-indeterminate-unchecked-mixedmark{0%{animation-timing-function:linear;opacity:1;transform:scaleX(1)}32.8%,100%{opacity:0;transform:scaleX(0)}}.mat-checkbox-background,.mat-checkbox-frame{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:2px;box-sizing:border-box;pointer-events:none}.mat-checkbox{transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);cursor:pointer;-webkit-tap-highlight-color:transparent}._mat-animation-noopable.mat-checkbox{transition:none;animation:none}.mat-checkbox .mat-ripple-element:not(.mat-checkbox-persistent-ripple){opacity:.16}.mat-checkbox-layout{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:inherit;align-items:baseline;vertical-align:middle;display:inline-flex;white-space:nowrap}.mat-checkbox-label{-webkit-user-select:auto;-moz-user-select:auto;-ms-user-select:auto;user-select:auto}.mat-checkbox-inner-container{display:inline-block;height:16px;line-height:0;margin:auto;margin-right:8px;order:0;position:relative;vertical-align:middle;white-space:nowrap;width:16px;flex-shrink:0}[dir=rtl] .mat-checkbox-inner-container{margin-left:8px;margin-right:auto}.mat-checkbox-inner-container-no-side-margin{margin-left:0;margin-right:0}.mat-checkbox-frame{background-color:transparent;transition:border-color 90ms cubic-bezier(0, 0, 0.2, 0.1);border-width:2px;border-style:solid}._mat-animation-noopable .mat-checkbox-frame{transition:none}.mat-checkbox.cdk-keyboard-focused .cdk-high-contrast-active .mat-checkbox-frame{border-style:dotted}.mat-checkbox-background{align-items:center;display:inline-flex;justify-content:center;transition:background-color 90ms cubic-bezier(0, 0, 0.2, 0.1),opacity 90ms cubic-bezier(0, 0, 0.2, 0.1)}._mat-animation-noopable .mat-checkbox-background{transition:none}.cdk-high-contrast-active .mat-checkbox .mat-checkbox-background{background:none}.mat-checkbox-persistent-ripple{width:100%;height:100%;transform:none}.mat-checkbox-inner-container:hover .mat-checkbox-persistent-ripple{opacity:.04}.mat-checkbox.cdk-keyboard-focused .mat-checkbox-persistent-ripple{opacity:.12}.mat-checkbox-persistent-ripple,.mat-checkbox.mat-checkbox-disabled .mat-checkbox-inner-container:hover .mat-checkbox-persistent-ripple{opacity:0}@media(hover: none){.mat-checkbox-inner-container:hover .mat-checkbox-persistent-ripple{display:none}}.mat-checkbox-checkmark{top:0;left:0;right:0;bottom:0;position:absolute;width:100%}.mat-checkbox-checkmark-path{stroke-dashoffset:22.910259;stroke-dasharray:22.910259;stroke-width:2.1333333333px}.cdk-high-contrast-black-on-white .mat-checkbox-checkmark-path{stroke:#000 !important}.mat-checkbox-mixedmark{width:calc(100% - 6px);height:2px;opacity:0;transform:scaleX(0) rotate(0deg);border-radius:2px}.cdk-high-contrast-active .mat-checkbox-mixedmark{height:0;border-top:solid 2px;margin-top:2px}.mat-checkbox-label-before .mat-checkbox-inner-container{order:1;margin-left:8px;margin-right:auto}[dir=rtl] .mat-checkbox-label-before .mat-checkbox-inner-container{margin-left:auto;margin-right:8px}.mat-checkbox-checked .mat-checkbox-checkmark{opacity:1}.mat-checkbox-checked .mat-checkbox-checkmark-path{stroke-dashoffset:0}.mat-checkbox-checked .mat-checkbox-mixedmark{transform:scaleX(1) rotate(-45deg)}.mat-checkbox-indeterminate .mat-checkbox-checkmark{opacity:0;transform:rotate(45deg)}.mat-checkbox-indeterminate .mat-checkbox-checkmark-path{stroke-dashoffset:0}.mat-checkbox-indeterminate .mat-checkbox-mixedmark{opacity:1;transform:scaleX(1) rotate(0deg)}.mat-checkbox-unchecked .mat-checkbox-background{background-color:transparent}.mat-checkbox-disabled{cursor:default}.cdk-high-contrast-active .mat-checkbox-disabled{opacity:.5}.mat-checkbox-anim-unchecked-checked .mat-checkbox-background{animation:180ms linear 0ms mat-checkbox-fade-in-background}.mat-checkbox-anim-unchecked-checked .mat-checkbox-checkmark-path{animation:180ms linear 0ms mat-checkbox-unchecked-checked-checkmark-path}.mat-checkbox-anim-unchecked-indeterminate .mat-checkbox-background{animation:180ms linear 0ms mat-checkbox-fade-in-background}.mat-checkbox-anim-unchecked-indeterminate .mat-checkbox-mixedmark{animation:90ms linear 0ms mat-checkbox-unchecked-indeterminate-mixedmark}.mat-checkbox-anim-checked-unchecked .mat-checkbox-background{animation:180ms linear 0ms mat-checkbox-fade-out-background}.mat-checkbox-anim-checked-unchecked .mat-checkbox-checkmark-path{animation:90ms linear 0ms mat-checkbox-checked-unchecked-checkmark-path}.mat-checkbox-anim-checked-indeterminate .mat-checkbox-checkmark{animation:90ms linear 0ms mat-checkbox-checked-indeterminate-checkmark}.mat-checkbox-anim-checked-indeterminate .mat-checkbox-mixedmark{animation:90ms linear 0ms mat-checkbox-checked-indeterminate-mixedmark}.mat-checkbox-anim-indeterminate-checked .mat-checkbox-checkmark{animation:500ms linear 0ms mat-checkbox-indeterminate-checked-checkmark}.mat-checkbox-anim-indeterminate-checked .mat-checkbox-mixedmark{animation:500ms linear 0ms mat-checkbox-indeterminate-checked-mixedmark}.mat-checkbox-anim-indeterminate-unchecked .mat-checkbox-background{animation:180ms linear 0ms mat-checkbox-fade-out-background}.mat-checkbox-anim-indeterminate-unchecked .mat-checkbox-mixedmark{animation:300ms linear 0ms mat-checkbox-indeterminate-unchecked-mixedmark}.mat-checkbox-input{bottom:0;left:50%}.mat-checkbox .mat-checkbox-ripple{position:absolute;left:calc(50% - 20px);top:calc(50% - 20px);height:40px;width:40px;z-index:1;pointer-events:none}\n"];
var RenderType_MatCheckbox = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵcrt"]({ encapsulation: 2, styles: styles_MatCheckbox, data: {} });

function View_MatCheckbox_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵvid"](2, [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵqud"](671088640, 1, { _inputElement: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵqud"](671088640, 2, { ripple: 0 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](2, 0, [["label", 1]], null, 16, "label", [["class", "mat-checkbox-layout"]], [[1, "for", 0]], null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](3, 0, null, null, 10, "div", [["class", "mat-checkbox-inner-container"]], [[2, "mat-checkbox-inner-container-no-side-margin", null]], null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](4, 0, [[1, 0], ["input", 1]], null, 0, "input", [["class", "mat-checkbox-input cdk-visually-hidden"], ["type", "checkbox"]], [[8, "id", 0], [8, "required", 0], [8, "checked", 0], [1, "value", 0], [8, "disabled", 0], [1, "name", 0], [8, "tabIndex", 0], [1, "aria-label", 0], [1, "aria-labelledby", 0], [1, "aria-checked", 0]], [[null, "change"], [null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("change" === en)) {
        var pd_0 = (_co._onInteractionEvent($event) !== false);
        ad = (pd_0 && ad);
    } if (("click" === en)) {
        var pd_1 = (_co._onInputClick($event) !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](5, 0, null, null, 3, "div", [["class", "mat-checkbox-ripple mat-focus-indicator mat-ripple"], ["matRipple", ""]], [[2, "mat-ripple-unbounded", null]], null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdid"](6, 212992, [[2, 4]], 0, _angular_material_core__WEBPACK_IMPORTED_MODULE_4__["MatRipple"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_7__["Platform"], [2, _angular_material_core__WEBPACK_IMPORTED_MODULE_4__["MAT_RIPPLE_GLOBAL_OPTIONS"]], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__["ANIMATION_MODULE_TYPE"]]], { centered: [0, "centered"], radius: [1, "radius"], animation: [2, "animation"], disabled: [3, "disabled"], trigger: [4, "trigger"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵpod"](7, { enterDuration: 0 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](8, 0, null, null, 0, "div", [["class", "mat-ripple-element mat-checkbox-persistent-ripple"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](9, 0, null, null, 0, "div", [["class", "mat-checkbox-frame"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](10, 0, null, null, 3, "div", [["class", "mat-checkbox-background"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](11, 0, null, null, 1, ":svg:svg", [[":xml:space", "preserve"], ["class", "mat-checkbox-checkmark"], ["focusable", "false"], ["version", "1.1"], ["viewBox", "0 0 24 24"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](12, 0, null, null, 0, ":svg:path", [["class", "mat-checkbox-checkmark-path"], ["d", "M4.1,12.7 9,17.6 20.3,6.3"], ["fill", "none"], ["stroke", "white"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](13, 0, null, null, 0, "div", [["class", "mat-checkbox-mixedmark"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](14, 0, [["checkboxLabel", 1]], null, 4, "span", [["class", "mat-checkbox-label"]], null, [[null, "cdkObserveContent"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("cdkObserveContent" === en)) {
        var pd_0 = (_co._onLabelTextChange() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdid"](15, 1196032, null, 0, _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_2__["CdkObserveContent"], [_angular_cdk_observers__WEBPACK_IMPORTED_MODULE_2__["ContentObserver"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]], null, { event: "cdkObserveContent" }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](16, 0, null, null, 1, "span", [["style", "display:none"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵted"](-1, null, ["\u00A0"])), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵncd"](null, 0)], function (_ck, _v) { var _co = _v.component; var currVal_13 = true; var currVal_14 = 20; var currVal_15 = _ck(_v, 7, 0, 150); var currVal_16 = _co._isRippleDisabled(); var currVal_17 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 2); _ck(_v, 6, 0, currVal_13, currVal_14, currVal_15, currVal_16, currVal_17); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.inputId; _ck(_v, 2, 0, currVal_0); var currVal_1 = (!_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 14).textContent || !_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 14).textContent.trim()); _ck(_v, 3, 0, currVal_1); var currVal_2 = _co.inputId; var currVal_3 = _co.required; var currVal_4 = _co.checked; var currVal_5 = _co.value; var currVal_6 = _co.disabled; var currVal_7 = _co.name; var currVal_8 = _co.tabIndex; var currVal_9 = (_co.ariaLabel || null); var currVal_10 = _co.ariaLabelledby; var currVal_11 = _co._getAriaChecked(); _ck(_v, 4, 0, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9, currVal_10, currVal_11); var currVal_12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 6).unbounded; _ck(_v, 5, 0, currVal_12); }); }
function View_MatCheckbox_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](0, 0, null, null, 2, "mat-checkbox", [["class", "mat-checkbox"]], [[8, "id", 0], [1, "tabindex", 0], [2, "mat-checkbox-indeterminate", null], [2, "mat-checkbox-checked", null], [2, "mat-checkbox-disabled", null], [2, "mat-checkbox-label-before", null], [2, "_mat-animation-noopable", null]], null, null, View_MatCheckbox_0, RenderType_MatCheckbox)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵprd"](5120, null, _angular_forms__WEBPACK_IMPORTED_MODULE_9__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [_angular_material_checkbox__WEBPACK_IMPORTED_MODULE_1__["MatCheckbox"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdid"](2, 12763136, null, 0, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_1__["MatCheckbox"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__["FocusMonitor"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"], [8, null], [2, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_1__["MAT_CHECKBOX_CLICK_ACTION"]], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__["ANIMATION_MODULE_TYPE"]], [2, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_1__["MAT_CHECKBOX_DEFAULT_OPTIONS"]]], null, null)], null, function (_ck, _v) { var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 2).id; var currVal_1 = null; var currVal_2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 2).indeterminate; var currVal_3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 2).checked; var currVal_4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 2).disabled; var currVal_5 = (_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 2).labelPosition == "before"); var currVal_6 = (_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 2)._animationMode === "NoopAnimations"); _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6); }); }
var MatCheckboxNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵccf"]("mat-checkbox", _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_1__["MatCheckbox"], View_MatCheckbox_Host_0, { disableRipple: "disableRipple", color: "color", tabIndex: "tabIndex", ariaLabel: "aria-label", ariaLabelledby: "aria-labelledby", id: "id", required: "required", labelPosition: "labelPosition", name: "name", value: "value", checked: "checked", disabled: "disabled", indeterminate: "indeterminate" }, { change: "change", indeterminateChange: "indeterminateChange" }, ["*"]);



/***/ }),

/***/ "./node_modules/@angular/material/fesm5/tree.js":
/*!******************************************************!*\
  !*** ./node_modules/@angular/material/fesm5/tree.js ***!
  \******************************************************/
/*! exports provided: MatNestedTreeNode, MatTree, MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule, MatTreeNestedDataSource, MatTreeNode, MatTreeNodeDef, MatTreeNodeOutlet, MatTreeNodePadding, MatTreeNodeToggle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatNestedTreeNode", function() { return MatNestedTreeNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatTree", function() { return MatTree; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatTreeFlatDataSource", function() { return MatTreeFlatDataSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatTreeFlattener", function() { return MatTreeFlattener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatTreeModule", function() { return MatTreeModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatTreeNestedDataSource", function() { return MatTreeNestedDataSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatTreeNode", function() { return MatTreeNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatTreeNodeDef", function() { return MatTreeNodeDef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatTreeNodeOutlet", function() { return MatTreeNodeOutlet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatTreeNodePadding", function() { return MatTreeNodePadding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatTreeNodeToggle", function() { return MatTreeNodeToggle; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/tree */ "./node_modules/@angular/cdk/fesm5/tree.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/fesm5/core.js");
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/coercion */ "./node_modules/@angular/cdk/fesm5/coercion.js");
/* harmony import */ var _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/collections */ "./node_modules/@angular/cdk/fesm5/collections.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");









/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var _MatTreeNodeMixinBase = Object(_angular_material_core__WEBPACK_IMPORTED_MODULE_3__["mixinTabIndex"])(Object(_angular_material_core__WEBPACK_IMPORTED_MODULE_3__["mixinDisabled"])(_angular_cdk_tree__WEBPACK_IMPORTED_MODULE_1__["CdkTreeNode"]));
/**
 * Wrapper for the CdkTree node with Material design styles.
 */
var MatTreeNode = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(MatTreeNode, _super);
    function MatTreeNode(_elementRef, _tree, tabIndex) {
        var _this = _super.call(this, _elementRef, _tree) || this;
        _this._elementRef = _elementRef;
        _this._tree = _tree;
        _this.role = 'treeitem';
        _this.tabIndex = Number(tabIndex) || 0;
        return _this;
    }
    MatTreeNode.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Directive"], args: [{
                    selector: 'mat-tree-node',
                    exportAs: 'matTreeNode',
                    inputs: ['disabled', 'tabIndex'],
                    host: {
                        '[attr.aria-expanded]': 'isExpanded',
                        '[attr.aria-level]': 'role === "treeitem" ? level : null',
                        '[attr.role]': 'role',
                        'class': 'mat-tree-node'
                    },
                    providers: [{ provide: _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_1__["CdkTreeNode"], useExisting: MatTreeNode }]
                },] }
    ];
    /** @nocollapse */
    MatTreeNode.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"] },
        { type: _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_1__["CdkTree"] },
        { type: String, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Attribute"], args: ['tabindex',] }] }
    ]; };
    MatTreeNode.propDecorators = {
        role: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }]
    };
    return MatTreeNode;
}(_MatTreeNodeMixinBase));
/**
 * Wrapper for the CdkTree node definition with Material design styles.
 */
var MatTreeNodeDef = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(MatTreeNodeDef, _super);
    function MatTreeNodeDef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatTreeNodeDef.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Directive"], args: [{
                    selector: '[matTreeNodeDef]',
                    inputs: [
                        'when: matTreeNodeDefWhen'
                    ],
                    providers: [{ provide: _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_1__["CdkTreeNodeDef"], useExisting: MatTreeNodeDef }]
                },] }
    ];
    MatTreeNodeDef.propDecorators = {
        data: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"], args: ['matTreeNode',] }]
    };
    return MatTreeNodeDef;
}(_angular_cdk_tree__WEBPACK_IMPORTED_MODULE_1__["CdkTreeNodeDef"]));
/**
 * Wrapper for the CdkTree nested node with Material design styles.
 */
var MatNestedTreeNode = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(MatNestedTreeNode, _super);
    function MatNestedTreeNode(_elementRef, _tree, _differs, tabIndex) {
        var _this = _super.call(this, _elementRef, _tree, _differs) || this;
        _this._elementRef = _elementRef;
        _this._tree = _tree;
        _this._differs = _differs;
        _this._disabled = false;
        _this.tabIndex = Number(tabIndex) || 0;
        return _this;
    }
    Object.defineProperty(MatNestedTreeNode.prototype, "disabled", {
        /** Whether the node is disabled. */
        get: function () { return this._disabled; },
        set: function (value) { this._disabled = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_4__["coerceBooleanProperty"])(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatNestedTreeNode.prototype, "tabIndex", {
        /** Tabindex for the node. */
        get: function () { return this.disabled ? -1 : this._tabIndex; },
        set: function (value) {
            // If the specified tabIndex value is null or undefined, fall back to the default value.
            this._tabIndex = value != null ? value : 0;
        },
        enumerable: true,
        configurable: true
    });
    // This is a workaround for https://github.com/angular/angular/issues/23091
    // In aot mode, the lifecycle hooks from parent class are not called.
    // TODO(tinayuangao): Remove when the angular issue #23091 is fixed
    MatNestedTreeNode.prototype.ngAfterContentInit = function () {
        _super.prototype.ngAfterContentInit.call(this);
    };
    MatNestedTreeNode.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
    };
    MatNestedTreeNode.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Directive"], args: [{
                    selector: 'mat-nested-tree-node',
                    exportAs: 'matNestedTreeNode',
                    host: {
                        '[attr.aria-expanded]': 'isExpanded',
                        '[attr.role]': 'role',
                        'class': 'mat-nested-tree-node',
                    },
                    providers: [
                        { provide: _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_1__["CdkNestedTreeNode"], useExisting: MatNestedTreeNode },
                        { provide: _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_1__["CdkTreeNode"], useExisting: MatNestedTreeNode },
                        { provide: _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_1__["CDK_TREE_NODE_OUTLET_NODE"], useExisting: MatNestedTreeNode }
                    ]
                },] }
    ];
    /** @nocollapse */
    MatNestedTreeNode.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"] },
        { type: _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_1__["CdkTree"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["IterableDiffers"] },
        { type: String, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Attribute"], args: ['tabindex',] }] }
    ]; };
    MatNestedTreeNode.propDecorators = {
        node: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"], args: ['matNestedTreeNode',] }],
        disabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        tabIndex: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }]
    };
    return MatNestedTreeNode;
}(_angular_cdk_tree__WEBPACK_IMPORTED_MODULE_1__["CdkNestedTreeNode"]));

/**
 * Wrapper for the CdkTree padding with Material design styles.
 */
var MatTreeNodePadding = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(MatTreeNodePadding, _super);
    function MatTreeNodePadding() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatTreeNodePadding.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Directive"], args: [{
                    selector: '[matTreeNodePadding]',
                    providers: [{ provide: _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_1__["CdkTreeNodePadding"], useExisting: MatTreeNodePadding }]
                },] }
    ];
    MatTreeNodePadding.propDecorators = {
        level: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"], args: ['matTreeNodePadding',] }],
        indent: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"], args: ['matTreeNodePaddingIndent',] }]
    };
    return MatTreeNodePadding;
}(_angular_cdk_tree__WEBPACK_IMPORTED_MODULE_1__["CdkTreeNodePadding"]));

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Outlet for nested CdkNode. Put `[matTreeNodeOutlet]` on a tag to place children dataNodes
 * inside the outlet.
 */
var MatTreeNodeOutlet = /** @class */ (function () {
    function MatTreeNodeOutlet(viewContainer, _node) {
        this.viewContainer = viewContainer;
        this._node = _node;
    }
    MatTreeNodeOutlet.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Directive"], args: [{
                    selector: '[matTreeNodeOutlet]',
                    providers: [{
                            provide: _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_1__["CdkTreeNodeOutlet"],
                            useExisting: MatTreeNodeOutlet
                        }]
                },] }
    ];
    /** @nocollapse */
    MatTreeNodeOutlet.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewContainerRef"] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"], args: [_angular_cdk_tree__WEBPACK_IMPORTED_MODULE_1__["CDK_TREE_NODE_OUTLET_NODE"],] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Optional"] }] }
    ]; };
    return MatTreeNodeOutlet;
}());

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Wrapper for the CdkTable with Material design styles.
 */
var MatTree = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(MatTree, _super);
    function MatTree() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatTree.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"], args: [{
                    selector: 'mat-tree',
                    exportAs: 'matTree',
                    template: "<ng-container matTreeNodeOutlet></ng-container>",
                    host: {
                        'class': 'mat-tree',
                        'role': 'tree',
                    },
                    encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewEncapsulation"].None,
                    // See note on CdkTree for explanation on why this uses the default change detection strategy.
                    // tslint:disable-next-line:validate-decorators
                    changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ChangeDetectionStrategy"].Default,
                    providers: [{ provide: _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_1__["CdkTree"], useExisting: MatTree }],
                    styles: [".mat-tree{display:block}.mat-tree-node{display:flex;align-items:center;min-height:48px;flex:1;word-wrap:break-word}.mat-nested-tree-node{border-bottom-width:0}\n"]
                }] }
    ];
    MatTree.propDecorators = {
        _nodeOutlet: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"], args: [MatTreeNodeOutlet, { static: true },] }]
    };
    return MatTree;
}(_angular_cdk_tree__WEBPACK_IMPORTED_MODULE_1__["CdkTree"]));

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Wrapper for the CdkTree's toggle with Material design styles.
 */
var MatTreeNodeToggle = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(MatTreeNodeToggle, _super);
    function MatTreeNodeToggle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.recursive = false;
        return _this;
    }
    MatTreeNodeToggle.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Directive"], args: [{
                    selector: '[matTreeNodeToggle]',
                    providers: [{ provide: _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_1__["CdkTreeNodeToggle"], useExisting: MatTreeNodeToggle }]
                },] }
    ];
    MatTreeNodeToggle.propDecorators = {
        recursive: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"], args: ['matTreeNodeToggleRecursive',] }]
    };
    return MatTreeNodeToggle;
}(_angular_cdk_tree__WEBPACK_IMPORTED_MODULE_1__["CdkTreeNodeToggle"]));

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var MAT_TREE_DIRECTIVES = [
    MatNestedTreeNode,
    MatTreeNodeDef,
    MatTreeNodePadding,
    MatTreeNodeToggle,
    MatTree,
    MatTreeNode,
    MatTreeNodeOutlet
];
var MatTreeModule = /** @class */ (function () {
    function MatTreeModule() {
    }
    MatTreeModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"], args: [{
                    imports: [_angular_cdk_tree__WEBPACK_IMPORTED_MODULE_1__["CdkTreeModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_3__["MatCommonModule"]],
                    exports: MAT_TREE_DIRECTIVES,
                    declarations: MAT_TREE_DIRECTIVES,
                },] }
    ];
    return MatTreeModule;
}());

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Tree flattener to convert a normal type of node to node with children & level information.
 * Transform nested nodes of type `T` to flattened nodes of type `F`.
 *
 * For example, the input data of type `T` is nested, and contains its children data:
 *   SomeNode: {
 *     key: 'Fruits',
 *     children: [
 *       NodeOne: {
 *         key: 'Apple',
 *       },
 *       NodeTwo: {
 *        key: 'Pear',
 *      }
 *    ]
 *  }
 *  After flattener flatten the tree, the structure will become
 *  SomeNode: {
 *    key: 'Fruits',
 *    expandable: true,
 *    level: 1
 *  },
 *  NodeOne: {
 *    key: 'Apple',
 *    expandable: false,
 *    level: 2
 *  },
 *  NodeTwo: {
 *   key: 'Pear',
 *   expandable: false,
 *   level: 2
 * }
 * and the output flattened type is `F` with additional information.
 */
var MatTreeFlattener = /** @class */ (function () {
    function MatTreeFlattener(transformFunction, getLevel, isExpandable, getChildren) {
        this.transformFunction = transformFunction;
        this.getLevel = getLevel;
        this.isExpandable = isExpandable;
        this.getChildren = getChildren;
    }
    MatTreeFlattener.prototype._flattenNode = function (node, level, resultNodes, parentMap) {
        var _this = this;
        var flatNode = this.transformFunction(node, level);
        resultNodes.push(flatNode);
        if (this.isExpandable(flatNode)) {
            var childrenNodes = this.getChildren(node);
            if (childrenNodes) {
                if (Array.isArray(childrenNodes)) {
                    this._flattenChildren(childrenNodes, level, resultNodes, parentMap);
                }
                else {
                    childrenNodes.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["take"])(1)).subscribe(function (children) {
                        _this._flattenChildren(children, level, resultNodes, parentMap);
                    });
                }
            }
        }
        return resultNodes;
    };
    MatTreeFlattener.prototype._flattenChildren = function (children, level, resultNodes, parentMap) {
        var _this = this;
        children.forEach(function (child, index) {
            var childParentMap = parentMap.slice();
            childParentMap.push(index != children.length - 1);
            _this._flattenNode(child, level + 1, resultNodes, childParentMap);
        });
    };
    /**
     * Flatten a list of node type T to flattened version of node F.
     * Please note that type T may be nested, and the length of `structuredData` may be different
     * from that of returned list `F[]`.
     */
    MatTreeFlattener.prototype.flattenNodes = function (structuredData) {
        var _this = this;
        var resultNodes = [];
        structuredData.forEach(function (node) { return _this._flattenNode(node, 0, resultNodes, []); });
        return resultNodes;
    };
    /**
     * Expand flattened node with current expansion status.
     * The returned list may have different length.
     */
    MatTreeFlattener.prototype.expandFlattenedNodes = function (nodes, treeControl) {
        var _this = this;
        var results = [];
        var currentExpand = [];
        currentExpand[0] = true;
        nodes.forEach(function (node) {
            var expand = true;
            for (var i = 0; i <= _this.getLevel(node); i++) {
                expand = expand && currentExpand[i];
            }
            if (expand) {
                results.push(node);
            }
            if (_this.isExpandable(node)) {
                currentExpand[_this.getLevel(node) + 1] = treeControl.isExpanded(node);
            }
        });
        return results;
    };
    return MatTreeFlattener;
}());
/**
 * Data source for flat tree.
 * The data source need to handle expansion/collapsion of the tree node and change the data feed
 * to `MatTree`.
 * The nested tree nodes of type `T` are flattened through `MatTreeFlattener`, and converted
 * to type `F` for `MatTree` to consume.
 */
var MatTreeFlatDataSource = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(MatTreeFlatDataSource, _super);
    function MatTreeFlatDataSource(_treeControl, _treeFlattener, initialData) {
        if (initialData === void 0) { initialData = []; }
        var _this = _super.call(this) || this;
        _this._treeControl = _treeControl;
        _this._treeFlattener = _treeFlattener;
        _this._flattenedData = new rxjs__WEBPACK_IMPORTED_MODULE_6__["BehaviorSubject"]([]);
        _this._expandedData = new rxjs__WEBPACK_IMPORTED_MODULE_6__["BehaviorSubject"]([]);
        _this._data = new rxjs__WEBPACK_IMPORTED_MODULE_6__["BehaviorSubject"](initialData);
        return _this;
    }
    Object.defineProperty(MatTreeFlatDataSource.prototype, "data", {
        get: function () { return this._data.value; },
        set: function (value) {
            this._data.next(value);
            this._flattenedData.next(this._treeFlattener.flattenNodes(this.data));
            this._treeControl.dataNodes = this._flattenedData.value;
        },
        enumerable: true,
        configurable: true
    });
    MatTreeFlatDataSource.prototype.connect = function (collectionViewer) {
        var _this = this;
        var changes = [
            collectionViewer.viewChange,
            this._treeControl.expansionModel.changed,
            this._flattenedData
        ];
        return rxjs__WEBPACK_IMPORTED_MODULE_6__["merge"].apply(void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(changes)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["map"])(function () {
            _this._expandedData.next(_this._treeFlattener.expandFlattenedNodes(_this._flattenedData.value, _this._treeControl));
            return _this._expandedData.value;
        }));
    };
    MatTreeFlatDataSource.prototype.disconnect = function () {
        // no op
    };
    return MatTreeFlatDataSource;
}(_angular_cdk_collections__WEBPACK_IMPORTED_MODULE_5__["DataSource"]));

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Data source for nested tree.
 *
 * The data source for nested tree doesn't have to consider node flattener, or the way to expand
 * or collapse. The expansion/collapsion will be handled by TreeControl and each non-leaf node.
 */
var MatTreeNestedDataSource = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(MatTreeNestedDataSource, _super);
    function MatTreeNestedDataSource() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._data = new rxjs__WEBPACK_IMPORTED_MODULE_6__["BehaviorSubject"]([]);
        return _this;
    }
    Object.defineProperty(MatTreeNestedDataSource.prototype, "data", {
        /**
         * Data for the nested tree
         */
        get: function () { return this._data.value; },
        set: function (value) { this._data.next(value); },
        enumerable: true,
        configurable: true
    });
    MatTreeNestedDataSource.prototype.connect = function (collectionViewer) {
        var _this = this;
        return rxjs__WEBPACK_IMPORTED_MODULE_6__["merge"].apply(void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])([collectionViewer.viewChange, this._data])).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["map"])(function () {
            return _this.data;
        }));
    };
    MatTreeNestedDataSource.prototype.disconnect = function () {
        // no op
    };
    return MatTreeNestedDataSource;
}(_angular_cdk_collections__WEBPACK_IMPORTED_MODULE_5__["DataSource"]));

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Generated bundle index. Do not edit.
 */


//# sourceMappingURL=tree.js.map


/***/ }),

/***/ "./node_modules/@angular/material/tree/index.ngfactory.js":
/*!****************************************************************!*\
  !*** ./node_modules/@angular/material/tree/index.ngfactory.js ***!
  \****************************************************************/
/*! exports provided: MatTreeModuleNgFactory, RenderType_MatTree, View_MatTree_0, View_MatTree_Host_0, MatTreeNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatTreeModuleNgFactory", function() { return MatTreeModuleNgFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_MatTree", function() { return RenderType_MatTree; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_MatTree_0", function() { return View_MatTree_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_MatTree_Host_0", function() { return View_MatTree_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatTreeNgFactory", function() { return MatTreeNgFactory; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_tree__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/tree */ "./node_modules/@angular/material/fesm5/tree.js");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/a11y */ "./node_modules/@angular/cdk/fesm5/a11y.js");
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/platform */ "./node_modules/@angular/cdk/fesm5/platform.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/tree */ "./node_modules/@angular/cdk/fesm5/tree.js");
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/bidi */ "./node_modules/@angular/cdk/fesm5/bidi.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/fesm5/core.js");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes,extraRequire}
 * tslint:disable
 */ 








var MatTreeModuleNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵcmf"](_angular_material_tree__WEBPACK_IMPORTED_MODULE_1__["MatTreeModule"], [], function (_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmod"]([_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵCodegenComponentFactoryResolver"], [[8, []], [3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"]], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModuleRef"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](135680, _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_2__["FocusMonitor"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_2__["FocusMonitor"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_3__["Platform"], [2, _angular_common__WEBPACK_IMPORTED_MODULE_4__["DOCUMENT"]], [2, _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_2__["FOCUS_MONITOR_DEFAULT_OPTIONS"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_5__["CdkTreeNodeDef"], _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_5__["CdkTreeNodeDef"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_5__["CdkTreeModule"], _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_5__["CdkTreeModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_6__["BidiModule"], _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_6__["BidiModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_7__["MatCommonModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_7__["MatCommonModule"], [_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_2__["HighContrastModeDetector"], [2, _angular_material_core__WEBPACK_IMPORTED_MODULE_7__["MATERIAL_SANITY_CHECKS"]], [2, _angular_common__WEBPACK_IMPORTED_MODULE_4__["DOCUMENT"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_tree__WEBPACK_IMPORTED_MODULE_1__["MatTreeModule"], _angular_material_tree__WEBPACK_IMPORTED_MODULE_1__["MatTreeModule"], [])]); });

var styles_MatTree = [".mat-tree{display:block}.mat-tree-node{display:flex;align-items:center;min-height:48px;flex:1;word-wrap:break-word}.mat-nested-tree-node{border-bottom-width:0}\n"];
var RenderType_MatTree = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵcrt"]({ encapsulation: 2, styles: styles_MatTree, data: {} });

function View_MatTree_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵvid"](0, [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵqud"](402653184, 1, { _nodeOutlet: 0 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](1, 16777216, null, null, 2, null, null, null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵprd"](6144, null, _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_5__["CdkTreeNodeOutlet"], null, [_angular_material_tree__WEBPACK_IMPORTED_MODULE_1__["MatTreeNodeOutlet"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdid"](3, 16384, [[1, 4]], 0, _angular_material_tree__WEBPACK_IMPORTED_MODULE_1__["MatTreeNodeOutlet"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"], [2, _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_5__["CDK_TREE_NODE_OUTLET_NODE"]]], null, null)], null, null); }
function View_MatTree_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](0, 0, null, null, 3, "mat-tree", [["class", "mat-tree"], ["role", "tree"]], null, null, null, View_MatTree_0, RenderType_MatTree)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵprd"](6144, null, _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_5__["CdkTree"], null, [_angular_material_tree__WEBPACK_IMPORTED_MODULE_1__["MatTree"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdid"](2, 2342912, null, 1, _angular_material_tree__WEBPACK_IMPORTED_MODULE_1__["MatTree"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["IterableDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵqud"](603979776, 1, { _nodeDefs: 1 })], function (_ck, _v) { _ck(_v, 2, 0); }, null); }
var MatTreeNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵccf"]("mat-tree", _angular_material_tree__WEBPACK_IMPORTED_MODULE_1__["MatTree"], View_MatTree_Host_0, { dataSource: "dataSource", treeControl: "treeControl", trackBy: "trackBy" }, {}, []);



/***/ }),

/***/ "./src/app/pattern-view-management/add-to-view/add-to-view.component.ngfactory.js":
/*!****************************************************************************************!*\
  !*** ./src/app/pattern-view-management/add-to-view/add-to-view.component.ngfactory.js ***!
  \****************************************************************************************/
/*! exports provided: RenderType_AddToViewComponent, View_AddToViewComponent_0, View_AddToViewComponent_Host_0, AddToViewComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_AddToViewComponent", function() { return RenderType_AddToViewComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_AddToViewComponent_0", function() { return View_AddToViewComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_AddToViewComponent_Host_0", function() { return View_AddToViewComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddToViewComponentNgFactory", function() { return AddToViewComponentNgFactory; });
/* harmony import */ var _add_to_view_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./add-to-view.component.scss.shim.ngstyle */ "./src/app/pattern-view-management/add-to-view/add-to-view.component.scss.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/tree */ "./node_modules/@angular/cdk/fesm5/tree.js");
/* harmony import */ var _angular_material_tree__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/tree */ "./node_modules/@angular/material/fesm5/tree.js");
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/bidi */ "./node_modules/@angular/cdk/fesm5/bidi.js");
/* harmony import */ var _node_modules_angular_material_button_index_ngfactory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../node_modules/@angular/material/button/index.ngfactory */ "./node_modules/@angular/material/button/index.ngfactory.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/fesm5/button.js");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/a11y */ "./node_modules/@angular/cdk/fesm5/a11y.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _node_modules_angular_material_checkbox_index_ngfactory__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../node_modules/@angular/material/checkbox/index.ngfactory */ "./node_modules/@angular/material/checkbox/index.ngfactory.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/checkbox */ "./node_modules/@angular/material/fesm5/checkbox.js");
/* harmony import */ var _node_modules_angular_material_icon_index_ngfactory__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../node_modules/@angular/material/icon/index.ngfactory */ "./node_modules/@angular/material/icon/index.ngfactory.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/fesm5/icon.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/fesm5/dialog.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _node_modules_angular_material_tree_index_ngfactory__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../node_modules/@angular/material/tree/index.ngfactory */ "./node_modules/@angular/material/tree/index.ngfactory.js");
/* harmony import */ var _add_to_view_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./add-to-view.component */ "./src/app/pattern-view-management/add-to-view/add-to-view.component.ts");
/* harmony import */ var _core_service_pattern_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../core/service/pattern.service */ "./src/app/core/service/pattern.service.ts");
/* harmony import */ var _core_service_pattern_relation_descriptor_service__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../core/service/pattern-relation-descriptor.service */ "./src/app/core/service/pattern-relation-descriptor.service.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes,extraRequire}
 * tslint:disable
 */ 




















var styles_AddToViewComponent = [_add_to_view_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_AddToViewComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_AddToViewComponent, data: {} });

function View_AddToViewComponent_1(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "p", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["No links found."]))], null, null); }
function View_AddToViewComponent_2(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 10, "mat-tree-node", [["class", "mat-tree-node"], ["matTreeNodePadding", ""]], [[1, "aria-expanded", 0], [1, "aria-level", 0], [1, "role", 0]], null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](6144, null, _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_2__["CdkTreeNodePadding"], null, [_angular_material_tree__WEBPACK_IMPORTED_MODULE_3__["MatTreeNodePadding"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 16384, null, 0, _angular_material_tree__WEBPACK_IMPORTED_MODULE_3__["MatTreeNode"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_2__["CdkTree"], [8, null]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_2__["CdkTreeNode"], null, [_angular_material_tree__WEBPACK_IMPORTED_MODULE_3__["MatTreeNode"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](4, 147456, null, 0, _angular_material_tree__WEBPACK_IMPORTED_MODULE_3__["MatTreeNodePadding"], [_angular_cdk_tree__WEBPACK_IMPORTED_MODULE_2__["CdkTreeNode"], _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_2__["CdkTree"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_4__["Directionality"]]], { level: [0, "level"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](5, 0, null, null, 1, "button", [["class", "mat-focus-indicator"], ["disabled", ""], ["mat-icon-button", ""]], [[1, "disabled", 0], [2, "_mat-animation-noopable", null]], null, null, _node_modules_angular_material_button_index_ngfactory__WEBPACK_IMPORTED_MODULE_5__["View_MatButton_0"], _node_modules_angular_material_button_index_ngfactory__WEBPACK_IMPORTED_MODULE_5__["RenderType_MatButton"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](6, 180224, null, 0, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__["MatButton"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_7__["FocusMonitor"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__["ANIMATION_MODULE_TYPE"]]], { disabled: [0, "disabled"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](7, 0, null, null, 3, "mat-checkbox", [["class", "checklist-leaf-node mat-checkbox"]], [[8, "id", 0], [1, "tabindex", 0], [2, "mat-checkbox-indeterminate", null], [2, "mat-checkbox-checked", null], [2, "mat-checkbox-disabled", null], [2, "mat-checkbox-label-before", null], [2, "_mat-animation-noopable", null]], [[null, "change"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("change" === en)) {
        var pd_0 = (_co.todoLeafItemSelectionToggle(_v.context.$implicit) !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_material_checkbox_index_ngfactory__WEBPACK_IMPORTED_MODULE_9__["View_MatCheckbox_0"], _node_modules_angular_material_checkbox_index_ngfactory__WEBPACK_IMPORTED_MODULE_9__["RenderType_MatCheckbox"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](5120, null, _angular_forms__WEBPACK_IMPORTED_MODULE_10__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [_angular_material_checkbox__WEBPACK_IMPORTED_MODULE_11__["MatCheckbox"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](9, 12763136, null, 0, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_11__["MatCheckbox"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_7__["FocusMonitor"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], [8, null], [2, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_11__["MAT_CHECKBOX_CLICK_ACTION"]], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__["ANIMATION_MODULE_TYPE"]], [2, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_11__["MAT_CHECKBOX_DEFAULT_OPTIONS"]]], { checked: [0, "checked"] }, { change: "change" }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](10, 0, [" ", " "]))], function (_ck, _v) { var _co = _v.component; var currVal_3 = ""; _ck(_v, 4, 0, currVal_3); var currVal_6 = ""; _ck(_v, 6, 0, currVal_6); var currVal_14 = _co.checklistSelection.isSelected(_v.context.$implicit); _ck(_v, 9, 0, currVal_14); }, function (_ck, _v) { var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2).isExpanded; var currVal_1 = ((_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2).role === "treeitem") ? _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2).level : null); var currVal_2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2).role; _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2); var currVal_4 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6).disabled || null); var currVal_5 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6)._animationMode === "NoopAnimations"); _ck(_v, 5, 0, currVal_4, currVal_5); var currVal_7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 9).id; var currVal_8 = null; var currVal_9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 9).indeterminate; var currVal_10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 9).checked; var currVal_11 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 9).disabled; var currVal_12 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 9).labelPosition == "before"); var currVal_13 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 9)._animationMode === "NoopAnimations"); _ck(_v, 7, 0, currVal_7, currVal_8, currVal_9, currVal_10, currVal_11, currVal_12, currVal_13); var currVal_15 = _v.context.$implicit.item.name; _ck(_v, 10, 0, currVal_15); }); }
function View_AddToViewComponent_3(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 15, "mat-tree-node", [["class", "mat-tree-node"], ["matTreeNodePadding", ""]], [[1, "aria-expanded", 0], [1, "aria-level", 0], [1, "role", 0]], null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](6144, null, _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_2__["CdkTreeNodePadding"], null, [_angular_material_tree__WEBPACK_IMPORTED_MODULE_3__["MatTreeNodePadding"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 16384, null, 0, _angular_material_tree__WEBPACK_IMPORTED_MODULE_3__["MatTreeNode"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_2__["CdkTree"], [8, null]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_2__["CdkTreeNode"], null, [_angular_material_tree__WEBPACK_IMPORTED_MODULE_3__["MatTreeNode"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](4, 147456, null, 0, _angular_material_tree__WEBPACK_IMPORTED_MODULE_3__["MatTreeNodePadding"], [_angular_cdk_tree__WEBPACK_IMPORTED_MODULE_2__["CdkTreeNode"], _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_2__["CdkTree"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_4__["Directionality"]]], { level: [0, "level"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](5, 0, null, null, 6, "button", [["class", "mat-focus-indicator"], ["mat-icon-button", ""], ["matTreeNodeToggle", ""]], [[1, "aria-label", 0], [1, "disabled", 0], [2, "_mat-animation-noopable", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 8)._toggle($event) !== false);
        ad = (pd_0 && ad);
    } if (("click" === en)) {
        var pd_1 = (_co.loadChildren(_v.context.$implicit) !== false);
        ad = (pd_1 && ad);
    } return ad; }, _node_modules_angular_material_button_index_ngfactory__WEBPACK_IMPORTED_MODULE_5__["View_MatButton_0"], _node_modules_angular_material_button_index_ngfactory__WEBPACK_IMPORTED_MODULE_5__["RenderType_MatButton"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](6144, null, _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_2__["CdkTreeNodeToggle"], null, [_angular_material_tree__WEBPACK_IMPORTED_MODULE_3__["MatTreeNodeToggle"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](7, 180224, null, 0, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__["MatButton"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_7__["FocusMonitor"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__["ANIMATION_MODULE_TYPE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](8, 16384, null, 0, _angular_material_tree__WEBPACK_IMPORTED_MODULE_3__["MatTreeNodeToggle"], [_angular_cdk_tree__WEBPACK_IMPORTED_MODULE_2__["CdkTree"], _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_2__["CdkTreeNode"]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](9, 0, null, 0, 2, "mat-icon", [["class", "mat-icon-rtl-mirror mat-icon notranslate"], ["role", "img"]], [[2, "mat-icon-inline", null], [2, "mat-icon-no-color", null]], null, null, _node_modules_angular_material_icon_index_ngfactory__WEBPACK_IMPORTED_MODULE_12__["View_MatIcon_0"], _node_modules_angular_material_icon_index_ngfactory__WEBPACK_IMPORTED_MODULE_12__["RenderType_MatIcon"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](10, 9158656, null, 0, _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__["MatIcon"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__["MatIconRegistry"], [8, null], [2, _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__["MAT_ICON_LOCATION"]], [2, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ErrorHandler"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](11, 0, [" ", " "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](12, 0, null, null, 3, "mat-checkbox", [["class", "checklist-leaf-node mat-checkbox"]], [[8, "id", 0], [1, "tabindex", 0], [2, "mat-checkbox-indeterminate", null], [2, "mat-checkbox-checked", null], [2, "mat-checkbox-disabled", null], [2, "mat-checkbox-label-before", null], [2, "_mat-animation-noopable", null]], [[null, "change"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("change" === en)) {
        var pd_0 = (_co.todoItemSelectionToggle(_v.context.$implicit) !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_material_checkbox_index_ngfactory__WEBPACK_IMPORTED_MODULE_9__["View_MatCheckbox_0"], _node_modules_angular_material_checkbox_index_ngfactory__WEBPACK_IMPORTED_MODULE_9__["RenderType_MatCheckbox"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](5120, null, _angular_forms__WEBPACK_IMPORTED_MODULE_10__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [_angular_material_checkbox__WEBPACK_IMPORTED_MODULE_11__["MatCheckbox"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](14, 12763136, null, 0, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_11__["MatCheckbox"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_7__["FocusMonitor"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], [8, null], [2, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_11__["MAT_CHECKBOX_CLICK_ACTION"]], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__["ANIMATION_MODULE_TYPE"]], [2, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_11__["MAT_CHECKBOX_DEFAULT_OPTIONS"]]], { checked: [0, "checked"], indeterminate: [1, "indeterminate"] }, { change: "change" }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](15, 0, [" ", " "]))], function (_ck, _v) { var _co = _v.component; var currVal_3 = ""; _ck(_v, 4, 0, currVal_3); _ck(_v, 10, 0); var currVal_17 = _co.descendantsAllSelected(_v.context.$implicit); var currVal_18 = _co.descendantsPartiallySelected(_v.context.$implicit); _ck(_v, 14, 0, currVal_17, currVal_18); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2).isExpanded; var currVal_1 = ((_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2).role === "treeitem") ? _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2).level : null); var currVal_2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2).role; _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2); var currVal_4 = ("toggle " + _v.context.$implicit.filename); var currVal_5 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 7).disabled || null); var currVal_6 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 7)._animationMode === "NoopAnimations"); _ck(_v, 5, 0, currVal_4, currVal_5, currVal_6); var currVal_7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 10).inline; var currVal_8 = (((_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 10).color !== "primary") && (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 10).color !== "accent")) && (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 10).color !== "warn")); _ck(_v, 9, 0, currVal_7, currVal_8); var currVal_9 = (_co.treeControl.isExpanded(_v.context.$implicit) ? "expand_more" : "chevron_right"); _ck(_v, 11, 0, currVal_9); var currVal_10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 14).id; var currVal_11 = null; var currVal_12 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 14).indeterminate; var currVal_13 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 14).checked; var currVal_14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 14).disabled; var currVal_15 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 14).labelPosition == "before"); var currVal_16 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 14)._animationMode === "NoopAnimations"); _ck(_v, 12, 0, currVal_10, currVal_11, currVal_12, currVal_13, currVal_14, currVal_15, currVal_16); var currVal_19 = _v.context.$implicit.item.name; _ck(_v, 15, 0, currVal_19); }); }
function View_AddToViewComponent_4(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 3, "mat-tree-node", [["class", "mat-tree-node"]], [[1, "aria-expanded", 0], [1, "aria-level", 0], [1, "role", 0]], null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](6144, null, _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_2__["CdkTreeNode"], null, [_angular_material_tree__WEBPACK_IMPORTED_MODULE_3__["MatTreeNode"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 16384, null, 0, _angular_material_tree__WEBPACK_IMPORTED_MODULE_3__["MatTreeNode"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_2__["CdkTree"], [8, null]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" No patterns found for this language. "]))], null, function (_ck, _v) { var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2).isExpanded; var currVal_1 = ((_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2).role === "treeitem") ? _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2).level : null); var currVal_2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2).role; _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2); }); }
function View_AddToViewComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "h1", [["class", "mat-dialog-title"], ["mat-dialog-title", ""]], [[8, "id", 0]], null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 81920, null, 0, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_14__["MatDialogTitle"], [[2, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_14__["MatDialogRef"]], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_14__["MatDialog"]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](2, null, ["", ""])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, null, 16, "mat-dialog-content", [["class", "mat-dialog-content"]], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](4, 16384, null, 0, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_14__["MatDialogContent"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_AddToViewComponent_1)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](6, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_15__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](7, 0, null, null, 12, "mat-tree", [["class", "mat-tree"], ["role", "tree"]], null, null, null, _node_modules_angular_material_tree_index_ngfactory__WEBPACK_IMPORTED_MODULE_16__["View_MatTree_0"], _node_modules_angular_material_tree_index_ngfactory__WEBPACK_IMPORTED_MODULE_16__["RenderType_MatTree"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](6144, null, _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_2__["CdkTree"], null, [_angular_material_tree__WEBPACK_IMPORTED_MODULE_3__["MatTree"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](9, 2342912, null, 1, _angular_material_tree__WEBPACK_IMPORTED_MODULE_3__["MatTree"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]], { dataSource: [0, "dataSource"], treeControl: [1, "treeControl"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 1, { _nodeDefs: 1 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](0, null, null, 2, null, View_AddToViewComponent_2)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](12, 16384, null, 0, _angular_material_tree__WEBPACK_IMPORTED_MODULE_3__["MatTreeNodeDef"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, [[1, 4]], _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_2__["CdkTreeNodeDef"], null, [_angular_material_tree__WEBPACK_IMPORTED_MODULE_3__["MatTreeNodeDef"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](0, null, null, 2, null, View_AddToViewComponent_3)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](15, 16384, null, 0, _angular_material_tree__WEBPACK_IMPORTED_MODULE_3__["MatTreeNodeDef"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { when: [0, "when"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, [[1, 4]], _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_2__["CdkTreeNodeDef"], null, [_angular_material_tree__WEBPACK_IMPORTED_MODULE_3__["MatTreeNodeDef"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](0, null, null, 2, null, View_AddToViewComponent_4)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](18, 16384, null, 0, _angular_material_tree__WEBPACK_IMPORTED_MODULE_3__["MatTreeNodeDef"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { when: [0, "when"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, [[1, 4]], _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_2__["CdkTreeNodeDef"], null, [_angular_material_tree__WEBPACK_IMPORTED_MODULE_3__["MatTreeNodeDef"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](20, 0, null, null, 9, "mat-dialog-actions", [["class", "mat-dialog-actions"]], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](21, 16384, null, 0, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_14__["MatDialogActions"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](22, 0, null, null, 3, "button", [["class", "mat-focus-indicator"], ["mat-button", ""]], [[1, "aria-label", 0], [1, "type", 0], [1, "disabled", 0], [2, "_mat-animation-noopable", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 23).dialogRef.close(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 23).dialogResult) !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_material_button_index_ngfactory__WEBPACK_IMPORTED_MODULE_5__["View_MatButton_0"], _node_modules_angular_material_button_index_ngfactory__WEBPACK_IMPORTED_MODULE_5__["RenderType_MatButton"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](23, 606208, null, 0, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_14__["MatDialogClose"], [[2, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_14__["MatDialogRef"]], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_14__["MatDialog"]], { dialogResult: [0, "dialogResult"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](24, 180224, null, 0, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__["MatButton"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_7__["FocusMonitor"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__["ANIMATION_MODULE_TYPE"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, 0, ["Close"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](26, 0, null, null, 3, "button", [["class", "mat-focus-indicator"], ["mat-button", ""]], [[1, "aria-label", 0], [1, "type", 0], [1, "disabled", 0], [2, "_mat-animation-noopable", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).dialogRef.close(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).dialogResult) !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_material_button_index_ngfactory__WEBPACK_IMPORTED_MODULE_5__["View_MatButton_0"], _node_modules_angular_material_button_index_ngfactory__WEBPACK_IMPORTED_MODULE_5__["RenderType_MatButton"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](27, 606208, null, 0, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_14__["MatDialogClose"], [[2, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_14__["MatDialogRef"]], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_14__["MatDialog"]], { dialogResult: [0, "dialogResult"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](28, 180224, null, 0, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__["MatButton"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_7__["FocusMonitor"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__["ANIMATION_MODULE_TYPE"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, 0, ["Save "]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 1, 0); var currVal_2 = ((((_co.data.links == null) ? null : _co.data.links.length) === 0) && !_co.data.patternlanguages); _ck(_v, 6, 0, currVal_2); var currVal_3 = _co.dataSource; var currVal_4 = _co.treeControl; _ck(_v, 9, 0, currVal_3, currVal_4); var currVal_5 = _co.hasChild; _ck(_v, 15, 0, currVal_5); var currVal_6 = _co.isLoadMore; _ck(_v, 18, 0, currVal_6); var currVal_11 = null; _ck(_v, 23, 0, currVal_11); var currVal_16 = _co.getPatterns(); _ck(_v, 27, 0, currVal_16); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).id; _ck(_v, 0, 0, currVal_0); var currVal_1 = _co.data.title; _ck(_v, 2, 0, currVal_1); var currVal_7 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 23).ariaLabel || null); var currVal_8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 23).type; var currVal_9 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 24).disabled || null); var currVal_10 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 24)._animationMode === "NoopAnimations"); _ck(_v, 22, 0, currVal_7, currVal_8, currVal_9, currVal_10); var currVal_12 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).ariaLabel || null); var currVal_13 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).type; var currVal_14 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 28).disabled || null); var currVal_15 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 28)._animationMode === "NoopAnimations"); _ck(_v, 26, 0, currVal_12, currVal_13, currVal_14, currVal_15); }); }
function View_AddToViewComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "pp-add-to-view", [], null, null, null, View_AddToViewComponent_0, RenderType_AddToViewComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 49152, null, 0, _add_to_view_component__WEBPACK_IMPORTED_MODULE_17__["AddToViewComponent"], [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_14__["MAT_DIALOG_DATA"], _core_service_pattern_service__WEBPACK_IMPORTED_MODULE_18__["PatternService"], _core_service_pattern_relation_descriptor_service__WEBPACK_IMPORTED_MODULE_19__["PatternRelationDescriptorService"]], null, null)], null, null); }
var AddToViewComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("pp-add-to-view", _add_to_view_component__WEBPACK_IMPORTED_MODULE_17__["AddToViewComponent"], View_AddToViewComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/pattern-view-management/add-to-view/add-to-view.component.scss.shim.ngstyle.js":
/*!************************************************************************************************!*\
  !*** ./src/app/pattern-view-management/add-to-view/add-to-view.component.scss.shim.ngstyle.js ***!
  \************************************************************************************************/
/*! exports provided: styles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes,extraRequire}
 * tslint:disable
 */ 
var styles = ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhdHRlcm4tdmlldy1tYW5hZ2VtZW50L2FkZC10by12aWV3L2FkZC10by12aWV3LmNvbXBvbmVudC5zY3NzIn0= */"];



/***/ }),

/***/ "./src/app/pattern-view-management/add-to-view/add-to-view.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/pattern-view-management/add-to-view/add-to-view.component.ts ***!
  \******************************************************************************/
/*! exports provided: LoadmoreNode, LoazyLoadedFlatNode, LinksToOtherPattern, AddToViewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadmoreNode", function() { return LoadmoreNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoazyLoadedFlatNode", function() { return LoazyLoadedFlatNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LinksToOtherPattern", function() { return LinksToOtherPattern; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddToViewComponent", function() { return AddToViewComponent; });
/* harmony import */ var _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/cdk/tree */ "./node_modules/@angular/cdk/fesm5/tree.js");
/* harmony import */ var _angular_material_tree__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/tree */ "./node_modules/@angular/material/fesm5/tree.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _core_service_pattern_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/service/pattern.service */ "./src/app/core/service/pattern.service.ts");
/* harmony import */ var _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/collections */ "./node_modules/@angular/cdk/fesm5/collections.js");
/* harmony import */ var _core_service_pattern_relation_descriptor_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/service/pattern-relation-descriptor.service */ "./src/app/core/service/pattern-relation-descriptor.service.ts");






/** Nested node */
var LoadmoreNode = /** @class */ (function () {
    function LoadmoreNode(item, hasChildren, loadMoreParentItem) {
        if (hasChildren === void 0) { hasChildren = false; }
        if (loadMoreParentItem === void 0) { loadMoreParentItem = null; }
        this.item = item;
        this.hasChildren = hasChildren;
        this.loadMoreParentItem = loadMoreParentItem;
        this.childrenChange = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
    }
    Object.defineProperty(LoadmoreNode.prototype, "children", {
        get: function () {
            return this.childrenChange.value;
        },
        enumerable: true,
        configurable: true
    });
    return LoadmoreNode;
}());

/** Flat node with expandable and level information */
var LoazyLoadedFlatNode = /** @class */ (function () {
    function LoazyLoadedFlatNode(item, level, expandable, loadMoreParentItem) {
        if (level === void 0) { level = 1; }
        if (expandable === void 0) { expandable = false; }
        if (loadMoreParentItem === void 0) { loadMoreParentItem = null; }
        this.item = item;
        this.level = level;
        this.expandable = expandable;
        this.loadMoreParentItem = loadMoreParentItem;
    }
    return LoazyLoadedFlatNode;
}());

var LinksToOtherPattern = /** @class */ (function () {
    function LinksToOtherPattern(edge, isDirectedLink, patternId) {
        var relatedPatternIsSource;
        if (isDirectedLink) {
            relatedPatternIsSource = edge.targetPatternId === patternId;
            this.name = relatedPatternIsSource ? edge.sourcePatternName : edge.targetPatternName;
            this.id = relatedPatternIsSource ? edge.sourcePatternId : edge.targetPatternId;
            this.linkedPattern = relatedPatternIsSource ? edge._links.sourcePattern : edge._links.targetPattern;
            this.type = 'directed';
            this.edge = edge;
        }
        else {
            edge = edge;
            relatedPatternIsSource = edge.pattern2Id === patternId;
            this.name = relatedPatternIsSource ? edge.pattern1Name : edge.pattern2Name;
            this.id = relatedPatternIsSource ? edge.pattern1Id : edge.pattern2Id;
            this.linkedPattern = relatedPatternIsSource ? edge._links.pattern[0] : edge._links.pattern[1];
            this.type = 'undirected';
            this.edge = edge;
        }
    }
    return LinksToOtherPattern;
}());

var AddToViewComponent = /** @class */ (function () {
    function AddToViewComponent(data, patternService, patternRelationDescriptorService) {
        var _this = this;
        this.data = data;
        this.patternService = patternService;
        this.patternRelationDescriptorService = patternRelationDescriptorService;
        this.nodeMap = new Map();
        this.LOAD_MORE = 'LOAD_MORE';
        this.isLinkModal = false;
        this.checklistSelection = new _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_4__["SelectionModel"](true /* multiple */);
        this.getChildren = function (node) { return node.childrenChange; };
        this.transformer = function (node, level) {
            var existingNode = _this.nodeMap.get(node.item.id);
            if (existingNode) {
                return existingNode;
            }
            var newNode = new LoazyLoadedFlatNode(node.item, level, node.hasChildren, node.loadMoreParentItem);
            _this.nodeMap.set(node.item.id, newNode);
            return newNode;
        };
        this.getLevel = function (node) { return node.level; };
        this.isExpandable = function (node) { return node.level === 0; };
        this.hasChild = function (_, _nodeData) { return _nodeData.level === 0; };
        this.isLoadMore = function (_, _nodeData) { return _nodeData.item.id === _this.LOAD_MORE; }; // ?
        this.isLinkModal = !!data.patternlanguages;
        this.treeFlattener = new _angular_material_tree__WEBPACK_IMPORTED_MODULE_1__["MatTreeFlattener"](this.transformer, this.getLevel, this.isExpandable, this.getChildren);
        this.treeControl = new _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_0__["FlatTreeControl"](this.getLevel, this.isExpandable);
        this.dataSource = new _angular_material_tree__WEBPACK_IMPORTED_MODULE_1__["MatTreeFlatDataSource"](this.treeControl, this.treeFlattener);
        this.nodes = this.isLinkModal ? data.patternlanguages.map(function (it) { return new LoadmoreNode(it); }) : data.links.map(function (it) { return new LoadmoreNode(it); });
        this.patternId = data.patternId ? data.patternId : null;
        this.dataSource.data = this.nodes;
    }
    /** Load more nodes from data source */
    AddToViewComponent.prototype.loadMore = function (node) {
        var treenode = this.nodes.find(function (it) { return it.item.id === node.item.id; });
        if (treenode.children.length > 0) {
            treenode.childrenChange.next(treenode.children);
            return;
        }
        if (node.item['uri']) {
            this.getPatternsAndAddToTree(node.item, treenode, node);
        }
        else {
            this.getRelatedPatternAndAddToTree(node.item, treenode, node);
        }
    };
    AddToViewComponent.prototype.loadChildren = function (node) {
        this.loadMore(node);
    };
    AddToViewComponent.prototype.todoLeafItemSelectionToggle = function (node) {
        this.checklistSelection.toggle(node);
        this.checkAllParentsSelection(node);
    };
    /* Checks all the parents when a leaf node is selected/unselected */
    AddToViewComponent.prototype.checkAllParentsSelection = function (node) {
        var parent = this.getParentNode(node);
        while (parent) {
            this.checkRootNodeSelection(parent);
            parent = this.getParentNode(parent);
        }
    };
    /** Whether part of the descendants are selected */
    AddToViewComponent.prototype.descendantsPartiallySelected = function (node) {
        var _this = this;
        var descendants = this.treeControl.getDescendants(node);
        var result = descendants.some(function (child) { return _this.checklistSelection.isSelected(child); });
        return result && !this.descendantsAllSelected(node);
    };
    /** Whether all the descendants of the node are selected. */
    AddToViewComponent.prototype.descendantsAllSelected = function (node) {
        var _this = this;
        var descendants = this.treeControl.getDescendants(node);
        var descAllSelected = descendants.every(function (child) {
            return _this.checklistSelection.isSelected(child);
        });
        return descAllSelected && descendants.length > 0;
    };
    /** Check root node checked state and change it accordingly */
    AddToViewComponent.prototype.checkRootNodeSelection = function (node) {
        var _this = this;
        var nodeSelected = this.checklistSelection.isSelected(node);
        var descendants = this.treeControl.getDescendants(node);
        var descAllSelected = descendants.every(function (child) {
            return _this.checklistSelection.isSelected(child);
        });
        if (nodeSelected && !descAllSelected) {
            this.checklistSelection.deselect(node);
        }
        else if (!nodeSelected && descAllSelected) {
            this.checklistSelection.select(node);
        }
    };
    /* Get the parent node of a node */
    AddToViewComponent.prototype.getParentNode = function (node) {
        var currentLevel = node.level;
        if (currentLevel < 1) {
            return null;
        }
        var startIndex = this.treeControl.dataNodes.indexOf(node) - 1;
        for (var i = startIndex; i >= 0; i--) {
            var currentNode = this.treeControl.dataNodes[i];
            if (currentNode.level < currentLevel) {
                return currentNode;
            }
        }
        return null;
    };
    /** Toggle the to-do item selection. Select/deselect all the descendants node */
    AddToViewComponent.prototype.todoItemSelectionToggle = function (node) {
        var _a, _b;
        var _this = this;
        this.checklistSelection.toggle(node);
        var descendants = this.treeControl.getDescendants(node);
        this.checklistSelection.isSelected(node)
            ? (_a = this.checklistSelection).select.apply(_a, descendants) : (_b = this.checklistSelection).deselect.apply(_b, descendants);
        // if a pattern language is selected that hasn't been loaded, load the children
        if (this.checklistSelection.isSelected(node) && descendants.length === 0) {
            this.loadMore(node);
        }
        // Force update for the parent
        descendants.every(function (child) {
            return _this.checklistSelection.isSelected(child);
        });
        this.checkAllParentsSelection(node);
    };
    AddToViewComponent.prototype.getPatterns = function () {
        return this.checklistSelection.selected.filter(function (node) { return node.level === 1; });
    };
    AddToViewComponent.prototype.updateTree = function (node, treenode, childnodes) {
        var _a;
        treenode.childrenChange.next(childnodes);
        this.dataSource.data = this.nodes;
        var descendants = this.treeControl.getDescendants(node);
        if (this.checklistSelection.isSelected(node)) {
            (_a = this.checklistSelection).select.apply(_a, descendants);
        }
    };
    AddToViewComponent.prototype.getPatternsAndAddToTree = function (item, treenode, node) {
        var _this = this;
        this.patternService.getPatternsByUrl(item._links.patterns.href).subscribe(function (patterns) {
            var dummy = { id: _this.LOAD_MORE, name: '', uri: '', content: null, renderedContent: null, _links: null, patternLanguageId: '', patternLanguageName: '' };
            var childnodes = patterns.length > 0 ? patterns.map(function (it) { return new LoadmoreNode(it); }) : [new LoadmoreNode(dummy)];
            _this.updateTree(node, treenode, childnodes);
        });
    };
    AddToViewComponent.prototype.getRelatedPatternAndAddToTree = function (item, treenode, node) {
        var _this = this;
        var edgesObservables = node.item['links'].map(function (link) { return item.type === 'directed' ?
            _this.patternRelationDescriptorService.getDirectedEdgeByUrl(link.href) :
            _this.patternRelationDescriptorService.getUndirectedEdgeByUrl(link.href); });
        // @ts-ignore
        rxjs__WEBPACK_IMPORTED_MODULE_2__["forkJoin"].apply(void 0, edgesObservables).subscribe(function (edges) {
            var childnodes = edges.map(function (edge) {
                return new LoadmoreNode(new LinksToOtherPattern(edge, item.type === 'directed', _this.patternId));
            });
            _this.updateTree(node, treenode, childnodes);
        });
    };
    return AddToViewComponent;
}());



/***/ }),

/***/ "./src/app/pattern-view-management/pattern-view-management.module.ngfactory.js":
/*!*************************************************************************************!*\
  !*** ./src/app/pattern-view-management/pattern-view-management.module.ngfactory.js ***!
  \*************************************************************************************/
/*! exports provided: PatternViewManagementModuleNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatternViewManagementModuleNgFactory", function() { return PatternViewManagementModuleNgFactory; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _pattern_view_management_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pattern-view-management.module */ "./src/app/pattern-view-management/pattern-view-management.module.ts");
/* harmony import */ var _node_modules_covalent_text_editor_covalent_text_editor_ngfactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/@covalent/text-editor/covalent-text-editor.ngfactory */ "./node_modules/@covalent/text-editor/covalent-text-editor.ngfactory.js");
/* harmony import */ var _node_modules_angular_material_dialog_index_ngfactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/@angular/material/dialog/index.ngfactory */ "./node_modules/@angular/material/dialog/index.ngfactory.js");
/* harmony import */ var _node_modules_angular_material_datepicker_index_ngfactory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../node_modules/@angular/material/datepicker/index.ngfactory */ "./node_modules/@angular/material/datepicker/index.ngfactory.js");
/* harmony import */ var _node_modules_angular_material_tooltip_index_ngfactory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../node_modules/@angular/material/tooltip/index.ngfactory */ "./node_modules/@angular/material/tooltip/index.ngfactory.js");
/* harmony import */ var _node_modules_angular_router_router_ngfactory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../node_modules/@angular/router/router.ngfactory */ "./node_modules/@angular/router/router.ngfactory.js");
/* harmony import */ var _core_default_pl_renderer_default_pl_renderer_component_ngfactory__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../core/default-pl-renderer/default-pl-renderer.component.ngfactory */ "./src/app/core/default-pl-renderer/default-pl-renderer.component.ngfactory.js");
/* harmony import */ var _core_default_pattern_renderer_default_pattern_renderer_component_ngfactory__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../core/default-pattern-renderer/default-pattern-renderer.component.ngfactory */ "./src/app/core/default-pattern-renderer/default-pattern-renderer.component.ngfactory.js");
/* harmony import */ var _core_component_md_editor_md_editor_component_ngfactory__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../core/component/md-editor/md-editor.component.ngfactory */ "./src/app/core/component/md-editor/md-editor.component.ngfactory.js");
/* harmony import */ var _core_component_divider_divider_component_ngfactory__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../core/component/divider/divider.component.ngfactory */ "./src/app/core/component/divider/divider.component.ngfactory.js");
/* harmony import */ var _core_component_create_pattern_relation_create_pattern_relation_component_ngfactory__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../core/component/create-pattern-relation/create-pattern-relation.component.ngfactory */ "./src/app/core/component/create-pattern-relation/create-pattern-relation.component.ngfactory.js");
/* harmony import */ var _core_component_delete_pattern_relation_delete_pattern_relation_component_ngfactory__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../core/component/delete-pattern-relation/delete-pattern-relation.component.ngfactory */ "./src/app/core/component/delete-pattern-relation/delete-pattern-relation.component.ngfactory.js");
/* harmony import */ var _core_component_markdown_content_container_markdown_pattern_sectioncontent_markdown_pattern_section_content_component_ngfactory__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../core/component/markdown-content-container/markdown-pattern-sectioncontent/markdown-pattern-section-content.component.ngfactory */ "./src/app/core/component/markdown-content-container/markdown-pattern-sectioncontent/markdown-pattern-section-content.component.ngfactory.js");
/* harmony import */ var _core_component_cardrenderer_card_renderer_component_ngfactory__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../core/component/cardrenderer/card-renderer.component.ngfactory */ "./src/app/core/component/cardrenderer/card-renderer.component.ngfactory.js");
/* harmony import */ var _core_component_graph_display_graph_display_component_ngfactory__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../core/component/graph-display/graph-display.component.ngfactory */ "./src/app/core/component/graph-display/graph-display.component.ngfactory.js");
/* harmony import */ var _core_component_create_edit_pattern_language_create_edit_pattern_language_component_ngfactory__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../core/component/create-edit-pattern-language/create-edit-pattern-language.component.ngfactory */ "./src/app/core/component/create-edit-pattern-language/create-edit-pattern-language.component.ngfactory.js");
/* harmony import */ var _pattern_view_management_pattern_view_management_component_ngfactory__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./pattern-view-management/pattern-view-management.component.ngfactory */ "./src/app/pattern-view-management/pattern-view-management/pattern-view-management.component.ngfactory.js");
/* harmony import */ var _pattern_view_renderer_pattern_view_renderer_component_ngfactory__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./pattern-view-renderer/pattern-view-renderer.component.ngfactory */ "./src/app/pattern-view-management/pattern-view-renderer/pattern-view-renderer.component.ngfactory.js");
/* harmony import */ var _add_to_view_add_to_view_component_ngfactory__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./add-to-view/add-to-view.component.ngfactory */ "./src/app/pattern-view-management/add-to-view/add-to-view.component.ngfactory.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/cdk/observers */ "./node_modules/@angular/cdk/fesm5/observers.js");
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/cdk/drag-drop */ "./node_modules/@angular/cdk/fesm5/drag-drop.js");
/* harmony import */ var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/cdk/scrolling */ "./node_modules/@angular/cdk/fesm5/scrolling.js");
/* harmony import */ var _angular_flex_layout_core__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/flex-layout/core */ "./node_modules/@angular/flex-layout/esm5/core.es5.js");
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/cdk/overlay */ "./node_modules/@angular/cdk/fesm5/overlay.js");
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/cdk/bidi */ "./node_modules/@angular/cdk/fesm5/bidi.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/fesm5/dialog.js");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/material/datepicker */ "./node_modules/@angular/material/fesm5/datepicker.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/fesm5/tooltip.js");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @angular/material/select */ "./node_modules/@angular/material/fesm5/select.js");
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @angular/material/autocomplete */ "./node_modules/@angular/material/fesm5/autocomplete.js");
/* harmony import */ var ngx_md__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ngx-md */ "./node_modules/ngx-md/fesm5/ngx-md.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! @angular/cdk/platform */ "./node_modules/@angular/cdk/fesm5/platform.js");
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! @angular/material/sort */ "./node_modules/@angular/material/fesm5/sort.js");
/* harmony import */ var _core_service_pattern_language_service__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ../core/service/pattern-language.service */ "./src/app/core/service/pattern-language.service.ts");
/* harmony import */ var _core_service_pattern_service__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ../core/service/pattern.service */ "./src/app/core/service/pattern.service.ts");
/* harmony import */ var _core_service_pattern_view_service__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ../core/service/pattern-view.service */ "./src/app/core/service/pattern-view.service.ts");
/* harmony import */ var _core_user_management_services_user_service__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ../core/user-management/_services/user.service */ "./src/app/core/user-management/_services/user.service.ts");
/* harmony import */ var angular2_toaster_src_toaster_service__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! angular2-toaster/src/toaster.service */ "./node_modules/angular2-toaster/src/toaster.service.js");
/* harmony import */ var _core_user_management_store_user_store__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ../core/user-management/_store/user.store */ "./src/app/core/user-management/_store/user.store.ts");
/* harmony import */ var _core_issue_management_services_issue_management_service__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ../core/issue-management/_services/issue-management.service */ "./src/app/core/issue-management/_services/issue-management.service.ts");
/* harmony import */ var _authentication_services_authentication_service__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ../authentication/_services/authentication.service */ "./src/app/authentication/_services/authentication.service.ts");
/* harmony import */ var _core_issue_management_store_issue_management_store__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ../core/issue-management/_store/issue-management-store */ "./src/app/core/issue-management/_store/issue-management-store.ts");
/* harmony import */ var _core_candidate_management_services_candidate_management_service__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ../core/candidate-management/_services/candidate-management.service */ "./src/app/core/candidate-management/_services/candidate-management.service.ts");
/* harmony import */ var _core_candidate_management_store_candidate_management_store__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ../core/candidate-management/_store/candidate-management.store */ "./src/app/core/candidate-management/_store/candidate-management.store.ts");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! @angular/cdk/a11y */ "./node_modules/@angular/cdk/fesm5/a11y.js");
/* harmony import */ var _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! @angular/cdk/tree */ "./node_modules/@angular/cdk/fesm5/tree.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/fesm5/card.js");
/* harmony import */ var _angular_material_badge__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! @angular/material/badge */ "./node_modules/@angular/material/fesm5/badge.js");
/* harmony import */ var angular2_prettyjson__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! angular2-prettyjson */ "./node_modules/angular2-prettyjson/esm5/angular2-prettyjson.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/fesm5/button.js");
/* harmony import */ var _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! @angular/cdk/text-field */ "./node_modules/@angular/cdk/fesm5/text-field.js");
/* harmony import */ var _covalent_text_editor__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! @covalent/text-editor */ "./node_modules/@covalent/text-editor/fesm5/covalent-text-editor.js");
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! @angular/flex-layout/flex */ "./node_modules/@angular/flex-layout/esm5/flex.es5.js");
/* harmony import */ var _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! @angular/flex-layout/extended */ "./node_modules/@angular/flex-layout/esm5/extended.es5.js");
/* harmony import */ var _angular_flex_layout_grid__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! @angular/flex-layout/grid */ "./node_modules/@angular/flex-layout/esm5/grid.es5.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! @angular/material/progress-spinner */ "./node_modules/@angular/material/fesm5/progress-spinner.js");
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! @angular/material/divider */ "./node_modules/@angular/material/fesm5/divider.js");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! @angular/material/list */ "./node_modules/@angular/material/fesm5/list.js");
/* harmony import */ var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! @angular/cdk/portal */ "./node_modules/@angular/cdk/fesm5/portal.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/fesm5/form-field.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/fesm5/input.js");
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! @angular/material/grid-list */ "./node_modules/@angular/material/fesm5/grid-list.js");
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! @angular/material/sidenav */ "./node_modules/@angular/material/fesm5/sidenav.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/fesm5/icon.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/fesm5/toolbar.js");
/* harmony import */ var _angular_cdk_accordion__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(/*! @angular/cdk/accordion */ "./node_modules/@angular/cdk/fesm5/accordion.js");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(/*! @angular/material/expansion */ "./node_modules/@angular/material/fesm5/expansion.js");
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(/*! @angular/material/button-toggle */ "./node_modules/@angular/material/fesm5/button-toggle.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _core_core_module__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(/*! ../core/core.module */ "./src/app/core/core.module.ts");
/* harmony import */ var _core_service_component_registry_service__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__(/*! ../core/service/component-registry.service */ "./src/app/core/service/component-registry.service.ts");
/* harmony import */ var _angular_material_tree__WEBPACK_IMPORTED_MODULE_78__ = __webpack_require__(/*! @angular/material/tree */ "./node_modules/@angular/material/fesm5/tree.js");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_79__ = __webpack_require__(/*! @angular/material/checkbox */ "./node_modules/@angular/material/fesm5/checkbox.js");
/* harmony import */ var _pattern_view_management_pattern_view_management_component__WEBPACK_IMPORTED_MODULE_80__ = __webpack_require__(/*! ./pattern-view-management/pattern-view-management.component */ "./src/app/pattern-view-management/pattern-view-management/pattern-view-management.component.ts");
/* harmony import */ var _pattern_view_renderer_pattern_view_renderer_component__WEBPACK_IMPORTED_MODULE_81__ = __webpack_require__(/*! ./pattern-view-renderer/pattern-view-renderer.component */ "./src/app/pattern-view-management/pattern-view-renderer/pattern-view-renderer.component.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes,extraRequire}
 * tslint:disable
 */ 


















































































var PatternViewManagementModuleNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵcmf"](_pattern_view_management_module__WEBPACK_IMPORTED_MODULE_1__["PatternViewManagementModule"], [], function (_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmod"]([_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵCodegenComponentFactoryResolver"], [[8, [_node_modules_covalent_text_editor_covalent_text_editor_ngfactory__WEBPACK_IMPORTED_MODULE_2__["TdTextEditorComponentNgFactory"], _node_modules_angular_material_dialog_index_ngfactory__WEBPACK_IMPORTED_MODULE_3__["MatDialogContainerNgFactory"], _node_modules_angular_material_datepicker_index_ngfactory__WEBPACK_IMPORTED_MODULE_4__["MatDatepickerContentNgFactory"], _node_modules_angular_material_datepicker_index_ngfactory__WEBPACK_IMPORTED_MODULE_4__["MatCalendarHeaderNgFactory"], _node_modules_angular_material_tooltip_index_ngfactory__WEBPACK_IMPORTED_MODULE_5__["TooltipComponentNgFactory"], _node_modules_angular_router_router_ngfactory__WEBPACK_IMPORTED_MODULE_6__["ɵangular_packages_router_router_lNgFactory"], _core_default_pl_renderer_default_pl_renderer_component_ngfactory__WEBPACK_IMPORTED_MODULE_7__["DefaultPlRendererComponentNgFactory"], _core_default_pattern_renderer_default_pattern_renderer_component_ngfactory__WEBPACK_IMPORTED_MODULE_8__["DefaultPatternRendererComponentNgFactory"], _core_component_md_editor_md_editor_component_ngfactory__WEBPACK_IMPORTED_MODULE_9__["MdEditorComponentNgFactory"], _core_component_divider_divider_component_ngfactory__WEBPACK_IMPORTED_MODULE_10__["DividerComponentNgFactory"], _core_component_create_pattern_relation_create_pattern_relation_component_ngfactory__WEBPACK_IMPORTED_MODULE_11__["CreatePatternRelationComponentNgFactory"], _core_component_delete_pattern_relation_delete_pattern_relation_component_ngfactory__WEBPACK_IMPORTED_MODULE_12__["DeletePatternRelationComponentNgFactory"], _core_component_markdown_content_container_markdown_pattern_sectioncontent_markdown_pattern_section_content_component_ngfactory__WEBPACK_IMPORTED_MODULE_13__["MarkdownPatternSectionContentComponentNgFactory"], _core_component_cardrenderer_card_renderer_component_ngfactory__WEBPACK_IMPORTED_MODULE_14__["CardRendererComponentNgFactory"], _core_component_graph_display_graph_display_component_ngfactory__WEBPACK_IMPORTED_MODULE_15__["GraphDisplayComponentNgFactory"], _core_component_create_edit_pattern_language_create_edit_pattern_language_component_ngfactory__WEBPACK_IMPORTED_MODULE_16__["CreateEditPatternLanguageComponentNgFactory"], _pattern_view_management_pattern_view_management_component_ngfactory__WEBPACK_IMPORTED_MODULE_17__["PatternViewManagementComponentNgFactory"], _pattern_view_renderer_pattern_view_renderer_component_ngfactory__WEBPACK_IMPORTED_MODULE_18__["PatternViewRendererComponentNgFactory"], _add_to_view_add_to_view_component_ngfactory__WEBPACK_IMPORTED_MODULE_19__["AddToViewComponentNgFactory"]]], [3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"]], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModuleRef"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_common__WEBPACK_IMPORTED_MODULE_20__["NgLocalization"], _angular_common__WEBPACK_IMPORTED_MODULE_20__["NgLocaleLocalization"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["LOCALE_ID"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_21__["MutationObserverFactory"], _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_21__["MutationObserverFactory"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_22__["DragDrop"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_22__["DragDrop"], [_angular_common__WEBPACK_IMPORTED_MODULE_20__["DOCUMENT"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"], _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_23__["ViewportRuler"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_22__["DragDropRegistry"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_core__WEBPACK_IMPORTED_MODULE_0__["APP_BOOTSTRAP_LISTENER"], function (p0_0, p0_1) { return [_angular_flex_layout_core__WEBPACK_IMPORTED_MODULE_24__["removeStyles"](p0_0, p0_1)]; }, [_angular_common__WEBPACK_IMPORTED_MODULE_20__["DOCUMENT"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["PLATFORM_ID"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_25__["Overlay"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_25__["Overlay"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_25__["ScrollStrategyOptions"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_25__["OverlayContainer"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_25__["OverlayPositionBuilder"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_25__["OverlayKeyboardDispatcher"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"], _angular_common__WEBPACK_IMPORTED_MODULE_20__["DOCUMENT"], _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_26__["Directionality"], [2, _angular_common__WEBPACK_IMPORTED_MODULE_20__["Location"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_25__["ɵangular_material_src_cdk_overlay_overlay_c"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_25__["ɵangular_material_src_cdk_overlay_overlay_d"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_25__["Overlay"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_27__["MAT_DIALOG_SCROLL_STRATEGY"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_27__["MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_25__["Overlay"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](135680, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_27__["MatDialog"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_27__["MatDialog"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_25__["Overlay"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"], [2, _angular_common__WEBPACK_IMPORTED_MODULE_20__["Location"]], [2, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_27__["MAT_DIALOG_DEFAULT_OPTIONS"]], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_27__["MAT_DIALOG_SCROLL_STRATEGY"], [3, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_27__["MatDialog"]], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_25__["OverlayContainer"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_28__["MatDatepickerIntl"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_28__["MatDatepickerIntl"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_28__["MAT_DATEPICKER_SCROLL_STRATEGY"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_28__["MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_25__["Overlay"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_material_core__WEBPACK_IMPORTED_MODULE_29__["ErrorStateMatcher"], _angular_material_core__WEBPACK_IMPORTED_MODULE_29__["ErrorStateMatcher"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_forms__WEBPACK_IMPORTED_MODULE_30__["FormBuilder"], _angular_forms__WEBPACK_IMPORTED_MODULE_30__["FormBuilder"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_forms__WEBPACK_IMPORTED_MODULE_30__["ɵangular_packages_forms_forms_n"], _angular_forms__WEBPACK_IMPORTED_MODULE_30__["ɵangular_packages_forms_forms_n"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_31__["MAT_TOOLTIP_SCROLL_STRATEGY"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_31__["MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_25__["Overlay"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_material_select__WEBPACK_IMPORTED_MODULE_32__["MAT_SELECT_SCROLL_STRATEGY"], _angular_material_select__WEBPACK_IMPORTED_MODULE_32__["MAT_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_25__["Overlay"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_33__["MAT_AUTOCOMPLETE_SCROLL_STRATEGY"], _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_33__["MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_25__["Overlay"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, ngx_md__WEBPACK_IMPORTED_MODULE_34__["NgxMdService"], ngx_md__WEBPACK_IMPORTED_MODULE_34__["NgxMdService"], [_angular_common_http__WEBPACK_IMPORTED_MODULE_35__["HttpClient"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_36__["DomSanitizer"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_material_core__WEBPACK_IMPORTED_MODULE_29__["DateAdapter"], _angular_material_core__WEBPACK_IMPORTED_MODULE_29__["NativeDateAdapter"], [[2, _angular_material_core__WEBPACK_IMPORTED_MODULE_29__["MAT_DATE_LOCALE"]], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_37__["Platform"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_material_sort__WEBPACK_IMPORTED_MODULE_38__["MatSortHeaderIntl"], _angular_material_sort__WEBPACK_IMPORTED_MODULE_38__["MAT_SORT_HEADER_INTL_PROVIDER_FACTORY"], [[3, _angular_material_sort__WEBPACK_IMPORTED_MODULE_38__["MatSortHeaderIntl"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, ngx_md__WEBPACK_IMPORTED_MODULE_34__["ɵa"], ngx_md__WEBPACK_IMPORTED_MODULE_34__["ɵa"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _core_service_pattern_language_service__WEBPACK_IMPORTED_MODULE_39__["PatternLanguageService"], _core_service_pattern_language_service__WEBPACK_IMPORTED_MODULE_39__["PatternLanguageService"], [_angular_common_http__WEBPACK_IMPORTED_MODULE_35__["HttpClient"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _core_service_pattern_service__WEBPACK_IMPORTED_MODULE_40__["PatternService"], _core_service_pattern_service__WEBPACK_IMPORTED_MODULE_40__["PatternService"], [_angular_common_http__WEBPACK_IMPORTED_MODULE_35__["HttpClient"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _core_service_pattern_view_service__WEBPACK_IMPORTED_MODULE_41__["PatternViewService"], _core_service_pattern_view_service__WEBPACK_IMPORTED_MODULE_41__["PatternViewService"], [_angular_common_http__WEBPACK_IMPORTED_MODULE_35__["HttpClient"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _core_user_management_services_user_service__WEBPACK_IMPORTED_MODULE_42__["UserService"], _core_user_management_services_user_service__WEBPACK_IMPORTED_MODULE_42__["UserService"], [_angular_common_http__WEBPACK_IMPORTED_MODULE_35__["HttpClient"], angular2_toaster_src_toaster_service__WEBPACK_IMPORTED_MODULE_43__["ToasterService"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _core_user_management_store_user_store__WEBPACK_IMPORTED_MODULE_44__["UserStore"], _core_user_management_store_user_store__WEBPACK_IMPORTED_MODULE_44__["UserStore"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _core_issue_management_services_issue_management_service__WEBPACK_IMPORTED_MODULE_45__["IssueManagementService"], _core_issue_management_services_issue_management_service__WEBPACK_IMPORTED_MODULE_45__["IssueManagementService"], [_angular_common_http__WEBPACK_IMPORTED_MODULE_35__["HttpClient"], angular2_toaster_src_toaster_service__WEBPACK_IMPORTED_MODULE_43__["ToasterService"], _authentication_services_authentication_service__WEBPACK_IMPORTED_MODULE_46__["AuthenticationService"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _core_issue_management_store_issue_management_store__WEBPACK_IMPORTED_MODULE_47__["IssueManagementStore"], _core_issue_management_store_issue_management_store__WEBPACK_IMPORTED_MODULE_47__["IssueManagementStore"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _core_candidate_management_services_candidate_management_service__WEBPACK_IMPORTED_MODULE_48__["CandidateManagementService"], _core_candidate_management_services_candidate_management_service__WEBPACK_IMPORTED_MODULE_48__["CandidateManagementService"], [_angular_common_http__WEBPACK_IMPORTED_MODULE_35__["HttpClient"], angular2_toaster_src_toaster_service__WEBPACK_IMPORTED_MODULE_43__["ToasterService"], _authentication_services_authentication_service__WEBPACK_IMPORTED_MODULE_46__["AuthenticationService"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _core_candidate_management_store_candidate_management_store__WEBPACK_IMPORTED_MODULE_49__["CandidateManagementStore"], _core_candidate_management_store_candidate_management_store__WEBPACK_IMPORTED_MODULE_49__["CandidateManagementStore"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](135680, _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_50__["FocusMonitor"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_50__["FocusMonitor"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_37__["Platform"], [2, _angular_common__WEBPACK_IMPORTED_MODULE_20__["DOCUMENT"]], [2, _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_50__["FOCUS_MONITOR_DEFAULT_OPTIONS"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_51__["CdkTreeNodeDef"], _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_51__["CdkTreeNodeDef"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_common__WEBPACK_IMPORTED_MODULE_20__["CommonModule"], _angular_common__WEBPACK_IMPORTED_MODULE_20__["CommonModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_26__["BidiModule"], _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_26__["BidiModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_29__["MatCommonModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_29__["MatCommonModule"], [_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_50__["HighContrastModeDetector"], [2, _angular_material_core__WEBPACK_IMPORTED_MODULE_29__["MATERIAL_SANITY_CHECKS"]], [2, _angular_common__WEBPACK_IMPORTED_MODULE_20__["DOCUMENT"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_card__WEBPACK_IMPORTED_MODULE_52__["MatCardModule"], _angular_material_card__WEBPACK_IMPORTED_MODULE_52__["MatCardModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_37__["PlatformModule"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_37__["PlatformModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_21__["ObserversModule"], _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_21__["ObserversModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_50__["A11yModule"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_50__["A11yModule"], [_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_50__["HighContrastModeDetector"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_badge__WEBPACK_IMPORTED_MODULE_53__["MatBadgeModule"], _angular_material_badge__WEBPACK_IMPORTED_MODULE_53__["MatBadgeModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_22__["DragDropModule"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_22__["DragDropModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, angular2_prettyjson__WEBPACK_IMPORTED_MODULE_54__["PrettyJsonModule"], angular2_prettyjson__WEBPACK_IMPORTED_MODULE_54__["PrettyJsonModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_29__["MatRippleModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_29__["MatRippleModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_button__WEBPACK_IMPORTED_MODULE_55__["MatButtonModule"], _angular_material_button__WEBPACK_IMPORTED_MODULE_55__["MatButtonModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_56__["TextFieldModule"], _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_56__["TextFieldModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _covalent_text_editor__WEBPACK_IMPORTED_MODULE_57__["CovalentTextEditorModule"], _covalent_text_editor__WEBPACK_IMPORTED_MODULE_57__["CovalentTextEditorModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_flex_layout_core__WEBPACK_IMPORTED_MODULE_24__["CoreModule"], _angular_flex_layout_core__WEBPACK_IMPORTED_MODULE_24__["CoreModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_58__["FlexModule"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_58__["FlexModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_59__["ExtendedModule"], _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_59__["ExtendedModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_flex_layout_grid__WEBPACK_IMPORTED_MODULE_60__["GridModule"], _angular_flex_layout_grid__WEBPACK_IMPORTED_MODULE_60__["GridModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_flex_layout__WEBPACK_IMPORTED_MODULE_61__["FlexLayoutModule"], _angular_flex_layout__WEBPACK_IMPORTED_MODULE_61__["FlexLayoutModule"], [_angular_flex_layout_core__WEBPACK_IMPORTED_MODULE_24__["SERVER_TOKEN"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["PLATFORM_ID"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_62__["MatProgressSpinnerModule"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_62__["MatProgressSpinnerModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_29__["MatLineModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_29__["MatLineModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_29__["MatPseudoCheckboxModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_29__["MatPseudoCheckboxModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_divider__WEBPACK_IMPORTED_MODULE_63__["MatDividerModule"], _angular_material_divider__WEBPACK_IMPORTED_MODULE_63__["MatDividerModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_list__WEBPACK_IMPORTED_MODULE_64__["MatListModule"], _angular_material_list__WEBPACK_IMPORTED_MODULE_64__["MatListModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_65__["PortalModule"], _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_65__["PortalModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_23__["ScrollingModule"], _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_23__["ScrollingModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_25__["OverlayModule"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_25__["OverlayModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_27__["MatDialogModule"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_27__["MatDialogModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_28__["MatDatepickerModule"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_28__["MatDatepickerModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_66__["MatFormFieldModule"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_66__["MatFormFieldModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_input__WEBPACK_IMPORTED_MODULE_67__["MatInputModule"], _angular_material_input__WEBPACK_IMPORTED_MODULE_67__["MatInputModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_forms__WEBPACK_IMPORTED_MODULE_30__["ɵangular_packages_forms_forms_d"], _angular_forms__WEBPACK_IMPORTED_MODULE_30__["ɵangular_packages_forms_forms_d"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_forms__WEBPACK_IMPORTED_MODULE_30__["ReactiveFormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_30__["ReactiveFormsModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_31__["MatTooltipModule"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_31__["MatTooltipModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_29__["MatOptionModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_29__["MatOptionModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_select__WEBPACK_IMPORTED_MODULE_32__["MatSelectModule"], _angular_material_select__WEBPACK_IMPORTED_MODULE_32__["MatSelectModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_68__["MatGridListModule"], _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_68__["MatGridListModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_69__["MatSidenavModule"], _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_69__["MatSidenavModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_33__["MatAutocompleteModule"], _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_33__["MatAutocompleteModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_icon__WEBPACK_IMPORTED_MODULE_70__["MatIconModule"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_70__["MatIconModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_71__["MatToolbarModule"], _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_71__["MatToolbarModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_accordion__WEBPACK_IMPORTED_MODULE_72__["CdkAccordionModule"], _angular_cdk_accordion__WEBPACK_IMPORTED_MODULE_72__["CdkAccordionModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_73__["MatExpansionModule"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_73__["MatExpansionModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_74__["MatButtonToggleModule"], _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_74__["MatButtonToggleModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, ngx_md__WEBPACK_IMPORTED_MODULE_34__["NgxMdModule"], ngx_md__WEBPACK_IMPORTED_MODULE_34__["NgxMdModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_29__["NativeDateModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_29__["NativeDateModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_29__["MatNativeDateModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_29__["MatNativeDateModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_router__WEBPACK_IMPORTED_MODULE_75__["RouterModule"], _angular_router__WEBPACK_IMPORTED_MODULE_75__["RouterModule"], [[2, _angular_router__WEBPACK_IMPORTED_MODULE_75__["ɵangular_packages_router_router_a"]], [2, _angular_router__WEBPACK_IMPORTED_MODULE_75__["Router"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_sort__WEBPACK_IMPORTED_MODULE_38__["MatSortModule"], _angular_material_sort__WEBPACK_IMPORTED_MODULE_38__["MatSortModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_forms__WEBPACK_IMPORTED_MODULE_30__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_30__["FormsModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _core_core_module__WEBPACK_IMPORTED_MODULE_76__["CoreModule"], _core_core_module__WEBPACK_IMPORTED_MODULE_76__["CoreModule"], [_core_service_component_registry_service__WEBPACK_IMPORTED_MODULE_77__["ComponentRegistryService"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_51__["CdkTreeModule"], _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_51__["CdkTreeModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_tree__WEBPACK_IMPORTED_MODULE_78__["MatTreeModule"], _angular_material_tree__WEBPACK_IMPORTED_MODULE_78__["MatTreeModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_79__["_MatCheckboxRequiredValidatorModule"], _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_79__["_MatCheckboxRequiredValidatorModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_79__["MatCheckboxModule"], _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_79__["MatCheckboxModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _pattern_view_management_module__WEBPACK_IMPORTED_MODULE_1__["PatternViewManagementModule"], _pattern_view_management_module__WEBPACK_IMPORTED_MODULE_1__["PatternViewManagementModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](256, _angular_material_core__WEBPACK_IMPORTED_MODULE_29__["MAT_DATE_FORMATS"], _angular_material_core__WEBPACK_IMPORTED_MODULE_29__["MAT_NATIVE_DATE_FORMATS"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1024, _angular_router__WEBPACK_IMPORTED_MODULE_75__["ROUTES"], function () { return [[{ path: "", component: _pattern_view_management_pattern_view_management_component__WEBPACK_IMPORTED_MODULE_80__["PatternViewManagementComponent"] }, { path: ":patternViewUri", component: _pattern_view_renderer_pattern_view_renderer_component__WEBPACK_IMPORTED_MODULE_81__["PatternViewRendererComponent"] }]]; }, [])]); });



/***/ }),

/***/ "./src/app/pattern-view-management/pattern-view-management.module.ts":
/*!***************************************************************************!*\
  !*** ./src/app/pattern-view-management/pattern-view-management.module.ts ***!
  \***************************************************************************/
/*! exports provided: PatternViewManagementModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatternViewManagementModule", function() { return PatternViewManagementModule; });
/* harmony import */ var _pattern_view_management_pattern_view_management_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pattern-view-management/pattern-view-management.component */ "./src/app/pattern-view-management/pattern-view-management/pattern-view-management.component.ts");
/* harmony import */ var _pattern_view_renderer_pattern_view_renderer_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pattern-view-renderer/pattern-view-renderer.component */ "./src/app/pattern-view-management/pattern-view-renderer/pattern-view-renderer.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");



var PATTERN_VIEW_MANAGMENT_ROUTE = [
    // {
    //     path: 'patternviews',
    //     pathMatch: 'prefix',
    //     children: [
    {
        path: '',
        component: _pattern_view_management_pattern_view_management_component__WEBPACK_IMPORTED_MODULE_0__["PatternViewManagementComponent"]
    },
    {
        path: ':patternViewUri',
        component: _pattern_view_renderer_pattern_view_renderer_component__WEBPACK_IMPORTED_MODULE_1__["PatternViewRendererComponent"]
    },
];
var PatternViewManagementModule = /** @class */ (function () {
    function PatternViewManagementModule() {
    }
    return PatternViewManagementModule;
}());



/***/ }),

/***/ "./src/app/pattern-view-management/pattern-view-management/pattern-view-management.component.ngfactory.js":
/*!****************************************************************************************************************!*\
  !*** ./src/app/pattern-view-management/pattern-view-management/pattern-view-management.component.ngfactory.js ***!
  \****************************************************************************************************************/
/*! exports provided: RenderType_PatternViewManagementComponent, View_PatternViewManagementComponent_0, View_PatternViewManagementComponent_Host_0, PatternViewManagementComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_PatternViewManagementComponent", function() { return RenderType_PatternViewManagementComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_PatternViewManagementComponent_0", function() { return View_PatternViewManagementComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_PatternViewManagementComponent_Host_0", function() { return View_PatternViewManagementComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatternViewManagementComponentNgFactory", function() { return PatternViewManagementComponentNgFactory; });
/* harmony import */ var _pattern_view_management_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pattern-view-management.component.scss.shim.ngstyle */ "./src/app/pattern-view-management/pattern-view-management/pattern-view-management.component.scss.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _node_modules_angular_material_card_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/@angular/material/card/index.ngfactory */ "./node_modules/@angular/material/card/index.ngfactory.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/fesm5/card.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _core_component_action_button_bar_action_button_bar_component_ngfactory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/component/action-button-bar/action-button-bar.component.ngfactory */ "./src/app/core/component/action-button-bar/action-button-bar.component.ngfactory.js");
/* harmony import */ var _core_component_action_button_bar_action_button_bar_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/component/action-button-bar/action-button-bar.component */ "./src/app/core/component/action-button-bar/action-button-bar.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _pattern_view_management_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pattern-view-management.component */ "./src/app/pattern-view-management/pattern-view-management/pattern-view-management.component.ts");
/* harmony import */ var _core_service_pattern_view_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../core/service/pattern-view.service */ "./src/app/core/service/pattern-view.service.ts");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/fesm5/dialog.js");
/* harmony import */ var _core_service_pattern_language_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../core/service/pattern-language.service */ "./src/app/core/service/pattern-language.service.ts");
/* harmony import */ var angular2_toaster_src_toaster_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! angular2-toaster/src/toaster.service */ "./node_modules/angular2-toaster/src/toaster.service.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes,extraRequire}
 * tslint:disable
 */ 














var styles_PatternViewManagementComponent = [_pattern_view_management_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_PatternViewManagementComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_PatternViewManagementComponent, data: {} });

function View_PatternViewManagementComponent_1(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 3, "mat-card", [["class", "card box mat-card mat-focus-indicator"]], [[2, "_mat-animation-noopable", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.navigate(_v.context.$implicit) !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_material_card_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_MatCard_0"], _node_modules_angular_material_card_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_MatCard"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 49152, null, 0, _angular_material_card__WEBPACK_IMPORTED_MODULE_3__["MatCard"], [[2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["ANIMATION_MODULE_TYPE"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](2, 0, null, 0, 1, "span", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](3, null, ["", ""]))], null, function (_ck, _v) { var currVal_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._animationMode === "NoopAnimations"); _ck(_v, 0, 0, currVal_0); var currVal_1 = _v.context.$implicit.name; _ck(_v, 3, 0, currVal_1); }); }
function View_PatternViewManagementComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "pp-action-button-bar", [], null, [[null, "addClicked"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("addClicked" === en)) {
        var pd_0 = (_co.createView() !== false);
        ad = (pd_0 && ad);
    } return ad; }, _core_component_action_button_bar_action_button_bar_component_ngfactory__WEBPACK_IMPORTED_MODULE_5__["View_ActionButtonBarComponent_0"], _core_component_action_button_bar_action_button_bar_component_ngfactory__WEBPACK_IMPORTED_MODULE_5__["RenderType_ActionButtonBarComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 114688, null, 0, _core_component_action_button_bar_action_button_bar_component__WEBPACK_IMPORTED_MODULE_6__["ActionButtonBarComponent"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ApplicationRef"]], { addButtonText: [0, "addButtonText"], goBackButton: [1, "goBackButton"] }, { addClicked: "addClicked" }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](2, 0, null, null, 2, "div", [["style", "display: flex; flex-wrap: wrap; padding: 0.25em;"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_PatternViewManagementComponent_1)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](4, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgForOf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"]], { ngForOf: [0, "ngForOf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = "Add View"; var currVal_1 = false; _ck(_v, 1, 0, currVal_0, currVal_1); var currVal_2 = ((_co.patternViewResponse == null) ? null : ((_co.patternViewResponse._embedded == null) ? null : _co.patternViewResponse._embedded.patternViews)); _ck(_v, 4, 0, currVal_2); }, null); }
function View_PatternViewManagementComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "pp-solution-language-management", [], null, null, null, View_PatternViewManagementComponent_0, RenderType_PatternViewManagementComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 114688, null, 0, _pattern_view_management_component__WEBPACK_IMPORTED_MODULE_8__["PatternViewManagementComponent"], [_core_service_pattern_view_service__WEBPACK_IMPORTED_MODULE_9__["PatternViewService"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__["MatDialog"], _core_service_pattern_language_service__WEBPACK_IMPORTED_MODULE_11__["PatternLanguageService"], angular2_toaster_src_toaster_service__WEBPACK_IMPORTED_MODULE_12__["ToasterService"], _angular_router__WEBPACK_IMPORTED_MODULE_13__["ActivatedRoute"], _angular_router__WEBPACK_IMPORTED_MODULE_13__["Router"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var PatternViewManagementComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("pp-solution-language-management", _pattern_view_management_component__WEBPACK_IMPORTED_MODULE_8__["PatternViewManagementComponent"], View_PatternViewManagementComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/pattern-view-management/pattern-view-management/pattern-view-management.component.scss.shim.ngstyle.js":
/*!************************************************************************************************************************!*\
  !*** ./src/app/pattern-view-management/pattern-view-management/pattern-view-management.component.scss.shim.ngstyle.js ***!
  \************************************************************************************************************************/
/*! exports provided: styles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes,extraRequire}
 * tslint:disable
 */ 
var styles = [".card[_ngcontent-%COMP%] {\n  display: flex;\n  align-content: center;\n  justify-content: center;\n  text-align: center;\n  background-color: #3f51b5;\n  color: white;\n}\n.card[_ngcontent-%COMP%]:hover {\n  background-color: white;\n  color: black;\n  cursor: pointer;\n}\n.card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  margin: auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RyYXZpcy9idWlsZC9QYXR0ZXJuUGVkaWEvcGF0dGVybi1wZWRpYS12aWV3cy11aS9zcmMvYXBwL3BhdHRlcm4tdmlldy1tYW5hZ2VtZW50L3BhdHRlcm4tdmlldy1tYW5hZ2VtZW50L3BhdHRlcm4tdmlldy1tYW5hZ2VtZW50LmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9wYXR0ZXJuLXZpZXctbWFuYWdlbWVudC9wYXR0ZXJuLXZpZXctbWFuYWdlbWVudC9wYXR0ZXJuLXZpZXctbWFuYWdlbWVudC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7RUFDQSxxQkFBQTtFQUNBLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSx5QkFBQTtFQUNBLFlBQUE7QUNDRjtBRENFO0VBQ0UsdUJBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtBQ0NKO0FERUU7RUFDRSxZQUFBO0FDQUoiLCJmaWxlIjoic3JjL2FwcC9wYXR0ZXJuLXZpZXctbWFuYWdlbWVudC9wYXR0ZXJuLXZpZXctbWFuYWdlbWVudC9wYXR0ZXJuLXZpZXctbWFuYWdlbWVudC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jYXJkIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2Y1MWI1O1xuICBjb2xvcjogd2hpdGU7XG5cbiAgJjpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgY29sb3I6IGJsYWNrO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgfVxuXG4gIHNwYW4ge1xuICAgIG1hcmdpbjogYXV0bztcbiAgfVxufVxuIiwiLmNhcmQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGJhY2tncm91bmQtY29sb3I6ICMzZjUxYjU7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cbi5jYXJkOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIGNvbG9yOiBibGFjaztcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLmNhcmQgc3BhbiB7XG4gIG1hcmdpbjogYXV0bztcbn0iXX0= */"];



/***/ }),

/***/ "./src/app/pattern-view-management/pattern-view-management/pattern-view-management.component.ts":
/*!******************************************************************************************************!*\
  !*** ./src/app/pattern-view-management/pattern-view-management/pattern-view-management.component.ts ***!
  \******************************************************************************************************/
/*! exports provided: PatternViewManagementComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatternViewManagementComponent", function() { return PatternViewManagementComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _core_service_pattern_view_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/service/pattern-view.service */ "./src/app/core/service/pattern-view.service.ts");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/fesm5/dialog.js");
/* harmony import */ var _core_component_create_edit_pattern_language_create_edit_pattern_language_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/component/create-edit-pattern-language/create-edit-pattern-language.component */ "./src/app/core/component/create-edit-pattern-language/create-edit-pattern-language.component.ts");
/* harmony import */ var _core_service_pattern_language_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/service/pattern-language.service */ "./src/app/core/service/pattern-language.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var angular2_toaster__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! angular2-toaster */ "./node_modules/angular2-toaster/angular2-toaster.js");
/* harmony import */ var _core_util_uri_converter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../core/util/uri-converter */ "./src/app/core/util/uri-converter.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");









var PatternViewManagementComponent = /** @class */ (function () {
    function PatternViewManagementComponent(patternViewService, dialog, patternLanguageService, toastService, activatedRoute, router, zone) {
        this.patternViewService = patternViewService;
        this.dialog = dialog;
        this.patternLanguageService = patternLanguageService;
        this.toastService = toastService;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.zone = zone;
    }
    PatternViewManagementComponent.prototype.ngOnInit = function () {
        this.getData().subscribe();
    };
    PatternViewManagementComponent.prototype.getData = function () {
        var _this = this;
        return this.patternViewService.getPatternViews().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["tap"])(function (views) {
            _this.patternViewResponse = views;
        }));
    };
    PatternViewManagementComponent.prototype.navigate = function (view) {
        var _this = this;
        this.zone.run(function () {
            _this.router.navigate([_core_util_uri_converter__WEBPACK_IMPORTED_MODULE_7__["UriConverter"].doubleEncodeUri(view.uri)], { relativeTo: _this.activatedRoute });
        });
    };
    PatternViewManagementComponent.prototype.createView = function () {
        var _this = this;
        var dialogRef = this.dialog.open(_core_component_create_edit_pattern_language_create_edit_pattern_language_component__WEBPACK_IMPORTED_MODULE_3__["CreateEditPatternLanguageComponent"], { data: { isPatternLanguageCreation: false } });
        var view;
        // Save PatternLanguage when user presses save
        dialogRef.componentInstance
            .saveClicked.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["tap"])(function (result) {
            view = result.dialogResult;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["switchMap"])(function () { return _this.patternViewService.savePatternView(_this.patternViewResponse._links.patternViews.href, view); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["switchMap"])(function () { return _this.getData(); })).subscribe(function (res) {
            if (res) {
                _this.toastService.pop('success', 'Created View');
            }
        });
    };
    return PatternViewManagementComponent;
}());



/***/ }),

/***/ "./src/app/pattern-view-management/pattern-view-renderer/pattern-view-renderer.component.ngfactory.js":
/*!************************************************************************************************************!*\
  !*** ./src/app/pattern-view-management/pattern-view-renderer/pattern-view-renderer.component.ngfactory.js ***!
  \************************************************************************************************************/
/*! exports provided: RenderType_PatternViewRendererComponent, View_PatternViewRendererComponent_0, View_PatternViewRendererComponent_Host_0, PatternViewRendererComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_PatternViewRendererComponent", function() { return RenderType_PatternViewRendererComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_PatternViewRendererComponent_0", function() { return View_PatternViewRendererComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_PatternViewRendererComponent_Host_0", function() { return View_PatternViewRendererComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatternViewRendererComponentNgFactory", function() { return PatternViewRendererComponentNgFactory; });
/* harmony import */ var _pattern_view_renderer_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pattern-view-renderer.component.scss.shim.ngstyle */ "./src/app/pattern-view-management/pattern-view-renderer/pattern-view-renderer.component.scss.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _node_modules_angular_material_button_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/@angular/material/button/index.ngfactory */ "./node_modules/@angular/material/button/index.ngfactory.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/fesm5/button.js");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/a11y */ "./node_modules/@angular/cdk/fesm5/a11y.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _node_modules_angular_material_card_index_ngfactory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../node_modules/@angular/material/card/index.ngfactory */ "./node_modules/@angular/material/card/index.ngfactory.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/fesm5/card.js");
/* harmony import */ var _node_modules_angular_material_icon_index_ngfactory__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../node_modules/@angular/material/icon/index.ngfactory */ "./node_modules/@angular/material/icon/index.ngfactory.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/fesm5/icon.js");
/* harmony import */ var _angular_material_badge__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/badge */ "./node_modules/@angular/material/fesm5/badge.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _core_component_graph_display_graph_display_component_ngfactory__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../core/component/graph-display/graph-display.component.ngfactory */ "./src/app/core/component/graph-display/graph-display.component.ngfactory.js");
/* harmony import */ var _core_component_graph_display_graph_display_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../core/component/graph-display/graph-display.component */ "./src/app/core/component/graph-display/graph-display.component.ts");
/* harmony import */ var _graph_service_d3_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../graph/service/d3.service */ "./src/app/graph/service/d3.service.ts");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/fesm5/dialog.js");
/* harmony import */ var _core_service_pattern_relation_descriptor_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../core/service/pattern-relation-descriptor.service */ "./src/app/core/service/pattern-relation-descriptor.service.ts");
/* harmony import */ var angular2_toaster_src_toaster_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! angular2-toaster/src/toaster.service */ "./node_modules/angular2-toaster/src/toaster.service.js");
/* harmony import */ var _core_service_pattern_language_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../core/service/pattern-language.service */ "./src/app/core/service/pattern-language.service.ts");
/* harmony import */ var _core_service_pattern_view_service__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../core/service/pattern-view.service */ "./src/app/core/service/pattern-view.service.ts");
/* harmony import */ var _core_service_pattern_service__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../core/service/pattern.service */ "./src/app/core/service/pattern.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _core_component_action_button_bar_action_button_bar_component_ngfactory__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../core/component/action-button-bar/action-button-bar.component.ngfactory */ "./src/app/core/component/action-button-bar/action-button-bar.component.ngfactory.js");
/* harmony import */ var _core_component_action_button_bar_action_button_bar_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../core/component/action-button-bar/action-button-bar.component */ "./src/app/core/component/action-button-bar/action-button-bar.component.ts");
/* harmony import */ var _core_component_toggle_renderer_toggle_renderer_component_ngfactory__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../core/component/toggle-renderer/toggle-renderer.component.ngfactory */ "./src/app/core/component/toggle-renderer/toggle-renderer.component.ngfactory.js");
/* harmony import */ var _core_component_toggle_renderer_toggle_renderer_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../../core/component/toggle-renderer/toggle-renderer.component */ "./src/app/core/component/toggle-renderer/toggle-renderer.component.ts");
/* harmony import */ var _pattern_view_renderer_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./pattern-view-renderer.component */ "./src/app/pattern-view-management/pattern-view-renderer/pattern-view-renderer.component.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes,extraRequire}
 * tslint:disable
 */ 



























var styles_PatternViewRendererComponent = [_pattern_view_renderer_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_PatternViewRendererComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_PatternViewRendererComponent, data: {} });

function View_PatternViewRendererComponent_1(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 4, "button", [["class", "action-button-with-margin mat-focus-indicator"], ["color", "accent"], ["mat-raised-button", ""]], [[1, "disabled", 0], [2, "_mat-animation-noopable", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.reloadGraph() !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_material_button_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_MatButton_0"], _node_modules_angular_material_button_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_MatButton"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 180224, null, 0, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButton"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_4__["FocusMonitor"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["ANIMATION_MODULE_TYPE"]]], { color: [0, "color"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](2, 0, null, 0, 1, "i", [["class", "material-icons"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["autorenew"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, 0, [" Reformat "]))], function (_ck, _v) { var currVal_2 = "accent"; _ck(_v, 1, 0, currVal_2); }, function (_ck, _v) { var currVal_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).disabled || null); var currVal_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._animationMode === "NoopAnimations"); _ck(_v, 0, 0, currVal_0, currVal_1); }); }
function View_PatternViewRendererComponent_3(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 40, "mat-card", [["class", "pattern-card mat-card mat-focus-indicator"]], [[2, "_mat-animation-noopable", null]], null, null, _node_modules_angular_material_card_index_ngfactory__WEBPACK_IMPORTED_MODULE_6__["View_MatCard_0"], _node_modules_angular_material_card_index_ngfactory__WEBPACK_IMPORTED_MODULE_6__["RenderType_MatCard"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 49152, null, 0, _angular_material_card__WEBPACK_IMPORTED_MODULE_7__["MatCard"], [[2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["ANIMATION_MODULE_TYPE"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](2, 0, null, 0, 7, "mat-card-header", [["class", "mat-card-header"]], null, null, null, _node_modules_angular_material_card_index_ngfactory__WEBPACK_IMPORTED_MODULE_6__["View_MatCardHeader_0"], _node_modules_angular_material_card_index_ngfactory__WEBPACK_IMPORTED_MODULE_6__["RenderType_MatCardHeader"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](3, 49152, null, 0, _angular_material_card__WEBPACK_IMPORTED_MODULE_7__["MatCardHeader"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](4, 0, null, 1, 2, "mat-card-title", [["class", "mat-card-title"]], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](5, 16384, null, 0, _angular_material_card__WEBPACK_IMPORTED_MODULE_7__["MatCardTitle"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](6, null, ["", ""])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](7, 0, null, 1, 2, "mat-card-subtitle", [["class", "mat-card-subtitle"]], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](8, 16384, null, 0, _angular_material_card__WEBPACK_IMPORTED_MODULE_7__["MatCardSubtitle"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](9, null, ["", " "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](10, 0, null, 0, 25, "mat-card-content", [["class", "card-content-style mat-card-content"]], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](11, 16384, null, 0, _angular_material_card__WEBPACK_IMPORTED_MODULE_7__["MatCardContent"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](12, 0, null, null, 7, "div", [["class", "badge-container"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.showIngoingEdges(_v.context.$implicit._links.ingoingDirectedEdges) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](13, 0, null, null, 6, "button", [["class", "edge-button mat-focus-indicator"], ["mat-button", ""]], [[1, "disabled", 0], [2, "_mat-animation-noopable", null]], null, null, _node_modules_angular_material_button_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_MatButton_0"], _node_modules_angular_material_button_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_MatButton"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](14, 180224, null, 0, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButton"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_4__["FocusMonitor"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["ANIMATION_MODULE_TYPE"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](15, 0, null, 0, 2, "mat-icon", [["class", "mat-icon notranslate"], ["role", "img"]], [[2, "mat-icon-inline", null], [2, "mat-icon-no-color", null]], null, null, _node_modules_angular_material_icon_index_ngfactory__WEBPACK_IMPORTED_MODULE_8__["View_MatIcon_0"], _node_modules_angular_material_icon_index_ngfactory__WEBPACK_IMPORTED_MODULE_8__["RenderType_MatIcon"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](16, 9158656, null, 0, _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__["MatIcon"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__["MatIconRegistry"], [8, null], [2, _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__["MAT_ICON_LOCATION"]], [2, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ErrorHandler"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, 0, [" trending_flat "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](18, 0, null, 0, 1, "span", [["class", "badge-span mat-badge"], ["matBadgeOverlap", "false"]], [[2, "mat-badge-overlap", null], [2, "mat-badge-above", null], [2, "mat-badge-below", null], [2, "mat-badge-before", null], [2, "mat-badge-after", null], [2, "mat-badge-small", null], [2, "mat-badge-medium", null], [2, "mat-badge-large", null], [2, "mat-badge-hidden", null], [2, "mat-badge-disabled", null]], null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](19, 671744, null, 0, _angular_material_badge__WEBPACK_IMPORTED_MODULE_10__["MatBadge"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_4__["AriaDescriber"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["ANIMATION_MODULE_TYPE"]]], { overlap: [0, "overlap"], content: [1, "content"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](20, 0, null, null, 7, "div", [["class", "badge-container"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.showOutgoingEdges(_v.context.$implicit._links.outgoingDirectedEdges) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](21, 0, null, null, 6, "button", [["class", "edge-button mat-focus-indicator"], ["mat-button", ""]], [[1, "disabled", 0], [2, "_mat-animation-noopable", null]], null, null, _node_modules_angular_material_button_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_MatButton_0"], _node_modules_angular_material_button_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_MatButton"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](22, 180224, null, 0, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButton"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_4__["FocusMonitor"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["ANIMATION_MODULE_TYPE"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](23, 0, null, 0, 2, "mat-icon", [["class", "flip mat-icon notranslate"], ["role", "img"]], [[2, "mat-icon-inline", null], [2, "mat-icon-no-color", null]], null, null, _node_modules_angular_material_icon_index_ngfactory__WEBPACK_IMPORTED_MODULE_8__["View_MatIcon_0"], _node_modules_angular_material_icon_index_ngfactory__WEBPACK_IMPORTED_MODULE_8__["RenderType_MatIcon"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](24, 9158656, null, 0, _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__["MatIcon"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__["MatIconRegistry"], [8, null], [2, _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__["MAT_ICON_LOCATION"]], [2, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ErrorHandler"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, 0, [" trending_flat "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](26, 0, null, 0, 1, "span", [["class", "badge-span mat-badge"], ["matBadgeOverlap", "false"]], [[2, "mat-badge-overlap", null], [2, "mat-badge-above", null], [2, "mat-badge-below", null], [2, "mat-badge-before", null], [2, "mat-badge-after", null], [2, "mat-badge-small", null], [2, "mat-badge-medium", null], [2, "mat-badge-large", null], [2, "mat-badge-hidden", null], [2, "mat-badge-disabled", null]], null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](27, 671744, null, 0, _angular_material_badge__WEBPACK_IMPORTED_MODULE_10__["MatBadge"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_4__["AriaDescriber"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["ANIMATION_MODULE_TYPE"]]], { overlap: [0, "overlap"], content: [1, "content"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](28, 0, null, null, 7, "div", [["class", "badge-container"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.showUndirectedEdges(_v.context.$implicit._links.undirectedEdges) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](29, 0, null, null, 6, "button", [["class", "edge-button mat-focus-indicator"], ["mat-button", ""]], [[1, "disabled", 0], [2, "_mat-animation-noopable", null]], null, null, _node_modules_angular_material_button_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_MatButton_0"], _node_modules_angular_material_button_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_MatButton"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](30, 180224, null, 0, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButton"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_4__["FocusMonitor"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["ANIMATION_MODULE_TYPE"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](31, 0, null, 0, 2, "mat-icon", [["class", "mat-icon notranslate"], ["role", "img"]], [[2, "mat-icon-inline", null], [2, "mat-icon-no-color", null]], null, null, _node_modules_angular_material_icon_index_ngfactory__WEBPACK_IMPORTED_MODULE_8__["View_MatIcon_0"], _node_modules_angular_material_icon_index_ngfactory__WEBPACK_IMPORTED_MODULE_8__["RenderType_MatIcon"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](32, 9158656, null, 0, _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__["MatIcon"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__["MatIconRegistry"], [8, null], [2, _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__["MAT_ICON_LOCATION"]], [2, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ErrorHandler"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, 0, ["compare_arrows"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](34, 0, null, 0, 1, "span", [["class", "badge-span mat-badge"], ["matBadgeOverlap", "false"]], [[2, "mat-badge-overlap", null], [2, "mat-badge-above", null], [2, "mat-badge-below", null], [2, "mat-badge-before", null], [2, "mat-badge-after", null], [2, "mat-badge-small", null], [2, "mat-badge-medium", null], [2, "mat-badge-large", null], [2, "mat-badge-hidden", null], [2, "mat-badge-disabled", null]], null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](35, 671744, null, 0, _angular_material_badge__WEBPACK_IMPORTED_MODULE_10__["MatBadge"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_4__["AriaDescriber"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["ANIMATION_MODULE_TYPE"]]], { overlap: [0, "overlap"], content: [1, "content"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](36, 0, null, 0, 4, "mat-card-actions", [["class", "mat-card-actions"]], [[2, "mat-card-actions-align-end", null]], null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](37, 16384, null, 0, _angular_material_card__WEBPACK_IMPORTED_MODULE_7__["MatCardActions"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](38, 0, null, null, 2, "button", [["class", "mat-focus-indicator"], ["mat-button", ""]], [[1, "disabled", 0], [2, "_mat-animation-noopable", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.addLinks(_v.context.$implicit) !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_material_button_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_MatButton_0"], _node_modules_angular_material_button_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_MatButton"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](39, 180224, null, 0, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButton"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_4__["FocusMonitor"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["ANIMATION_MODULE_TYPE"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, 0, ["Add Links (incl. Pattern) "]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 16, 0); var currVal_17 = "false"; var currVal_18 = _co.getLinkCount(_v.context.$implicit._links.ingoingDirectedEdges); _ck(_v, 19, 0, currVal_17, currVal_18); _ck(_v, 24, 0); var currVal_33 = "false"; var currVal_34 = _co.getLinkCount(_v.context.$implicit._links.outgoingDirectedEdges); _ck(_v, 27, 0, currVal_33, currVal_34); _ck(_v, 32, 0); var currVal_49 = "false"; var currVal_50 = _co.getLinkCount(_v.context.$implicit._links.undirectedEdges); _ck(_v, 35, 0, currVal_49, currVal_50); }, function (_ck, _v) { var currVal_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._animationMode === "NoopAnimations"); _ck(_v, 0, 0, currVal_0); var currVal_1 = ((_v.context.$implicit == null) ? null : _v.context.$implicit.name); _ck(_v, 6, 0, currVal_1); var currVal_2 = _v.context.$implicit.patternLanguageName; _ck(_v, 9, 0, currVal_2); var currVal_3 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 14).disabled || null); var currVal_4 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 14)._animationMode === "NoopAnimations"); _ck(_v, 13, 0, currVal_3, currVal_4); var currVal_5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 16).inline; var currVal_6 = (((_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 16).color !== "primary") && (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 16).color !== "accent")) && (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 16).color !== "warn")); _ck(_v, 15, 0, currVal_5, currVal_6); var currVal_7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 19).overlap; var currVal_8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 19).isAbove(); var currVal_9 = !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 19).isAbove(); var currVal_10 = !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 19).isAfter(); var currVal_11 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 19).isAfter(); var currVal_12 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 19).size === "small"); var currVal_13 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 19).size === "medium"); var currVal_14 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 19).size === "large"); var currVal_15 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 19).hidden || !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 19)._hasContent); var currVal_16 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 19).disabled; _ck(_v, 18, 0, currVal_7, currVal_8, currVal_9, currVal_10, currVal_11, currVal_12, currVal_13, currVal_14, currVal_15, currVal_16); var currVal_19 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 22).disabled || null); var currVal_20 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 22)._animationMode === "NoopAnimations"); _ck(_v, 21, 0, currVal_19, currVal_20); var currVal_21 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 24).inline; var currVal_22 = (((_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 24).color !== "primary") && (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 24).color !== "accent")) && (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 24).color !== "warn")); _ck(_v, 23, 0, currVal_21, currVal_22); var currVal_23 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).overlap; var currVal_24 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).isAbove(); var currVal_25 = !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).isAbove(); var currVal_26 = !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).isAfter(); var currVal_27 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).isAfter(); var currVal_28 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).size === "small"); var currVal_29 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).size === "medium"); var currVal_30 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).size === "large"); var currVal_31 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).hidden || !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27)._hasContent); var currVal_32 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).disabled; _ck(_v, 26, 0, currVal_23, currVal_24, currVal_25, currVal_26, currVal_27, currVal_28, currVal_29, currVal_30, currVal_31, currVal_32); var currVal_35 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 30).disabled || null); var currVal_36 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 30)._animationMode === "NoopAnimations"); _ck(_v, 29, 0, currVal_35, currVal_36); var currVal_37 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32).inline; var currVal_38 = (((_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32).color !== "primary") && (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32).color !== "accent")) && (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32).color !== "warn")); _ck(_v, 31, 0, currVal_37, currVal_38); var currVal_39 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35).overlap; var currVal_40 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35).isAbove(); var currVal_41 = !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35).isAbove(); var currVal_42 = !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35).isAfter(); var currVal_43 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35).isAfter(); var currVal_44 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35).size === "small"); var currVal_45 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35).size === "medium"); var currVal_46 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35).size === "large"); var currVal_47 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35).hidden || !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35)._hasContent); var currVal_48 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35).disabled; _ck(_v, 34, 0, currVal_39, currVal_40, currVal_41, currVal_42, currVal_43, currVal_44, currVal_45, currVal_46, currVal_47, currVal_48); var currVal_51 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 37).align === "end"); _ck(_v, 36, 0, currVal_51); var currVal_52 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39).disabled || null); var currVal_53 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39)._animationMode === "NoopAnimations"); _ck(_v, 38, 0, currVal_52, currVal_53); }); }
function View_PatternViewRendererComponent_2(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "div", [["class", "container"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_PatternViewRendererComponent_3)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_11__["NgForOf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"]], { ngForOf: [0, "ngForOf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.patterns; _ck(_v, 2, 0, currVal_0); }, null); }
function View_PatternViewRendererComponent_4(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "pp-graph-display", [], null, [[null, "addedEdge"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("addedEdge" === en)) {
        var pd_0 = (_co.addedEdgeInGraphView($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, _core_component_graph_display_graph_display_component_ngfactory__WEBPACK_IMPORTED_MODULE_12__["View_GraphDisplayComponent_0"], _core_component_graph_display_graph_display_component_ngfactory__WEBPACK_IMPORTED_MODULE_12__["RenderType_GraphDisplayComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 4767744, [[1, 4]], 0, _core_component_graph_display_graph_display_component__WEBPACK_IMPORTED_MODULE_13__["GraphDisplayComponent"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], _graph_service_d3_service__WEBPACK_IMPORTED_MODULE_14__["D3Service"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_15__["MatDialog"], _core_service_pattern_relation_descriptor_service__WEBPACK_IMPORTED_MODULE_16__["PatternRelationDescriptorService"], angular2_toaster_src_toaster_service__WEBPACK_IMPORTED_MODULE_17__["ToasterService"], _core_service_pattern_language_service__WEBPACK_IMPORTED_MODULE_18__["PatternLanguageService"], _core_service_pattern_view_service__WEBPACK_IMPORTED_MODULE_19__["PatternViewService"], _core_service_pattern_service__WEBPACK_IMPORTED_MODULE_20__["PatternService"], _angular_router__WEBPACK_IMPORTED_MODULE_21__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_21__["ActivatedRoute"]], { data: [0, "data"], showPatternLanguageName: [1, "showPatternLanguageName"] }, { addedEdge: "addedEdge" }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpod"](2, { patterns: 0, edges: 1, patternLanguage: 2, patternView: 3, patternLanguages: 4 })], function (_ck, _v) { var _co = _v.component; var currVal_0 = _ck(_v, 2, 0, _co.patterns, _co.patternLinks, null, _co.patternViewResponse, _co.patternLanguages); var currVal_1 = true; _ck(_v, 1, 0, currVal_0, currVal_1); }, null); }
function View_PatternViewRendererComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](671088640, 1, { graphDisplayComponent: 0 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 5, "pp-action-button-bar", [], null, [[null, "addClicked"], [null, "add2Clicked"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("addClicked" === en)) {
        var pd_0 = (_co.addPatternToView() !== false);
        ad = (pd_0 && ad);
    } if (("add2Clicked" === en)) {
        var pd_1 = (_co.addLink() !== false);
        ad = (pd_1 && ad);
    } return ad; }, _core_component_action_button_bar_action_button_bar_component_ngfactory__WEBPACK_IMPORTED_MODULE_22__["View_ActionButtonBarComponent_0"], _core_component_action_button_bar_action_button_bar_component_ngfactory__WEBPACK_IMPORTED_MODULE_22__["RenderType_ActionButtonBarComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 114688, null, 0, _core_component_action_button_bar_action_button_bar_component__WEBPACK_IMPORTED_MODULE_23__["ActionButtonBarComponent"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ApplicationRef"]], { addButtonText: [0, "addButtonText"], secondAddButton: [1, "secondAddButton"], firstAddButton: [2, "firstAddButton"], secondAddButtonText: [3, "secondAddButtonText"], displayText: [4, "displayText"] }, { addClicked: "addClicked", add2Clicked: "add2Clicked" }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, 0, 1, "pp-toggle-renderer", [], null, [[null, "toggledRenderer"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("toggledRenderer" === en)) {
        var pd_0 = (_co.changeRenderer($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, _core_component_toggle_renderer_toggle_renderer_component_ngfactory__WEBPACK_IMPORTED_MODULE_24__["View_ToggleRendererComponent_0"], _core_component_toggle_renderer_toggle_renderer_component_ngfactory__WEBPACK_IMPORTED_MODULE_24__["RenderType_ToggleRendererComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](4, 114688, null, 0, _core_component_toggle_renderer_toggle_renderer_component__WEBPACK_IMPORTED_MODULE_25__["ToggleRendererComponent"], [], { graphVisible: [0, "graphVisible"] }, { toggledRenderer: "toggledRenderer" }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, 0, 1, null, View_PatternViewRendererComponent_1)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](6, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_11__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_PatternViewRendererComponent_2)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](8, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_11__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_PatternViewRendererComponent_4)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](10, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_11__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = "Add patterns"; var currVal_1 = true; var currVal_2 = !_co.graphVisible; var currVal_3 = "Create new Link"; var currVal_4 = _co.displayText; _ck(_v, 2, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4); var currVal_5 = _co.graphVisible; _ck(_v, 4, 0, currVal_5); var currVal_6 = _co.graphVisible; _ck(_v, 6, 0, currVal_6); var currVal_7 = (!_co.isLoading && !_co.graphVisible); _ck(_v, 8, 0, currVal_7); var currVal_8 = (!_co.isLoading && _co.graphVisible); _ck(_v, 10, 0, currVal_8); }, null); }
function View_PatternViewRendererComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "pp-pattern-view-renderer", [], null, null, null, View_PatternViewRendererComponent_0, RenderType_PatternViewRendererComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 4308992, null, 0, _pattern_view_renderer_component__WEBPACK_IMPORTED_MODULE_26__["PatternViewRendererComponent"], [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_15__["MatDialog"], _core_service_pattern_language_service__WEBPACK_IMPORTED_MODULE_18__["PatternLanguageService"], _core_service_pattern_view_service__WEBPACK_IMPORTED_MODULE_19__["PatternViewService"], _core_service_pattern_service__WEBPACK_IMPORTED_MODULE_20__["PatternService"], angular2_toaster_src_toaster_service__WEBPACK_IMPORTED_MODULE_17__["ToasterService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], _angular_router__WEBPACK_IMPORTED_MODULE_21__["ActivatedRoute"], _core_service_pattern_relation_descriptor_service__WEBPACK_IMPORTED_MODULE_16__["PatternRelationDescriptorService"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var PatternViewRendererComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("pp-pattern-view-renderer", _pattern_view_renderer_component__WEBPACK_IMPORTED_MODULE_26__["PatternViewRendererComponent"], View_PatternViewRendererComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/pattern-view-management/pattern-view-renderer/pattern-view-renderer.component.scss.shim.ngstyle.js":
/*!********************************************************************************************************************!*\
  !*** ./src/app/pattern-view-management/pattern-view-renderer/pattern-view-renderer.component.scss.shim.ngstyle.js ***!
  \********************************************************************************************************************/
/*! exports provided: styles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes,extraRequire}
 * tslint:disable
 */ 
var styles = [".pattern-card[_ngcontent-%COMP%] {\n  min-height: 11em;\n  height: 11em;\n  min-width: 13em;\n  width: 13em;\n  margin: 0.25em;\n}\n\n.container[_ngcontent-%COMP%] {\n  display: flex;\n}\n\n.edge-button[_ngcontent-%COMP%] {\n  width: 4em !important;\n  min-width: unset !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RyYXZpcy9idWlsZC9QYXR0ZXJuUGVkaWEvcGF0dGVybi1wZWRpYS12aWV3cy11aS9zcmMvYXBwL3BhdHRlcm4tdmlldy1tYW5hZ2VtZW50L3BhdHRlcm4tdmlldy1yZW5kZXJlci9wYXR0ZXJuLXZpZXctcmVuZGVyZXIuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3BhdHRlcm4tdmlldy1tYW5hZ2VtZW50L3BhdHRlcm4tdmlldy1yZW5kZXJlci9wYXR0ZXJuLXZpZXctcmVuZGVyZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnQkFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0EsV0FBQTtFQUNBLGNBQUE7QUNDRjs7QURHQTtFQUNFLGFBQUE7QUNBRjs7QURHQTtFQUNFLHFCQUFBO0VBQ0EsMkJBQUE7QUNBRiIsImZpbGUiOiJzcmMvYXBwL3BhdHRlcm4tdmlldy1tYW5hZ2VtZW50L3BhdHRlcm4tdmlldy1yZW5kZXJlci9wYXR0ZXJuLXZpZXctcmVuZGVyZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucGF0dGVybi1jYXJkIHtcbiAgbWluLWhlaWdodDogMTFlbTtcbiAgaGVpZ2h0OiAxMWVtO1xuICBtaW4td2lkdGg6IDEzZW07XG4gIHdpZHRoOiAxM2VtO1xuICBtYXJnaW46IDAuMjVlbTtcbn1cblxuXG4uY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbn1cblxuLmVkZ2UtYnV0dG9uIHtcbiAgd2lkdGg6IDRlbSFpbXBvcnRhbnQ7XG4gIG1pbi13aWR0aDogdW5zZXQhaW1wb3J0YW50O1xufVxuIiwiLnBhdHRlcm4tY2FyZCB7XG4gIG1pbi1oZWlnaHQ6IDExZW07XG4gIGhlaWdodDogMTFlbTtcbiAgbWluLXdpZHRoOiAxM2VtO1xuICB3aWR0aDogMTNlbTtcbiAgbWFyZ2luOiAwLjI1ZW07XG59XG5cbi5jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xufVxuXG4uZWRnZS1idXR0b24ge1xuICB3aWR0aDogNGVtICFpbXBvcnRhbnQ7XG4gIG1pbi13aWR0aDogdW5zZXQgIWltcG9ydGFudDtcbn0iXX0= */"];



/***/ }),

/***/ "./src/app/pattern-view-management/pattern-view-renderer/pattern-view-renderer.component.ts":
/*!**************************************************************************************************!*\
  !*** ./src/app/pattern-view-management/pattern-view-renderer/pattern-view-renderer.component.ts ***!
  \**************************************************************************************************/
/*! exports provided: PatternViewRendererComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatternViewRendererComponent", function() { return PatternViewRendererComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/fesm5/dialog.js");
/* harmony import */ var _add_to_view_add_to_view_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../add-to-view/add-to-view.component */ "./src/app/pattern-view-management/add-to-view/add-to-view.component.ts");
/* harmony import */ var _core_service_pattern_language_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/service/pattern-language.service */ "./src/app/core/service/pattern-language.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var angular2_toaster__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! angular2-toaster */ "./node_modules/angular2-toaster/angular2-toaster.js");
/* harmony import */ var _core_service_pattern_view_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../core/service/pattern-view.service */ "./src/app/core/service/pattern-view.service.ts");
/* harmony import */ var _core_util_uri_converter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../core/util/uri-converter */ "./src/app/core/util/uri-converter.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _core_service_pattern_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../core/service/pattern.service */ "./src/app/core/service/pattern.service.ts");
/* harmony import */ var _core_component_create_pattern_relation_create_pattern_relation_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../core/component/create-pattern-relation/create-pattern-relation.component */ "./src/app/core/component/create-pattern-relation/create-pattern-relation.component.ts");
/* harmony import */ var _core_model_hal_directed_edge_model__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../core/model/hal/directed-edge.model */ "./src/app/core/model/hal/directed-edge.model.ts");
/* harmony import */ var _core_model_hal_add_directed_edge_to_view_request__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../core/model/hal/add-directed-edge-to-view-request */ "./src/app/core/model/hal/add-directed-edge-to-view-request.ts");
/* harmony import */ var _core_model_hal_add_undirected_edge_to_view_request__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../core/model/hal/add-undirected-edge-to-view-request */ "./src/app/core/model/hal/add-undirected-edge-to-view-request.ts");
/* harmony import */ var _core_component_graph_display_graph_display_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../core/component/graph-display/graph-display.component */ "./src/app/core/component/graph-display/graph-display.component.ts");
/* harmony import */ var _core_component_delete_pattern_relation_delete_pattern_relation_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../core/component/delete-pattern-relation/delete-pattern-relation.component */ "./src/app/core/component/delete-pattern-relation/delete-pattern-relation.component.ts");
/* harmony import */ var _core_service_pattern_relation_descriptor_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../core/service/pattern-relation-descriptor.service */ "./src/app/core/service/pattern-relation-descriptor.service.ts");


















var PatternViewRendererComponent = /** @class */ (function () {
    function PatternViewRendererComponent(matDialog, patternLanguageService, patternViewService, patternService, toasterService, cdr, activatedRoute, patternRLDescriptorService) {
        this.matDialog = matDialog;
        this.patternLanguageService = patternLanguageService;
        this.patternViewService = patternViewService;
        this.patternService = patternService;
        this.toasterService = toasterService;
        this.cdr = cdr;
        this.activatedRoute = activatedRoute;
        this.patternRLDescriptorService = patternRLDescriptorService;
        this.patterns = [];
        this.isLoading = true;
        this.graphVisible = false;
        this.patternLinks = [];
    }
    PatternViewRendererComponent.prototype.ngOnInit = function () {
    };
    PatternViewRendererComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.patternViewUri = _core_util_uri_converter__WEBPACK_IMPORTED_MODULE_8__["UriConverter"].doubleDecodeUri(this.activatedRoute.snapshot.paramMap.get('patternViewUri'));
        this.getData().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["switchMap"])(function () {
            return _this.getLinks();
        })).subscribe(function () {
            _this.isLoading = false;
            _this.displayText = _this.patternViewResponse.name;
        }, (function (error) { return _this.toasterService.pop('error', 'Could not load data'); }));
    };
    PatternViewRendererComponent.prototype.addPatternToView = function () {
        var _this = this;
        var dialogRef = this.matDialog.open(_add_to_view_add_to_view_component__WEBPACK_IMPORTED_MODULE_2__["AddToViewComponent"], {
            data: { patternlanguages: this.patternLanguages, title: 'Add patterns to View' }
        });
        dialogRef.afterClosed().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["switchMap"])(function (res) { return res ?
            _this.patternViewService.addPatterns(_this.patternViewResponse._links.patterns.href, _this.mapDialogResultToPatterns(res))
            : rxjs__WEBPACK_IMPORTED_MODULE_4__["EMPTY"]; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["switchMap"])(function (result) { return result ? _this.getCurrentPatternViewAndPatterns() : rxjs__WEBPACK_IMPORTED_MODULE_4__["EMPTY"]; })).subscribe(function (res) {
            if (res) {
                _this.toasterService.pop('success', 'Data added');
                _this.cdr.detectChanges();
            }
        });
    };
    PatternViewRendererComponent.prototype.addLinks = function (pattern) {
        var dialogRef = this.matDialog.open(_add_to_view_add_to_view_component__WEBPACK_IMPORTED_MODULE_2__["AddToViewComponent"], { data: { links: this.mapPatternLinksToTreeNode(pattern), title: 'Add linked Patterns', patternId: pattern.id } });
        this.subscribeToLinkDialogResult(dialogRef);
    };
    PatternViewRendererComponent.prototype.addLink = function () {
        var _this = this;
        var dialogRef = this.matDialog.open(_core_component_create_pattern_relation_create_pattern_relation_component__WEBPACK_IMPORTED_MODULE_11__["CreatePatternRelationComponent"], { data: { patterns: this.patterns, patternview: this.patternViewResponse } });
        dialogRef.afterClosed().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["switchMap"])(function (edge) {
            return edge ? _this.createLink(edge) : rxjs__WEBPACK_IMPORTED_MODULE_4__["EMPTY"];
        })).subscribe(function (res) {
            if (res) {
                _this.toasterService.pop('success', 'Relation added');
            }
        });
    };
    PatternViewRendererComponent.prototype.detectChanges = function () {
        this.cdr.detectChanges();
        console.log('detected');
    };
    PatternViewRendererComponent.prototype.getLinkCount = function (directedEdges) {
        if (!directedEdges) {
            return 0;
        }
        return Array.isArray(directedEdges) ? directedEdges.length : 1;
    };
    PatternViewRendererComponent.prototype.showUndirectedEdges = function (undirectedEdges) {
        var _this = this;
        if (undirectedEdges) {
            var dialogRef = this.matDialog.open(_core_component_delete_pattern_relation_delete_pattern_relation_component__WEBPACK_IMPORTED_MODULE_16__["DeletePatternRelationComponent"], {
                data: { edges: undirectedEdges, type: 'undirected' },
                width: '600px',
                panelClass: 'delete-relation-dialog'
            });
            dialogRef.afterClosed().subscribe(function () {
                // reload patterns since ng for pattern loop doesnt get updated else
                _this.getData().subscribe(function () {
                    _this.getLinks();
                });
            });
        }
    };
    PatternViewRendererComponent.prototype.showIngoingEdges = function (ingoingEdges) {
        var _this = this;
        if (ingoingEdges) {
            var dialogRef = this.matDialog.open(_core_component_delete_pattern_relation_delete_pattern_relation_component__WEBPACK_IMPORTED_MODULE_16__["DeletePatternRelationComponent"], {
                data: { edges: ingoingEdges, type: 'ingoing' },
                width: '600px',
                panelClass: 'delete-relation-dialog'
            });
            dialogRef.afterClosed().subscribe(function () {
                // reload patterns since ng for pattern loop doesnt get updated else
                _this.getData().subscribe(function () {
                    _this.getLinks();
                });
            });
        }
    };
    PatternViewRendererComponent.prototype.showOutgoingEdges = function (outgoingEdges) {
        var _this = this;
        if (outgoingEdges) {
            var dialogRef = this.matDialog.open(_core_component_delete_pattern_relation_delete_pattern_relation_component__WEBPACK_IMPORTED_MODULE_16__["DeletePatternRelationComponent"], {
                data: { edges: outgoingEdges, type: 'outgoing' },
                width: '600px',
                panelClass: 'delete-relation-dialog'
            });
            dialogRef.afterClosed().subscribe(function () {
                // reload patterns since ng for pattern loop doesnt get updated else
                _this.getData().subscribe(function () {
                    _this.getLinks();
                });
            });
        }
    };
    PatternViewRendererComponent.prototype.changeRenderer = function (isGraphVisible) {
        this.graphVisible = isGraphVisible;
    };
    PatternViewRendererComponent.prototype.addedEdgeInGraphView = function (edge) {
        var _this = this;
        if (edge) {
            this.createLink(edge).subscribe(function () {
                _this.toasterService.pop('success', 'Link added');
                _this.cdr.detectChanges();
            });
        }
    };
    PatternViewRendererComponent.prototype.reloadGraph = function () {
        this.graphDisplayComponent.reformatGraph();
    };
    PatternViewRendererComponent.prototype.getDirectedEdges = function () {
        var _this = this;
        if (!this.patternViewResponse) {
            return rxjs__WEBPACK_IMPORTED_MODULE_4__["EMPTY"];
        }
        return this.patternViewService.getDirectedEdges(this.patternViewResponse).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["tap"])(function (edges) {
            _this.directedPatternRelations = edges._embedded ? edges._embedded.directedEdgeModels : [];
        }));
    };
    PatternViewRendererComponent.prototype.getUndirectedEdges = function () {
        var _this = this;
        if (!this.patternViewResponse) {
            return rxjs__WEBPACK_IMPORTED_MODULE_4__["EMPTY"];
        }
        return this.patternViewService.getUndirectedEdges(this.patternViewResponse).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["tap"])(function (edges) {
            _this.undirectedPatternRelations = edges._embedded ? edges._embedded.undirectedEdgeModels : [];
        }));
    };
    PatternViewRendererComponent.prototype.createLink = function (edge) {
        var _this = this;
        var url = edge instanceof _core_model_hal_directed_edge_model__WEBPACK_IMPORTED_MODULE_12__["DirectedEdgeModel"] ? this.patternViewResponse._links.directedEdges.href :
            this.patternViewResponse._links.undirectedEdges.href;
        if (!edge || !url) {
            return rxjs__WEBPACK_IMPORTED_MODULE_4__["EMPTY"];
        }
        return this.patternViewService.createLink(url, edge instanceof _core_model_hal_directed_edge_model__WEBPACK_IMPORTED_MODULE_12__["DirectedEdgeModel"] ?
            new _core_model_hal_add_directed_edge_to_view_request__WEBPACK_IMPORTED_MODULE_13__["AddDirectedEdgeToViewRequest"](edge) :
            new _core_model_hal_add_undirected_edge_to_view_request__WEBPACK_IMPORTED_MODULE_14__["AddUndirectedEdgeToViewRequest"](edge)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["tap"])(function (res) { return res ? _this.getEdgeByUrl(edge, res) : rxjs__WEBPACK_IMPORTED_MODULE_4__["EMPTY"]; }));
    };
    PatternViewRendererComponent.prototype.getEdgeByUrl = function (edge, res) {
        var _this = this;
        var getURL = res.url + '/' + res.body.id;
        this.patternRLDescriptorService.getEdgeByUrl(getURL, edge)
            .subscribe(function (edgeResult) {
            edge instanceof _core_model_hal_directed_edge_model__WEBPACK_IMPORTED_MODULE_12__["DirectedEdgeModel"] ? _this.addDirectedEdgeToPattern(edgeResult)
                : _this.addUndirectedEdgeToPattern(edgeResult);
            _this.patternLinks.push(edgeResult);
        });
    };
    PatternViewRendererComponent.prototype.addUndirectedEdgeToPattern = function (edge) {
        var pattern1 = this.patterns.find(function (x) { return x.id === edge.pattern1Id; });
        if (!pattern1._links.undirectedEdges) {
            pattern1._links.undirectedEdges = edge._links.self;
        }
        else if (!Array.isArray(pattern1._links.undirectedEdges)) {
            pattern1._links.undirectedEdges = [pattern1._links.undirectedEdges, edge._links.self];
        }
        else {
            pattern1._links.undirectedEdges.push(edge._links.self);
        }
        var pattern2 = this.patterns.find(function (x) { return x.id === edge.pattern2Id; });
        if (!pattern2._links.undirectedEdges) {
            pattern2._links.undirectedEdges = edge._links.self;
            return;
        }
        else if (!Array.isArray(pattern2._links.undirectedEdges)) {
            pattern2._links.undirectedEdges = [pattern2._links.undirectedEdges, edge._links.self];
        }
        else {
            pattern2._links.undirectedEdges.push(edge._links.self);
        }
    };
    PatternViewRendererComponent.prototype.addDirectedEdgeToPattern = function (edge) {
        var srcPattern = this.patterns.find(function (x) { return x.id === edge.sourcePatternId; });
        if (!srcPattern._links.outgoingDirectedEdges) {
            srcPattern._links.outgoingDirectedEdges = edge._links.self;
        }
        else if (!Array.isArray(srcPattern._links.outgoingDirectedEdges)) {
            srcPattern._links.outgoingDirectedEdges = [srcPattern._links.outgoingDirectedEdges, edge._links.self];
        }
        else {
            srcPattern._links.outgoingDirectedEdges.push(edge._links.self);
        }
        var targetPattern = this.patterns.find(function (x) { return x.id === edge.targetPatternId; });
        if (!targetPattern._links.ingoingDirectedEdges) {
            targetPattern._links.ingoingDirectedEdges = edge._links.self;
            return;
        }
        else if (!Array.isArray(targetPattern._links.ingoingDirectedEdges)) {
            targetPattern._links.ingoingDirectedEdges = [targetPattern._links.ingoingDirectedEdges, edge._links.self];
        }
        else {
            targetPattern._links.ingoingDirectedEdges.push(edge._links.self);
        }
    };
    PatternViewRendererComponent.prototype.getPatternLanguages = function () {
        var _this = this;
        return this.patternLanguageService.getPatternLanguages()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["tap"])(function (patternlanguages) { return _this.patternLanguages = patternlanguages; }));
    };
    PatternViewRendererComponent.prototype.getCurrentPatternViewAndPatterns = function () {
        var _this = this;
        return this.patternViewService.getPatternViewByUri(this.patternViewUri).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["tap"])(function (patternViewResponse) {
            _this.patternViewResponse = patternViewResponse;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["switchMap"])(function (patternViewResponse) { return _this.patternService.getPatternsByUrl(patternViewResponse._links.patterns.href); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["tap"])(function (patterns) {
            _this.patterns = patterns;
        }));
    };
    PatternViewRendererComponent.prototype.getData = function () {
        var $getPatternLanguages = this.getPatternLanguages();
        var $getCurrentPatternView = this.getCurrentPatternViewAndPatterns();
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["forkJoin"])([$getPatternLanguages, $getCurrentPatternView]); // , $getDirectedEdges]);
    };
    PatternViewRendererComponent.prototype.getLinks = function () {
        var _this = this;
        var $getUndirectedEdges = this.getUndirectedEdges();
        var $getDirectedEdges = this.getDirectedEdges();
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["forkJoin"])([$getUndirectedEdges, $getDirectedEdges]).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["tap"])(function () {
            var _a, _b;
            _this.patternLinks = [];
            (_a = _this.patternLinks).push.apply(_a, _this.directedPatternRelations);
            (_b = _this.patternLinks).push.apply(_b, _this.undirectedPatternRelations);
        }));
    };
    PatternViewRendererComponent.prototype.mapDialogResultToPatterns = function (res) {
        if (!res) {
            return [];
        }
        var patternsToAdd = res.map(function (patternNode) { return ({
            content: null,
            id: patternNode.item.id,
            name: patternNode.item.name,
            _links: null
        }); });
        var patternIdsOfView = this.patterns.map(function (it) { return it.id; });
        // only add patterns that are not already in the view:
        return patternsToAdd.filter(function (pattern) { return !patternIdsOfView.includes(pattern.id); });
    };
    PatternViewRendererComponent.prototype.subscribeToLinkDialogResult = function (dialogRef) {
        var _this = this;
        var nodesToAdd;
        dialogRef.afterClosed().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["tap"])(function (res) {
            nodesToAdd = res;
            console.log(res);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["switchMap"])(function (res) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["forkJoin"])([_this.patternViewService.addPatterns(_this.patternViewResponse._links.patterns.href, _this.mapDialogResultToPatterns(res)),
                _this.patternViewService.addLinks(_this.patternViewResponse, res && Array.isArray(res) ? res.map(function (it) { return it.item; }) : [])]);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["switchMap"])(function (result) { return result ? _this.getCurrentPatternViewAndPatterns() : rxjs__WEBPACK_IMPORTED_MODULE_4__["EMPTY"]; })).subscribe(function (res) {
            if (res) {
                _this.toasterService.pop('success', 'Data added');
                _this.cdr.detectChanges();
            }
        });
    };
    PatternViewRendererComponent.prototype.mapPatternLinksToTreeNode = function (pattern) {
        var types = [];
        var possibleEdgeTypes = [
            { link: pattern._links.ingoingDirectedEdgesFromPatternLanguage, type: 'directed', displayName: 'Ingoing directed edges' },
            { link: pattern._links.outgoingDirectedEdgesFromPatternLanguage, type: 'directed', displayName: 'Outgoing directed edges' },
            { link: pattern._links.undirectedEdgesFromPatternLanguage, type: 'undirected', displayName: 'Undirected edges' }
        ];
        possibleEdgeTypes.forEach(function (edgeType, index) {
            if (edgeType.link) {
                types.push({
                    name: edgeType.displayName, links: Array.isArray(edgeType.link) ? edgeType.link : [edgeType.link], id: index.toString(),
                    type: edgeType.type
                });
            }
        });
        return types;
    };
    return PatternViewRendererComponent;
}());



/***/ })

}]);
//# sourceMappingURL=pattern-view-management-pattern-view-management-module-ngfactory.js.map