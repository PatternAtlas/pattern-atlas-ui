import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { AuthenticationService } from 'src/app/authentication/_services/authentication.service';
import { PrivilegeService } from 'src/app/authentication/_services/privilege.service';
import { RatingModel } from '../../shared';

@Component({
  selector: 'pp-rating-multiple',
  templateUrl: './rating-multiple.component.html',
  styleUrls: ['./rating-multiple.component.scss']
})
export class RatingMultipleComponent implements OnInit, OnChanges {

  @Input() rating: RatingModel[];
  @Input() title: string;
  @Input() total: number;
  @Output() changeRatingEmitter: EventEmitter<number> = new EventEmitter<number>();

  userRating: string;

  constructor(
    private auth: AuthenticationService,
    private p: PrivilegeService,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.rating) {
      this.auth.user.subscribe(_user => {
        this.rating.forEach(rating => {
          if (_user.id === rating.userId) {
            this.userRating = `${rating.rating}`;
          }
        })
      });
    }
  }

  rate(change: MatButtonToggleChange) {
    this.changeRatingEmitter.next(change.value);
  }

}
