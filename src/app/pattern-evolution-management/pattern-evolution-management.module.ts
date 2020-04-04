import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppModule } from '../app.module';
import { PatternEvolutionHomeComponent } from './pattern-evolution-home/pattern-evolution-home.component';
import { PatternEvolutionRoutesModule } from './pattern-evolution-routing.module';
import { RouterModule } from '@angular/router';

export const PATTERN_EVOLUTION_ROUTES = [
  { path: '', component: PatternEvolutionHomeComponent }, 
  // { path: 'some-other-route', component: SomeOtherComponent },
];

@NgModule({
  declarations: [
    PatternEvolutionHomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PATTERN_EVOLUTION_ROUTES),
    // AppModule,
  ],
  exports: [
    PatternEvolutionHomeComponent,
  ]
})
export class PatternEvolutionManagementModule { }
