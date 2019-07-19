import { Component, OnInit } from '@angular/core';
import { DataRenderingComponent } from '../../interfaces/DataRenderingComponent.interface';

@Component({
  selector: 'pp-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent extends DataRenderingComponent implements OnInit {
  data: any;

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
