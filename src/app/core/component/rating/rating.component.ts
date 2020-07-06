import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RatingModelRequest, RatingManagementService, RatingModel } from '../../rating-management';
import { PrivilegeService } from 'src/app/authentication/_services/privilege.service';
import { AuthenticationService } from 'src/app/authentication/_services/authentication.service';
import { PAComment, Context } from '../../shared';

@Component({
  selector: 'pp-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input() row = true;
  @Input() disabled = false;

  @Input() upVotes: string[] = [];
  @Input() downVotes: string[] = [];
  @Input() ratingEntity: any;
  @Input() context: number;
  @Input() commentEntity: PAComment;

  // primary, accent, warn, ''
  colorUp = 'primary'
  colorDown = 'primary'


  constructor(
    private ratingService: RatingManagementService,
    public auth: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.auth.user.subscribe(_user => {
      if(_user && this.upVotes && this.downVotes) {
        if (this.upVotes.includes(_user.id)) this.setButtonColor(1);
        else if (this.downVotes.includes(_user.id)) this.setButtonColor(-1);
        else this.setButtonColor(0);
      }
    })
  }

  update(ratingModel: RatingModel) {
    this.setButtonColor(ratingModel.rating);
    if (ratingModel.rating == 1) {
      this.upVotes.push(ratingModel.userId);
      // CASE DOWN -> UP
      const index = this.downVotes.indexOf(ratingModel.userId);
      if (index > -1) this.downVotes.splice(index, 1);
    }
    if (ratingModel.rating == -1) {
      this.downVotes.push(ratingModel.userId);
      // CASE UP -> DOWN
      const index = this.upVotes.indexOf(ratingModel.userId);
      if (index > -1) this.upVotes.splice(index, 1);
    }
    if (ratingModel.rating == 0) {
      const indexUp = this.upVotes.indexOf(ratingModel.userId);
      if (indexUp > -1) this.upVotes.splice(indexUp, 1);
      const indexDown = this.downVotes.indexOf(ratingModel.userId);
      if (indexDown > -1) this.downVotes.splice(indexDown, 1);
    }
  }

  click(rating: number) {
    switch (this.context) {
      case Context.ISSUE: {
        this.commentEntity ?
          this.ratingService.updateRatingIssueComment(this.ratingEntity, this.commentEntity, new RatingModelRequest(rating)).subscribe(result => {
            this.update(result);
          })
          :
          this.ratingService.updateRatingIssue(this.ratingEntity, new RatingModelRequest(rating)).subscribe(result => {
            this.update(result);
          });
        break;
      }
      case Context.CANDIDATE: {
        this.commentEntity ?
          this.ratingService.updateRatingCandidateComment(this.ratingEntity, this.commentEntity, new RatingModelRequest(rating)).subscribe(result => {
            this.update(result);
          })
          :
          this.ratingService.updateRatingCandidate(this.ratingEntity, new RatingModelRequest(rating)).subscribe(result => {
            this.update(result);
          })
        break;
      }
      default: {
        console.log('Pattern comment');
        break;
      }
    }
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
