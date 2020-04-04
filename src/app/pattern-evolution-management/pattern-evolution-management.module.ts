import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppModule } from '../app.module';
import { PatternEvolutionHomeComponent } from './pattern-evolution-home/pattern-evolution-home.component';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';

export const PATTERN_EVOLUTION_ROUTES = [
  { 
    path: '', component: PatternEvolutionHomeComponent 
  }, 
  // { path: 'some-other-route', component: SomeOtherComponent },
];

@NgModule({
  declarations: [
    PatternEvolutionHomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PATTERN_EVOLUTION_ROUTES),
    MatListModule,
    MatExpansionModule,
    MatCardModule
    // AppModule,
  ],
  exports: [
    PatternEvolutionHomeComponent,
  ]
})
export class PatternEvolutionManagementModule { }
