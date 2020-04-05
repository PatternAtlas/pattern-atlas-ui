import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppModule } from '../app.module';
import { PatternEvolutionHomeComponent } from './pattern-evolution-home/pattern-evolution-home.component';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { PatternEvolutionService } from './pattern-evolution.service';
import { PatternEvolutionDetailComponent } from './pattern-evolution-home/pattern-evolution-detail/pattern-evolution-detail.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { PatternEvolutionCreateDialogComponent } from './pattern-evolution-create-dialog/pattern-evolution-create-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export const PATTERN_EVOLUTION_ROUTES = [
  { 
    path: '', component: PatternEvolutionHomeComponent 
  }, 
  // { path: 'some-other-route', component: SomeOtherComponent },
];

@NgModule({
  declarations: [
    PatternEvolutionHomeComponent,
    PatternEvolutionDetailComponent,
    PatternEvolutionCreateDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PATTERN_EVOLUTION_ROUTES),
    // ModalModule.forRoot(),
    MatListModule,
    MatExpansionModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
    // AppModule,
  ],
  exports: [
    PatternEvolutionHomeComponent,
  ],
  providers: [
    PatternEvolutionService
  ],
  entryComponents: [
    PatternEvolutionCreateDialogComponent
  ],
})
export class PatternEvolutionManagementModule { }
