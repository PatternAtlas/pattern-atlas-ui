import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ppPatternproperty]'
})
export class PatternpropertyDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
