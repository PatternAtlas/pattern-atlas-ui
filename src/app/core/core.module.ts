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

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultPlRendererComponent } from './default-pl-renderer/default-pl-renderer.component';
import { DefaultPatternRendererComponent } from './default-pattern-renderer/default-pattern-renderer.component';
import { ComponentRegistryService } from './service/component-registry.service';
import { PrettyJsonModule } from 'angular2-prettyjson';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TextFieldModule } from '@angular/cdk/text-field';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MdEditorComponent } from './component/md-editor/md-editor.component';
import { CovalentTextEditorModule } from '@covalent/text-editor';
import { EmitEventOnKeyupDirective } from './directives/emit-event-on-keyup.directive';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavigateBackComponent } from './component/navigate-back/navigate-back.component';
import { PatternPropertyDirective } from './component/markdown-content-container/pattern-property.directive';
import { DividerComponent } from './component/divider/divider.component';
import { NgxMdModule } from 'ngx-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreatePatternRelationComponent } from './component/create-pattern-relation/create-pattern-relation.component';
import { MarkdownPatternSectionContentComponent } from './component/markdown-content-container/markdown-pattern-sectioncontent/markdown-pattern-section-content.component'; // eslint-disable-line max-len
import { PatternLanguageService } from './service/pattern-language.service';
import { PatternService } from './service/pattern.service';
import { GraphDisplayComponent } from './component/graph-display/graph-display.component';
import { CardRendererComponent } from './component/cardrenderer/card-renderer.component';
import { CandidateRendererComponent } from './component/candidate-renderer/candidate-renderer.component';
import { PatternViewService } from './service/pattern-view.service';
import { CreateEditPatternLanguageComponent } from './component/create-edit-pattern-language/create-edit-pattern-language.component';
import { ActionButtonBarComponent } from './component/action-button-bar/action-button-bar.component';
import { EmitEventOnAddedEdgeDirective } from './directives/emit-event-on-added-edge.directive';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { ToggleRendererComponent } from './component/toggle-renderer/toggle-renderer.component';
import { DeletePatternRelationComponent } from './component/delete-pattern-relation/delete-pattern-relation.component';
import { CreativeLicenseFooterComponent } from './component/creative-license-footer/creative-license-footer.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommentDialogComponent } from './component/markdown-content-container/comment-dialog/comment-dialog.component';
import { DiscussDialogComponent } from './component/markdown-content-container/discuss-dialog/discuss-dialog.component';
import { ImageService } from './service/image.service';
import { DiscussionService } from './service/discussion.service';
import { RatingComponent } from './component/rating/rating.component';
import { CommentListComponent } from './component/comment-list/comment-list.component';
import { MatSortModule } from '@angular/material/sort';
import { UserService } from './user-management/_services/user.service';
import { UserStore } from './user-management/_store/user.store';
import { IssueManagementService } from './issue-management/_services/issue-management.service';
import { IssueManagementStore } from './issue-management/_store/issue-management-store';
import { CandidateManagementService } from './candidate-management/_services/candidate-management.service';
import { CandidateManagementStore } from './candidate-management';
import { AuthorManagementService } from './author-management';
import { CommentListItemComponent } from './component/comment-list-item/comment-list-item.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PatternLanguagePickerComponent } from './component/pattern-language-picker/pattern-language-picker.component';
import { AuthorPickerComponent } from './component/author-picker/author-picker.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import { ConfirmDialogComponent } from './component/confirm-dialog/confirm-dialog.component';
import { EvidenceListComponent } from './component/evidence-list/evidence-list.component';
import { EvidenceDialogComponent } from './component/evidence-dialog/evidence-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RatingMultipleComponent } from './component/rating-multiple/rating-multiple.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SelectPatternDialogComponent } from './component/select-pattern-dialog/select-pattern-dialog.component';
import { DeleteConfirmationDialogComponent } from './component/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { EditUrlDialogComponent } from './component/edit-url-dialog/edit-url-dialog.component';
import { FeatureToggleDialogComponent } from './component/feature-toggle-dialog/feature-toggle-dialog.component';
import { PatternAtlasUiFeatureToggleModule } from './directives/pattern-atlas-ui-feature-toggle.module';
import { DialoggraphComponent } from './component/dialoggraph/dialoggraph.component';
import { CreateAlgorithmComponent } from './component/create-algorithm/create-algorithm.component';
import { TextmatcherComponent } from './component/textmatcher/textmatcher.component';
import { MatTableModule } from '@angular/material/table';
import { DeleteAlgorithmComponent } from './component/delete-algorithm/delete-algorithm.component';

@NgModule({
  imports: [
    CommonModule,
    DragDropModule,
    PrettyJsonModule,
    MatButtonModule,
    TextFieldModule,
    CovalentTextEditorModule,
    MatCardModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatDatepickerModule, MatInputModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatSelectModule,
    MatDialogModule, MatGridListModule, MatSidenavModule,
    MatAutocompleteModule,
    MatIconModule, MatToolbarModule,
    MatBadgeModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatTabsModule,
    NgxMdModule.forRoot(),
    MatNativeDateModule,
    RouterModule,
    MatSortModule,
    FormsModule,
    ScrollingModule,
    MatRadioModule,
    MatChipsModule,
    MatCheckboxModule,
    MatSnackBarModule,
	MatTableModule,
    PatternAtlasUiFeatureToggleModule
  ],
  exports: [
    CovalentTextEditorModule,
    EmitEventOnKeyupDirective,
    EmitEventOnAddedEdgeDirective,
    MatProgressSpinnerModule,
    NavigateBackComponent,
    CardRendererComponent,
    CandidateRendererComponent,
    ActionButtonBarComponent,
    RatingComponent,
    RatingMultipleComponent,
    CommentListComponent,
    ToggleRendererComponent,
    GraphDisplayComponent,
    PatternLanguagePickerComponent,
    AuthorPickerComponent,
    EvidenceListComponent,
  ]
  ,
  providers: [
    PatternLanguageService,
    PatternService,
    PatternViewService,
    // USER
    UserService,
    UserStore,
    // ISSUE
    IssueManagementService,
    IssueManagementStore,
    // CANDIDATE
    CandidateManagementService,
    CandidateManagementStore,
    // SHARED
    AuthorManagementService,
    // IMAGE & DISCUSSION
    ImageService,
    DiscussionService
  ],
  declarations: [
    DefaultPlRendererComponent,
    DefaultPatternRendererComponent,
    MdEditorComponent,
    EmitEventOnKeyupDirective,
    EmitEventOnAddedEdgeDirective,
    NavigateBackComponent,
    PatternPropertyDirective,
    DividerComponent,
    CreatePatternRelationComponent,
    MarkdownPatternSectionContentComponent,
    GraphDisplayComponent,
    CardRendererComponent,
    CandidateRendererComponent,
    CreateEditPatternLanguageComponent,
    ActionButtonBarComponent,
    RatingComponent,
    CommentListComponent,
    ToggleRendererComponent,
    DeletePatternRelationComponent,
    CreativeLicenseFooterComponent,
    CommentListItemComponent,
    PatternLanguagePickerComponent,
    AuthorPickerComponent,
    ConfirmDialogComponent,
    EvidenceListComponent,
    EvidenceDialogComponent,
    RatingMultipleComponent,
    CommentDialogComponent,
    DiscussDialogComponent,
    SelectPatternDialogComponent,
    DeleteConfirmationDialogComponent,
    EditUrlDialogComponent,
    FeatureToggleDialogComponent,
    DialoggraphComponent,
    CreateAlgorithmComponent,
    TextmatcherComponent,
    DeleteAlgorithmComponent
  ],
  entryComponents: [
    DefaultPlRendererComponent,
    DefaultPatternRendererComponent,
    MdEditorComponent,
    DividerComponent,
    CreatePatternRelationComponent,
    DeletePatternRelationComponent,
    MarkdownPatternSectionContentComponent,
    CardRendererComponent,
    CandidateRendererComponent,
    GraphDisplayComponent,
    CreateEditPatternLanguageComponent,
    ConfirmDialogComponent,
    EvidenceDialogComponent,
    CommentDialogComponent,
    DiscussDialogComponent,
    FeatureToggleDialogComponent,
	DialoggraphComponent,
	CreateAlgorithmComponent,
	TextmatcherComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoreModule {
  constructor(private cr: ComponentRegistryService) {
    this.cr.registerComponent('default', {
      plcomponent: DefaultPlRendererComponent,
      pcomponent: DefaultPatternRendererComponent
    });
  }
}
