import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignModelRoutingModule } from './design-model-routing.module';
import { CoreModule } from '../core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DesignModelManagementComponent } from './component/design-model-management/design-model-management.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { DesignModelService } from './service/design-model.service';
import { DesignModelRendererComponent } from './component/design-model-renderer/design-model-renderer.component';
import { GraphDataService } from '../core/service/graph-data/graph-data.service';


@NgModule({
  declarations: [
    DesignModelManagementComponent,
    DesignModelRendererComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    DesignModelRoutingModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatTreeModule
  ],
  providers: [
    DesignModelService,
    { provide: GraphDataService, useClass: DesignModelService }
  ]
})
export class DesignModelModule {
}
