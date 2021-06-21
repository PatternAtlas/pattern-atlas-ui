import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'pp-toggle-renderer',
  templateUrl: './toggle-renderer.component.html',
  styleUrls: ['./toggle-renderer.component.css']
})
export class ToggleRendererComponent implements OnInit {

  @Output() toggledRenderer = new EventEmitter<boolean>();
  @Input() graphVisible: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  emitValueChange(value: any) {
    this.toggledRenderer.emit(value);
  }
}
