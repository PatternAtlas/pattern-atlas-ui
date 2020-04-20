import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pp-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input() rating: number;
  @Input() userRatingPast: number;
  @Output() userRatingCurrent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    console.log('eyy');
  }

  up() {
    this.rating += 1;
  }

  down(){
    this.rating -= 1;
  } 

}
