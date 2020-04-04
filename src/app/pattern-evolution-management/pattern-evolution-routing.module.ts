import { PatternEvolutionHomeComponent } from "./pattern-evolution-home/pattern-evolution-home.component";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

export const PATTERN_EVOLUTION_ROUTES = [
    { path: '', component: PatternEvolutionHomeComponent }, 
    // { path: 'some-other-route', component: SomeOtherComponent },
];

@NgModule({  imports: [
    RouterModule.forChild(PATTERN_EVOLUTION_ROUTES)
  ]
})export class PatternEvolutionRoutesModule { }