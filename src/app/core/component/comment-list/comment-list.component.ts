import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IssueComment } from '../../issue-management';
import { Rating } from '../../model/rating.enum';

export interface IssueCommentRatingEvent {
  issueComment: IssueComment,
  issueCommentRating: Rating,
}

@Component({
  selector: 'pp-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {

  @Input() data: IssueComment[];
  @Output() createComment: EventEmitter<IssueComment> = new EventEmitter<IssueComment>();
  @Output() commentRating: EventEmitter<IssueCommentRatingEvent> = new EventEmitter<IssueCommentRatingEvent>();

  comment: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  cancelComment() {
    this.comment = '';
  }

  addComment() {
    const commentIssue = {} as IssueComment;
    commentIssue.text = this.comment
    this.createComment.emit(commentIssue);
    this.comment = '';
  }

  updateCommentRating(rating: Rating, comment: IssueComment) {
    console.log('User Upvoted Comment', rating, comment);
    const issueCommentRatingEvent = {} as IssueCommentRatingEvent;
    issueCommentRatingEvent.issueComment = comment;
    issueCommentRatingEvent.issueCommentRating = rating;
    this.commentRating.emit(issueCommentRatingEvent);
  }

}
