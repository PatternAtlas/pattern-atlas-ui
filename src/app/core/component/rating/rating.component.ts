import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Rating } from 'src/app/issue-management/issue-management.service';

@Component({
  selector: 'pp-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input() row: boolean = true;
  @Input() rating: number;
  @Input() userRatingPast: number;
  @Output() userRatingCurrent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    // console.log('eyy');
  }

  up() {
    this.userRatingCurrent.emit(Rating.UP);
  }

  down(){
    this.userRatingCurrent.emit(Rating.DOWN);
  } 

}
