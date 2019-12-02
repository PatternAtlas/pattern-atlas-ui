import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PatternViewManagementRoutingModule} from './pattern-view-management-routing.module';
import {PatternViewManagementComponent} from './pattern-view-management/pattern-view-management.component';
import {CoreModule} from '../core/core.module';
import {PatternViewRendererComponent} from './pattern-view-renderer/pattern-view-renderer.component';
import {AddToViewComponent} from './add-to-view/add-to-view.component';
import {
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatToolbarModule,
    MatTreeModule
} from '@angular/material';

@NgModule({
    declarations: [PatternViewManagementComponent, PatternViewRendererComponent, AddToViewComponent],
    imports: [
        CommonModule, MatCardModule, MatBadgeModule,
        PatternViewManagementRoutingModule, CoreModule, MatToolbarModule, MatDialogModule, MatButtonModule, MatTreeModule, MatIconModule, MatCheckboxModule
    ],
    entryComponents: [AddToViewComponent]
})
export class PatternViewManagementModule {
}
