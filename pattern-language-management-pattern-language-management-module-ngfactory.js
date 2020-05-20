(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pattern-language-management-pattern-language-management-module-ngfactory"],{

/***/ "./node_modules/@angular/material/fesm5/chips.js":
/*!*******************************************************!*\
  !*** ./node_modules/@angular/material/fesm5/chips.js ***!
  \*******************************************************/
/*! exports provided: MAT_CHIPS_DEFAULT_OPTIONS, MatChip, MatChipAvatar, MatChipInput, MatChipList, MatChipListChange, MatChipRemove, MatChipSelectionChange, MatChipTrailingIcon, MatChipsModule, ɵ0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAT_CHIPS_DEFAULT_OPTIONS", function() { return MAT_CHIPS_DEFAULT_OPTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatChip", function() { return MatChip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatChipAvatar", function() { return MatChipAvatar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatChipInput", function() { return MatChipInput; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatChipList", function() { return MatChipList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatChipListChange", function() { return MatChipListChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatChipRemove", function() { return MatChipRemove; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatChipSelectionChange", function() { return MatChipSelectionChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatChipTrailingIcon", function() { return MatChipTrailingIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatChipsModule", function() { return MatChipsModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵ0", function() { return ɵ0; });
/* harmony import */ var _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/cdk/keycodes */ "./node_modules/@angular/cdk/fesm5/keycodes.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/fesm5/core.js");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/coercion */ "./node_modules/@angular/cdk/fesm5/coercion.js");
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/platform */ "./node_modules/@angular/cdk/fesm5/platform.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/cdk/a11y */ "./node_modules/@angular/cdk/fesm5/a11y.js");
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/cdk/bidi */ "./node_modules/@angular/cdk/fesm5/bidi.js");
/* harmony import */ var _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/cdk/collections */ "./node_modules/@angular/cdk/fesm5/collections.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/fesm5/form-field.js");
















/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Event object emitted by MatChip when selected or deselected. */
var MatChipSelectionChange = /** @class */ (function () {
    function MatChipSelectionChange(
    /** Reference to the chip that emitted the event. */
    source, 
    /** Whether the chip that emitted the event is selected. */
    selected, 
    /** Whether the selection change was a result of a user interaction. */
    isUserInput) {
        if (isUserInput === void 0) { isUserInput = false; }
        this.source = source;
        this.selected = selected;
        this.isUserInput = isUserInput;
    }
    return MatChipSelectionChange;
}());
// Boilerplate for applying mixins to MatChip.
/** @docs-private */
var MatChipBase = /** @class */ (function () {
    function MatChipBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return MatChipBase;
}());
var _MatChipMixinBase = Object(_angular_material_core__WEBPACK_IMPORTED_MODULE_2__["mixinTabIndex"])(Object(_angular_material_core__WEBPACK_IMPORTED_MODULE_2__["mixinColor"])(Object(_angular_material_core__WEBPACK_IMPORTED_MODULE_2__["mixinDisableRipple"])(Object(_angular_material_core__WEBPACK_IMPORTED_MODULE_2__["mixinDisabled"])(MatChipBase)), 'primary'), -1);
/**
 * Dummy directive to add CSS class to chip avatar.
 * @docs-private
 */
var MatChipAvatar = /** @class */ (function () {
    function MatChipAvatar() {
    }
    MatChipAvatar.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"], args: [{
                    selector: 'mat-chip-avatar, [matChipAvatar]',
                    host: { 'class': 'mat-chip-avatar' }
                },] }
    ];
    return MatChipAvatar;
}());
/**
 * Dummy directive to add CSS class to chip trailing icon.
 * @docs-private
 */
var MatChipTrailingIcon = /** @class */ (function () {
    function MatChipTrailingIcon() {
    }
    MatChipTrailingIcon.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"], args: [{
                    selector: 'mat-chip-trailing-icon, [matChipTrailingIcon]',
                    host: { 'class': 'mat-chip-trailing-icon' }
                },] }
    ];
    return MatChipTrailingIcon;
}());
/**
 * Material design styled Chip component. Used inside the MatChipList component.
 */
var MatChip = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_3__["__extends"])(MatChip, _super);
    function MatChip(_elementRef, _ngZone, platform, globalRippleOptions, 
    // @breaking-change 8.0.0 `animationMode` parameter to become required.
    animationMode, 
    // @breaking-change 9.0.0 `_changeDetectorRef` parameter to become required.
    _changeDetectorRef, tabIndex, 
    // @breaking-change 11.0.0 `_document` parameter to become required.
    _document) {
        var _this = _super.call(this, _elementRef) || this;
        _this._elementRef = _elementRef;
        _this._ngZone = _ngZone;
        _this._changeDetectorRef = _changeDetectorRef;
        /** Whether the chip has focus. */
        _this._hasFocus = false;
        /** Whether the chip list is selectable */
        _this.chipListSelectable = true;
        /** Whether the chip list is in multi-selection mode. */
        _this._chipListMultiple = false;
        _this._selected = false;
        _this._selectable = true;
        _this._removable = true;
        /** Emits when the chip is focused. */
        _this._onFocus = new rxjs__WEBPACK_IMPORTED_MODULE_7__["Subject"]();
        /** Emits when the chip is blured. */
        _this._onBlur = new rxjs__WEBPACK_IMPORTED_MODULE_7__["Subject"]();
        /** Emitted when the chip is selected or deselected. */
        _this.selectionChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        /** Emitted when the chip is destroyed. */
        _this.destroyed = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        /** Emitted when a chip is to be removed. */
        _this.removed = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        _this._addHostClassName();
        // Dynamically create the ripple target, append it within the chip, and use it as the
        // chip's ripple target. Adding the class '.mat-chip-ripple' ensures that it will have
        // the proper styles.
        _this._chipRippleTarget = (_document || document).createElement('div');
        _this._chipRippleTarget.classList.add('mat-chip-ripple');
        _this._elementRef.nativeElement.appendChild(_this._chipRippleTarget);
        _this._chipRipple = new _angular_material_core__WEBPACK_IMPORTED_MODULE_2__["RippleRenderer"](_this, _ngZone, _this._chipRippleTarget, platform);
        _this._chipRipple.setupTriggerEvents(_elementRef);
        _this.rippleConfig = globalRippleOptions || {};
        _this._animationsDisabled = animationMode === 'NoopAnimations';
        _this.tabIndex = tabIndex != null ? (parseInt(tabIndex) || -1) : -1;
        return _this;
    }
    Object.defineProperty(MatChip.prototype, "rippleDisabled", {
        /**
         * Whether ripples are disabled on interaction
         * @docs-private
         */
        get: function () {
            return this.disabled || this.disableRipple || !!this.rippleConfig.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChip.prototype, "selected", {
        /** Whether the chip is selected. */
        get: function () { return this._selected; },
        set: function (value) {
            var coercedValue = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__["coerceBooleanProperty"])(value);
            if (coercedValue !== this._selected) {
                this._selected = coercedValue;
                this._dispatchSelectionChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChip.prototype, "value", {
        /** The value of the chip. Defaults to the content inside `<mat-chip>` tags. */
        get: function () {
            return this._value !== undefined
                ? this._value
                : this._elementRef.nativeElement.textContent;
        },
        set: function (value) { this._value = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChip.prototype, "selectable", {
        /**
         * Whether or not the chip is selectable. When a chip is not selectable,
         * changes to its selected state are always ignored. By default a chip is
         * selectable, and it becomes non-selectable if its parent chip list is
         * not selectable.
         */
        get: function () { return this._selectable && this.chipListSelectable; },
        set: function (value) {
            this._selectable = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__["coerceBooleanProperty"])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChip.prototype, "removable", {
        /**
         * Determines whether or not the chip displays the remove styling and emits (removed) events.
         */
        get: function () { return this._removable; },
        set: function (value) {
            this._removable = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__["coerceBooleanProperty"])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChip.prototype, "ariaSelected", {
        /** The ARIA selected applied to the chip. */
        get: function () {
            // Remove the `aria-selected` when the chip is deselected in single-selection mode, because
            // it adds noise to NVDA users where "not selected" will be read out for each chip.
            return this.selectable && (this._chipListMultiple || this.selected) ?
                this.selected.toString() : null;
        },
        enumerable: true,
        configurable: true
    });
    MatChip.prototype._addHostClassName = function () {
        var basicChipAttrName = 'mat-basic-chip';
        var element = this._elementRef.nativeElement;
        if (element.hasAttribute(basicChipAttrName) ||
            element.tagName.toLowerCase() === basicChipAttrName) {
            element.classList.add(basicChipAttrName);
            return;
        }
        else {
            element.classList.add('mat-standard-chip');
        }
    };
    MatChip.prototype.ngOnDestroy = function () {
        this.destroyed.emit({ chip: this });
        this._chipRipple._removeTriggerEvents();
    };
    /** Selects the chip. */
    MatChip.prototype.select = function () {
        if (!this._selected) {
            this._selected = true;
            this._dispatchSelectionChange();
            this._markForCheck();
        }
    };
    /** Deselects the chip. */
    MatChip.prototype.deselect = function () {
        if (this._selected) {
            this._selected = false;
            this._dispatchSelectionChange();
            this._markForCheck();
        }
    };
    /** Select this chip and emit selected event */
    MatChip.prototype.selectViaInteraction = function () {
        if (!this._selected) {
            this._selected = true;
            this._dispatchSelectionChange(true);
            this._markForCheck();
        }
    };
    /** Toggles the current selected state of this chip. */
    MatChip.prototype.toggleSelected = function (isUserInput) {
        if (isUserInput === void 0) { isUserInput = false; }
        this._selected = !this.selected;
        this._dispatchSelectionChange(isUserInput);
        this._markForCheck();
        return this.selected;
    };
    /** Allows for programmatic focusing of the chip. */
    MatChip.prototype.focus = function () {
        if (!this._hasFocus) {
            this._elementRef.nativeElement.focus();
            this._onFocus.next({ chip: this });
        }
        this._hasFocus = true;
    };
    /**
     * Allows for programmatic removal of the chip. Called by the MatChipList when the DELETE or
     * BACKSPACE keys are pressed.
     *
     * Informs any listeners of the removal request. Does not remove the chip from the DOM.
     */
    MatChip.prototype.remove = function () {
        if (this.removable) {
            this.removed.emit({ chip: this });
        }
    };
    /** Handles click events on the chip. */
    MatChip.prototype._handleClick = function (event) {
        if (this.disabled) {
            event.preventDefault();
        }
        else {
            event.stopPropagation();
        }
    };
    /** Handle custom key presses. */
    MatChip.prototype._handleKeydown = function (event) {
        if (this.disabled) {
            return;
        }
        switch (event.keyCode) {
            case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_0__["DELETE"]:
            case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_0__["BACKSPACE"]:
                // If we are removable, remove the focused chip
                this.remove();
                // Always prevent so page navigation does not occur
                event.preventDefault();
                break;
            case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_0__["SPACE"]:
                // If we are selectable, toggle the focused chip
                if (this.selectable) {
                    this.toggleSelected(true);
                }
                // Always prevent space from scrolling the page since the list has focus
                event.preventDefault();
                break;
        }
    };
    MatChip.prototype._blur = function () {
        var _this = this;
        // When animations are enabled, Angular may end up removing the chip from the DOM a little
        // earlier than usual, causing it to be blurred and throwing off the logic in the chip list
        // that moves focus not the next item. To work around the issue, we defer marking the chip
        // as not focused until the next time the zone stabilizes.
        this._ngZone.onStable
            .asObservable()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["take"])(1))
            .subscribe(function () {
            _this._ngZone.run(function () {
                _this._hasFocus = false;
                _this._onBlur.next({ chip: _this });
            });
        });
    };
    MatChip.prototype._dispatchSelectionChange = function (isUserInput) {
        if (isUserInput === void 0) { isUserInput = false; }
        this.selectionChange.emit({
            source: this,
            isUserInput: isUserInput,
            selected: this._selected
        });
    };
    MatChip.prototype._markForCheck = function () {
        // @breaking-change 9.0.0 Remove this method once the _changeDetectorRef is a required param.
        if (this._changeDetectorRef) {
            this._changeDetectorRef.markForCheck();
        }
    };
    MatChip.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"], args: [{
                    selector: "mat-basic-chip, [mat-basic-chip], mat-chip, [mat-chip]",
                    inputs: ['color', 'disabled', 'disableRipple', 'tabIndex'],
                    exportAs: 'matChip',
                    host: {
                        'class': 'mat-chip mat-focus-indicator',
                        '[attr.tabindex]': 'disabled ? null : tabIndex',
                        'role': 'option',
                        '[class.mat-chip-selected]': 'selected',
                        '[class.mat-chip-with-avatar]': 'avatar',
                        '[class.mat-chip-with-trailing-icon]': 'trailingIcon || removeIcon',
                        '[class.mat-chip-disabled]': 'disabled',
                        '[class._mat-animation-noopable]': '_animationsDisabled',
                        '[attr.disabled]': 'disabled || null',
                        '[attr.aria-disabled]': 'disabled.toString()',
                        '[attr.aria-selected]': 'ariaSelected',
                        '(click)': '_handleClick($event)',
                        '(keydown)': '_handleKeydown($event)',
                        '(focus)': 'focus()',
                        '(blur)': '_blur()',
                    },
                },] }
    ];
    /** @nocollapse */
    MatChip.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] },
        { type: _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__["Platform"] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material_core__WEBPACK_IMPORTED_MODULE_2__["MAT_RIPPLE_GLOBAL_OPTIONS"],] }] },
        { type: String, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_9__["ANIMATION_MODULE_TYPE"],] }] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"] },
        { type: String, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Attribute"], args: ['tabindex',] }] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["DOCUMENT"],] }] }
    ]; };
    MatChip.propDecorators = {
        avatar: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ContentChild"], args: [MatChipAvatar,] }],
        trailingIcon: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ContentChild"], args: [MatChipTrailingIcon,] }],
        removeIcon: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ContentChild"], args: [Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function () { return MatChipRemove; }),] }],
        selected: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        value: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        selectable: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        removable: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        selectionChange: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        destroyed: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        removed: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }]
    };
    return MatChip;
}(_MatChipMixinBase));
/**
 * Applies proper (click) support and adds styling for use with the Material Design "cancel" icon
 * available at https://material.io/icons/#ic_cancel.
 *
 * Example:
 *
 *     `<mat-chip>
 *       <mat-icon matChipRemove>cancel</mat-icon>
 *     </mat-chip>`
 *
 * You *may* use a custom icon, but you may need to override the `mat-chip-remove` positioning
 * styles to properly center the icon within the chip.
 */
var MatChipRemove = /** @class */ (function () {
    function MatChipRemove(_parentChip, 
    // @breaking-change 11.0.0 `elementRef` parameter to be made required.
    elementRef) {
        this._parentChip = _parentChip;
        // @breaking-change 11.0.0 Remove null check for `elementRef`.
        if (elementRef && elementRef.nativeElement.nodeName === 'BUTTON') {
            elementRef.nativeElement.setAttribute('type', 'button');
        }
    }
    /** Calls the parent chip's public `remove()` method if applicable. */
    MatChipRemove.prototype._handleClick = function (event) {
        var parentChip = this._parentChip;
        if (parentChip.removable && !parentChip.disabled) {
            parentChip.remove();
        }
        // We need to stop event propagation because otherwise the event will bubble up to the
        // form field and cause the `onContainerClick` method to be invoked. This method would then
        // reset the focused chip that has been focused after chip removal. Usually the parent
        // the parent click listener of the `MatChip` would prevent propagation, but it can happen
        // that the chip is being removed before the event bubbles up.
        event.stopPropagation();
    };
    MatChipRemove.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"], args: [{
                    selector: '[matChipRemove]',
                    host: {
                        'class': 'mat-chip-remove mat-chip-trailing-icon',
                        '(click)': '_handleClick($event)',
                    }
                },] }
    ];
    /** @nocollapse */
    MatChipRemove.ctorParameters = function () { return [
        { type: MatChip },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] }
    ]; };
    return MatChipRemove;
}());

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Injection token to be used to override the default options for the chips module. */
var MAT_CHIPS_DEFAULT_OPTIONS = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["InjectionToken"]('mat-chips-default-options');

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// Boilerplate for applying mixins to MatChipList.
/** @docs-private */
var MatChipListBase = /** @class */ (function () {
    function MatChipListBase(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, 
    /** @docs-private */
    ngControl) {
        this._defaultErrorStateMatcher = _defaultErrorStateMatcher;
        this._parentForm = _parentForm;
        this._parentFormGroup = _parentFormGroup;
        this.ngControl = ngControl;
    }
    return MatChipListBase;
}());
var _MatChipListMixinBase = Object(_angular_material_core__WEBPACK_IMPORTED_MODULE_2__["mixinErrorState"])(MatChipListBase);
// Increasing integer for generating unique ids for chip-list components.
var nextUniqueId = 0;
/** Change event object that is emitted when the chip list value has changed. */
var MatChipListChange = /** @class */ (function () {
    function MatChipListChange(
    /** Chip list that emitted the event. */
    source, 
    /** Value of the chip list when the event was emitted. */
    value) {
        this.source = source;
        this.value = value;
    }
    return MatChipListChange;
}());
/**
 * A material design chips component (named ChipList for its similarity to the List component).
 */
var MatChipList = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_3__["__extends"])(MatChipList, _super);
    function MatChipList(_elementRef, _changeDetectorRef, _dir, _parentForm, _parentFormGroup, _defaultErrorStateMatcher, 
    /** @docs-private */
    ngControl) {
        var _this = _super.call(this, _defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl) || this;
        _this._elementRef = _elementRef;
        _this._changeDetectorRef = _changeDetectorRef;
        _this._dir = _dir;
        _this.ngControl = ngControl;
        /**
         * Implemented as part of MatFormFieldControl.
         * @docs-private
         */
        _this.controlType = 'mat-chip-list';
        /**
         * When a chip is destroyed, we store the index of the destroyed chip until the chips
         * query list notifies about the update. This is necessary because we cannot determine an
         * appropriate chip that should receive focus until the array of chips updated completely.
         */
        _this._lastDestroyedChipIndex = null;
        /** Subject that emits when the component has been destroyed. */
        _this._destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_7__["Subject"]();
        /** Uid of the chip list */
        _this._uid = "mat-chip-list-" + nextUniqueId++;
        /** Tab index for the chip list. */
        _this._tabIndex = 0;
        /**
         * User defined tab index.
         * When it is not null, use user defined tab index. Otherwise use _tabIndex
         */
        _this._userTabIndex = null;
        /** Function when touched */
        _this._onTouched = function () { };
        /** Function when changed */
        _this._onChange = function () { };
        _this._multiple = false;
        _this._compareWith = function (o1, o2) { return o1 === o2; };
        _this._required = false;
        _this._disabled = false;
        /** Orientation of the chip list. */
        _this.ariaOrientation = 'horizontal';
        _this._selectable = true;
        /** Event emitted when the selected chip list value has been changed by the user. */
        _this.change = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        /**
         * Event that emits whenever the raw value of the chip-list changes. This is here primarily
         * to facilitate the two-way binding for the `value` input.
         * @docs-private
         */
        _this.valueChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        if (_this.ngControl) {
            _this.ngControl.valueAccessor = _this;
        }
        return _this;
    }
    Object.defineProperty(MatChipList.prototype, "selected", {
        /** The array of selected chips inside chip list. */
        get: function () {
            return this.multiple ? this._selectionModel.selected : this._selectionModel.selected[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "role", {
        /** The ARIA role applied to the chip list. */
        get: function () { return this.empty ? null : 'listbox'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "multiple", {
        /** Whether the user should be allowed to select multiple chips. */
        get: function () { return this._multiple; },
        set: function (value) {
            this._multiple = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__["coerceBooleanProperty"])(value);
            this._syncChipsState();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "compareWith", {
        /**
         * A function to compare the option values with the selected values. The first argument
         * is a value from an option. The second is a value from the selection. A boolean
         * should be returned.
         */
        get: function () { return this._compareWith; },
        set: function (fn) {
            this._compareWith = fn;
            if (this._selectionModel) {
                // A different comparator means the selection could change.
                this._initializeSelection();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "value", {
        /**
         * Implemented as part of MatFormFieldControl.
         * @docs-private
         */
        get: function () { return this._value; },
        set: function (value) {
            this.writeValue(value);
            this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "id", {
        /**
         * Implemented as part of MatFormFieldControl.
         * @docs-private
         */
        get: function () {
            return this._chipInput ? this._chipInput.id : this._uid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "required", {
        /**
         * Implemented as part of MatFormFieldControl.
         * @docs-private
         */
        get: function () { return this._required; },
        set: function (value) {
            this._required = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__["coerceBooleanProperty"])(value);
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "placeholder", {
        /**
         * Implemented as part of MatFormFieldControl.
         * @docs-private
         */
        get: function () {
            return this._chipInput ? this._chipInput.placeholder : this._placeholder;
        },
        set: function (value) {
            this._placeholder = value;
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "focused", {
        /** Whether any chips or the matChipInput inside of this chip-list has focus. */
        get: function () {
            return (this._chipInput && this._chipInput.focused) || this._hasFocusedChip();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "empty", {
        /**
         * Implemented as part of MatFormFieldControl.
         * @docs-private
         */
        get: function () {
            return (!this._chipInput || this._chipInput.empty) && this.chips.length === 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "shouldLabelFloat", {
        /**
         * Implemented as part of MatFormFieldControl.
         * @docs-private
         */
        get: function () { return !this.empty || this.focused; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "disabled", {
        /**
         * Implemented as part of MatFormFieldControl.
         * @docs-private
         */
        get: function () { return this.ngControl ? !!this.ngControl.disabled : this._disabled; },
        set: function (value) {
            this._disabled = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__["coerceBooleanProperty"])(value);
            this._syncChipsState();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "selectable", {
        /**
         * Whether or not this chip list is selectable. When a chip list is not selectable,
         * the selected states for all the chips inside the chip list are always ignored.
         */
        get: function () { return this._selectable; },
        set: function (value) {
            var _this = this;
            this._selectable = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__["coerceBooleanProperty"])(value);
            if (this.chips) {
                this.chips.forEach(function (chip) { return chip.chipListSelectable = _this._selectable; });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "tabIndex", {
        set: function (value) {
            this._userTabIndex = value;
            this._tabIndex = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "chipSelectionChanges", {
        /** Combined stream of all of the child chips' selection change events. */
        get: function () {
            return rxjs__WEBPACK_IMPORTED_MODULE_7__["merge"].apply(void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_3__["__spread"])(this.chips.map(function (chip) { return chip.selectionChange; })));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "chipFocusChanges", {
        /** Combined stream of all of the child chips' focus change events. */
        get: function () {
            return rxjs__WEBPACK_IMPORTED_MODULE_7__["merge"].apply(void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_3__["__spread"])(this.chips.map(function (chip) { return chip._onFocus; })));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "chipBlurChanges", {
        /** Combined stream of all of the child chips' blur change events. */
        get: function () {
            return rxjs__WEBPACK_IMPORTED_MODULE_7__["merge"].apply(void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_3__["__spread"])(this.chips.map(function (chip) { return chip._onBlur; })));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "chipRemoveChanges", {
        /** Combined stream of all of the child chips' remove change events. */
        get: function () {
            return rxjs__WEBPACK_IMPORTED_MODULE_7__["merge"].apply(void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_3__["__spread"])(this.chips.map(function (chip) { return chip.destroyed; })));
        },
        enumerable: true,
        configurable: true
    });
    MatChipList.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._keyManager = new _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_10__["FocusKeyManager"](this.chips)
            .withWrap()
            .withVerticalOrientation()
            .withHorizontalOrientation(this._dir ? this._dir.value : 'ltr');
        if (this._dir) {
            this._dir.change
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["takeUntil"])(this._destroyed))
                .subscribe(function (dir) { return _this._keyManager.withHorizontalOrientation(dir); });
        }
        this._keyManager.tabOut.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["takeUntil"])(this._destroyed)).subscribe(function () {
            _this._allowFocusEscape();
        });
        // When the list changes, re-subscribe
        this.chips.changes.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["startWith"])(null), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["takeUntil"])(this._destroyed)).subscribe(function () {
            if (_this.disabled) {
                // Since this happens after the content has been
                // checked, we need to defer it to the next tick.
                Promise.resolve().then(function () {
                    _this._syncChipsState();
                });
            }
            _this._resetChips();
            // Reset chips selected/deselected status
            _this._initializeSelection();
            // Check to see if we need to update our tab index
            _this._updateTabIndex();
            // Check to see if we have a destroyed chip and need to refocus
            _this._updateFocusForDestroyedChips();
            _this.stateChanges.next();
        });
    };
    MatChipList.prototype.ngOnInit = function () {
        this._selectionModel = new _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_12__["SelectionModel"](this.multiple, undefined, false);
        this.stateChanges.next();
    };
    MatChipList.prototype.ngDoCheck = function () {
        if (this.ngControl) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();
        }
    };
    MatChipList.prototype.ngOnDestroy = function () {
        this._destroyed.next();
        this._destroyed.complete();
        this.stateChanges.complete();
        this._dropSubscriptions();
    };
    /** Associates an HTML input element with this chip list. */
    MatChipList.prototype.registerInput = function (inputElement) {
        this._chipInput = inputElement;
    };
    /**
     * Implemented as part of MatFormFieldControl.
     * @docs-private
     */
    MatChipList.prototype.setDescribedByIds = function (ids) { this._ariaDescribedby = ids.join(' '); };
    // Implemented as part of ControlValueAccessor.
    MatChipList.prototype.writeValue = function (value) {
        if (this.chips) {
            this._setSelectionByValue(value, false);
        }
    };
    // Implemented as part of ControlValueAccessor.
    MatChipList.prototype.registerOnChange = function (fn) {
        this._onChange = fn;
    };
    // Implemented as part of ControlValueAccessor.
    MatChipList.prototype.registerOnTouched = function (fn) {
        this._onTouched = fn;
    };
    // Implemented as part of ControlValueAccessor.
    MatChipList.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
        this.stateChanges.next();
    };
    /**
     * Implemented as part of MatFormFieldControl.
     * @docs-private
     */
    MatChipList.prototype.onContainerClick = function (event) {
        if (!this._originatesFromChip(event)) {
            this.focus();
        }
    };
    /**
     * Focuses the first non-disabled chip in this chip list, or the associated input when there
     * are no eligible chips.
     */
    MatChipList.prototype.focus = function (options) {
        if (this.disabled) {
            return;
        }
        // TODO: ARIA says this should focus the first `selected` chip if any are selected.
        // Focus on first element if there's no chipInput inside chip-list
        if (this._chipInput && this._chipInput.focused) {
            // do nothing
        }
        else if (this.chips.length > 0) {
            this._keyManager.setFirstItemActive();
            this.stateChanges.next();
        }
        else {
            this._focusInput(options);
            this.stateChanges.next();
        }
    };
    /** Attempt to focus an input if we have one. */
    MatChipList.prototype._focusInput = function (options) {
        if (this._chipInput) {
            this._chipInput.focus(options);
        }
    };
    /**
     * Pass events to the keyboard manager. Available here for tests.
     */
    MatChipList.prototype._keydown = function (event) {
        var target = event.target;
        // If they are on an empty input and hit backspace, focus the last chip
        if (event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_0__["BACKSPACE"] && this._isInputEmpty(target)) {
            this._keyManager.setLastItemActive();
            event.preventDefault();
        }
        else if (target && target.classList.contains('mat-chip')) {
            if (event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_0__["HOME"]) {
                this._keyManager.setFirstItemActive();
                event.preventDefault();
            }
            else if (event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_0__["END"]) {
                this._keyManager.setLastItemActive();
                event.preventDefault();
            }
            else {
                this._keyManager.onKeydown(event);
            }
            this.stateChanges.next();
        }
    };
    /**
     * Check the tab index as you should not be allowed to focus an empty list.
     */
    MatChipList.prototype._updateTabIndex = function () {
        // If we have 0 chips, we should not allow keyboard focus
        this._tabIndex = this._userTabIndex || (this.chips.length === 0 ? -1 : 0);
    };
    /**
     * If the amount of chips changed, we need to update the
     * key manager state and focus the next closest chip.
     */
    MatChipList.prototype._updateFocusForDestroyedChips = function () {
        // Move focus to the closest chip. If no other chips remain, focus the chip-list itself.
        if (this._lastDestroyedChipIndex != null) {
            if (this.chips.length) {
                var newChipIndex = Math.min(this._lastDestroyedChipIndex, this.chips.length - 1);
                this._keyManager.setActiveItem(newChipIndex);
            }
            else {
                this.focus();
            }
        }
        this._lastDestroyedChipIndex = null;
    };
    /**
     * Utility to ensure all indexes are valid.
     *
     * @param index The index to be checked.
     * @returns True if the index is valid for our list of chips.
     */
    MatChipList.prototype._isValidIndex = function (index) {
        return index >= 0 && index < this.chips.length;
    };
    MatChipList.prototype._isInputEmpty = function (element) {
        if (element && element.nodeName.toLowerCase() === 'input') {
            var input = element;
            return !input.value;
        }
        return false;
    };
    MatChipList.prototype._setSelectionByValue = function (value, isUserInput) {
        var _this = this;
        if (isUserInput === void 0) { isUserInput = true; }
        this._clearSelection();
        this.chips.forEach(function (chip) { return chip.deselect(); });
        if (Array.isArray(value)) {
            value.forEach(function (currentValue) { return _this._selectValue(currentValue, isUserInput); });
            this._sortValues();
        }
        else {
            var correspondingChip = this._selectValue(value, isUserInput);
            // Shift focus to the active item. Note that we shouldn't do this in multiple
            // mode, because we don't know what chip the user interacted with last.
            if (correspondingChip) {
                if (isUserInput) {
                    this._keyManager.setActiveItem(correspondingChip);
                }
            }
        }
    };
    /**
     * Finds and selects the chip based on its value.
     * @returns Chip that has the corresponding value.
     */
    MatChipList.prototype._selectValue = function (value, isUserInput) {
        var _this = this;
        if (isUserInput === void 0) { isUserInput = true; }
        var correspondingChip = this.chips.find(function (chip) {
            return chip.value != null && _this._compareWith(chip.value, value);
        });
        if (correspondingChip) {
            isUserInput ? correspondingChip.selectViaInteraction() : correspondingChip.select();
            this._selectionModel.select(correspondingChip);
        }
        return correspondingChip;
    };
    MatChipList.prototype._initializeSelection = function () {
        var _this = this;
        // Defer setting the value in order to avoid the "Expression
        // has changed after it was checked" errors from Angular.
        Promise.resolve().then(function () {
            if (_this.ngControl || _this._value) {
                _this._setSelectionByValue(_this.ngControl ? _this.ngControl.value : _this._value, false);
                _this.stateChanges.next();
            }
        });
    };
    /**
     * Deselects every chip in the list.
     * @param skip Chip that should not be deselected.
     */
    MatChipList.prototype._clearSelection = function (skip) {
        this._selectionModel.clear();
        this.chips.forEach(function (chip) {
            if (chip !== skip) {
                chip.deselect();
            }
        });
        this.stateChanges.next();
    };
    /**
     * Sorts the model values, ensuring that they keep the same
     * order that they have in the panel.
     */
    MatChipList.prototype._sortValues = function () {
        var _this = this;
        if (this._multiple) {
            this._selectionModel.clear();
            this.chips.forEach(function (chip) {
                if (chip.selected) {
                    _this._selectionModel.select(chip);
                }
            });
            this.stateChanges.next();
        }
    };
    /** Emits change event to set the model value. */
    MatChipList.prototype._propagateChanges = function (fallbackValue) {
        var valueToEmit = null;
        if (Array.isArray(this.selected)) {
            valueToEmit = this.selected.map(function (chip) { return chip.value; });
        }
        else {
            valueToEmit = this.selected ? this.selected.value : fallbackValue;
        }
        this._value = valueToEmit;
        this.change.emit(new MatChipListChange(this, valueToEmit));
        this.valueChange.emit(valueToEmit);
        this._onChange(valueToEmit);
        this._changeDetectorRef.markForCheck();
    };
    /** When blurred, mark the field as touched when focus moved outside the chip list. */
    MatChipList.prototype._blur = function () {
        var _this = this;
        if (!this._hasFocusedChip()) {
            this._keyManager.setActiveItem(-1);
        }
        if (!this.disabled) {
            if (this._chipInput) {
                // If there's a chip input, we should check whether the focus moved to chip input.
                // If the focus is not moved to chip input, mark the field as touched. If the focus moved
                // to chip input, do nothing.
                // Timeout is needed to wait for the focus() event trigger on chip input.
                setTimeout(function () {
                    if (!_this.focused) {
                        _this._markAsTouched();
                    }
                });
            }
            else {
                // If there's no chip input, then mark the field as touched.
                this._markAsTouched();
            }
        }
    };
    /** Mark the field as touched */
    MatChipList.prototype._markAsTouched = function () {
        this._onTouched();
        this._changeDetectorRef.markForCheck();
        this.stateChanges.next();
    };
    /**
     * Removes the `tabindex` from the chip list and resets it back afterwards, allowing the
     * user to tab out of it. This prevents the list from capturing focus and redirecting
     * it back to the first chip, creating a focus trap, if it user tries to tab away.
     */
    MatChipList.prototype._allowFocusEscape = function () {
        var _this = this;
        if (this._tabIndex !== -1) {
            this._tabIndex = -1;
            setTimeout(function () {
                _this._tabIndex = _this._userTabIndex || 0;
                _this._changeDetectorRef.markForCheck();
            });
        }
    };
    MatChipList.prototype._resetChips = function () {
        this._dropSubscriptions();
        this._listenToChipsFocus();
        this._listenToChipsSelection();
        this._listenToChipsRemoved();
    };
    MatChipList.prototype._dropSubscriptions = function () {
        if (this._chipFocusSubscription) {
            this._chipFocusSubscription.unsubscribe();
            this._chipFocusSubscription = null;
        }
        if (this._chipBlurSubscription) {
            this._chipBlurSubscription.unsubscribe();
            this._chipBlurSubscription = null;
        }
        if (this._chipSelectionSubscription) {
            this._chipSelectionSubscription.unsubscribe();
            this._chipSelectionSubscription = null;
        }
        if (this._chipRemoveSubscription) {
            this._chipRemoveSubscription.unsubscribe();
            this._chipRemoveSubscription = null;
        }
    };
    /** Listens to user-generated selection events on each chip. */
    MatChipList.prototype._listenToChipsSelection = function () {
        var _this = this;
        this._chipSelectionSubscription = this.chipSelectionChanges.subscribe(function (event) {
            event.source.selected
                ? _this._selectionModel.select(event.source)
                : _this._selectionModel.deselect(event.source);
            // For single selection chip list, make sure the deselected value is unselected.
            if (!_this.multiple) {
                _this.chips.forEach(function (chip) {
                    if (!_this._selectionModel.isSelected(chip) && chip.selected) {
                        chip.deselect();
                    }
                });
            }
            if (event.isUserInput) {
                _this._propagateChanges();
            }
        });
    };
    /** Listens to user-generated selection events on each chip. */
    MatChipList.prototype._listenToChipsFocus = function () {
        var _this = this;
        this._chipFocusSubscription = this.chipFocusChanges.subscribe(function (event) {
            var chipIndex = _this.chips.toArray().indexOf(event.chip);
            if (_this._isValidIndex(chipIndex)) {
                _this._keyManager.updateActiveItem(chipIndex);
            }
            _this.stateChanges.next();
        });
        this._chipBlurSubscription = this.chipBlurChanges.subscribe(function () {
            _this._blur();
            _this.stateChanges.next();
        });
    };
    MatChipList.prototype._listenToChipsRemoved = function () {
        var _this = this;
        this._chipRemoveSubscription = this.chipRemoveChanges.subscribe(function (event) {
            var chip = event.chip;
            var chipIndex = _this.chips.toArray().indexOf(event.chip);
            // In case the chip that will be removed is currently focused, we temporarily store
            // the index in order to be able to determine an appropriate sibling chip that will
            // receive focus.
            if (_this._isValidIndex(chipIndex) && chip._hasFocus) {
                _this._lastDestroyedChipIndex = chipIndex;
            }
        });
    };
    /** Checks whether an event comes from inside a chip element. */
    MatChipList.prototype._originatesFromChip = function (event) {
        var currentElement = event.target;
        while (currentElement && currentElement !== this._elementRef.nativeElement) {
            if (currentElement.classList.contains('mat-chip')) {
                return true;
            }
            currentElement = currentElement.parentElement;
        }
        return false;
    };
    /** Checks whether any of the chips is focused. */
    MatChipList.prototype._hasFocusedChip = function () {
        return this.chips.some(function (chip) { return chip._hasFocus; });
    };
    /** Syncs the list's state with the individual chips. */
    MatChipList.prototype._syncChipsState = function () {
        var _this = this;
        if (this.chips) {
            this.chips.forEach(function (chip) {
                chip.disabled = _this._disabled;
                chip._chipListMultiple = _this.multiple;
            });
        }
    };
    MatChipList.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'mat-chip-list',
                    template: "<div class=\"mat-chip-list-wrapper\"><ng-content></ng-content></div>",
                    exportAs: 'matChipList',
                    host: {
                        '[attr.tabindex]': 'disabled ? null : _tabIndex',
                        '[attr.aria-describedby]': '_ariaDescribedby || null',
                        '[attr.aria-required]': 'role ? required : null',
                        '[attr.aria-disabled]': 'disabled.toString()',
                        '[attr.aria-invalid]': 'errorState',
                        '[attr.aria-multiselectable]': 'multiple',
                        '[attr.role]': 'role',
                        '[class.mat-chip-list-disabled]': 'disabled',
                        '[class.mat-chip-list-invalid]': 'errorState',
                        '[class.mat-chip-list-required]': 'required',
                        '[attr.aria-orientation]': 'ariaOrientation',
                        'class': 'mat-chip-list',
                        '(focus)': 'focus()',
                        '(blur)': '_blur()',
                        '(keydown)': '_keydown($event)',
                        '[id]': '_uid',
                    },
                    providers: [{ provide: _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__["MatFormFieldControl"], useExisting: MatChipList }],
                    encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].None,
                    changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
                    styles: [".mat-chip{position:relative;box-sizing:border-box;-webkit-tap-highlight-color:transparent;transform:translateZ(0);border:none;-webkit-appearance:none;-moz-appearance:none}.mat-standard-chip{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);display:inline-flex;padding:7px 12px;border-radius:16px;align-items:center;cursor:default;min-height:32px;height:1px}._mat-animation-noopable.mat-standard-chip{transition:none;animation:none}.mat-standard-chip .mat-chip-remove.mat-icon{width:18px;height:18px}.mat-standard-chip::after{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:inherit;opacity:0;content:\"\";pointer-events:none;transition:opacity 200ms cubic-bezier(0.35, 0, 0.25, 1)}.mat-standard-chip:hover::after{opacity:.12}.mat-standard-chip:focus{outline:none}.mat-standard-chip:focus::after{opacity:.16}.cdk-high-contrast-active .mat-standard-chip{outline:solid 1px}.cdk-high-contrast-active .mat-standard-chip:focus{outline:dotted 2px}.mat-standard-chip.mat-chip-disabled::after{opacity:0}.mat-standard-chip.mat-chip-disabled .mat-chip-remove,.mat-standard-chip.mat-chip-disabled .mat-chip-trailing-icon{cursor:default}.mat-standard-chip.mat-chip-with-trailing-icon.mat-chip-with-avatar,.mat-standard-chip.mat-chip-with-avatar{padding-top:0;padding-bottom:0}.mat-standard-chip.mat-chip-with-trailing-icon.mat-chip-with-avatar{padding-right:8px;padding-left:0}[dir=rtl] .mat-standard-chip.mat-chip-with-trailing-icon.mat-chip-with-avatar{padding-left:8px;padding-right:0}.mat-standard-chip.mat-chip-with-trailing-icon{padding-top:7px;padding-bottom:7px;padding-right:8px;padding-left:12px}[dir=rtl] .mat-standard-chip.mat-chip-with-trailing-icon{padding-left:8px;padding-right:12px}.mat-standard-chip.mat-chip-with-avatar{padding-left:0;padding-right:12px}[dir=rtl] .mat-standard-chip.mat-chip-with-avatar{padding-right:0;padding-left:12px}.mat-standard-chip .mat-chip-avatar{width:24px;height:24px;margin-right:8px;margin-left:4px}[dir=rtl] .mat-standard-chip .mat-chip-avatar{margin-left:8px;margin-right:4px}.mat-standard-chip .mat-chip-remove,.mat-standard-chip .mat-chip-trailing-icon{width:18px;height:18px;cursor:pointer}.mat-standard-chip .mat-chip-remove,.mat-standard-chip .mat-chip-trailing-icon{margin-left:8px;margin-right:0}[dir=rtl] .mat-standard-chip .mat-chip-remove,[dir=rtl] .mat-standard-chip .mat-chip-trailing-icon{margin-right:8px;margin-left:0}.mat-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit;overflow:hidden}.mat-chip-list-wrapper{display:flex;flex-direction:row;flex-wrap:wrap;align-items:center;margin:-4px}.mat-chip-list-wrapper input.mat-input-element,.mat-chip-list-wrapper .mat-standard-chip{margin:4px}.mat-chip-list-stacked .mat-chip-list-wrapper{flex-direction:column;align-items:flex-start}.mat-chip-list-stacked .mat-chip-list-wrapper .mat-standard-chip{width:100%}.mat-chip-avatar{border-radius:50%;justify-content:center;align-items:center;display:flex;overflow:hidden;object-fit:cover}input.mat-chip-input{width:150px;margin:4px;flex:1 0 150px}\n"]
                }] }
    ];
    /** @nocollapse */
    MatChipList.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"] },
        { type: _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_11__["Directionality"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"] }] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_13__["NgForm"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"] }] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_13__["FormGroupDirective"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"] }] },
        { type: _angular_material_core__WEBPACK_IMPORTED_MODULE_2__["ErrorStateMatcher"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_13__["NgControl"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Self"] }] }
    ]; };
    MatChipList.propDecorators = {
        errorStateMatcher: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        multiple: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        compareWith: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        value: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        required: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        placeholder: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        disabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        ariaOrientation: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ['aria-orientation',] }],
        selectable: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        tabIndex: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        change: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        valueChange: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        chips: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ContentChildren"], args: [MatChip, {
                        // We need to use `descendants: true`, because Ivy will no longer match
                        // indirect descendants if it's left as false.
                        descendants: true
                    },] }]
    };
    return MatChipList;
}(_MatChipListMixinBase));

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// Increasing integer for generating unique ids.
var nextUniqueId$1 = 0;
/**
 * Directive that adds chip-specific behaviors to an input element inside `<mat-form-field>`.
 * May be placed inside or outside of an `<mat-chip-list>`.
 */
var MatChipInput = /** @class */ (function () {
    function MatChipInput(_elementRef, _defaultOptions) {
        this._elementRef = _elementRef;
        this._defaultOptions = _defaultOptions;
        /** Whether the control is focused. */
        this.focused = false;
        this._addOnBlur = false;
        /**
         * The list of key codes that will trigger a chipEnd event.
         *
         * Defaults to `[ENTER]`.
         */
        this.separatorKeyCodes = this._defaultOptions.separatorKeyCodes;
        /** Emitted when a chip is to be added. */
        this.chipEnd = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        /** The input's placeholder text. */
        this.placeholder = '';
        /** Unique id for the input. */
        this.id = "mat-chip-list-input-" + nextUniqueId$1++;
        this._disabled = false;
        this._inputElement = this._elementRef.nativeElement;
    }
    Object.defineProperty(MatChipInput.prototype, "chipList", {
        /** Register input for chip list */
        set: function (value) {
            if (value) {
                this._chipList = value;
                this._chipList.registerInput(this);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipInput.prototype, "addOnBlur", {
        /**
         * Whether or not the chipEnd event will be emitted when the input is blurred.
         */
        get: function () { return this._addOnBlur; },
        set: function (value) { this._addOnBlur = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__["coerceBooleanProperty"])(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipInput.prototype, "disabled", {
        /** Whether the input is disabled. */
        get: function () { return this._disabled || (this._chipList && this._chipList.disabled); },
        set: function (value) { this._disabled = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__["coerceBooleanProperty"])(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipInput.prototype, "empty", {
        /** Whether the input is empty. */
        get: function () { return !this._inputElement.value; },
        enumerable: true,
        configurable: true
    });
    MatChipInput.prototype.ngOnChanges = function () {
        this._chipList.stateChanges.next();
    };
    /** Utility method to make host definition/tests more clear. */
    MatChipInput.prototype._keydown = function (event) {
        // Allow the user's focus to escape when they're tabbing forward. Note that we don't
        // want to do this when going backwards, because focus should go back to the first chip.
        if (event && event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_0__["TAB"] && !Object(_angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_0__["hasModifierKey"])(event, 'shiftKey')) {
            this._chipList._allowFocusEscape();
        }
        this._emitChipEnd(event);
    };
    /** Checks to see if the blur should emit the (chipEnd) event. */
    MatChipInput.prototype._blur = function () {
        if (this.addOnBlur) {
            this._emitChipEnd();
        }
        this.focused = false;
        // Blur the chip list if it is not focused
        if (!this._chipList.focused) {
            this._chipList._blur();
        }
        this._chipList.stateChanges.next();
    };
    MatChipInput.prototype._focus = function () {
        this.focused = true;
        this._chipList.stateChanges.next();
    };
    /** Checks to see if the (chipEnd) event needs to be emitted. */
    MatChipInput.prototype._emitChipEnd = function (event) {
        if (!this._inputElement.value && !!event) {
            this._chipList._keydown(event);
        }
        if (!event || this._isSeparatorKey(event)) {
            this.chipEnd.emit({ input: this._inputElement, value: this._inputElement.value });
            if (event) {
                event.preventDefault();
            }
        }
    };
    MatChipInput.prototype._onInput = function () {
        // Let chip list know whenever the value changes.
        this._chipList.stateChanges.next();
    };
    /** Focuses the input. */
    MatChipInput.prototype.focus = function (options) {
        this._inputElement.focus(options);
    };
    /** Checks whether a keycode is one of the configured separators. */
    MatChipInput.prototype._isSeparatorKey = function (event) {
        if (Object(_angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_0__["hasModifierKey"])(event)) {
            return false;
        }
        var separators = this.separatorKeyCodes;
        var keyCode = event.keyCode;
        return Array.isArray(separators) ? separators.indexOf(keyCode) > -1 : separators.has(keyCode);
    };
    MatChipInput.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"], args: [{
                    selector: 'input[matChipInputFor]',
                    exportAs: 'matChipInput, matChipInputFor',
                    host: {
                        'class': 'mat-chip-input mat-input-element',
                        '(keydown)': '_keydown($event)',
                        '(blur)': '_blur()',
                        '(focus)': '_focus()',
                        '(input)': '_onInput()',
                        '[id]': 'id',
                        '[attr.disabled]': 'disabled || null',
                        '[attr.placeholder]': 'placeholder || null',
                        '[attr.aria-invalid]': '_chipList && _chipList.ngControl ? _chipList.ngControl.invalid : null',
                        '[attr.aria-required]': '_chipList && _chipList.required || null',
                    }
                },] }
    ];
    /** @nocollapse */
    MatChipInput.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [MAT_CHIPS_DEFAULT_OPTIONS,] }] }
    ]; };
    MatChipInput.propDecorators = {
        chipList: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ['matChipInputFor',] }],
        addOnBlur: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ['matChipInputAddOnBlur',] }],
        separatorKeyCodes: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ['matChipInputSeparatorKeyCodes',] }],
        chipEnd: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"], args: ['matChipInputTokenEnd',] }],
        placeholder: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        id: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        disabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }]
    };
    return MatChipInput;
}());

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var CHIP_DECLARATIONS = [
    MatChipList,
    MatChip,
    MatChipInput,
    MatChipRemove,
    MatChipAvatar,
    MatChipTrailingIcon,
];
var ɵ0 = {
    separatorKeyCodes: [_angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_0__["ENTER"]]
};
var MatChipsModule = /** @class */ (function () {
    function MatChipsModule() {
    }
    MatChipsModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    exports: CHIP_DECLARATIONS,
                    declarations: CHIP_DECLARATIONS,
                    providers: [
                        _angular_material_core__WEBPACK_IMPORTED_MODULE_2__["ErrorStateMatcher"],
                        {
                            provide: MAT_CHIPS_DEFAULT_OPTIONS,
                            useValue: ɵ0
                        }
                    ]
                },] }
    ];
    return MatChipsModule;
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


//# sourceMappingURL=chips.js.map


/***/ }),

/***/ "./node_modules/@angular/material/fesm5/radio.js":
/*!*******************************************************!*\
  !*** ./node_modules/@angular/material/fesm5/radio.js ***!
  \*******************************************************/
/*! exports provided: MAT_RADIO_DEFAULT_OPTIONS, MAT_RADIO_DEFAULT_OPTIONS_FACTORY, MAT_RADIO_GROUP_CONTROL_VALUE_ACCESSOR, MatRadioButton, MatRadioChange, MatRadioGroup, MatRadioModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAT_RADIO_DEFAULT_OPTIONS", function() { return MAT_RADIO_DEFAULT_OPTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAT_RADIO_DEFAULT_OPTIONS_FACTORY", function() { return MAT_RADIO_DEFAULT_OPTIONS_FACTORY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAT_RADIO_GROUP_CONTROL_VALUE_ACCESSOR", function() { return MAT_RADIO_GROUP_CONTROL_VALUE_ACCESSOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatRadioButton", function() { return MatRadioButton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatRadioChange", function() { return MatRadioChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatRadioGroup", function() { return MatRadioGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatRadioModule", function() { return MatRadioModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/fesm5/core.js");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/a11y */ "./node_modules/@angular/cdk/fesm5/a11y.js");
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/coercion */ "./node_modules/@angular/cdk/fesm5/coercion.js");
/* harmony import */ var _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/collections */ "./node_modules/@angular/cdk/fesm5/collections.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");









/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var MAT_RADIO_DEFAULT_OPTIONS = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('mat-radio-default-options', {
    providedIn: 'root',
    factory: MAT_RADIO_DEFAULT_OPTIONS_FACTORY
});
function MAT_RADIO_DEFAULT_OPTIONS_FACTORY() {
    return {
        color: 'accent'
    };
}
// Increasing integer for generating unique ids for radio components.
var nextUniqueId = 0;
/**
 * Provider Expression that allows mat-radio-group to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 * @docs-private
 */
var MAT_RADIO_GROUP_CONTROL_VALUE_ACCESSOR = {
    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NG_VALUE_ACCESSOR"],
    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function () { return MatRadioGroup; }),
    multi: true
};
/** Change event object emitted by MatRadio and MatRadioGroup. */
var MatRadioChange = /** @class */ (function () {
    function MatRadioChange(
    /** The MatRadioButton that emits the change event. */
    source, 
    /** The value of the MatRadioButton. */
    value) {
        this.source = source;
        this.value = value;
    }
    return MatRadioChange;
}());
/**
 * A group of radio buttons. May contain one or more `<mat-radio-button>` elements.
 */
var MatRadioGroup = /** @class */ (function () {
    function MatRadioGroup(_changeDetector) {
        this._changeDetector = _changeDetector;
        /** Selected value for the radio group. */
        this._value = null;
        /** The HTML name attribute applied to radio buttons in this group. */
        this._name = "mat-radio-group-" + nextUniqueId++;
        /** The currently selected radio button. Should match value. */
        this._selected = null;
        /** Whether the `value` has been set to its initial value. */
        this._isInitialized = false;
        /** Whether the labels should appear after or before the radio-buttons. Defaults to 'after' */
        this._labelPosition = 'after';
        /** Whether the radio group is disabled. */
        this._disabled = false;
        /** Whether the radio group is required. */
        this._required = false;
        /** The method to be called in order to update ngModel */
        this._controlValueAccessorChangeFn = function () { };
        /**
         * onTouch function registered via registerOnTouch (ControlValueAccessor).
         * @docs-private
         */
        this.onTouched = function () { };
        /**
         * Event emitted when the group value changes.
         * Change events are only emitted when the value changes due to user interaction with
         * a radio button (the same behavior as `<input type-"radio">`).
         */
        this.change = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    Object.defineProperty(MatRadioGroup.prototype, "name", {
        /** Name of the radio button group. All radio buttons inside this group will use this name. */
        get: function () { return this._name; },
        set: function (value) {
            this._name = value;
            this._updateRadioButtonNames();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatRadioGroup.prototype, "labelPosition", {
        /** Whether the labels should appear after or before the radio-buttons. Defaults to 'after' */
        get: function () {
            return this._labelPosition;
        },
        set: function (v) {
            this._labelPosition = v === 'before' ? 'before' : 'after';
            this._markRadiosForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatRadioGroup.prototype, "value", {
        /**
         * Value for the radio-group. Should equal the value of the selected radio button if there is
         * a corresponding radio button with a matching value. If there is not such a corresponding
         * radio button, this value persists to be applied in case a new radio button is added with a
         * matching value.
         */
        get: function () { return this._value; },
        set: function (newValue) {
            if (this._value !== newValue) {
                // Set this before proceeding to ensure no circular loop occurs with selection.
                this._value = newValue;
                this._updateSelectedRadioFromValue();
                this._checkSelectedRadioButton();
            }
        },
        enumerable: true,
        configurable: true
    });
    MatRadioGroup.prototype._checkSelectedRadioButton = function () {
        if (this._selected && !this._selected.checked) {
            this._selected.checked = true;
        }
    };
    Object.defineProperty(MatRadioGroup.prototype, "selected", {
        /**
         * The currently selected radio button. If set to a new radio button, the radio group value
         * will be updated to match the new selected button.
         */
        get: function () { return this._selected; },
        set: function (selected) {
            this._selected = selected;
            this.value = selected ? selected.value : null;
            this._checkSelectedRadioButton();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatRadioGroup.prototype, "disabled", {
        /** Whether the radio group is disabled */
        get: function () { return this._disabled; },
        set: function (value) {
            this._disabled = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_4__["coerceBooleanProperty"])(value);
            this._markRadiosForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatRadioGroup.prototype, "required", {
        /** Whether the radio group is required */
        get: function () { return this._required; },
        set: function (value) {
            this._required = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_4__["coerceBooleanProperty"])(value);
            this._markRadiosForCheck();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initialize properties once content children are available.
     * This allows us to propagate relevant attributes to associated buttons.
     */
    MatRadioGroup.prototype.ngAfterContentInit = function () {
        // Mark this component as initialized in AfterContentInit because the initial value can
        // possibly be set by NgModel on MatRadioGroup, and it is possible that the OnInit of the
        // NgModel occurs *after* the OnInit of the MatRadioGroup.
        this._isInitialized = true;
    };
    /**
     * Mark this group as being "touched" (for ngModel). Meant to be called by the contained
     * radio buttons upon their blur.
     */
    MatRadioGroup.prototype._touch = function () {
        if (this.onTouched) {
            this.onTouched();
        }
    };
    MatRadioGroup.prototype._updateRadioButtonNames = function () {
        var _this = this;
        if (this._radios) {
            this._radios.forEach(function (radio) {
                radio.name = _this.name;
                radio._markForCheck();
            });
        }
    };
    /** Updates the `selected` radio button from the internal _value state. */
    MatRadioGroup.prototype._updateSelectedRadioFromValue = function () {
        var _this = this;
        // If the value already matches the selected radio, do nothing.
        var isAlreadySelected = this._selected !== null && this._selected.value === this._value;
        if (this._radios && !isAlreadySelected) {
            this._selected = null;
            this._radios.forEach(function (radio) {
                radio.checked = _this.value === radio.value;
                if (radio.checked) {
                    _this._selected = radio;
                }
            });
        }
    };
    /** Dispatch change event with current selection and group value. */
    MatRadioGroup.prototype._emitChangeEvent = function () {
        if (this._isInitialized) {
            this.change.emit(new MatRadioChange(this._selected, this._value));
        }
    };
    MatRadioGroup.prototype._markRadiosForCheck = function () {
        if (this._radios) {
            this._radios.forEach(function (radio) { return radio._markForCheck(); });
        }
    };
    /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     * @param value
     */
    MatRadioGroup.prototype.writeValue = function (value) {
        this.value = value;
        this._changeDetector.markForCheck();
    };
    /**
     * Registers a callback to be triggered when the model value changes.
     * Implemented as part of ControlValueAccessor.
     * @param fn Callback to be registered.
     */
    MatRadioGroup.prototype.registerOnChange = function (fn) {
        this._controlValueAccessorChangeFn = fn;
    };
    /**
     * Registers a callback to be triggered when the control is touched.
     * Implemented as part of ControlValueAccessor.
     * @param fn Callback to be registered.
     */
    MatRadioGroup.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    /**
     * Sets the disabled state of the control. Implemented as a part of ControlValueAccessor.
     * @param isDisabled Whether the control should be disabled.
     */
    MatRadioGroup.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
        this._changeDetector.markForCheck();
    };
    MatRadioGroup.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{
                    selector: 'mat-radio-group',
                    exportAs: 'matRadioGroup',
                    providers: [MAT_RADIO_GROUP_CONTROL_VALUE_ACCESSOR],
                    host: {
                        'role': 'radiogroup',
                        'class': 'mat-radio-group',
                    },
                },] }
    ];
    /** @nocollapse */
    MatRadioGroup.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"] }
    ]; };
    MatRadioGroup.propDecorators = {
        change: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        _radios: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ContentChildren"], args: [Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function () { return MatRadioButton; }), { descendants: true },] }],
        color: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        name: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        labelPosition: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        value: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        selected: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        disabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        required: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }]
    };
    return MatRadioGroup;
}());
// Boilerplate for applying mixins to MatRadioButton.
/** @docs-private */
var MatRadioButtonBase = /** @class */ (function () {
    function MatRadioButtonBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return MatRadioButtonBase;
}());
// As per Material design specifications the selection control radio should use the accent color
// palette by default. https://material.io/guidelines/components/selection-controls.html
var _MatRadioButtonMixinBase = Object(_angular_material_core__WEBPACK_IMPORTED_MODULE_1__["mixinDisableRipple"])(Object(_angular_material_core__WEBPACK_IMPORTED_MODULE_1__["mixinTabIndex"])(MatRadioButtonBase));
/**
 * A Material design radio-button. Typically placed inside of `<mat-radio-group>` elements.
 */
var MatRadioButton = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__extends"])(MatRadioButton, _super);
    function MatRadioButton(radioGroup, elementRef, _changeDetector, _focusMonitor, _radioDispatcher, _animationMode, _providerOverride) {
        var _this = _super.call(this, elementRef) || this;
        _this._changeDetector = _changeDetector;
        _this._focusMonitor = _focusMonitor;
        _this._radioDispatcher = _radioDispatcher;
        _this._animationMode = _animationMode;
        _this._providerOverride = _providerOverride;
        _this._uniqueId = "mat-radio-" + ++nextUniqueId;
        /** The unique ID for the radio button. */
        _this.id = _this._uniqueId;
        /**
         * Event emitted when the checked state of this radio button changes.
         * Change events are only emitted when the value changes due to user interaction with
         * the radio button (the same behavior as `<input type-"radio">`).
         */
        _this.change = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        /** Whether this radio is checked. */
        _this._checked = false;
        /** Value assigned to this radio. */
        _this._value = null;
        /** Unregister function for _radioDispatcher */
        _this._removeUniqueSelectionListener = function () { };
        // Assertions. Ideally these should be stripped out by the compiler.
        // TODO(jelbourn): Assert that there's no name binding AND a parent radio group.
        _this.radioGroup = radioGroup;
        _this._removeUniqueSelectionListener =
            _radioDispatcher.listen(function (id, name) {
                if (id !== _this.id && name === _this.name) {
                    _this.checked = false;
                }
            });
        return _this;
    }
    Object.defineProperty(MatRadioButton.prototype, "checked", {
        /** Whether this radio button is checked. */
        get: function () { return this._checked; },
        set: function (value) {
            var newCheckedState = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_4__["coerceBooleanProperty"])(value);
            if (this._checked !== newCheckedState) {
                this._checked = newCheckedState;
                if (newCheckedState && this.radioGroup && this.radioGroup.value !== this.value) {
                    this.radioGroup.selected = this;
                }
                else if (!newCheckedState && this.radioGroup && this.radioGroup.value === this.value) {
                    // When unchecking the selected radio button, update the selected radio
                    // property on the group.
                    this.radioGroup.selected = null;
                }
                if (newCheckedState) {
                    // Notify all radio buttons with the same name to un-check.
                    this._radioDispatcher.notify(this.id, this.name);
                }
                this._changeDetector.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatRadioButton.prototype, "value", {
        /** The value of this radio button. */
        get: function () { return this._value; },
        set: function (value) {
            if (this._value !== value) {
                this._value = value;
                if (this.radioGroup !== null) {
                    if (!this.checked) {
                        // Update checked when the value changed to match the radio group's value
                        this.checked = this.radioGroup.value === value;
                    }
                    if (this.checked) {
                        this.radioGroup.selected = this;
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatRadioButton.prototype, "labelPosition", {
        /** Whether the label should appear after or before the radio button. Defaults to 'after' */
        get: function () {
            return this._labelPosition || (this.radioGroup && this.radioGroup.labelPosition) || 'after';
        },
        set: function (value) {
            this._labelPosition = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatRadioButton.prototype, "disabled", {
        /** Whether the radio button is disabled. */
        get: function () {
            return this._disabled || (this.radioGroup !== null && this.radioGroup.disabled);
        },
        set: function (value) {
            this._setDisabled(Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_4__["coerceBooleanProperty"])(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatRadioButton.prototype, "required", {
        /** Whether the radio button is required. */
        get: function () {
            return this._required || (this.radioGroup && this.radioGroup.required);
        },
        set: function (value) {
            this._required = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_4__["coerceBooleanProperty"])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatRadioButton.prototype, "color", {
        /** Theme color of the radio button. */
        get: function () {
            return this._color ||
                (this.radioGroup && this.radioGroup.color) ||
                this._providerOverride && this._providerOverride.color || 'accent';
        },
        set: function (newValue) { this._color = newValue; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatRadioButton.prototype, "inputId", {
        /** ID of the native input element inside `<mat-radio-button>` */
        get: function () { return (this.id || this._uniqueId) + "-input"; },
        enumerable: true,
        configurable: true
    });
    /** Focuses the radio button. */
    MatRadioButton.prototype.focus = function (options) {
        this._focusMonitor.focusVia(this._inputElement, 'keyboard', options);
    };
    /**
     * Marks the radio button as needing checking for change detection.
     * This method is exposed because the parent radio group will directly
     * update bound properties of the radio button.
     */
    MatRadioButton.prototype._markForCheck = function () {
        // When group value changes, the button will not be notified. Use `markForCheck` to explicit
        // update radio button's status
        this._changeDetector.markForCheck();
    };
    MatRadioButton.prototype.ngOnInit = function () {
        if (this.radioGroup) {
            // If the radio is inside a radio group, determine if it should be checked
            this.checked = this.radioGroup.value === this._value;
            // Copy name from parent radio group
            this.name = this.radioGroup.name;
        }
    };
    MatRadioButton.prototype.ngAfterViewInit = function () {
        var _this = this;
        this._focusMonitor
            .monitor(this._elementRef, true)
            .subscribe(function (focusOrigin) {
            if (!focusOrigin && _this.radioGroup) {
                _this.radioGroup._touch();
            }
        });
    };
    MatRadioButton.prototype.ngOnDestroy = function () {
        this._focusMonitor.stopMonitoring(this._elementRef);
        this._removeUniqueSelectionListener();
    };
    /** Dispatch change event with current value. */
    MatRadioButton.prototype._emitChangeEvent = function () {
        this.change.emit(new MatRadioChange(this, this._value));
    };
    MatRadioButton.prototype._isRippleDisabled = function () {
        return this.disableRipple || this.disabled;
    };
    MatRadioButton.prototype._onInputClick = function (event) {
        // We have to stop propagation for click events on the visual hidden input element.
        // By default, when a user clicks on a label element, a generated click event will be
        // dispatched on the associated input element. Since we are using a label element as our
        // root container, the click event on the `radio-button` will be executed twice.
        // The real click event will bubble up, and the generated click event also tries to bubble up.
        // This will lead to multiple click events.
        // Preventing bubbling for the second event will solve that issue.
        event.stopPropagation();
    };
    /**
     * Triggered when the radio button received a click or the input recognized any change.
     * Clicking on a label element, will trigger a change event on the associated input.
     */
    MatRadioButton.prototype._onInputChange = function (event) {
        // We always have to stop propagation on the change event.
        // Otherwise the change event, from the input element, will bubble up and
        // emit its event object to the `change` output.
        event.stopPropagation();
        var groupValueChanged = this.radioGroup && this.value !== this.radioGroup.value;
        this.checked = true;
        this._emitChangeEvent();
        if (this.radioGroup) {
            this.radioGroup._controlValueAccessorChangeFn(this.value);
            if (groupValueChanged) {
                this.radioGroup._emitChangeEvent();
            }
        }
    };
    /** Sets the disabled state and marks for check if a change occurred. */
    MatRadioButton.prototype._setDisabled = function (value) {
        if (this._disabled !== value) {
            this._disabled = value;
            this._changeDetector.markForCheck();
        }
    };
    MatRadioButton.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'mat-radio-button',
                    template: "<!-- TODO(jelbourn): render the radio on either side of the content -->\n<!-- TODO(mtlin): Evaluate trade-offs of using native radio vs. cost of additional bindings. -->\n<label [attr.for]=\"inputId\" class=\"mat-radio-label\" #label>\n  <!-- The actual 'radio' part of the control. -->\n  <div class=\"mat-radio-container\">\n    <div class=\"mat-radio-outer-circle\"></div>\n    <div class=\"mat-radio-inner-circle\"></div>\n    <input #input class=\"mat-radio-input cdk-visually-hidden\" type=\"radio\"\n        [id]=\"inputId\"\n        [checked]=\"checked\"\n        [disabled]=\"disabled\"\n        [tabIndex]=\"tabIndex\"\n        [attr.name]=\"name\"\n        [attr.value]=\"value\"\n        [required]=\"required\"\n        [attr.aria-label]=\"ariaLabel\"\n        [attr.aria-labelledby]=\"ariaLabelledby\"\n        [attr.aria-describedby]=\"ariaDescribedby\"\n        (change)=\"_onInputChange($event)\"\n        (click)=\"_onInputClick($event)\">\n\n    <!-- The ripple comes after the input so that we can target it with a CSS\n         sibling selector when the input is focused. -->\n    <div mat-ripple class=\"mat-radio-ripple mat-focus-indicator\"\n         [matRippleTrigger]=\"label\"\n         [matRippleDisabled]=\"_isRippleDisabled()\"\n         [matRippleCentered]=\"true\"\n         [matRippleRadius]=\"20\"\n         [matRippleAnimation]=\"{enterDuration: 150}\">\n\n      <div class=\"mat-ripple-element mat-radio-persistent-ripple\"></div>\n    </div>\n  </div>\n\n  <!-- The label content for radio control. -->\n  <div class=\"mat-radio-label-content\" [class.mat-radio-label-before]=\"labelPosition == 'before'\">\n    <!-- Add an invisible span so JAWS can read the label -->\n    <span style=\"display:none\">&nbsp;</span>\n    <ng-content></ng-content>\n  </div>\n</label>\n",
                    inputs: ['disableRipple', 'tabIndex'],
                    encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
                    exportAs: 'matRadioButton',
                    host: {
                        'class': 'mat-radio-button',
                        '[class.mat-radio-checked]': 'checked',
                        '[class.mat-radio-disabled]': 'disabled',
                        '[class._mat-animation-noopable]': '_animationMode === "NoopAnimations"',
                        '[class.mat-primary]': 'color === "primary"',
                        '[class.mat-accent]': 'color === "accent"',
                        '[class.mat-warn]': 'color === "warn"',
                        // Needs to be -1 so the `focus` event still fires.
                        '[attr.tabindex]': '-1',
                        '[attr.id]': 'id',
                        '[attr.aria-label]': 'null',
                        '[attr.aria-labelledby]': 'null',
                        '[attr.aria-describedby]': 'null',
                        // Note: under normal conditions focus shouldn't land on this element, however it may be
                        // programmatically set, for example inside of a focus trap, in this case we want to forward
                        // the focus to the native element.
                        '(focus)': '_inputElement.nativeElement.focus()',
                    },
                    changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush,
                    styles: [".mat-radio-button{display:inline-block;-webkit-tap-highlight-color:transparent;outline:0}.mat-radio-label{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;display:inline-flex;align-items:center;white-space:nowrap;vertical-align:middle;width:100%}.mat-radio-container{box-sizing:border-box;display:inline-block;position:relative;width:20px;height:20px;flex-shrink:0}.mat-radio-outer-circle{box-sizing:border-box;height:20px;left:0;position:absolute;top:0;transition:border-color ease 280ms;width:20px;border-width:2px;border-style:solid;border-radius:50%}._mat-animation-noopable .mat-radio-outer-circle{transition:none}.mat-radio-inner-circle{border-radius:50%;box-sizing:border-box;height:20px;left:0;position:absolute;top:0;transition:transform ease 280ms,background-color ease 280ms;width:20px;transform:scale(0.001)}._mat-animation-noopable .mat-radio-inner-circle{transition:none}.mat-radio-checked .mat-radio-inner-circle{transform:scale(0.5)}.cdk-high-contrast-active .mat-radio-checked .mat-radio-inner-circle{border:solid 10px}.mat-radio-label-content{-webkit-user-select:auto;-moz-user-select:auto;-ms-user-select:auto;user-select:auto;display:inline-block;order:0;line-height:inherit;padding-left:8px;padding-right:0}[dir=rtl] .mat-radio-label-content{padding-right:8px;padding-left:0}.mat-radio-label-content.mat-radio-label-before{order:-1;padding-left:0;padding-right:8px}[dir=rtl] .mat-radio-label-content.mat-radio-label-before{padding-right:0;padding-left:8px}.mat-radio-disabled,.mat-radio-disabled .mat-radio-label{cursor:default}.mat-radio-button .mat-radio-ripple{position:absolute;left:calc(50% - 20px);top:calc(50% - 20px);height:40px;width:40px;z-index:1;pointer-events:none}.mat-radio-button .mat-radio-ripple .mat-ripple-element:not(.mat-radio-persistent-ripple){opacity:.16}.mat-radio-persistent-ripple{width:100%;height:100%;transform:none}.mat-radio-container:hover .mat-radio-persistent-ripple{opacity:.04}.mat-radio-button:not(.mat-radio-disabled).cdk-keyboard-focused .mat-radio-persistent-ripple,.mat-radio-button:not(.mat-radio-disabled).cdk-program-focused .mat-radio-persistent-ripple{opacity:.12}.mat-radio-persistent-ripple,.mat-radio-disabled .mat-radio-container:hover .mat-radio-persistent-ripple{opacity:0}@media(hover: none){.mat-radio-container:hover .mat-radio-persistent-ripple{display:none}}.mat-radio-input{bottom:0;left:50%}.cdk-high-contrast-active .mat-radio-disabled{opacity:.5}\n"]
                }] }
    ];
    /** @nocollapse */
    MatRadioButton.ctorParameters = function () { return [
        { type: MatRadioGroup, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"] }] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"] },
        { type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_3__["FocusMonitor"] },
        { type: _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_5__["UniqueSelectionDispatcher"] },
        { type: String, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: [_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__["ANIMATION_MODULE_TYPE"],] }] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: [MAT_RADIO_DEFAULT_OPTIONS,] }] }
    ]; };
    MatRadioButton.propDecorators = {
        id: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        name: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        ariaLabel: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"], args: ['aria-label',] }],
        ariaLabelledby: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"], args: ['aria-labelledby',] }],
        ariaDescribedby: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"], args: ['aria-describedby',] }],
        checked: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        value: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        labelPosition: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        disabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        required: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        color: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        change: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        _inputElement: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: ['input',] }]
    };
    return MatRadioButton;
}(_MatRadioButtonMixinBase));

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var MatRadioModule = /** @class */ (function () {
    function MatRadioModule() {
    }
    MatRadioModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    imports: [_angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MatRippleModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MatCommonModule"]],
                    exports: [MatRadioGroup, MatRadioButton, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MatCommonModule"]],
                    declarations: [MatRadioGroup, MatRadioButton],
                },] }
    ];
    return MatRadioModule;
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


//# sourceMappingURL=radio.js.map


/***/ }),

/***/ "./src/app/core/directives/emit-event-on-keyup.directive.ts":
/*!******************************************************************!*\
  !*** ./src/app/core/directives/emit-event-on-keyup.directive.ts ***!
  \******************************************************************/
/*! exports provided: EmitEventOnKeyupDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmitEventOnKeyupDirective", function() { return EmitEventOnKeyupDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_internal_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/internal/operators */ "./node_modules/rxjs/internal/operators/index.js");
/* harmony import */ var rxjs_internal_operators__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(rxjs_internal_operators__WEBPACK_IMPORTED_MODULE_2__);



var EmitEventOnKeyupDirective = /** @class */ (function () {
    function EmitEventOnKeyupDirective() {
        this.keyUpEventEmitter = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.clicks = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    }
    EmitEventOnKeyupDirective.prototype.ngOnInit = function () {
        var _this = this;
        // delay trigggering click events and don't trigger it if nothing changed
        this.clicks.pipe(Object(rxjs_internal_operators__WEBPACK_IMPORTED_MODULE_2__["debounceTime"])(1000), Object(rxjs_internal_operators__WEBPACK_IMPORTED_MODULE_2__["distinctUntilChanged"])()).subscribe(function (e) {
            _this.keyUpEventEmitter.emit(e);
        });
    };
    EmitEventOnKeyupDirective.prototype.keyEvent = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.clicks.next(event);
    };
    EmitEventOnKeyupDirective.prototype.ngOnDestroy = function () {
        this.clicks.unsubscribe();
    };
    return EmitEventOnKeyupDirective;
}());



/***/ }),

/***/ "./src/app/core/service/validation.service.ts":
/*!****************************************************!*\
  !*** ./src/app/core/service/validation.service.ts ***!
  \****************************************************/
/*! exports provided: ValidationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValidationService", function() { return ValidationService; });
/* harmony import */ var _util_uri_converter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/uri-converter */ "./src/app/core/util/uri-converter.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var ValidationService = /** @class */ (function () {
    function ValidationService() {
    }
    ValidationService.getMessageForError = function (section, keyError, errorValue) {
        if (keyError === 'required') {
            return section + ': This value is required';
        }
        if (keyError === 'xsdImage') {
            return section + ': Please follow this patterns: ![](http://) and enter a valid url in the round brackets';
        }
        if (keyError === 'xsdInteger') {
            return section + ': Please enter an integer.';
        }
        if (keyError === 'xsdAnyURI') {
            return section + ': Please enter a valid URL/URL.';
        }
        if (keyError === 'minlength') {
            return section + ': Please enter only ' + errorValue['requiredLength'] + ' entries';
        }
        if (keyError === 'maxlength') {
            return section + ': Please enter max. ' + errorValue['requiredLength'] + ' entries';
        }
    };
    // checks if value is an array of strings matching the markdown image patterns (e.g. [![test](http://placekitten.com/200/300), ![](http://any.valid.url.com)]
    ValidationService.xsdImage = function () {
        var _this = this;
        return function (control) {
            if (control.value !== undefined) {
                if (!_this.allValuesMatchRegex(control.value, /!\[.*\]\(http(s)?:\/\/([a-zA-Z.0-9]+[\/]*)+\)/g)) {
                    return { 'xsdImage': true };
                }
            }
            return null;
        };
    };
    // checks if value is an array of strings matching the markdown image patterns (e.g. [![test](http://placekitten.com/200/300), ![](http://any.valid.url.com)]
    ValidationService.xsdInteger = function () {
        return function (control) {
            if (control.value !== undefined) {
                var arrayOfImageValues = control.value;
                if (!(arrayOfImageValues instanceof Array)) {
                    arrayOfImageValues = [arrayOfImageValues];
                }
                for (var _i = 0, arrayOfImageValues_1 = arrayOfImageValues; _i < arrayOfImageValues_1.length; _i++) {
                    var item = arrayOfImageValues_1[_i];
                    if (isNaN(+item)) {
                        return { 'xsdInteger': true };
                    }
                }
            }
            return null;
        };
    };
    // checks if value is an array of strings matching the markdown url patterns (e.g. [[test](http://placekitten.com/200/300), [](http://any.valid.url.com)]
    ValidationService.xsdAnyURI = function () {
        var _this = this;
        return function (control) {
            if (control.value !== undefined) {
                if (!_this.allValuesMatchRegex(control.value, /\[.*\]\(http:\/\/([a-zA-Z.0-9]+[\/]*)+\)/g)) {
                    return { 'xsdAnyURI': true };
                }
            }
            return null;
        };
    };
    ValidationService.startsWithValidPrefix = function (allowedPrefixes) {
        return function (control) {
            if (control.value !== undefined) {
                if (control.value.indexOf(':') === -1) {
                    return { 'startsWithValidPrefix': true };
                }
                var prefix_1 = control.value.trim().substring(0, control.value.indexOf(':'));
                if (allowedPrefixes.findIndex(function (it) { return it === prefix_1; }) === -1) {
                    return { 'startsWithValidPrefix': true };
                }
            }
            return null;
        };
    };
    ValidationService.allValuesMatchRegex = function (array, regex) {
        var arrayOfImageValues = array;
        if (!(arrayOfImageValues instanceof Array)) {
            arrayOfImageValues = [arrayOfImageValues];
        }
        for (var _i = 0, arrayOfImageValues_2 = arrayOfImageValues; _i < arrayOfImageValues_2.length; _i++) {
            var stringItem = arrayOfImageValues_2[_i];
            var item = stringItem.startsWith('* ') ? stringItem.substr(2) : stringItem;
            if (!item || _util_uri_converter__WEBPACK_IMPORTED_MODULE_0__["UriConverter"].removeWhitespace(item).length === 0) {
                continue;
            }
            if (!item.match(regex)) {
                continue;
            }
            var match = item.match(regex);
            if (match.length < item.trim().length) {
                return false;
            }
        }
        return true;
    };
    ValidationService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ factory: function ValidationService_Factory() { return new ValidationService(); }, token: ValidationService, providedIn: "root" });
    return ValidationService;
}());



/***/ }),

/***/ "./src/app/graph/graph.module.ts":
/*!***************************************!*\
  !*** ./src/app/graph/graph.module.ts ***!
  \***************************************/
/*! exports provided: GraphModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphModule", function() { return GraphModule; });
var GraphModule = /** @class */ (function () {
    function GraphModule() {
    }
    return GraphModule;
}());



/***/ }),

/***/ "./src/app/pattern-language-management/create-pattern/create-pattern.component.ngfactory.js":
/*!**************************************************************************************************!*\
  !*** ./src/app/pattern-language-management/create-pattern/create-pattern.component.ngfactory.js ***!
  \**************************************************************************************************/
/*! exports provided: RenderType_CreatePatternComponent, View_CreatePatternComponent_0, View_CreatePatternComponent_Host_0, CreatePatternComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_CreatePatternComponent", function() { return RenderType_CreatePatternComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_CreatePatternComponent_0", function() { return View_CreatePatternComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_CreatePatternComponent_Host_0", function() { return View_CreatePatternComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreatePatternComponentNgFactory", function() { return CreatePatternComponentNgFactory; });
/* harmony import */ var _create_pattern_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create-pattern.component.scss.shim.ngstyle */ "./src/app/pattern-language-management/create-pattern/create-pattern.component.scss.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/flex-layout/flex */ "./node_modules/@angular/flex-layout/esm5/flex.es5.js");
/* harmony import */ var _angular_flex_layout_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/flex-layout/core */ "./node_modules/@angular/flex-layout/esm5/core.es5.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/fesm5/card.js");
/* harmony import */ var _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/flex-layout/extended */ "./node_modules/@angular/flex-layout/esm5/extended.es5.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/fesm5/form-field.js");
/* harmony import */ var _core_component_navigate_back_navigate_back_component_ngfactory__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../core/component/navigate-back/navigate-back.component.ngfactory */ "./src/app/core/component/navigate-back/navigate-back.component.ngfactory.js");
/* harmony import */ var _core_component_navigate_back_navigate_back_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../core/component/navigate-back/navigate-back.component */ "./src/app/core/component/navigate-back/navigate-back.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/fesm5/dialog.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _node_modules_angular_material_card_index_ngfactory__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../node_modules/@angular/material/card/index.ngfactory */ "./node_modules/@angular/material/card/index.ngfactory.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _node_modules_angular_material_form_field_index_ngfactory__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../node_modules/@angular/material/form-field/index.ngfactory */ "./node_modules/@angular/material/form-field/index.ngfactory.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/fesm5/core.js");
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/cdk/bidi */ "./node_modules/@angular/cdk/fesm5/bidi.js");
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/cdk/platform */ "./node_modules/@angular/cdk/fesm5/platform.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/fesm5/input.js");
/* harmony import */ var _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/cdk/text-field */ "./node_modules/@angular/cdk/fesm5/text-field.js");
/* harmony import */ var _node_modules_covalent_text_editor_covalent_text_editor_ngfactory__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../../node_modules/@covalent/text-editor/covalent-text-editor.ngfactory */ "./node_modules/@covalent/text-editor/covalent-text-editor.ngfactory.js");
/* harmony import */ var _covalent_text_editor__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @covalent/text-editor */ "./node_modules/@covalent/text-editor/fesm5/covalent-text-editor.js");
/* harmony import */ var _core_directives_emit_event_on_keyup_directive__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../core/directives/emit-event-on-keyup.directive */ "./src/app/core/directives/emit-event-on-keyup.directive.ts");
/* harmony import */ var _node_modules_angular_material_button_index_ngfactory__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../../../../node_modules/@angular/material/button/index.ngfactory */ "./node_modules/@angular/material/button/index.ngfactory.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/fesm5/button.js");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/cdk/a11y */ "./node_modules/@angular/cdk/fesm5/a11y.js");
/* harmony import */ var _create_pattern_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./create-pattern.component */ "./src/app/pattern-language-management/create-pattern/create-pattern.component.ts");
/* harmony import */ var angular2_toaster_src_toaster_service__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! angular2-toaster/src/toaster.service */ "./node_modules/angular2-toaster/src/toaster.service.js");
/* harmony import */ var _core_service_pattern_language_service__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ../../core/service/pattern-language.service */ "./src/app/core/service/pattern-language.service.ts");
/* harmony import */ var _core_service_pattern_service__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ../../core/service/pattern.service */ "./src/app/core/service/pattern.service.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes,extraRequire}
 * tslint:disable
 */ 
































var styles_CreatePatternComponent = [_create_pattern_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_CreatePatternComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_CreatePatternComponent, data: {} });

function View_CreatePatternComponent_1(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 10, "div", [["fxLayout", "row"], ["fxLayoutAlign", "space-around center"]], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 671744, null, 0, _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_2__["DefaultLayoutDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_flex_layout_core__WEBPACK_IMPORTED_MODULE_3__["StyleUtils"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_2__["LayoutStyleBuilder"], _angular_flex_layout_core__WEBPACK_IMPORTED_MODULE_3__["MediaMarshaller"]], { fxLayout: [0, "fxLayout"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 671744, null, 0, _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_2__["DefaultLayoutAlignDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_flex_layout_core__WEBPACK_IMPORTED_MODULE_3__["StyleUtils"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_2__["LayoutAlignStyleBuilder"], _angular_flex_layout_core__WEBPACK_IMPORTED_MODULE_3__["MediaMarshaller"]], { fxLayoutAlign: [0, "fxLayoutAlign"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, null, 1, "span", [["class", "label-preview"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Icon-Preview: "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](5, 0, [["iconPreview", 1]], null, 5, "div", [["class", "example-header-image mat-card-avatar"], ["mat-card-avatar", ""]], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](6, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgStyle"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["KeyValueDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]], { ngStyle: [0, "ngStyle"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpod"](7, { "background-image": 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](8, 16384, null, 0, _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardAvatar"], [], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](9, 933888, null, 0, _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_6__["DefaultStyleDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_flex_layout_core__WEBPACK_IMPORTED_MODULE_3__["StyleUtils"], _angular_flex_layout_core__WEBPACK_IMPORTED_MODULE_3__["MediaMarshaller"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__["DomSanitizer"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["KeyValueDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], [6, _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgStyle"]], _angular_flex_layout_core__WEBPACK_IMPORTED_MODULE_3__["SERVER_TOKEN"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["PLATFORM_ID"]], { ngStyle: [0, "ngStyle"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpod"](10, { "background-image": 0 })], function (_ck, _v) { var _co = _v.component; var currVal_0 = "row"; _ck(_v, 1, 0, currVal_0); var currVal_1 = "space-around center"; _ck(_v, 2, 0, currVal_1); var currVal_2 = _ck(_v, 7, 0, (("url(" + ((_co.iconUrl == null) ? null : _co.iconUrl.value)) + ")")); _ck(_v, 6, 0, currVal_2); var currVal_3 = _ck(_v, 10, 0, (("url(" + ((_co.iconUrl == null) ? null : _co.iconUrl.value)) + ")")); _ck(_v, 9, 0, currVal_3); }, null); }
function View_CreatePatternComponent_2(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "mat-error", [["class", "mat-error"], ["role", "alert"]], [[1, "id", 0]], null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 16384, [[7, 4]], 0, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__["MatError"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Please insert a valid URL. "]))], null, function (_ck, _v) { var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).id; _ck(_v, 0, 0, currVal_0); }); }
function View_CreatePatternComponent_4(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 3, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 2, "span", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](2, null, ["", ""])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, null, 0, "br", [], null, null, null, null, null))], null, function (_ck, _v) { var currVal_0 = _v.context.$implicit; _ck(_v, 2, 0, currVal_0); }); }
function View_CreatePatternComponent_3(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 4, "mat-error", [["class", "mat-error"], ["role", "alert"]], [[1, "id", 0]], null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 16384, null, 0, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__["MatError"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Found errors in the following sections: "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_CreatePatternComponent_4)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](4, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"]], { ngForOf: [0, "ngForOf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_1 = _co.errorMessages; _ck(_v, 4, 0, currVal_1); }, function (_ck, _v) { var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).id; _ck(_v, 0, 0, currVal_0); }); }
function View_CreatePatternComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](671088640, 1, { _textEditor: 0 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 1, "pp-navigate-back", [], null, null, null, _core_component_navigate_back_navigate_back_component_ngfactory__WEBPACK_IMPORTED_MODULE_9__["View_NavigateBackComponent_0"], _core_component_navigate_back_navigate_back_component_ngfactory__WEBPACK_IMPORTED_MODULE_9__["RenderType_NavigateBackComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 114688, null, 0, _core_component_navigate_back_navigate_back_component__WEBPACK_IMPORTED_MODULE_10__["NavigateBackComponent"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], _angular_router__WEBPACK_IMPORTED_MODULE_11__["ActivatedRoute"], _angular_router__WEBPACK_IMPORTED_MODULE_11__["Router"]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, null, 1, "h2", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](4, null, [" Add a new pattern to ", "\n"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](5, 0, null, null, 49, "div", [["class", "mat-dialog-content"], ["mat-dialog-content", ""], ["style", "width: 100%"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "submit"], [null, "reset"]], function (_v, en, $event) { var ad = true; if (("submit" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 7).onSubmit($event) !== false);
        ad = (pd_0 && ad);
    } if (("reset" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 7).onReset() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](6, 16384, null, 0, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_12__["MatDialogContent"], [], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](7, 540672, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_13__["FormGroupDirective"], [[8, null], [8, null]], { form: [0, "form"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_13__["ControlContainer"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_13__["FormGroupDirective"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](9, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_13__["NgControlStatusGroup"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_13__["ControlContainer"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](10, 0, null, null, 44, "div", [["fxLayout", "column"]], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](11, 671744, null, 0, _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_2__["DefaultLayoutDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_flex_layout_core__WEBPACK_IMPORTED_MODULE_3__["StyleUtils"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_2__["LayoutStyleBuilder"], _angular_flex_layout_core__WEBPACK_IMPORTED_MODULE_3__["MediaMarshaller"]], { fxLayout: [0, "fxLayout"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](12, 0, null, null, 42, "mat-card", [["class", "mat-card mat-focus-indicator"], ["fxLayout", "column"], ["fxLayoutAlign", "space-around"]], [[2, "_mat-animation-noopable", null]], null, null, _node_modules_angular_material_card_index_ngfactory__WEBPACK_IMPORTED_MODULE_14__["View_MatCard_0"], _node_modules_angular_material_card_index_ngfactory__WEBPACK_IMPORTED_MODULE_14__["RenderType_MatCard"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](13, 49152, null, 0, _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCard"], [[2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_15__["ANIMATION_MODULE_TYPE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](14, 671744, null, 0, _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_2__["DefaultLayoutDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_flex_layout_core__WEBPACK_IMPORTED_MODULE_3__["StyleUtils"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_2__["LayoutStyleBuilder"], _angular_flex_layout_core__WEBPACK_IMPORTED_MODULE_3__["MediaMarshaller"]], { fxLayout: [0, "fxLayout"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](15, 671744, null, 0, _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_2__["DefaultLayoutAlignDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_flex_layout_core__WEBPACK_IMPORTED_MODULE_3__["StyleUtils"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_2__["LayoutAlignStyleBuilder"], _angular_flex_layout_core__WEBPACK_IMPORTED_MODULE_3__["MediaMarshaller"]], { fxLayoutAlign: [0, "fxLayoutAlign"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](16, 0, null, 0, 28, "div", [["fxLayout", "row"]], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](17, 671744, null, 0, _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_2__["DefaultLayoutDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_flex_layout_core__WEBPACK_IMPORTED_MODULE_3__["StyleUtils"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_2__["LayoutStyleBuilder"], _angular_flex_layout_core__WEBPACK_IMPORTED_MODULE_3__["MediaMarshaller"]], { fxLayout: [0, "fxLayout"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](18, 0, null, null, 26, "mat-form-field", [["appearance", "outline"], ["class", "full-width mat-form-field"], ["style", "width: 24em"]], [[2, "mat-form-field-appearance-standard", null], [2, "mat-form-field-appearance-fill", null], [2, "mat-form-field-appearance-outline", null], [2, "mat-form-field-appearance-legacy", null], [2, "mat-form-field-invalid", null], [2, "mat-form-field-can-float", null], [2, "mat-form-field-should-float", null], [2, "mat-form-field-has-label", null], [2, "mat-form-field-hide-placeholder", null], [2, "mat-form-field-disabled", null], [2, "mat-form-field-autofilled", null], [2, "mat-focused", null], [2, "mat-accent", null], [2, "mat-warn", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "_mat-animation-noopable", null]], null, null, _node_modules_angular_material_form_field_index_ngfactory__WEBPACK_IMPORTED_MODULE_16__["View_MatFormField_0"], _node_modules_angular_material_form_field_index_ngfactory__WEBPACK_IMPORTED_MODULE_16__["RenderType_MatFormField"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](6144, null, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__["MAT_FORM_FIELD"], null, [_angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__["MatFormField"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](20, 7520256, null, 9, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__["MatFormField"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], [2, _angular_material_core__WEBPACK_IMPORTED_MODULE_17__["MAT_LABEL_GLOBAL_OPTIONS"]], [2, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_18__["Directionality"]], [2, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__["MAT_FORM_FIELD_DEFAULT_OPTIONS"]], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_19__["Platform"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_15__["ANIMATION_MODULE_TYPE"]]], { appearance: [0, "appearance"], floatLabel: [1, "floatLabel"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 2, { _controlNonStatic: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 3, { _controlStatic: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 4, { _labelChildNonStatic: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 5, { _labelChildStatic: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 6, { _placeholderChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 7, { _errorChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 8, { _hintChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 9, { _prefixChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 10, { _suffixChildren: 1 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](30, 0, null, 3, 2, "mat-label", [], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](31, 16384, [[4, 4], [5, 4]], 0, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__["MatLabel"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Icon URL"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](33, 0, null, 1, 7, "input", [["class", "mat-input-element mat-form-field-autofill-control"], ["formControlName", "iconUrl"], ["matInput", ""], ["placeholder", "Enter URL of Icon"], ["type", "url"]], [[2, "mat-input-server", null], [1, "id", 0], [1, "placeholder", 0], [8, "disabled", 0], [8, "required", 0], [1, "readonly", 0], [1, "aria-describedby", 0], [1, "aria-invalid", 0], [1, "aria-required", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"], [null, "focus"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 34)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 34).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 34)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 34)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("blur" === en)) {
        var pd_4 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 38)._focusChanged(false) !== false);
        ad = (pd_4 && ad);
    } if (("focus" === en)) {
        var pd_5 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 38)._focusChanged(true) !== false);
        ad = (pd_5 && ad);
    } if (("input" === en)) {
        var pd_6 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 38)._onInput() !== false);
        ad = (pd_6 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](34, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_13__["DefaultValueAccessor"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_13__["COMPOSITION_BUFFER_MODE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_13__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [_angular_forms__WEBPACK_IMPORTED_MODULE_13__["DefaultValueAccessor"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](36, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_13__["FormControlName"], [[3, _angular_forms__WEBPACK_IMPORTED_MODULE_13__["ControlContainer"]], [8, null], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_13__["NG_VALUE_ACCESSOR"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_13__["ɵangular_packages_forms_forms_p"]]], { name: [0, "name"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_13__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_13__["FormControlName"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](38, 999424, null, 0, _angular_material_input__WEBPACK_IMPORTED_MODULE_20__["MatInput"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_19__["Platform"], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_13__["NgControl"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_13__["NgForm"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_13__["FormGroupDirective"]], _angular_material_core__WEBPACK_IMPORTED_MODULE_17__["ErrorStateMatcher"], [8, null], _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_21__["AutofillMonitor"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]], { placeholder: [0, "placeholder"], type: [1, "type"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](39, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_13__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_13__["NgControl"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, [[2, 4], [3, 4]], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__["MatFormFieldControl"], null, [_angular_material_input__WEBPACK_IMPORTED_MODULE_20__["MatInput"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, 1, 1, null, View_CreatePatternComponent_1)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](42, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, 5, 1, null, View_CreatePatternComponent_2)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](44, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](45, 0, null, 0, 9, "div", [["class", "parent "]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](46, 0, null, null, 4, "div", [["class", "item editor-preview-container"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](47, 0, null, null, 3, "td-text-editor", [["class", "markdownEditor"], ["id", "textEditor"], ["ppEmitOnChange", ""]], null, [[null, "onKeyup"], [null, "valueChange"], ["window", "keyup"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("window:keyup" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 50).keyEvent($event) !== false);
        ad = (pd_0 && ad);
    } if (("onKeyup" === en)) {
        var pd_1 = (_co.onChangeMarkdownText() !== false);
        ad = (pd_1 && ad);
    } if (("valueChange" === en)) {
        var pd_2 = ((_co.previousTextEditorValue = $event) !== false);
        ad = (pd_2 && ad);
    } return ad; }, _node_modules_covalent_text_editor_covalent_text_editor_ngfactory__WEBPACK_IMPORTED_MODULE_22__["View_TdTextEditorComponent_0"], _node_modules_covalent_text_editor_covalent_text_editor_ngfactory__WEBPACK_IMPORTED_MODULE_22__["RenderType_TdTextEditorComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](5120, null, _angular_forms__WEBPACK_IMPORTED_MODULE_13__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [_covalent_text_editor__WEBPACK_IMPORTED_MODULE_23__["TdTextEditorComponent"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](49, 4243456, [[1, 4], ["textEditor", 4]], 0, _covalent_text_editor__WEBPACK_IMPORTED_MODULE_23__["TdTextEditorComponent"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]], { options: [0, "options"], value: [1, "value"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](50, 212992, null, 0, _core_directives_emit_event_on_keyup_directive__WEBPACK_IMPORTED_MODULE_24__["EmitEventOnKeyupDirective"], [], null, { keyUpEventEmitter: "onKeyup" }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](51, 0, null, null, 3, "div", [["class", "item last"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](52, 0, null, null, 0, "div", [["id", "preview"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_CreatePatternComponent_3)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](54, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](55, 0, null, null, 4, "button", [["class", "save-button mat-focus-indicator"], ["color", "primary"], ["mat-raised-button", ""], ["style", "float: right"]], [[1, "disabled", 0], [2, "_mat-animation-noopable", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.save() !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_material_button_index_ngfactory__WEBPACK_IMPORTED_MODULE_25__["View_MatButton_0"], _node_modules_angular_material_button_index_ngfactory__WEBPACK_IMPORTED_MODULE_25__["RenderType_MatButton"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](56, 180224, null, 0, _angular_material_button__WEBPACK_IMPORTED_MODULE_26__["MatButton"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_27__["FocusMonitor"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_15__["ANIMATION_MODULE_TYPE"]]], { disabled: [0, "disabled"], color: [1, "color"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](57, 0, null, 0, 1, "i", [["class", "material-icons"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["save"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, 0, ["Save\n"]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 2, 0); var currVal_8 = _co.iconForm; _ck(_v, 7, 0, currVal_8); var currVal_9 = "column"; _ck(_v, 11, 0, currVal_9); var currVal_11 = "column"; _ck(_v, 14, 0, currVal_11); var currVal_12 = "space-around"; _ck(_v, 15, 0, currVal_12); var currVal_13 = "row"; _ck(_v, 17, 0, currVal_13); var currVal_36 = "outline"; var currVal_37 = "always"; _ck(_v, 20, 0, currVal_36, currVal_37); var currVal_54 = "iconUrl"; _ck(_v, 36, 0, currVal_54); var currVal_55 = "Enter URL of Icon"; var currVal_56 = "url"; _ck(_v, 38, 0, currVal_55, currVal_56); var currVal_57 = _co.iconPreviewVisible; _ck(_v, 42, 0, currVal_57); var currVal_58 = (_co.wasSaveButtonClicked && ((_co.iconUrl == null) ? null : _co.iconUrl.hasError("pattern"))); _ck(_v, 44, 0, currVal_58); var currVal_59 = _co.options; var currVal_60 = _co.previousTextEditorValue; _ck(_v, 49, 0, currVal_59, currVal_60); _ck(_v, 50, 0); var currVal_61 = (_co.wasSaveButtonClicked && _co.errorMessages); _ck(_v, 54, 0, currVal_61); var currVal_64 = ((_co.iconUrl == null) ? null : _co.iconUrl.hasError("pattern")); var currVal_65 = "primary"; _ck(_v, 56, 0, currVal_64, currVal_65); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = ((_co.patternLanguage == null) ? null : _co.patternLanguage.name); _ck(_v, 4, 0, currVal_0); var currVal_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 9).ngClassUntouched; var currVal_2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 9).ngClassTouched; var currVal_3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 9).ngClassPristine; var currVal_4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 9).ngClassDirty; var currVal_5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 9).ngClassValid; var currVal_6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 9).ngClassInvalid; var currVal_7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 9).ngClassPending; _ck(_v, 5, 0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7); var currVal_10 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 13)._animationMode === "NoopAnimations"); _ck(_v, 12, 0, currVal_10); var currVal_14 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20).appearance == "standard"); var currVal_15 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20).appearance == "fill"); var currVal_16 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20).appearance == "outline"); var currVal_17 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20).appearance == "legacy"); var currVal_18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20)._control.errorState; var currVal_19 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20)._canLabelFloat; var currVal_20 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20)._shouldLabelFloat(); var currVal_21 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20)._hasFloatingLabel(); var currVal_22 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20)._hideControlPlaceholder(); var currVal_23 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20)._control.disabled; var currVal_24 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20)._control.autofilled; var currVal_25 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20)._control.focused; var currVal_26 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20).color == "accent"); var currVal_27 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20).color == "warn"); var currVal_28 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20)._shouldForward("untouched"); var currVal_29 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20)._shouldForward("touched"); var currVal_30 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20)._shouldForward("pristine"); var currVal_31 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20)._shouldForward("dirty"); var currVal_32 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20)._shouldForward("valid"); var currVal_33 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20)._shouldForward("invalid"); var currVal_34 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20)._shouldForward("pending"); var currVal_35 = !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20)._animationsEnabled; _ck(_v, 18, 1, [currVal_14, currVal_15, currVal_16, currVal_17, currVal_18, currVal_19, currVal_20, currVal_21, currVal_22, currVal_23, currVal_24, currVal_25, currVal_26, currVal_27, currVal_28, currVal_29, currVal_30, currVal_31, currVal_32, currVal_33, currVal_34, currVal_35]); var currVal_38 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 38)._isServer; var currVal_39 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 38).id; var currVal_40 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 38).placeholder; var currVal_41 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 38).disabled; var currVal_42 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 38).required; var currVal_43 = ((_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 38).readonly && !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 38)._isNativeSelect) || null); var currVal_44 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 38)._ariaDescribedby || null); var currVal_45 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 38).errorState; var currVal_46 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 38).required.toString(); var currVal_47 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39).ngClassUntouched; var currVal_48 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39).ngClassTouched; var currVal_49 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39).ngClassPristine; var currVal_50 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39).ngClassDirty; var currVal_51 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39).ngClassValid; var currVal_52 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39).ngClassInvalid; var currVal_53 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39).ngClassPending; _ck(_v, 33, 1, [currVal_38, currVal_39, currVal_40, currVal_41, currVal_42, currVal_43, currVal_44, currVal_45, currVal_46, currVal_47, currVal_48, currVal_49, currVal_50, currVal_51, currVal_52, currVal_53]); var currVal_62 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 56).disabled || null); var currVal_63 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 56)._animationMode === "NoopAnimations"); _ck(_v, 55, 0, currVal_62, currVal_63); }); }
function View_CreatePatternComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "pp-create-pattern", [], null, null, null, View_CreatePatternComponent_0, RenderType_CreatePatternComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 114688, null, 0, _create_pattern_component__WEBPACK_IMPORTED_MODULE_28__["CreatePatternComponent"], [_angular_router__WEBPACK_IMPORTED_MODULE_11__["ActivatedRoute"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], angular2_toaster_src_toaster_service__WEBPACK_IMPORTED_MODULE_29__["ToasterService"], _core_service_pattern_language_service__WEBPACK_IMPORTED_MODULE_30__["PatternLanguageService"], _core_service_pattern_service__WEBPACK_IMPORTED_MODULE_31__["PatternService"], _angular_router__WEBPACK_IMPORTED_MODULE_11__["Router"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], _angular_forms__WEBPACK_IMPORTED_MODULE_13__["FormBuilder"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var CreatePatternComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("pp-create-pattern", _create_pattern_component__WEBPACK_IMPORTED_MODULE_28__["CreatePatternComponent"], View_CreatePatternComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/pattern-language-management/create-pattern/create-pattern.component.scss.shim.ngstyle.js":
/*!**********************************************************************************************************!*\
  !*** ./src/app/pattern-language-management/create-pattern/create-pattern.component.scss.shim.ngstyle.js ***!
  \**********************************************************************************************************/
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
var styles = [".parent[_ngcontent-%COMP%] {\n  display: flex;\n  font-family: arial, sans-serif;\n}\n\n.item[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 500px;\n  background: #eeeeee;\n  border: #7f7f7f 1pt solid;\n}\n\n.last[_ngcontent-%COMP%] {\n  background-color: white;\n}\n\nicon-form[_ngcontent-%COMP%] {\n  min-width: 350px;\n  max-width: 500px;\n  width: 100%;\n}\n\n.label-preview[_ngcontent-%COMP%] {\n  color: grey;\n}\n\n.icon-full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.iconPreviewer[_ngcontent-%COMP%] {\n  height: 100%;\n  width: 100%;\n}\n\n.example-header-image[_ngcontent-%COMP%] {\n  background-image: url(\"https://material.angular.io/assets/img/examples/shiba1.jpg\");\n  background-size: cover;\n}\n\n.icon-wrapper[_ngcontent-%COMP%] {\n  margin-top: -1.34375em !important;\n}\n\n@media screen and (max-width: 600px) {\n  .parent[_ngcontent-%COMP%] {\n    flex-direction: column-reverse;\n  }\n\n  .item[_ngcontent-%COMP%] {\n    flex: 1;\n    min-height: 200px;\n    background: #eeeeee;\n  }\n\n  .last[_ngcontent-%COMP%] {\n    background-color: white;\n  }\n}\n\n#preview[_ngcontent-%COMP%] {\n  padding: 1em;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RyYXZpcy9idWlsZC9QYXR0ZXJuUGVkaWEvcGF0dGVybi1wZWRpYS12aWV3cy11aS9zcmMvYXBwL3BhdHRlcm4tbGFuZ3VhZ2UtbWFuYWdlbWVudC9jcmVhdGUtcGF0dGVybi9jcmVhdGUtcGF0dGVybi5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvcGF0dGVybi1sYW5ndWFnZS1tYW5hZ2VtZW50L2NyZWF0ZS1wYXR0ZXJuL2NyZWF0ZS1wYXR0ZXJuLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0FDQUY7O0FER0E7RUFDRSxPQUFBO0VBRUEsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLHlCQUFBO0FDREY7O0FES0E7RUFDRSx1QkFBQTtBQ0ZGOztBREtBO0VBQ0UsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLFdBQUE7QUNGRjs7QURLQTtFQUNFLFdBQUE7QUNGRjs7QURLQTtFQUNFLFdBQUE7QUNGRjs7QURLQTtFQUNFLFlBQUE7RUFDQSxXQUFBO0FDRkY7O0FES0E7RUFDRSxtRkFBQTtFQUNBLHNCQUFBO0FDRkY7O0FET0E7RUFDRSxpQ0FBQTtBQ0pGOztBRE9BO0VBRUU7SUFDRSw4QkFBQTtFQ0xGOztFRFFBO0lBQ0UsT0FBQTtJQUNBLGlCQUFBO0lBQ0EsbUJBQUE7RUNMRjs7RURTQTtJQUNFLHVCQUFBO0VDTkY7QUFDRjs7QURVQTtFQUNFLFlBQUE7QUNSRiIsImZpbGUiOiJzcmMvYXBwL3BhdHRlcm4tbGFuZ3VhZ2UtbWFuYWdlbWVudC9jcmVhdGUtcGF0dGVybi9jcmVhdGUtcGF0dGVybi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLnBhcmVudCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZvbnQtZmFtaWx5OiBhcmlhbCwgc2Fucy1zZXJpZjtcbn1cblxuLml0ZW0ge1xuICBmbGV4OiAxO1xuXG4gIG1pbi1oZWlnaHQ6IDUwMHB4O1xuICBiYWNrZ3JvdW5kOiAjZWVlZWVlO1xuICBib3JkZXI6ICM3ZjdmN2YgMXB0IHNvbGlkO1xuXG59XG5cbi5sYXN0IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG59XG5cbmljb24tZm9ybSB7XG4gIG1pbi13aWR0aDogMzUwcHg7XG4gIG1heC13aWR0aDogNTAwcHg7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4ubGFiZWwtcHJldmlldyB7XG4gIGNvbG9yOiBncmV5O1xufVxuXG4uaWNvbi1mdWxsLXdpZHRoIHtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5pY29uUHJldmlld2VyIHtcbiAgaGVpZ2h0OiAxMDAlO1xuICB3aWR0aDogMTAwJTtcbn1cblxuLmV4YW1wbGUtaGVhZGVyLWltYWdlIHtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCdodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vYXNzZXRzL2ltZy9leGFtcGxlcy9zaGliYTEuanBnJyk7XG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG5cbn1cblxuXG4uaWNvbi13cmFwcGVyIHtcbiAgbWFyZ2luLXRvcDogLTEuMzQzNzVlbSAhaW1wb3J0YW50O1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA2MDBweCkge1xuXG4gIC5wYXJlbnQge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW4tcmV2ZXJzZTtcbiAgfVxuXG4gIC5pdGVtIHtcbiAgICBmbGV4OiAxO1xuICAgIG1pbi1oZWlnaHQ6IDIwMHB4O1xuICAgIGJhY2tncm91bmQ6ICNlZWVlZWU7XG5cbiAgfVxuXG4gIC5sYXN0IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgfVxuXG59XG5cbiNwcmV2aWV3IHtcbiAgcGFkZGluZzogMWVtO1xufVxuIiwiLnBhcmVudCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZvbnQtZmFtaWx5OiBhcmlhbCwgc2Fucy1zZXJpZjtcbn1cblxuLml0ZW0ge1xuICBmbGV4OiAxO1xuICBtaW4taGVpZ2h0OiA1MDBweDtcbiAgYmFja2dyb3VuZDogI2VlZWVlZTtcbiAgYm9yZGVyOiAjN2Y3ZjdmIDFwdCBzb2xpZDtcbn1cblxuLmxhc3Qge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbn1cblxuaWNvbi1mb3JtIHtcbiAgbWluLXdpZHRoOiAzNTBweDtcbiAgbWF4LXdpZHRoOiA1MDBweDtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5sYWJlbC1wcmV2aWV3IHtcbiAgY29sb3I6IGdyZXk7XG59XG5cbi5pY29uLWZ1bGwtd2lkdGgge1xuICB3aWR0aDogMTAwJTtcbn1cblxuLmljb25QcmV2aWV3ZXIge1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4uZXhhbXBsZS1oZWFkZXItaW1hZ2Uge1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCJodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vYXNzZXRzL2ltZy9leGFtcGxlcy9zaGliYTEuanBnXCIpO1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xufVxuXG4uaWNvbi13cmFwcGVyIHtcbiAgbWFyZ2luLXRvcDogLTEuMzQzNzVlbSAhaW1wb3J0YW50O1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA2MDBweCkge1xuICAucGFyZW50IHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uLXJldmVyc2U7XG4gIH1cblxuICAuaXRlbSB7XG4gICAgZmxleDogMTtcbiAgICBtaW4taGVpZ2h0OiAyMDBweDtcbiAgICBiYWNrZ3JvdW5kOiAjZWVlZWVlO1xuICB9XG5cbiAgLmxhc3Qge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICB9XG59XG4jcHJldmlldyB7XG4gIHBhZGRpbmc6IDFlbTtcbn0iXX0= */"];



/***/ }),

/***/ "./src/app/pattern-language-management/create-pattern/create-pattern.component.ts":
/*!****************************************************************************************!*\
  !*** ./src/app/pattern-language-management/create-pattern/create-pattern.component.ts ***!
  \****************************************************************************************/
/*! exports provided: CreatePatternComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreatePatternComponent", function() { return CreatePatternComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _covalent_text_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @covalent/text-editor */ "./node_modules/@covalent/text-editor/fesm5/covalent-text-editor.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var marked__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! marked */ "./node_modules/marked/lib/marked.js");
/* harmony import */ var marked__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(marked__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var angular2_toaster__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angular2-toaster */ "./node_modules/angular2-toaster/angular2-toaster.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _core_service_validation_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/service/validation.service */ "./src/app/core/service/validation.service.ts");
/* harmony import */ var _core_service_pattern_language_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../core/service/pattern-language.service */ "./src/app/core/service/pattern-language.service.ts");
/* harmony import */ var markdown_it__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! markdown-it */ "./node_modules/markdown-it/index.js");
/* harmony import */ var markdown_it__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(markdown_it__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var markdown_it_katex__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! markdown-it-katex */ "./node_modules/markdown-it-katex/index.js");
/* harmony import */ var markdown_it_katex__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(markdown_it_katex__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _core_service_pattern_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../core/service/pattern.service */ "./src/app/core/service/pattern.service.ts");
/* harmony import */ var rxjs_internal_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/internal/operators */ "./node_modules/rxjs/internal/operators/index.js");
/* harmony import */ var rxjs_internal_operators__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(rxjs_internal_operators__WEBPACK_IMPORTED_MODULE_11__);












var CreatePatternComponent = /** @class */ (function () {
    function CreatePatternComponent(activatedRoute, cdr, toastService, patternLanguageService, patternService, router, zone, _fb) {
        this.activatedRoute = activatedRoute;
        this.cdr = cdr;
        this.toastService = toastService;
        this.patternLanguageService = patternLanguageService;
        this.patternService = patternService;
        this.router = router;
        this.zone = zone;
        this._fb = _fb;
        this.iconPreviewVisible = false;
        this.wasSaveButtonClicked = false;
        this.previousTextEditorValue = "# Pattern name";
        this.options = {
        // todo: hide the preview button because it forces fullscreen mode (and destroys our page layout)
        };
    }
    Object.defineProperty(CreatePatternComponent.prototype, "iconUrl", {
        get: function () {
            return this.iconForm.get('iconUrl');
        },
        enumerable: true,
        configurable: true
    });
    CreatePatternComponent.isListItem = function (i, sectionIndex, lines) {
        for (var index = sectionIndex + 1; index < i; index++) {
            if (lines[index].type === 'list_item_start') {
                return true;
            }
        }
        return false;
    };
    // noinspection TsLint
    CreatePatternComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.patternLanguageId = this.activatedRoute.snapshot.paramMap.get('patternLanguageId');
        this.markdown = new markdown_it__WEBPACK_IMPORTED_MODULE_8__();
        this.markdown.use(markdown_it_katex__WEBPACK_IMPORTED_MODULE_9__);
        this.patternLanguageService.getPatternLanguageByID(this.patternLanguageId).subscribe(function (pl) {
            _this.patternLanguage = pl;
            _this.sections = _this.patternLanguage.patternSchema ?
                _this.patternLanguage.patternSchema.patternSectionSchemas.map(function (schema) { return schema.label; }) : [];
            _this.initTextEditor();
            _this.initFormGroup();
        });
        var urlRegex = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/i;
        this.iconForm = this._fb.group({
            iconUrl: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].pattern(urlRegex)]]
        });
        this.iconUrl.valueChanges.pipe(Object(rxjs_internal_operators__WEBPACK_IMPORTED_MODULE_11__["debounceTime"])(1000), Object(rxjs_internal_operators__WEBPACK_IMPORTED_MODULE_11__["distinctUntilChanged"])()).subscribe(function (urlValue) {
            _this.iconPreviewVisible = urlValue && (urlValue.startsWith('https://') || urlValue.startsWith('http://'));
        });
    };
    CreatePatternComponent.prototype.save = function () {
        var _this = this;
        this.parsePatternInput();
        this.wasSaveButtonClicked = true;
        if (this.patternValuesFormGroup && !this.patternValuesFormGroup.valid) {
            console.log('pattern entries not valid');
            this.updateFormValidationErrors();
            return;
        }
        // We send null as uri and let the backend create proper uris, which include camel cased names of patterns
        this.patternService.savePattern(this.patternLanguage._links.patterns.href, {
            uri: null,
            name: this.patternName,
            content: this.patternValuesFormGroup.value,
            iconUrl: this.iconForm.value.iconUrl
        }).subscribe(function () {
            _this.toastService.pop('success', 'Pattern successfully created');
            _this.zone.run(function () {
                _this.router.navigate(['..'], { relativeTo: _this.activatedRoute });
            });
        }, function (error) { return _this.toastService.pop('error', 'Could not create Pattern', error.message); });
    };
    CreatePatternComponent.prototype.parseMarkdownText = function () {
        return marked__WEBPACK_IMPORTED_MODULE_3__["lexer"](this._textEditor.value);
    };
    CreatePatternComponent.prototype.onChangeMarkdownText = function () {
        var currentText = this.parseMarkdownText();
        if (this.invalidTextEdit(currentText)) {
            // TODO
        }
        if (this.markdown) {
            document.getElementById('preview').innerHTML = this.markdown.render(this._textEditor.value);
        }
    };
    CreatePatternComponent.prototype.ignoreCaseAndWhitespace = function (text) {
        return text.trim().replace(new RegExp('/s', 'g'), '').toLowerCase();
    };
    CreatePatternComponent.prototype.addSpaceForCamelCase = function (text) {
        return text.replace(/([a-z])([A-Z])/g, '$1 $2');
    };
    CreatePatternComponent.prototype.getDefaultTextForSection = function (section) {
        return 'Enter your input for this section here.';
    };
    CreatePatternComponent.prototype.updateFormValidationErrors = function () {
        var _this = this;
        if (this.patternValuesFormGroup.valid) {
            return '';
        }
        this.errorMessages = [];
        Object.keys(this.patternValuesFormGroup.controls).forEach(function (key) {
            var controlErrors = _this.patternValuesFormGroup.controls[key].errors;
            if (controlErrors != null) {
                Object.keys(controlErrors).forEach(function (keyError) {
                    _this.errorMessages.push(_core_service_validation_service__WEBPACK_IMPORTED_MODULE_6__["ValidationService"].getMessageForError(key, keyError, controlErrors[keyError]));
                });
            }
        });
    };
    // returns if a user changed the value of the sections headers (which he is not allowed to do)
    CreatePatternComponent.prototype.invalidTextEdit = function (currentText) {
        var _this = this;
        if (!this.sections) {
            return false;
        }
        var _loop_1 = function (section) {
            var indexOfCorrespondingLine = currentText.findIndex(function (line) {
                return (line.type === 'heading' && line.depth === 2) &&
                    _this.ignoreCaseAndWhitespace(line.text) ===
                        _this.ignoreCaseAndWhitespace(_this.addSpaceForCamelCase(section));
            });
            if (indexOfCorrespondingLine === -1) {
                return { value: true };
            }
        };
        // we should find a corresponding line (= that starts with ## followed by section patternName) for each section
        for (var _i = 0, _a = this.sections; _i < _a.length; _i++) {
            var section = _a[_i];
            var state_1 = _loop_1(section);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        // there should be only one name (= line that starts with # )
        return !(currentText.filter(function (it) { return it.type === 'heading' && it.depth === 1; }).length === 1) ||
            // there should be as many second headings as sections (= line that starts with # )
            !(currentText.filter(function (it) { return it.type === 'heading' && it.depth === 2; }).length === this.sections.length);
    };
    CreatePatternComponent.prototype.parsePatternInput = function () {
        var _this = this;
        var lines = this.parseMarkdownText();
        var patternNameIndex = lines.findIndex(function (it) { return it.type === 'heading' && it.depth === 1; });
        this.patternName = patternNameIndex !== -1 ? lines[patternNameIndex]['text'] : '';
        this.patternLanguage.patternSchema.patternSectionSchemas.forEach(function (schema) {
            var sectionName = schema.name;
            var sectionIndex = lines.findIndex(function (sec) { return sec.type === 'heading' && sec.depth === 2 &&
                _this.ignoreCaseAndWhitespace(sec.text) === _this.ignoreCaseAndWhitespace(_this.addSpaceForCamelCase(sectionName)); });
            if (sectionIndex !== -1) {
                var sectionContent = [];
                for (var i = sectionIndex + 1; i < lines.length; i++) {
                    if (lines[i].type === 'heading') {
                        break;
                    }
                    if (lines[i]['text']) {
                        // if a list item was parsed before, add it to the text
                        sectionContent.push(i > 0 && CreatePatternComponent.isListItem(i, sectionIndex, lines) ? '* ' + lines[i]['text'] : lines[i]['text']);
                    }
                }
                if (_this.patternValuesFormGroup) {
                    if (_this.patternValuesFormGroup.controls[sectionName]) {
                        _this.patternValuesFormGroup.controls[sectionName].setValue(sectionContent.join('\n'));
                    }
                    else {
                        console.log('missing formcontrol:');
                        console.log(sectionName);
                    }
                }
                else {
                    console.error('patternValuesFormGroup is undefined');
                }
            }
        });
    };
    // init formgroup based on patternschema
    CreatePatternComponent.prototype.initFormGroup = function () {
        var _this = this;
        this.patternValuesFormGroup = new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormGroup"]({});
        if (this.patternLanguage && this.patternLanguage.patternSchema && this.patternLanguage.patternSchema.patternSectionSchemas) {
            this.patternLanguage.patternSchema.patternSectionSchemas.forEach(function (schema) {
                _this.patternValuesFormGroup.addControl(schema.name, new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](''));
            });
        }
    };
    CreatePatternComponent.prototype.initTextEditor = function () {
        for (var _i = 0, _a = this.sections; _i < _a.length; _i++) {
            var section = _a[_i];
            this.previousTextEditorValue = this.previousTextEditorValue.concat('\n ## ' + section + '\n' + this.getDefaultTextForSection(section));
        }
        this._textEditor.value = this.previousTextEditorValue;
        this.onChangeMarkdownText();
    };
    return CreatePatternComponent;
}());



/***/ }),

/***/ "./src/app/pattern-language-management/pattern-container/pattern-container.component.ngfactory.js":
/*!********************************************************************************************************!*\
  !*** ./src/app/pattern-language-management/pattern-container/pattern-container.component.ngfactory.js ***!
  \********************************************************************************************************/
/*! exports provided: RenderType_PatternContainerComponent, View_PatternContainerComponent_0, View_PatternContainerComponent_Host_0, PatternContainerComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_PatternContainerComponent", function() { return RenderType_PatternContainerComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_PatternContainerComponent_0", function() { return View_PatternContainerComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_PatternContainerComponent_Host_0", function() { return View_PatternContainerComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatternContainerComponentNgFactory", function() { return PatternContainerComponentNgFactory; });
/* harmony import */ var _pattern_container_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pattern-container.component.scss.shim.ngstyle */ "./src/app/pattern-language-management/pattern-container/pattern-container.component.scss.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _node_modules_angular_material_tabs_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/@angular/material/tabs/index.ngfactory */ "./node_modules/@angular/material/tabs/index.ngfactory.js");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/tabs */ "./node_modules/@angular/material/fesm5/tabs.js");
/* harmony import */ var _node_modules_angular_material_card_index_ngfactory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../node_modules/@angular/material/card/index.ngfactory */ "./node_modules/@angular/material/card/index.ngfactory.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/fesm5/card.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _pattern_container_directive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pattern-container.directive */ "./src/app/pattern-language-management/pattern-container/pattern-container.directive.ts");
/* harmony import */ var _core_service_component_registry_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../core/service/component-registry.service */ "./src/app/core/service/component-registry.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _pattern_container_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./pattern-container.component */ "./src/app/pattern-language-management/pattern-container/pattern-container.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes,extraRequire}
 * tslint:disable
 */ 












var styles_PatternContainerComponent = [_pattern_container_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_PatternContainerComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_PatternContainerComponent, data: {} });

function View_PatternContainerComponent_3(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](0, null, null, 0))], null, null); }
function View_PatternContainerComponent_2(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 16777216, null, null, 7, "mat-tab", [], null, null, null, _node_modules_angular_material_tabs_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_MatTab_0"], _node_modules_angular_material_tabs_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_MatTab"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 770048, [[1, 4]], 2, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_3__["MatTab"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], [2, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_3__["MAT_TAB_GROUP"]]], { textLabel: [0, "textLabel"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 2, { templateLabel: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 3, { _explicitContent: 0 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](4, 0, null, 0, 3, "mat-card", [["class", "mat-card mat-focus-indicator"]], [[2, "_mat-animation-noopable", null]], null, null, _node_modules_angular_material_card_index_ngfactory__WEBPACK_IMPORTED_MODULE_4__["View_MatCard_0"], _node_modules_angular_material_card_index_ngfactory__WEBPACK_IMPORTED_MODULE_4__["RenderType_MatCard"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](5, 49152, null, 0, _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCard"], [[2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["ANIMATION_MODULE_TYPE"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, 0, 1, null, View_PatternContainerComponent_3)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](7, 606208, null, 0, _pattern_container_directive__WEBPACK_IMPORTED_MODULE_7__["PatternContainerDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ComponentFactoryResolver"], _core_service_component_registry_service__WEBPACK_IMPORTED_MODULE_8__["ComponentRegistryService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]], { plId: [0, "plId"], pId: [1, "pId"], index: [2, "index"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](0, null, null, 0))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵinlineInterpolate"](1, "", (_v.context.$implicit.label || ("Tab " + (_v.context.index + 1))), ""); _ck(_v, 1, 0, currVal_0); var currVal_2 = _co.patternLanguageId; var currVal_3 = _co.patternId; var currVal_4 = _v.context.index; _ck(_v, 7, 0, currVal_2, currVal_3, currVal_4); }, function (_ck, _v) { var currVal_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 5)._animationMode === "NoopAnimations"); _ck(_v, 4, 0, currVal_1); }); }
function View_PatternContainerComponent_1(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 5, "mat-tab-group", [["class", "mat-tab-group"]], [[2, "mat-tab-group-dynamic-height", null], [2, "mat-tab-group-inverted-header", null]], null, null, _node_modules_angular_material_tabs_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_MatTabGroup_0"], _node_modules_angular_material_tabs_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_MatTabGroup"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](6144, null, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_3__["MAT_TAB_GROUP"], null, [_angular_material_tabs__WEBPACK_IMPORTED_MODULE_3__["MatTabGroup"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 3325952, null, 1, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_3__["MatTabGroup"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], [2, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_3__["MAT_TABS_CONFIG"]], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["ANIMATION_MODULE_TYPE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 1, { _allTabs: 1 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_PatternContainerComponent_2)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](5, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgForOf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"]], { ngForOf: [0, "ngForOf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_2 = _co.renderer; _ck(_v, 5, 0, currVal_2); }, function (_ck, _v) { var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2).dynamicHeight; var currVal_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2).headerPosition === "below"); _ck(_v, 0, 0, currVal_0, currVal_1); }); }
function View_PatternContainerComponent_5(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](0, null, null, 0))], null, null); }
function View_PatternContainerComponent_4(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 3, "mat-card", [["class", "mat-card mat-focus-indicator"]], [[2, "_mat-animation-noopable", null]], null, null, _node_modules_angular_material_card_index_ngfactory__WEBPACK_IMPORTED_MODULE_4__["View_MatCard_0"], _node_modules_angular_material_card_index_ngfactory__WEBPACK_IMPORTED_MODULE_4__["RenderType_MatCard"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 49152, null, 0, _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCard"], [[2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["ANIMATION_MODULE_TYPE"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, 0, 1, null, View_PatternContainerComponent_5)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](3, 606208, null, 0, _pattern_container_directive__WEBPACK_IMPORTED_MODULE_7__["PatternContainerDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ComponentFactoryResolver"], _core_service_component_registry_service__WEBPACK_IMPORTED_MODULE_8__["ComponentRegistryService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]], { plId: [0, "plId"], pId: [1, "pId"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_1 = _co.patternLanguageId; var currVal_2 = _co.patternId; _ck(_v, 3, 0, currVal_1, currVal_2); }, function (_ck, _v) { var currVal_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._animationMode === "NoopAnimations"); _ck(_v, 0, 0, currVal_0); }); }
function View_PatternContainerComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_PatternContainerComponent_1)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"], ngIfElse: [1, "ngIfElse"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](0, [["singleRenderer", 2]], null, 0, null, View_PatternContainerComponent_4))], function (_ck, _v) { var _co = _v.component; var currVal_0 = (_co.renderer && (_co.renderer.length > 1)); var currVal_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2); _ck(_v, 1, 0, currVal_0, currVal_1); }, null); }
function View_PatternContainerComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "pp-pattern-container", [], null, null, null, View_PatternContainerComponent_0, RenderType_PatternContainerComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 114688, null, 0, _pattern_container_component__WEBPACK_IMPORTED_MODULE_10__["PatternContainerComponent"], [_angular_router__WEBPACK_IMPORTED_MODULE_11__["ActivatedRoute"], _core_service_component_registry_service__WEBPACK_IMPORTED_MODULE_8__["ComponentRegistryService"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var PatternContainerComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("pp-pattern-container", _pattern_container_component__WEBPACK_IMPORTED_MODULE_10__["PatternContainerComponent"], View_PatternContainerComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/pattern-language-management/pattern-container/pattern-container.component.scss.shim.ngstyle.js":
/*!****************************************************************************************************************!*\
  !*** ./src/app/pattern-language-management/pattern-container/pattern-container.component.scss.shim.ngstyle.js ***!
  \****************************************************************************************************************/
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
var styles = ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhdHRlcm4tbGFuZ3VhZ2UtbWFuYWdlbWVudC9wYXR0ZXJuLWNvbnRhaW5lci9wYXR0ZXJuLWNvbnRhaW5lci5jb21wb25lbnQuc2NzcyJ9 */"];



/***/ }),

/***/ "./src/app/pattern-language-management/pattern-container/pattern-container.component.ts":
/*!**********************************************************************************************!*\
  !*** ./src/app/pattern-language-management/pattern-container/pattern-container.component.ts ***!
  \**********************************************************************************************/
/*! exports provided: PatternContainerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatternContainerComponent", function() { return PatternContainerComponent; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_core_service_component_registry_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/core/service/component-registry.service */ "./src/app/core/service/component-registry.service.ts");


var PatternContainerComponent = /** @class */ (function () {
    function PatternContainerComponent(activatedRoute, compRegistry) {
        this.activatedRoute = activatedRoute;
        this.compRegistry = compRegistry;
    }
    PatternContainerComponent.prototype.ngOnInit = function () {
        this.patternLanguageId = this.activatedRoute.snapshot.paramMap.get('patternLanguageId');
        this.renderer = this.compRegistry.getRenderingComponents(this.patternLanguageId);
    };
    return PatternContainerComponent;
}());



/***/ }),

/***/ "./src/app/pattern-language-management/pattern-container/pattern-container.directive.ts":
/*!**********************************************************************************************!*\
  !*** ./src/app/pattern-language-management/pattern-container/pattern-container.directive.ts ***!
  \**********************************************************************************************/
/*! exports provided: PatternContainerDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatternContainerDirective", function() { return PatternContainerDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _core_service_component_registry_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/service/component-registry.service */ "./src/app/core/service/component-registry.service.ts");
/* harmony import */ var _core_default_pattern_renderer_default_pattern_renderer_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/default-pattern-renderer/default-pattern-renderer.component */ "./src/app/core/default-pattern-renderer/default-pattern-renderer.component.ts");

/*
 * Copyright (c) 2018 University of Stuttgart.
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0, or the Apache Software License 2.0
 * which is available at https://www.apache.org/licenses/LICENSE-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
 */



var PatternContainerDirective = /** @class */ (function () {
    function PatternContainerDirective(viewContainerRef, componentFactoryResolver, compRegistry, cdr) {
        this.viewContainerRef = viewContainerRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.compRegistry = compRegistry;
        this.cdr = cdr;
    }
    PatternContainerDirective.prototype.ngOnInit = function () {
        this.createContent();
    };
    PatternContainerDirective.prototype.createContent = function () {
        var renderingComponent = this.compRegistry.getPLRenderingComponents(this.plId, this.index);
        var componentFactory = renderingComponent ?
            this.componentFactoryResolver.resolveComponentFactory(renderingComponent.pcomponent) :
            this.componentFactoryResolver.resolveComponentFactory(_core_default_pattern_renderer_default_pattern_renderer_component__WEBPACK_IMPORTED_MODULE_2__["DefaultPatternRendererComponent"]);
        this.viewContainerRef.clear();
        var componentRef = this.viewContainerRef.createComponent(componentFactory);
        this.ref = componentRef.instance;
        this.ref.pId = this.pId;
    };
    PatternContainerDirective.prototype.ngOnChanges = function (changes) {
        // changes of the langauge itself
        if (changes['plId'] && JSON.stringify(changes['plId'].currentValue) !== JSON.stringify(changes['plId'].previousValue)) {
            this.createContent();
            // this.cdr.detectChanges();
        }
        // changes of the pattern
        if (changes['pId']
            && this.ref
            && (JSON.stringify(changes['pId'].currentValue) !== JSON.stringify(changes['pId'].previousValue))) {
            // this.ref.pId = this.pId;
            this.cdr.detectChanges();
        }
    };
    return PatternContainerDirective;
}());



/***/ }),

/***/ "./src/app/pattern-language-management/pattern-language-container/pattern-language-container.component.ngfactory.js":
/*!**************************************************************************************************************************!*\
  !*** ./src/app/pattern-language-management/pattern-language-container/pattern-language-container.component.ngfactory.js ***!
  \**************************************************************************************************************************/
/*! exports provided: RenderType_PatternLanguageContainerComponent, View_PatternLanguageContainerComponent_0, View_PatternLanguageContainerComponent_Host_0, PatternLanguageContainerComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_PatternLanguageContainerComponent", function() { return RenderType_PatternLanguageContainerComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_PatternLanguageContainerComponent_0", function() { return View_PatternLanguageContainerComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_PatternLanguageContainerComponent_Host_0", function() { return View_PatternLanguageContainerComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatternLanguageContainerComponentNgFactory", function() { return PatternLanguageContainerComponentNgFactory; });
/* harmony import */ var _pattern_language_container_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pattern-language-container.component.scss.shim.ngstyle */ "./src/app/pattern-language-management/pattern-language-container/pattern-language-container.component.scss.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _node_modules_angular_material_tabs_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/@angular/material/tabs/index.ngfactory */ "./node_modules/@angular/material/tabs/index.ngfactory.js");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/tabs */ "./node_modules/@angular/material/fesm5/tabs.js");
/* harmony import */ var _node_modules_angular_material_card_index_ngfactory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../node_modules/@angular/material/card/index.ngfactory */ "./node_modules/@angular/material/card/index.ngfactory.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/fesm5/card.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _pattern_language_container_directive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pattern-language-container.directive */ "./src/app/pattern-language-management/pattern-language-container/pattern-language-container.directive.ts");
/* harmony import */ var _core_service_component_registry_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../core/service/component-registry.service */ "./src/app/core/service/component-registry.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _pattern_language_container_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./pattern-language-container.component */ "./src/app/pattern-language-management/pattern-language-container/pattern-language-container.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 * /*
 * Copyright (c) 2018 University of Stuttgart.
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0, or the Apache Software License 2.0
 * which is available at https://www.apache.org/licenses/LICENSE-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0

 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes,extraRequire}
 * tslint:disable
 */ 












var styles_PatternLanguageContainerComponent = [_pattern_language_container_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_PatternLanguageContainerComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_PatternLanguageContainerComponent, data: {} });

function View_PatternLanguageContainerComponent_3(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](0, null, null, 0))], null, null); }
function View_PatternLanguageContainerComponent_2(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 16777216, null, null, 7, "mat-tab", [], null, null, null, _node_modules_angular_material_tabs_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_MatTab_0"], _node_modules_angular_material_tabs_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_MatTab"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 770048, [[1, 4]], 2, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_3__["MatTab"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], [2, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_3__["MAT_TAB_GROUP"]]], { textLabel: [0, "textLabel"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 2, { templateLabel: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 3, { _explicitContent: 0 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](4, 0, null, 0, 3, "mat-card", [["class", "mat-card mat-focus-indicator"]], [[2, "_mat-animation-noopable", null]], null, null, _node_modules_angular_material_card_index_ngfactory__WEBPACK_IMPORTED_MODULE_4__["View_MatCard_0"], _node_modules_angular_material_card_index_ngfactory__WEBPACK_IMPORTED_MODULE_4__["RenderType_MatCard"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](5, 49152, null, 0, _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCard"], [[2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["ANIMATION_MODULE_TYPE"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, 0, 1, null, View_PatternLanguageContainerComponent_3)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](7, 81920, null, 0, _pattern_language_container_directive__WEBPACK_IMPORTED_MODULE_7__["PatternLanguageContainerDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ComponentFactoryResolver"], _core_service_component_registry_service__WEBPACK_IMPORTED_MODULE_8__["ComponentRegistryService"]], { patternLanguageId: [0, "patternLanguageId"], index: [1, "index"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](0, null, null, 0))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵinlineInterpolate"](1, "", (_v.context.$implicit.label || ("Tab " + (_v.context.index + 1))), ""); _ck(_v, 1, 0, currVal_0); var currVal_2 = _co.plEncodedId; var currVal_3 = _v.context.index; _ck(_v, 7, 0, currVal_2, currVal_3); }, function (_ck, _v) { var currVal_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 5)._animationMode === "NoopAnimations"); _ck(_v, 4, 0, currVal_1); }); }
function View_PatternLanguageContainerComponent_1(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 5, "mat-tab-group", [["class", "mat-tab-group"]], [[2, "mat-tab-group-dynamic-height", null], [2, "mat-tab-group-inverted-header", null]], null, null, _node_modules_angular_material_tabs_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_MatTabGroup_0"], _node_modules_angular_material_tabs_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_MatTabGroup"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](6144, null, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_3__["MAT_TAB_GROUP"], null, [_angular_material_tabs__WEBPACK_IMPORTED_MODULE_3__["MatTabGroup"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 3325952, null, 1, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_3__["MatTabGroup"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], [2, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_3__["MAT_TABS_CONFIG"]], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["ANIMATION_MODULE_TYPE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 1, { _allTabs: 1 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_PatternLanguageContainerComponent_2)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](5, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgForOf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"]], { ngForOf: [0, "ngForOf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_2 = _co.renderer; _ck(_v, 5, 0, currVal_2); }, function (_ck, _v) { var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2).dynamicHeight; var currVal_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2).headerPosition === "below"); _ck(_v, 0, 0, currVal_0, currVal_1); }); }
function View_PatternLanguageContainerComponent_6(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](0, null, null, 0))], null, null); }
function View_PatternLanguageContainerComponent_5(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_PatternLanguageContainerComponent_6)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 81920, null, 0, _pattern_language_container_directive__WEBPACK_IMPORTED_MODULE_7__["PatternLanguageContainerDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ComponentFactoryResolver"], _core_service_component_registry_service__WEBPACK_IMPORTED_MODULE_8__["ComponentRegistryService"]], { patternLanguageId: [0, "patternLanguageId"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](0, null, null, 0))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.plEncodedId; _ck(_v, 1, 0, currVal_0); }, null); }
function View_PatternLanguageContainerComponent_8(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](0, null, null, 0))], null, null); }
function View_PatternLanguageContainerComponent_7(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, [["cardsView", 2]], null, 1, null, View_PatternLanguageContainerComponent_8)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 81920, null, 0, _pattern_language_container_directive__WEBPACK_IMPORTED_MODULE_7__["PatternLanguageContainerDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ComponentFactoryResolver"], _core_service_component_registry_service__WEBPACK_IMPORTED_MODULE_8__["ComponentRegistryService"]], { patternLanguageId: [0, "patternLanguageId"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](0, null, null, 0))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.plEncodedId; _ck(_v, 1, 0, currVal_0); }, null); }
function View_PatternLanguageContainerComponent_4(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_PatternLanguageContainerComponent_5)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_PatternLanguageContainerComponent_7)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](3, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](0, null, null, 0))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.renderer; _ck(_v, 1, 0, currVal_0); var currVal_1 = !_co.renderer; _ck(_v, 3, 0, currVal_1); }, null); }
function View_PatternLanguageContainerComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_PatternLanguageContainerComponent_1)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"], ngIfElse: [1, "ngIfElse"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](0, [["oneOrNoRenderer", 2]], null, 0, null, View_PatternLanguageContainerComponent_4))], function (_ck, _v) { var _co = _v.component; var currVal_0 = (_co.renderer && (_co.renderer.length > 1)); var currVal_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2); _ck(_v, 1, 0, currVal_0, currVal_1); }, null); }
function View_PatternLanguageContainerComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "pp-pattern-language-container", [], null, null, null, View_PatternLanguageContainerComponent_0, RenderType_PatternLanguageContainerComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 114688, null, 0, _pattern_language_container_component__WEBPACK_IMPORTED_MODULE_10__["PatternLanguageContainerComponent"], [_angular_router__WEBPACK_IMPORTED_MODULE_11__["ActivatedRoute"], _core_service_component_registry_service__WEBPACK_IMPORTED_MODULE_8__["ComponentRegistryService"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var PatternLanguageContainerComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("pp-pattern-language-container", _pattern_language_container_component__WEBPACK_IMPORTED_MODULE_10__["PatternLanguageContainerComponent"], View_PatternLanguageContainerComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/pattern-language-management/pattern-language-container/pattern-language-container.component.scss.shim.ngstyle.js":
/*!**********************************************************************************************************************************!*\
  !*** ./src/app/pattern-language-management/pattern-language-container/pattern-language-container.component.scss.shim.ngstyle.js ***!
  \**********************************************************************************************************************************/
/*! exports provided: styles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 * /*
 * Copyright (c) 2018 University of Stuttgart.
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0, or the Apache Software License 2.0
 * which is available at https://www.apache.org/licenses/LICENSE-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0

 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes,extraRequire}
 * tslint:disable
 */ 
var styles = ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RyYXZpcy9idWlsZC9QYXR0ZXJuUGVkaWEvcGF0dGVybi1wZWRpYS12aWV3cy11aS9zcmMvYXBwL3BhdHRlcm4tbGFuZ3VhZ2UtbWFuYWdlbWVudC9wYXR0ZXJuLWxhbmd1YWdlLWNvbnRhaW5lci9wYXR0ZXJuLWxhbmd1YWdlLWNvbnRhaW5lci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7O0VBQUEiLCJmaWxlIjoic3JjL2FwcC9wYXR0ZXJuLWxhbmd1YWdlLW1hbmFnZW1lbnQvcGF0dGVybi1sYW5ndWFnZS1jb250YWluZXIvcGF0dGVybi1sYW5ndWFnZS1jb250YWluZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIENvcHlyaWdodCAoYykgMjAxOCBVbml2ZXJzaXR5IG9mIFN0dXR0Z2FydC5cbiAqXG4gKiBTZWUgdGhlIE5PVElDRSBmaWxlKHMpIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsXG4gKiBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cbiAqXG4gKiBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGVcbiAqIHRlcm1zIG9mIHRoZSBFY2xpcHNlIFB1YmxpYyBMaWNlbnNlIDIuMCB3aGljaCBpcyBhdmFpbGFibGUgYXRcbiAqIGh0dHA6Ly93d3cuZWNsaXBzZS5vcmcvbGVnYWwvZXBsLTIuMCwgb3IgdGhlIEFwYWNoZSBTb2Z0d2FyZSBMaWNlbnNlIDIuMFxuICogd2hpY2ggaXMgYXZhaWxhYmxlIGF0IGh0dHBzOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjAuXG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEVQTC0yLjAgT1IgQXBhY2hlLTIuMFxuICovXG5cbiJdfQ== */"];



/***/ }),

/***/ "./src/app/pattern-language-management/pattern-language-container/pattern-language-container.component.ts":
/*!****************************************************************************************************************!*\
  !*** ./src/app/pattern-language-management/pattern-language-container/pattern-language-container.component.ts ***!
  \****************************************************************************************************************/
/*! exports provided: PatternLanguageContainerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatternLanguageContainerComponent", function() { return PatternLanguageContainerComponent; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_core_service_component_registry_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/core/service/component-registry.service */ "./src/app/core/service/component-registry.service.ts");
/*
 * Copyright (c) 2018 University of Stuttgart.
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0, or the Apache Software License 2.0
 * which is available at https://www.apache.org/licenses/LICENSE-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
 */


var PatternLanguageContainerComponent = /** @class */ (function () {
    function PatternLanguageContainerComponent(activatedRoute, compRegistry) {
        this.activatedRoute = activatedRoute;
        this.compRegistry = compRegistry;
    }
    PatternLanguageContainerComponent.prototype.ngOnInit = function () {
        // Todo: We use encoded uris just for navigation. Now we can get the Uri from the patternlanguage entity. We have to add redux!
        this.plEncodedId = this.activatedRoute.snapshot.params['patternLanguageId'];
        this.renderer = this.compRegistry.getRenderingComponents(this.plEncodedId);
    };
    return PatternLanguageContainerComponent;
}());



/***/ }),

/***/ "./src/app/pattern-language-management/pattern-language-container/pattern-language-container.directive.ts":
/*!****************************************************************************************************************!*\
  !*** ./src/app/pattern-language-management/pattern-language-container/pattern-language-container.directive.ts ***!
  \****************************************************************************************************************/
/*! exports provided: PatternLanguageContainerDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatternLanguageContainerDirective", function() { return PatternLanguageContainerDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _core_service_component_registry_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/service/component-registry.service */ "./src/app/core/service/component-registry.service.ts");
/* harmony import */ var _core_util_uri_converter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/util/uri-converter */ "./src/app/core/util/uri-converter.ts");
/*
 * Copyright (c) 2018 University of Stuttgart.
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0, or the Apache Software License 2.0
 * which is available at https://www.apache.org/licenses/LICENSE-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
 */



var PatternLanguageContainerDirective = /** @class */ (function () {
    function PatternLanguageContainerDirective(viewContainerRef, componentFactoryResolver, compRegistry) {
        this.viewContainerRef = viewContainerRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.compRegistry = compRegistry;
    }
    PatternLanguageContainerDirective.prototype.ngOnInit = function () {
        var componentFactory = this.getRenderingComponent();
        this.viewContainerRef.clear();
        var componentRef = this.viewContainerRef.createComponent(componentFactory);
    };
    PatternLanguageContainerDirective.prototype.getRenderingComponent = function () {
        var renderingComponent = this.compRegistry.getPLRenderingComponents(_core_util_uri_converter__WEBPACK_IMPORTED_MODULE_2__["UriConverter"].doubleDecodeUri(this.patternLanguageId.toLowerCase()), this.index);
        if (renderingComponent) {
            return this.componentFactoryResolver.resolveComponentFactory(renderingComponent.plcomponent);
        }
        // no special renderer, use default renderer:
        return this.componentFactoryResolver.resolveComponentFactory(this.compRegistry.getPLRenderingComponents('default').plcomponent);
    };
    return PatternLanguageContainerDirective;
}());



/***/ }),

/***/ "./src/app/pattern-language-management/pattern-language-management.module.ngfactory.js":
/*!*********************************************************************************************!*\
  !*** ./src/app/pattern-language-management/pattern-language-management.module.ngfactory.js ***!
  \*********************************************************************************************/
/*! exports provided: PatternLanguageManagementModuleNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatternLanguageManagementModuleNgFactory", function() { return PatternLanguageManagementModuleNgFactory; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _pattern_language_management_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pattern-language-management.module */ "./src/app/pattern-language-management/pattern-language-management.module.ts");
/* harmony import */ var _node_modules_angular_material_dialog_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/@angular/material/dialog/index.ngfactory */ "./node_modules/@angular/material/dialog/index.ngfactory.js");
/* harmony import */ var _node_modules_covalent_text_editor_covalent_text_editor_ngfactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/@covalent/text-editor/covalent-text-editor.ngfactory */ "./node_modules/@covalent/text-editor/covalent-text-editor.ngfactory.js");
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
/* harmony import */ var _pattern_language_management_pattern_language_management_component_ngfactory__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./pattern-language-management/pattern-language-management.component.ngfactory */ "./src/app/pattern-language-management/pattern-language-management/pattern-language-management.component.ngfactory.js");
/* harmony import */ var _pattern_language_container_pattern_language_container_component_ngfactory__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./pattern-language-container/pattern-language-container.component.ngfactory */ "./src/app/pattern-language-management/pattern-language-container/pattern-language-container.component.ngfactory.js");
/* harmony import */ var _create_pattern_create_pattern_component_ngfactory__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./create-pattern/create-pattern.component.ngfactory */ "./src/app/pattern-language-management/create-pattern/create-pattern.component.ngfactory.js");
/* harmony import */ var _pattern_container_pattern_container_component_ngfactory__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./pattern-container/pattern-container.component.ngfactory */ "./src/app/pattern-language-management/pattern-container/pattern-container.component.ngfactory.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/cdk/observers */ "./node_modules/@angular/cdk/fesm5/observers.js");
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/cdk/overlay */ "./node_modules/@angular/cdk/fesm5/overlay.js");
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/cdk/bidi */ "./node_modules/@angular/cdk/fesm5/bidi.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/fesm5/dialog.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/fesm5/core.js");
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/material/autocomplete */ "./node_modules/@angular/material/fesm5/autocomplete.js");
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/cdk/drag-drop */ "./node_modules/@angular/cdk/fesm5/drag-drop.js");
/* harmony import */ var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/cdk/scrolling */ "./node_modules/@angular/cdk/fesm5/scrolling.js");
/* harmony import */ var _angular_flex_layout_core__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/flex-layout/core */ "./node_modules/@angular/flex-layout/esm5/core.es5.js");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @angular/material/datepicker */ "./node_modules/@angular/material/fesm5/datepicker.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/fesm5/tooltip.js");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @angular/material/select */ "./node_modules/@angular/material/fesm5/select.js");
/* harmony import */ var ngx_md__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ngx-md */ "./node_modules/ngx-md/fesm5/ngx-md.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! @angular/cdk/platform */ "./node_modules/@angular/cdk/fesm5/platform.js");
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! @angular/material/sort */ "./node_modules/@angular/material/fesm5/sort.js");
/* harmony import */ var _core_service_pattern_language_service__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ../core/service/pattern-language.service */ "./src/app/core/service/pattern-language.service.ts");
/* harmony import */ var _core_service_pattern_service__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ../core/service/pattern.service */ "./src/app/core/service/pattern.service.ts");
/* harmony import */ var _core_service_pattern_view_service__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ../core/service/pattern-view.service */ "./src/app/core/service/pattern-view.service.ts");
/* harmony import */ var _core_user_management_services_user_service__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ../core/user-management/_services/user.service */ "./src/app/core/user-management/_services/user.service.ts");
/* harmony import */ var angular2_toaster_src_toaster_service__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! angular2-toaster/src/toaster.service */ "./node_modules/angular2-toaster/src/toaster.service.js");
/* harmony import */ var _core_user_management_store_user_store__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ../core/user-management/_store/user.store */ "./src/app/core/user-management/_store/user.store.ts");
/* harmony import */ var _core_issue_management_services_issue_management_service__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ../core/issue-management/_services/issue-management.service */ "./src/app/core/issue-management/_services/issue-management.service.ts");
/* harmony import */ var _authentication_services_authentication_service__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ../authentication/_services/authentication.service */ "./src/app/authentication/_services/authentication.service.ts");
/* harmony import */ var _core_issue_management_store_issue_management_store__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ../core/issue-management/_store/issue-management-store */ "./src/app/core/issue-management/_store/issue-management-store.ts");
/* harmony import */ var _core_candidate_management_services_candidate_management_service__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ../core/candidate-management/_services/candidate-management.service */ "./src/app/core/candidate-management/_services/candidate-management.service.ts");
/* harmony import */ var _core_candidate_management_store_candidate_management_store__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ../core/candidate-management/_store/candidate-management.store */ "./src/app/core/candidate-management/_store/candidate-management.store.ts");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! @angular/cdk/a11y */ "./node_modules/@angular/cdk/fesm5/a11y.js");
/* harmony import */ var _angular_material_badge__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! @angular/material/badge */ "./node_modules/@angular/material/fesm5/badge.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/fesm5/button.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/fesm5/toolbar.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/fesm5/icon.js");
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! @angular/material/sidenav */ "./node_modules/@angular/material/fesm5/sidenav.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/fesm5/card.js");
/* harmony import */ var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! @angular/cdk/portal */ "./node_modules/@angular/cdk/fesm5/portal.js");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! @angular/material/tabs */ "./node_modules/@angular/material/fesm5/tabs.js");
/* harmony import */ var _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! @angular/cdk/text-field */ "./node_modules/@angular/cdk/fesm5/text-field.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/fesm5/form-field.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/fesm5/input.js");
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! @angular/material/chips */ "./node_modules/@angular/material/fesm5/chips.js");
/* harmony import */ var angular2_prettyjson__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! angular2-prettyjson */ "./node_modules/angular2-prettyjson/esm5/angular2-prettyjson.js");
/* harmony import */ var _covalent_text_editor__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! @covalent/text-editor */ "./node_modules/@covalent/text-editor/fesm5/covalent-text-editor.js");
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! @angular/flex-layout/flex */ "./node_modules/@angular/flex-layout/esm5/flex.es5.js");
/* harmony import */ var _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! @angular/flex-layout/extended */ "./node_modules/@angular/flex-layout/esm5/extended.es5.js");
/* harmony import */ var _angular_flex_layout_grid__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! @angular/flex-layout/grid */ "./node_modules/@angular/flex-layout/esm5/grid.es5.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! @angular/material/progress-spinner */ "./node_modules/@angular/material/fesm5/progress-spinner.js");
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(/*! @angular/material/divider */ "./node_modules/@angular/material/fesm5/divider.js");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(/*! @angular/material/list */ "./node_modules/@angular/material/fesm5/list.js");
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(/*! @angular/material/grid-list */ "./node_modules/@angular/material/fesm5/grid-list.js");
/* harmony import */ var _angular_cdk_accordion__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(/*! @angular/cdk/accordion */ "./node_modules/@angular/cdk/fesm5/accordion.js");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(/*! @angular/material/expansion */ "./node_modules/@angular/material/fesm5/expansion.js");
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(/*! @angular/material/button-toggle */ "./node_modules/@angular/material/fesm5/button-toggle.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _core_core_module__WEBPACK_IMPORTED_MODULE_78__ = __webpack_require__(/*! ../core/core.module */ "./src/app/core/core.module.ts");
/* harmony import */ var _core_service_component_registry_service__WEBPACK_IMPORTED_MODULE_79__ = __webpack_require__(/*! ../core/service/component-registry.service */ "./src/app/core/service/component-registry.service.ts");
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_80__ = __webpack_require__(/*! @angular/material/radio */ "./node_modules/@angular/material/fesm5/radio.js");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_81__ = __webpack_require__(/*! @angular/material/checkbox */ "./node_modules/@angular/material/fesm5/checkbox.js");
/* harmony import */ var angular2_toaster_src_toaster_module__WEBPACK_IMPORTED_MODULE_82__ = __webpack_require__(/*! angular2-toaster/src/toaster.module */ "./node_modules/angular2-toaster/src/toaster.module.js");
/* harmony import */ var _graph_graph_module__WEBPACK_IMPORTED_MODULE_83__ = __webpack_require__(/*! ../graph/graph.module */ "./src/app/graph/graph.module.ts");
/* harmony import */ var _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_84__ = __webpack_require__(/*! @angular/cdk/keycodes */ "./node_modules/@angular/cdk/fesm5/keycodes.js");
/* harmony import */ var _pattern_language_management_pattern_language_management_component__WEBPACK_IMPORTED_MODULE_85__ = __webpack_require__(/*! ./pattern-language-management/pattern-language-management.component */ "./src/app/pattern-language-management/pattern-language-management/pattern-language-management.component.ts");
/* harmony import */ var _pattern_language_container_pattern_language_container_component__WEBPACK_IMPORTED_MODULE_86__ = __webpack_require__(/*! ./pattern-language-container/pattern-language-container.component */ "./src/app/pattern-language-management/pattern-language-container/pattern-language-container.component.ts");
/* harmony import */ var _create_pattern_create_pattern_component__WEBPACK_IMPORTED_MODULE_87__ = __webpack_require__(/*! ./create-pattern/create-pattern.component */ "./src/app/pattern-language-management/create-pattern/create-pattern.component.ts");
/* harmony import */ var _pattern_container_pattern_container_component__WEBPACK_IMPORTED_MODULE_88__ = __webpack_require__(/*! ./pattern-container/pattern-container.component */ "./src/app/pattern-language-management/pattern-container/pattern-container.component.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes,extraRequire}
 * tslint:disable
 */ 

























































































var PatternLanguageManagementModuleNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵcmf"](_pattern_language_management_module__WEBPACK_IMPORTED_MODULE_1__["PatternLanguageManagementModule"], [], function (_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmod"]([_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵCodegenComponentFactoryResolver"], [[8, [_node_modules_angular_material_dialog_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["MatDialogContainerNgFactory"], _node_modules_covalent_text_editor_covalent_text_editor_ngfactory__WEBPACK_IMPORTED_MODULE_3__["TdTextEditorComponentNgFactory"], _node_modules_angular_material_datepicker_index_ngfactory__WEBPACK_IMPORTED_MODULE_4__["MatDatepickerContentNgFactory"], _node_modules_angular_material_datepicker_index_ngfactory__WEBPACK_IMPORTED_MODULE_4__["MatCalendarHeaderNgFactory"], _node_modules_angular_material_tooltip_index_ngfactory__WEBPACK_IMPORTED_MODULE_5__["TooltipComponentNgFactory"], _node_modules_angular_router_router_ngfactory__WEBPACK_IMPORTED_MODULE_6__["ɵangular_packages_router_router_lNgFactory"], _core_default_pl_renderer_default_pl_renderer_component_ngfactory__WEBPACK_IMPORTED_MODULE_7__["DefaultPlRendererComponentNgFactory"], _core_default_pattern_renderer_default_pattern_renderer_component_ngfactory__WEBPACK_IMPORTED_MODULE_8__["DefaultPatternRendererComponentNgFactory"], _core_component_md_editor_md_editor_component_ngfactory__WEBPACK_IMPORTED_MODULE_9__["MdEditorComponentNgFactory"], _core_component_divider_divider_component_ngfactory__WEBPACK_IMPORTED_MODULE_10__["DividerComponentNgFactory"], _core_component_create_pattern_relation_create_pattern_relation_component_ngfactory__WEBPACK_IMPORTED_MODULE_11__["CreatePatternRelationComponentNgFactory"], _core_component_delete_pattern_relation_delete_pattern_relation_component_ngfactory__WEBPACK_IMPORTED_MODULE_12__["DeletePatternRelationComponentNgFactory"], _core_component_markdown_content_container_markdown_pattern_sectioncontent_markdown_pattern_section_content_component_ngfactory__WEBPACK_IMPORTED_MODULE_13__["MarkdownPatternSectionContentComponentNgFactory"], _core_component_cardrenderer_card_renderer_component_ngfactory__WEBPACK_IMPORTED_MODULE_14__["CardRendererComponentNgFactory"], _core_component_graph_display_graph_display_component_ngfactory__WEBPACK_IMPORTED_MODULE_15__["GraphDisplayComponentNgFactory"], _core_component_create_edit_pattern_language_create_edit_pattern_language_component_ngfactory__WEBPACK_IMPORTED_MODULE_16__["CreateEditPatternLanguageComponentNgFactory"], _pattern_language_management_pattern_language_management_component_ngfactory__WEBPACK_IMPORTED_MODULE_17__["PatternLanguageManagementComponentNgFactory"], _pattern_language_container_pattern_language_container_component_ngfactory__WEBPACK_IMPORTED_MODULE_18__["PatternLanguageContainerComponentNgFactory"], _create_pattern_create_pattern_component_ngfactory__WEBPACK_IMPORTED_MODULE_19__["CreatePatternComponentNgFactory"], _pattern_container_pattern_container_component_ngfactory__WEBPACK_IMPORTED_MODULE_20__["PatternContainerComponentNgFactory"]]], [3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"]], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModuleRef"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_common__WEBPACK_IMPORTED_MODULE_21__["NgLocalization"], _angular_common__WEBPACK_IMPORTED_MODULE_21__["NgLocaleLocalization"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["LOCALE_ID"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_22__["MutationObserverFactory"], _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_22__["MutationObserverFactory"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_23__["Overlay"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_23__["Overlay"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_23__["ScrollStrategyOptions"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_23__["OverlayContainer"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_23__["OverlayPositionBuilder"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_23__["OverlayKeyboardDispatcher"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"], _angular_common__WEBPACK_IMPORTED_MODULE_21__["DOCUMENT"], _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_24__["Directionality"], [2, _angular_common__WEBPACK_IMPORTED_MODULE_21__["Location"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_23__["ɵangular_material_src_cdk_overlay_overlay_c"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_23__["ɵangular_material_src_cdk_overlay_overlay_d"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_23__["Overlay"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_25__["MAT_DIALOG_SCROLL_STRATEGY"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_25__["MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_23__["Overlay"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](135680, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_25__["MatDialog"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_25__["MatDialog"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_23__["Overlay"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"], [2, _angular_common__WEBPACK_IMPORTED_MODULE_21__["Location"]], [2, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_25__["MAT_DIALOG_DEFAULT_OPTIONS"]], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_25__["MAT_DIALOG_SCROLL_STRATEGY"], [3, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_25__["MatDialog"]], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_23__["OverlayContainer"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_material_core__WEBPACK_IMPORTED_MODULE_26__["ErrorStateMatcher"], _angular_material_core__WEBPACK_IMPORTED_MODULE_26__["ErrorStateMatcher"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_27__["MAT_AUTOCOMPLETE_SCROLL_STRATEGY"], _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_27__["MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_23__["Overlay"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_28__["DragDrop"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_28__["DragDrop"], [_angular_common__WEBPACK_IMPORTED_MODULE_21__["DOCUMENT"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"], _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_29__["ViewportRuler"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_28__["DragDropRegistry"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_core__WEBPACK_IMPORTED_MODULE_0__["APP_BOOTSTRAP_LISTENER"], function (p0_0, p0_1) { return [_angular_flex_layout_core__WEBPACK_IMPORTED_MODULE_30__["removeStyles"](p0_0, p0_1)]; }, [_angular_common__WEBPACK_IMPORTED_MODULE_21__["DOCUMENT"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["PLATFORM_ID"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_31__["MatDatepickerIntl"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_31__["MatDatepickerIntl"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_31__["MAT_DATEPICKER_SCROLL_STRATEGY"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_31__["MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_23__["Overlay"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_forms__WEBPACK_IMPORTED_MODULE_32__["FormBuilder"], _angular_forms__WEBPACK_IMPORTED_MODULE_32__["FormBuilder"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_forms__WEBPACK_IMPORTED_MODULE_32__["ɵangular_packages_forms_forms_n"], _angular_forms__WEBPACK_IMPORTED_MODULE_32__["ɵangular_packages_forms_forms_n"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_33__["MAT_TOOLTIP_SCROLL_STRATEGY"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_33__["MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_23__["Overlay"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_material_select__WEBPACK_IMPORTED_MODULE_34__["MAT_SELECT_SCROLL_STRATEGY"], _angular_material_select__WEBPACK_IMPORTED_MODULE_34__["MAT_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_23__["Overlay"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, ngx_md__WEBPACK_IMPORTED_MODULE_35__["NgxMdService"], ngx_md__WEBPACK_IMPORTED_MODULE_35__["NgxMdService"], [_angular_common_http__WEBPACK_IMPORTED_MODULE_36__["HttpClient"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_37__["DomSanitizer"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_material_core__WEBPACK_IMPORTED_MODULE_26__["DateAdapter"], _angular_material_core__WEBPACK_IMPORTED_MODULE_26__["NativeDateAdapter"], [[2, _angular_material_core__WEBPACK_IMPORTED_MODULE_26__["MAT_DATE_LOCALE"]], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_38__["Platform"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_material_sort__WEBPACK_IMPORTED_MODULE_39__["MatSortHeaderIntl"], _angular_material_sort__WEBPACK_IMPORTED_MODULE_39__["MAT_SORT_HEADER_INTL_PROVIDER_FACTORY"], [[3, _angular_material_sort__WEBPACK_IMPORTED_MODULE_39__["MatSortHeaderIntl"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, ngx_md__WEBPACK_IMPORTED_MODULE_35__["ɵa"], ngx_md__WEBPACK_IMPORTED_MODULE_35__["ɵa"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _core_service_pattern_language_service__WEBPACK_IMPORTED_MODULE_40__["PatternLanguageService"], _core_service_pattern_language_service__WEBPACK_IMPORTED_MODULE_40__["PatternLanguageService"], [_angular_common_http__WEBPACK_IMPORTED_MODULE_36__["HttpClient"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _core_service_pattern_service__WEBPACK_IMPORTED_MODULE_41__["PatternService"], _core_service_pattern_service__WEBPACK_IMPORTED_MODULE_41__["PatternService"], [_angular_common_http__WEBPACK_IMPORTED_MODULE_36__["HttpClient"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _core_service_pattern_view_service__WEBPACK_IMPORTED_MODULE_42__["PatternViewService"], _core_service_pattern_view_service__WEBPACK_IMPORTED_MODULE_42__["PatternViewService"], [_angular_common_http__WEBPACK_IMPORTED_MODULE_36__["HttpClient"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _core_user_management_services_user_service__WEBPACK_IMPORTED_MODULE_43__["UserService"], _core_user_management_services_user_service__WEBPACK_IMPORTED_MODULE_43__["UserService"], [_angular_common_http__WEBPACK_IMPORTED_MODULE_36__["HttpClient"], angular2_toaster_src_toaster_service__WEBPACK_IMPORTED_MODULE_44__["ToasterService"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _core_user_management_store_user_store__WEBPACK_IMPORTED_MODULE_45__["UserStore"], _core_user_management_store_user_store__WEBPACK_IMPORTED_MODULE_45__["UserStore"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _core_issue_management_services_issue_management_service__WEBPACK_IMPORTED_MODULE_46__["IssueManagementService"], _core_issue_management_services_issue_management_service__WEBPACK_IMPORTED_MODULE_46__["IssueManagementService"], [_angular_common_http__WEBPACK_IMPORTED_MODULE_36__["HttpClient"], angular2_toaster_src_toaster_service__WEBPACK_IMPORTED_MODULE_44__["ToasterService"], _authentication_services_authentication_service__WEBPACK_IMPORTED_MODULE_47__["AuthenticationService"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _core_issue_management_store_issue_management_store__WEBPACK_IMPORTED_MODULE_48__["IssueManagementStore"], _core_issue_management_store_issue_management_store__WEBPACK_IMPORTED_MODULE_48__["IssueManagementStore"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _core_candidate_management_services_candidate_management_service__WEBPACK_IMPORTED_MODULE_49__["CandidateManagementService"], _core_candidate_management_services_candidate_management_service__WEBPACK_IMPORTED_MODULE_49__["CandidateManagementService"], [_angular_common_http__WEBPACK_IMPORTED_MODULE_36__["HttpClient"], angular2_toaster_src_toaster_service__WEBPACK_IMPORTED_MODULE_44__["ToasterService"], _authentication_services_authentication_service__WEBPACK_IMPORTED_MODULE_47__["AuthenticationService"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _core_candidate_management_store_candidate_management_store__WEBPACK_IMPORTED_MODULE_50__["CandidateManagementStore"], _core_candidate_management_store_candidate_management_store__WEBPACK_IMPORTED_MODULE_50__["CandidateManagementStore"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_common__WEBPACK_IMPORTED_MODULE_21__["CommonModule"], _angular_common__WEBPACK_IMPORTED_MODULE_21__["CommonModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_38__["PlatformModule"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_38__["PlatformModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_22__["ObserversModule"], _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_22__["ObserversModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_51__["A11yModule"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_51__["A11yModule"], [_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_51__["HighContrastModeDetector"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_24__["BidiModule"], _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_24__["BidiModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_26__["MatCommonModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_26__["MatCommonModule"], [_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_51__["HighContrastModeDetector"], [2, _angular_material_core__WEBPACK_IMPORTED_MODULE_26__["MATERIAL_SANITY_CHECKS"]], [2, _angular_common__WEBPACK_IMPORTED_MODULE_21__["DOCUMENT"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_badge__WEBPACK_IMPORTED_MODULE_52__["MatBadgeModule"], _angular_material_badge__WEBPACK_IMPORTED_MODULE_52__["MatBadgeModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_26__["MatRippleModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_26__["MatRippleModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_button__WEBPACK_IMPORTED_MODULE_53__["MatButtonModule"], _angular_material_button__WEBPACK_IMPORTED_MODULE_53__["MatButtonModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_54__["MatToolbarModule"], _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_54__["MatToolbarModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_icon__WEBPACK_IMPORTED_MODULE_55__["MatIconModule"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_55__["MatIconModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_29__["ScrollingModule"], _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_29__["ScrollingModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_56__["MatSidenavModule"], _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_56__["MatSidenavModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_card__WEBPACK_IMPORTED_MODULE_57__["MatCardModule"], _angular_material_card__WEBPACK_IMPORTED_MODULE_57__["MatCardModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_58__["PortalModule"], _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_58__["PortalModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_23__["OverlayModule"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_23__["OverlayModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_25__["MatDialogModule"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_25__["MatDialogModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_59__["MatTabsModule"], _angular_material_tabs__WEBPACK_IMPORTED_MODULE_59__["MatTabsModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_60__["TextFieldModule"], _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_60__["TextFieldModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_61__["MatFormFieldModule"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_61__["MatFormFieldModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_input__WEBPACK_IMPORTED_MODULE_62__["MatInputModule"], _angular_material_input__WEBPACK_IMPORTED_MODULE_62__["MatInputModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_chips__WEBPACK_IMPORTED_MODULE_63__["MatChipsModule"], _angular_material_chips__WEBPACK_IMPORTED_MODULE_63__["MatChipsModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_26__["MatPseudoCheckboxModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_26__["MatPseudoCheckboxModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_26__["MatOptionModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_26__["MatOptionModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_27__["MatAutocompleteModule"], _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_27__["MatAutocompleteModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_28__["DragDropModule"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_28__["DragDropModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, angular2_prettyjson__WEBPACK_IMPORTED_MODULE_64__["PrettyJsonModule"], angular2_prettyjson__WEBPACK_IMPORTED_MODULE_64__["PrettyJsonModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _covalent_text_editor__WEBPACK_IMPORTED_MODULE_65__["CovalentTextEditorModule"], _covalent_text_editor__WEBPACK_IMPORTED_MODULE_65__["CovalentTextEditorModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_flex_layout_core__WEBPACK_IMPORTED_MODULE_30__["CoreModule"], _angular_flex_layout_core__WEBPACK_IMPORTED_MODULE_30__["CoreModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_66__["FlexModule"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_66__["FlexModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_67__["ExtendedModule"], _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_67__["ExtendedModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_flex_layout_grid__WEBPACK_IMPORTED_MODULE_68__["GridModule"], _angular_flex_layout_grid__WEBPACK_IMPORTED_MODULE_68__["GridModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_flex_layout__WEBPACK_IMPORTED_MODULE_69__["FlexLayoutModule"], _angular_flex_layout__WEBPACK_IMPORTED_MODULE_69__["FlexLayoutModule"], [_angular_flex_layout_core__WEBPACK_IMPORTED_MODULE_30__["SERVER_TOKEN"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["PLATFORM_ID"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_70__["MatProgressSpinnerModule"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_70__["MatProgressSpinnerModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_26__["MatLineModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_26__["MatLineModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_divider__WEBPACK_IMPORTED_MODULE_71__["MatDividerModule"], _angular_material_divider__WEBPACK_IMPORTED_MODULE_71__["MatDividerModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_list__WEBPACK_IMPORTED_MODULE_72__["MatListModule"], _angular_material_list__WEBPACK_IMPORTED_MODULE_72__["MatListModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_31__["MatDatepickerModule"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_31__["MatDatepickerModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_forms__WEBPACK_IMPORTED_MODULE_32__["ɵangular_packages_forms_forms_d"], _angular_forms__WEBPACK_IMPORTED_MODULE_32__["ɵangular_packages_forms_forms_d"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_forms__WEBPACK_IMPORTED_MODULE_32__["ReactiveFormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_32__["ReactiveFormsModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_33__["MatTooltipModule"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_33__["MatTooltipModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_select__WEBPACK_IMPORTED_MODULE_34__["MatSelectModule"], _angular_material_select__WEBPACK_IMPORTED_MODULE_34__["MatSelectModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_73__["MatGridListModule"], _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_73__["MatGridListModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_accordion__WEBPACK_IMPORTED_MODULE_74__["CdkAccordionModule"], _angular_cdk_accordion__WEBPACK_IMPORTED_MODULE_74__["CdkAccordionModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_75__["MatExpansionModule"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_75__["MatExpansionModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_76__["MatButtonToggleModule"], _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_76__["MatButtonToggleModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, ngx_md__WEBPACK_IMPORTED_MODULE_35__["NgxMdModule"], ngx_md__WEBPACK_IMPORTED_MODULE_35__["NgxMdModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_26__["NativeDateModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_26__["NativeDateModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_26__["MatNativeDateModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_26__["MatNativeDateModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_router__WEBPACK_IMPORTED_MODULE_77__["RouterModule"], _angular_router__WEBPACK_IMPORTED_MODULE_77__["RouterModule"], [[2, _angular_router__WEBPACK_IMPORTED_MODULE_77__["ɵangular_packages_router_router_a"]], [2, _angular_router__WEBPACK_IMPORTED_MODULE_77__["Router"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_sort__WEBPACK_IMPORTED_MODULE_39__["MatSortModule"], _angular_material_sort__WEBPACK_IMPORTED_MODULE_39__["MatSortModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_forms__WEBPACK_IMPORTED_MODULE_32__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_32__["FormsModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _core_core_module__WEBPACK_IMPORTED_MODULE_78__["CoreModule"], _core_core_module__WEBPACK_IMPORTED_MODULE_78__["CoreModule"], [_core_service_component_registry_service__WEBPACK_IMPORTED_MODULE_79__["ComponentRegistryService"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_radio__WEBPACK_IMPORTED_MODULE_80__["MatRadioModule"], _angular_material_radio__WEBPACK_IMPORTED_MODULE_80__["MatRadioModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_81__["_MatCheckboxRequiredValidatorModule"], _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_81__["_MatCheckboxRequiredValidatorModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_81__["MatCheckboxModule"], _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_81__["MatCheckboxModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, angular2_toaster_src_toaster_module__WEBPACK_IMPORTED_MODULE_82__["ToasterModule"], angular2_toaster_src_toaster_module__WEBPACK_IMPORTED_MODULE_82__["ToasterModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _graph_graph_module__WEBPACK_IMPORTED_MODULE_83__["GraphModule"], _graph_graph_module__WEBPACK_IMPORTED_MODULE_83__["GraphModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _pattern_language_management_module__WEBPACK_IMPORTED_MODULE_1__["PatternLanguageManagementModule"], _pattern_language_management_module__WEBPACK_IMPORTED_MODULE_1__["PatternLanguageManagementModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](256, _angular_material_chips__WEBPACK_IMPORTED_MODULE_63__["MAT_CHIPS_DEFAULT_OPTIONS"], { separatorKeyCodes: [_angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_84__["ENTER"]] }, []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](256, _angular_material_core__WEBPACK_IMPORTED_MODULE_26__["MAT_DATE_FORMATS"], _angular_material_core__WEBPACK_IMPORTED_MODULE_26__["MAT_NATIVE_DATE_FORMATS"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1024, _angular_router__WEBPACK_IMPORTED_MODULE_77__["ROUTES"], function () { return [[{ path: "", component: _pattern_language_management_pattern_language_management_component__WEBPACK_IMPORTED_MODULE_85__["PatternLanguageManagementComponent"] }, { path: ":patternLanguageId", component: _pattern_language_container_pattern_language_container_component__WEBPACK_IMPORTED_MODULE_86__["PatternLanguageContainerComponent"] }, { path: ":patternLanguageId/create-patterns", component: _create_pattern_create_pattern_component__WEBPACK_IMPORTED_MODULE_87__["CreatePatternComponent"] }, { path: ":patternLanguageId/:patternId", component: _pattern_container_pattern_container_component__WEBPACK_IMPORTED_MODULE_88__["PatternContainerComponent"] }]]; }, [])]); });



/***/ }),

/***/ "./src/app/pattern-language-management/pattern-language-management.module.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/pattern-language-management/pattern-language-management.module.ts ***!
  \***********************************************************************************/
/*! exports provided: PL_ROUTES, PatternLanguageManagementModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PL_ROUTES", function() { return PL_ROUTES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatternLanguageManagementModule", function() { return PatternLanguageManagementModule; });
/* harmony import */ var _pattern_language_management_pattern_language_management_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pattern-language-management/pattern-language-management.component */ "./src/app/pattern-language-management/pattern-language-management/pattern-language-management.component.ts");
/* harmony import */ var _pattern_language_container_pattern_language_container_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pattern-language-container/pattern-language-container.component */ "./src/app/pattern-language-management/pattern-language-container/pattern-language-container.component.ts");
/* harmony import */ var _pattern_container_pattern_container_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pattern-container/pattern-container.component */ "./src/app/pattern-language-management/pattern-container/pattern-container.component.ts");
/* harmony import */ var _create_pattern_create_pattern_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./create-pattern/create-pattern.component */ "./src/app/pattern-language-management/create-pattern/create-pattern.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
 // tslint:disable-line:max-line-length




/*
 * Copyright (c) 2018 University of Stuttgart.
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0, or the Apache Software License 2.0
 * which is available at https://www.apache.org/licenses/LICENSE-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
 */
var PL_ROUTES = [
    {
        path: '',
        component: _pattern_language_management_pattern_language_management_component__WEBPACK_IMPORTED_MODULE_0__["PatternLanguageManagementComponent"]
    }, {
        path: ':patternLanguageId',
        component: _pattern_language_container_pattern_language_container_component__WEBPACK_IMPORTED_MODULE_1__["PatternLanguageContainerComponent"],
    }, {
        path: ':patternLanguageId/create-patterns',
        component: _create_pattern_create_pattern_component__WEBPACK_IMPORTED_MODULE_3__["CreatePatternComponent"],
    },
    {
        path: ':patternLanguageId/:patternId',
        component: _pattern_container_pattern_container_component__WEBPACK_IMPORTED_MODULE_2__["PatternContainerComponent"]
    }
];
var PatternLanguageManagementModule = /** @class */ (function () {
    function PatternLanguageManagementModule() {
    }
    return PatternLanguageManagementModule;
}());



/***/ }),

/***/ "./src/app/pattern-language-management/pattern-language-management/pattern-language-management.component.ngfactory.js":
/*!****************************************************************************************************************************!*\
  !*** ./src/app/pattern-language-management/pattern-language-management/pattern-language-management.component.ngfactory.js ***!
  \****************************************************************************************************************************/
/*! exports provided: RenderType_PatternLanguageManagementComponent, View_PatternLanguageManagementComponent_0, View_PatternLanguageManagementComponent_Host_0, PatternLanguageManagementComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_PatternLanguageManagementComponent", function() { return RenderType_PatternLanguageManagementComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_PatternLanguageManagementComponent_0", function() { return View_PatternLanguageManagementComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_PatternLanguageManagementComponent_Host_0", function() { return View_PatternLanguageManagementComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatternLanguageManagementComponentNgFactory", function() { return PatternLanguageManagementComponentNgFactory; });
/* harmony import */ var _pattern_language_management_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pattern-language-management.component.scss.shim.ngstyle */ "./src/app/pattern-language-management/pattern-language-management/pattern-language-management.component.scss.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/fesm5/card.js");
/* harmony import */ var _node_modules_angular_material_card_index_ngfactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/@angular/material/card/index.ngfactory */ "./node_modules/@angular/material/card/index.ngfactory.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _node_modules_angular_material_button_index_ngfactory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../node_modules/@angular/material/button/index.ngfactory */ "./node_modules/@angular/material/button/index.ngfactory.js");
/* harmony import */ var _angular_material_badge__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/badge */ "./node_modules/@angular/material/fesm5/badge.js");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/cdk/a11y */ "./node_modules/@angular/cdk/fesm5/a11y.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/fesm5/button.js");
/* harmony import */ var _core_component_action_button_bar_action_button_bar_component_ngfactory__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../core/component/action-button-bar/action-button-bar.component.ngfactory */ "./src/app/core/component/action-button-bar/action-button-bar.component.ngfactory.js");
/* harmony import */ var _core_component_action_button_bar_action_button_bar_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../core/component/action-button-bar/action-button-bar.component */ "./src/app/core/component/action-button-bar/action-button-bar.component.ts");
/* harmony import */ var _pattern_language_management_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./pattern-language-management.component */ "./src/app/pattern-language-management/pattern-language-management/pattern-language-management.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/fesm5/dialog.js");
/* harmony import */ var ngx_cookie_service_cookie_service_cookie_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ngx-cookie-service/cookie-service/cookie.service */ "./node_modules/ngx-cookie-service/cookie-service/cookie.service.js");
/* harmony import */ var angular2_toaster_src_toaster_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! angular2-toaster/src/toaster.service */ "./node_modules/angular2-toaster/src/toaster.service.js");
/* harmony import */ var _core_service_pattern_language_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../core/service/pattern-language.service */ "./src/app/core/service/pattern-language.service.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 * /*
 * Copyright (c) 2018 University of Stuttgart.
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0, or the Apache Software License 2.0
 * which is available at https://www.apache.org/licenses/LICENSE-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0

 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes,extraRequire}
 * tslint:disable
 */ 


















var styles_PatternLanguageManagementComponent = [_pattern_language_management_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_PatternLanguageManagementComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_PatternLanguageManagementComponent, data: {} });

function View_PatternLanguageManagementComponent_2(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "img", [["class", "mat-card-avatar"], ["mat-card-avatar", ""]], [[8, "src", 4]], null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 16384, null, 0, _angular_material_card__WEBPACK_IMPORTED_MODULE_2__["MatCardAvatar"], [], null, null)], null, function (_ck, _v) { var currVal_0 = _v.parent.context.$implicit.logo; _ck(_v, 0, 0, currVal_0); }); }
function View_PatternLanguageManagementComponent_3(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "img", [["class", "mat-card-avatar"], ["mat-card-avatar", ""]], [[8, "src", 4]], null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 16384, null, 0, _angular_material_card__WEBPACK_IMPORTED_MODULE_2__["MatCardAvatar"], [], null, null)], null, function (_ck, _v) { var currVal_0 = "//via.placeholder.com/50x50"; _ck(_v, 0, 0, currVal_0); }); }
function View_PatternLanguageManagementComponent_4(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "mat-card-title", [["class", "mat-card-title"], ["style", "width: 10rem; word-break: break-word;"]], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 16384, null, 0, _angular_material_card__WEBPACK_IMPORTED_MODULE_2__["MatCardTitle"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](2, null, [" ", " "]))], null, function (_ck, _v) { var currVal_0 = _v.parent.context.$implicit.name; _ck(_v, 2, 0, currVal_0); }); }
function View_PatternLanguageManagementComponent_5(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "mat-card-title", [["class", "mat-card-title"], ["style", "width: 10rem"]], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 16384, null, 0, _angular_material_card__WEBPACK_IMPORTED_MODULE_2__["MatCardTitle"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" No Name Provided "]))], null, null); }
function View_PatternLanguageManagementComponent_6(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "img", [["class", "mat-card-image"], ["mat-card-image", ""]], [[8, "src", 4]], null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 16384, null, 0, _angular_material_card__WEBPACK_IMPORTED_MODULE_2__["MatCardImage"], [], null, null)], null, function (_ck, _v) { var currVal_0 = _v.parent.context.$implicit.logo; _ck(_v, 0, 0, currVal_0); }); }
function View_PatternLanguageManagementComponent_7(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "img", [["class", "mat-card-image"], ["mat-card-image", ""]], [[8, "src", 4]], null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 16384, null, 0, _angular_material_card__WEBPACK_IMPORTED_MODULE_2__["MatCardImage"], [], null, null)], null, function (_ck, _v) { var currVal_0 = "//via.placeholder.com/200x300"; _ck(_v, 0, 0, currVal_0); }); }
function View_PatternLanguageManagementComponent_1(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 21, "mat-card", [["class", "landing-card mat-card mat-focus-indicator"]], [[2, "_mat-animation-noopable", null]], null, null, _node_modules_angular_material_card_index_ngfactory__WEBPACK_IMPORTED_MODULE_3__["View_MatCard_0"], _node_modules_angular_material_card_index_ngfactory__WEBPACK_IMPORTED_MODULE_3__["RenderType_MatCard"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 49152, null, 0, _angular_material_card__WEBPACK_IMPORTED_MODULE_2__["MatCard"], [[2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["ANIMATION_MODULE_TYPE"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](2, 0, null, 0, 7, "mat-card-header", [["class", "mat-card-header"]], null, null, null, _node_modules_angular_material_card_index_ngfactory__WEBPACK_IMPORTED_MODULE_3__["View_MatCardHeader_0"], _node_modules_angular_material_card_index_ngfactory__WEBPACK_IMPORTED_MODULE_3__["RenderType_MatCardHeader"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](3, 49152, null, 0, _angular_material_card__WEBPACK_IMPORTED_MODULE_2__["MatCardHeader"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, 0, 1, null, View_PatternLanguageManagementComponent_2)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](5, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"], ngIfElse: [1, "ngIfElse"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](0, [["noImageAvatar", 2]], 2, 0, null, View_PatternLanguageManagementComponent_3)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, 1, 1, null, View_PatternLanguageManagementComponent_4)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](8, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"], ngIfElse: [1, "ngIfElse"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](0, [["noPLName", 2]], 2, 0, null, View_PatternLanguageManagementComponent_5)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, 0, 1, null, View_PatternLanguageManagementComponent_6)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](11, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"], ngIfElse: [1, "ngIfElse"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](0, [["noImage", 2]], 0, 0, null, View_PatternLanguageManagementComponent_7)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](13, 0, null, 0, 8, "mat-card-actions", [["class", "mat-card-actions"]], [[2, "mat-card-actions-align-end", null]], null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](14, 16384, null, 0, _angular_material_card__WEBPACK_IMPORTED_MODULE_2__["MatCardActions"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](15, 0, null, null, 6, "div", [["style", "text-align: center"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](16, 0, null, null, 5, "button", [["class", "mat-badge mat-focus-indicator"], ["color", "primary"], ["mat-stroked-button", ""]], [[2, "mat-badge-overlap", null], [2, "mat-badge-above", null], [2, "mat-badge-below", null], [2, "mat-badge-before", null], [2, "mat-badge-after", null], [2, "mat-badge-small", null], [2, "mat-badge-medium", null], [2, "mat-badge-large", null], [2, "mat-badge-hidden", null], [2, "mat-badge-disabled", null], [1, "disabled", 0], [2, "_mat-animation-noopable", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.navigateToPL(_v.context.$implicit.id) !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_material_button_index_ngfactory__WEBPACK_IMPORTED_MODULE_6__["View_MatButton_0"], _node_modules_angular_material_button_index_ngfactory__WEBPACK_IMPORTED_MODULE_6__["RenderType_MatButton"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](17, 671744, null, 0, _angular_material_badge__WEBPACK_IMPORTED_MODULE_7__["MatBadge"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_8__["AriaDescriber"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["ANIMATION_MODULE_TYPE"]]], { content: [0, "content"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](18, 180224, null, 0, _angular_material_button__WEBPACK_IMPORTED_MODULE_9__["MatButton"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_8__["FocusMonitor"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["ANIMATION_MODULE_TYPE"]]], { color: [0, "color"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](19, 0, null, 0, 1, "i", [["class", "material-icons"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["pageview"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, 0, ["View "]))], function (_ck, _v) { var currVal_1 = (((_v.context.$implicit == null) ? null : _v.context.$implicit.logo) && (((_v.context.$implicit == null) ? null : _v.context.$implicit.logo) !== "")); var currVal_2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6); _ck(_v, 5, 0, currVal_1, currVal_2); var currVal_3 = (((_v.context.$implicit == null) ? null : _v.context.$implicit.name) && ("" !== _v.context.$implicit.name)); var currVal_4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 9); _ck(_v, 8, 0, currVal_3, currVal_4); var currVal_5 = (((_v.context.$implicit == null) ? null : _v.context.$implicit.logo) && (((_v.context.$implicit == null) ? null : _v.context.$implicit.logo) !== "")); var currVal_6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12); _ck(_v, 11, 0, currVal_5, currVal_6); var currVal_20 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵinlineInterpolate"](1, "", ((_v.context.$implicit == null) ? null : _v.context.$implicit.patternCount), ""); _ck(_v, 17, 0, currVal_20); var currVal_21 = "primary"; _ck(_v, 18, 0, currVal_21); }, function (_ck, _v) { var currVal_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._animationMode === "NoopAnimations"); _ck(_v, 0, 0, currVal_0); var currVal_7 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 14).align === "end"); _ck(_v, 13, 0, currVal_7); var currVal_8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 17).overlap; var currVal_9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 17).isAbove(); var currVal_10 = !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 17).isAbove(); var currVal_11 = !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 17).isAfter(); var currVal_12 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 17).isAfter(); var currVal_13 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 17).size === "small"); var currVal_14 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 17).size === "medium"); var currVal_15 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 17).size === "large"); var currVal_16 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 17).hidden || !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 17)._hasContent); var currVal_17 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 17).disabled; var currVal_18 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18).disabled || null); var currVal_19 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18)._animationMode === "NoopAnimations"); _ck(_v, 16, 1, [currVal_8, currVal_9, currVal_10, currVal_11, currVal_12, currVal_13, currVal_14, currVal_15, currVal_16, currVal_17, currVal_18, currVal_19]); }); }
function View_PatternLanguageManagementComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "pp-action-button-bar", [], null, [[null, "addClicked"], [null, "reloadClicked"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("addClicked" === en)) {
        var pd_0 = (_co.goToPatternLanguageCreation() !== false);
        ad = (pd_0 && ad);
    } if (("reloadClicked" === en)) {
        var pd_1 = (_co.reloadPatternRepo() !== false);
        ad = (pd_1 && ad);
    } return ad; }, _core_component_action_button_bar_action_button_bar_component_ngfactory__WEBPACK_IMPORTED_MODULE_10__["View_ActionButtonBarComponent_0"], _core_component_action_button_bar_action_button_bar_component_ngfactory__WEBPACK_IMPORTED_MODULE_10__["RenderType_ActionButtonBarComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 114688, null, 0, _core_component_action_button_bar_action_button_bar_component__WEBPACK_IMPORTED_MODULE_11__["ActionButtonBarComponent"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ApplicationRef"]], { addButtonText: [0, "addButtonText"], reloadButton: [1, "reloadButton"], goBackButton: [2, "goBackButton"] }, { addClicked: "addClicked", reloadClicked: "reloadClicked" }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](2, 0, null, null, 2, "div", [["class", "container"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_PatternLanguageManagementComponent_1)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](4, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"]], { ngForOf: [0, "ngForOf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = "Add"; var currVal_1 = true; var currVal_2 = false; _ck(_v, 1, 0, currVal_0, currVal_1, currVal_2); var currVal_3 = _co.patternLanguages; _ck(_v, 4, 0, currVal_3); }, null); }
function View_PatternLanguageManagementComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "pp-pattern-language-management", [], null, null, null, View_PatternLanguageManagementComponent_0, RenderType_PatternLanguageManagementComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 114688, null, 0, _pattern_language_management_component__WEBPACK_IMPORTED_MODULE_12__["PatternLanguageManagementComponent"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], _angular_router__WEBPACK_IMPORTED_MODULE_13__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_13__["ActivatedRoute"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_14__["MatDialog"], ngx_cookie_service_cookie_service_cookie_service__WEBPACK_IMPORTED_MODULE_15__["CookieService"], angular2_toaster_src_toaster_service__WEBPACK_IMPORTED_MODULE_16__["ToasterService"], _core_service_pattern_language_service__WEBPACK_IMPORTED_MODULE_17__["PatternLanguageService"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var PatternLanguageManagementComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("pp-pattern-language-management", _pattern_language_management_component__WEBPACK_IMPORTED_MODULE_12__["PatternLanguageManagementComponent"], View_PatternLanguageManagementComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/pattern-language-management/pattern-language-management/pattern-language-management.component.scss.shim.ngstyle.js":
/*!************************************************************************************************************************************!*\
  !*** ./src/app/pattern-language-management/pattern-language-management/pattern-language-management.component.scss.shim.ngstyle.js ***!
  \************************************************************************************************************************************/
/*! exports provided: styles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 * /*
 * Copyright (c) 2018 University of Stuttgart.
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0, or the Apache Software License 2.0
 * which is available at https://www.apache.org/licenses/LICENSE-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0

 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes,extraRequire}
 * tslint:disable
 */ 
var styles = [".add-card[_ngcontent-%COMP%]:not(:hover)   #hideIfNotHovered[_ngcontent-%COMP%] {\n  display: none;\n}\n.landing-card[_ngcontent-%COMP%] {\n  min-height: 20rem !important;\n  min-width: 13rem !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RyYXZpcy9idWlsZC9QYXR0ZXJuUGVkaWEvcGF0dGVybi1wZWRpYS12aWV3cy11aS9zcmMvYXBwL3BhdHRlcm4tbGFuZ3VhZ2UtbWFuYWdlbWVudC9wYXR0ZXJuLWxhbmd1YWdlLW1hbmFnZW1lbnQvcGF0dGVybi1sYW5ndWFnZS1tYW5hZ2VtZW50LmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9wYXR0ZXJuLWxhbmd1YWdlLW1hbmFnZW1lbnQvcGF0dGVybi1sYW5ndWFnZS1tYW5hZ2VtZW50L3BhdHRlcm4tbGFuZ3VhZ2UtbWFuYWdlbWVudC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7O0VBQUE7QUFlRTtFQUNFLGFBQUE7QUNESjtBREtBO0VBQ0UsNEJBQUE7RUFDQSwyQkFBQTtBQ0ZGIiwiZmlsZSI6InNyYy9hcHAvcGF0dGVybi1sYW5ndWFnZS1tYW5hZ2VtZW50L3BhdHRlcm4tbGFuZ3VhZ2UtbWFuYWdlbWVudC9wYXR0ZXJuLWxhbmd1YWdlLW1hbmFnZW1lbnQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIENvcHlyaWdodCAoYykgMjAxOCBVbml2ZXJzaXR5IG9mIFN0dXR0Z2FydC5cbiAqXG4gKiBTZWUgdGhlIE5PVElDRSBmaWxlKHMpIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsXG4gKiBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cbiAqXG4gKiBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGVcbiAqIHRlcm1zIG9mIHRoZSBFY2xpcHNlIFB1YmxpYyBMaWNlbnNlIDIuMCB3aGljaCBpcyBhdmFpbGFibGUgYXRcbiAqIGh0dHA6Ly93d3cuZWNsaXBzZS5vcmcvbGVnYWwvZXBsLTIuMCwgb3IgdGhlIEFwYWNoZSBTb2Z0d2FyZSBMaWNlbnNlIDIuMFxuICogd2hpY2ggaXMgYXZhaWxhYmxlIGF0IGh0dHBzOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjAuXG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEVQTC0yLjAgT1IgQXBhY2hlLTIuMFxuICovXG5cbi5hZGQtY2FyZDpub3QoOmhvdmVyKSB7XG4gICNoaWRlSWZOb3RIb3ZlcmVkIHtcbiAgICBkaXNwbGF5OiBub25lO1xuICB9XG59XG5cbi5sYW5kaW5nLWNhcmQge1xuICBtaW4taGVpZ2h0OiAyMHJlbSAhaW1wb3J0YW50O1xuICBtaW4td2lkdGg6IDEzcmVtICFpbXBvcnRhbnQ7XG59XG4iLCIvKiFcbiAqIENvcHlyaWdodCAoYykgMjAxOCBVbml2ZXJzaXR5IG9mIFN0dXR0Z2FydC5cbiAqXG4gKiBTZWUgdGhlIE5PVElDRSBmaWxlKHMpIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsXG4gKiBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cbiAqXG4gKiBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGVcbiAqIHRlcm1zIG9mIHRoZSBFY2xpcHNlIFB1YmxpYyBMaWNlbnNlIDIuMCB3aGljaCBpcyBhdmFpbGFibGUgYXRcbiAqIGh0dHA6Ly93d3cuZWNsaXBzZS5vcmcvbGVnYWwvZXBsLTIuMCwgb3IgdGhlIEFwYWNoZSBTb2Z0d2FyZSBMaWNlbnNlIDIuMFxuICogd2hpY2ggaXMgYXZhaWxhYmxlIGF0IGh0dHBzOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjAuXG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEVQTC0yLjAgT1IgQXBhY2hlLTIuMFxuICovXG4uYWRkLWNhcmQ6bm90KDpob3ZlcikgI2hpZGVJZk5vdEhvdmVyZWQge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4ubGFuZGluZy1jYXJkIHtcbiAgbWluLWhlaWdodDogMjByZW0gIWltcG9ydGFudDtcbiAgbWluLXdpZHRoOiAxM3JlbSAhaW1wb3J0YW50O1xufSJdfQ== */"];



/***/ }),

/***/ "./src/app/pattern-language-management/pattern-language-management/pattern-language-management.component.ts":
/*!******************************************************************************************************************!*\
  !*** ./src/app/pattern-language-management/pattern-language-management/pattern-language-management.component.ts ***!
  \******************************************************************************************************************/
/*! exports provided: PatternLanguageManagementComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatternLanguageManagementComponent", function() { return PatternLanguageManagementComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/fesm5/dialog.js");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/index.js");
/* harmony import */ var angular2_toaster__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angular2-toaster */ "./node_modules/angular2-toaster/angular2-toaster.js");
/* harmony import */ var _core_service_pattern_language_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/service/pattern-language.service */ "./src/app/core/service/pattern-language.service.ts");
/* harmony import */ var _core_component_create_edit_pattern_language_create_edit_pattern_language_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/component/create-edit-pattern-language/create-edit-pattern-language.component */ "./src/app/core/component/create-edit-pattern-language/create-edit-pattern-language.component.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/*
 * Copyright (c) 2018 University of Stuttgart.
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0, or the Apache Software License 2.0
 * which is available at https://www.apache.org/licenses/LICENSE-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
 */
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};








var PatternLanguageManagementComponent = /** @class */ (function () {
    function PatternLanguageManagementComponent(cdr, router, activatedRoute, zone, dialog, _cookieService, _toasterService, patternLanguageService) {
        this.cdr = cdr;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.zone = zone;
        this.dialog = dialog;
        this._cookieService = _cookieService;
        this._toasterService = _toasterService;
        this.patternLanguageService = patternLanguageService;
    }
    // function used to sort the patternlanguages (by name)
    PatternLanguageManagementComponent.sortPatternLanguages = function (pl1, pl2) {
        if (pl1.name > pl2.name) {
            return 1;
        }
        if (pl1.name < pl2.name) {
            return -1;
        }
        return 0;
    };
    PatternLanguageManagementComponent.prototype.ngOnInit = function () {
        this.patternLanguages = Array.from(this.activatedRoute.snapshot.data.patternlanguages.values())
            .sort(PatternLanguageManagementComponent.sortPatternLanguages);
    };
    // reload the current data from https://purl.org/patternpedia that contains all patternlangauges
    PatternLanguageManagementComponent.prototype.reloadPatternRepo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.patternLanguageService.getPatternLanguages()
                    .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["map"])(function (result) { return result.sort(PatternLanguageManagementComponent.sortPatternLanguages); }))
                    .subscribe(function (result) {
                    _this.patternLanguages = result;
                    _this._toasterService.pop('success', 'Reloaded Pattern Languages');
                    _this.cdr.detectChanges();
                    return result;
                });
                this.cdr.detectChanges();
                return [2 /*return*/];
            });
        });
    };
    PatternLanguageManagementComponent.prototype.navigateToPL = function (id) {
        var _this = this;
        this.zone.run(function () {
            _this.router.navigate([id], { relativeTo: _this.activatedRoute });
        });
    };
    PatternLanguageManagementComponent.prototype.goToPatternLanguageCreation = function () {
        var _this = this;
        var dialogRef = this.dialog.open(_core_component_create_edit_pattern_language_create_edit_pattern_language_component__WEBPACK_IMPORTED_MODULE_6__["CreateEditPatternLanguageComponent"], { data: { isPatternLanguageCreation: true } });
        // Save PatternLanguage when user presses save
        dialogRef.componentInstance.saveClicked
            .subscribe(function (result) {
            var patternLanguage = result.dialogResult;
            _this.patternLanguageService.savePatternLanguage(patternLanguage)
                .subscribe(function () {
                _this.patternLanguageService.getPatternLanguages()
                    .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["map"])(function (patternLanguageModels) { return patternLanguageModels.sort(PatternLanguageManagementComponent.sortPatternLanguages); }))
                    .subscribe(function (patternLanguageModels) {
                    _this.patternLanguages = patternLanguageModels;
                });
                _this._toasterService.pop('success', 'Pattern Language created');
            }, function (err) {
                console.error(err);
                _this._toasterService.pop('error', 'Error occurred', JSON.stringify(err));
            });
        });
    };
    return PatternLanguageManagementComponent;
}());



/***/ })

}]);
//# sourceMappingURL=pattern-language-management-pattern-language-management-module-ngfactory.js.map