import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/_services/authentication.service';
import { RatingModelRequest } from '../../shared';

type RatingButtonColor = 'primary' | 'accent' | 'warn' | ''

@Component({
  selector: 'pp-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit, OnChanges {

  @Input() row = true;
  @Input() disabled = false;
  @Input() upVotes: string[] = [];
  @Input() downVotes: string[] = [];
  @Input() total: number;

  @Output() ratingEvent: EventEmitter<RatingModelRequest> = new EventEmitter<RatingModelRequest>();

  colorUp : RatingButtonColor = 'primary'
  colorDown : RatingButtonColor = 'primary'


  constructor(
    public auth: AuthenticationService
  ) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.auth.user.subscribe(_user => {
      if (_user && this.upVotes && this.downVotes) {
        if (this.upVotes.includes(_user.id)) this.setButtonColor(1);
        else if (this.downVotes.includes(_user.id)) this.setButtonColor(-1);
        else this.setButtonColor(0);
      }
    })
  }

  click(rating: number) {
    this.ratingEvent.next(new RatingModelRequest(rating));
  }

  setButtonColor(vote: number) {
    if (vote == 1) {
      this.colorUp = 'accent';
      this.colorDown = 'primary'
    }
    if (vote == -1) {
      this.colorUp = 'primary';
      this.colorDown = 'accent'
    }
    if (vote == 0) {
      this.colorUp = 'primary';
      this.colorDown = 'primary'
    }
  }
}
