import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ppPatternProperty]'
})
export class PatternPropertyDirective {

  constructor(public viewContainerRef: ViewContainerRef) {
  }

}
