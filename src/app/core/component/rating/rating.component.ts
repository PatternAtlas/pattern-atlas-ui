import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Rating } from '../../model/rating.enum';

@Component({
  selector: 'pp-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input() row = true;
  @Input() rating: number;
  @Input() userRatingPast: number;
  @Output() userRatingCurrent = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  up() {
    this.userRatingCurrent.emit(Rating.UP);
  }

  down() {
    this.userRatingCurrent.emit(Rating.DOWN);
  }

}
