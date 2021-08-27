import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignModelRoutingModule } from './design-model-routing.module';
import { CoreModule } from '../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { ConcreteSolutionService } from './service/concrete-solution.service';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';

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
    MatTreeModule,
    MatSelectModule,
    FormsModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatInputModule,
  ],
  providers: [
    ConcreteSolutionService,
    DesignModelService,
    { provide: GraphDataService, useClass: DesignModelService }
  ]
})
export class DesignModelModule {
}
