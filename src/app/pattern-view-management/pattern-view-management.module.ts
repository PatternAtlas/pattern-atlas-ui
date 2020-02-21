import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PatternViewManagementRoutingModule} from './pattern-view-management-routing.module';
import {PatternViewManagementComponent} from './pattern-view-management/pattern-view-management.component';
import {CoreModule} from '../core/core.module';
import {PatternViewRendererComponent} from './pattern-view-renderer/pattern-view-renderer.component';
import {AddToViewComponent} from './add-to-view/add-to-view.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import {MatButtonToggleModule} from '@angular/material';

@NgModule({
    declarations: [PatternViewManagementComponent, PatternViewRendererComponent, AddToViewComponent],
    imports: [
        CommonModule, MatCardModule, MatBadgeModule, MatButtonToggleModule,
        PatternViewManagementRoutingModule, CoreModule, MatToolbarModule, MatDialogModule, MatButtonModule, MatTreeModule, MatIconModule, MatCheckboxModule
    ],
    entryComponents: [AddToViewComponent]
})
export class PatternViewManagementModule {
}
