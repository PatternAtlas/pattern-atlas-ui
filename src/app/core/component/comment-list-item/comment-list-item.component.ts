import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PAComment, RatingEventModel, RatingModelRequest } from '../../shared';
import { PrivilegeService } from 'src/app/authentication/_services/privilege.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'pp-comment-list-item',
  templateUrl: './comment-list-item.component.html',
  styleUrls: ['./comment-list-item.component.scss']
})
export class CommentListItemComponent implements OnInit {

  @Input() comment: PAComment;
  @Output() updateCommentEvent: EventEmitter<PAComment> = new EventEmitter<PAComment>();
  @Output() deleteCommentEvent: EventEmitter<PAComment> = new EventEmitter<PAComment>();
  @Output() ratingEvent: EventEmitter<RatingEventModel> = new EventEmitter<RatingEventModel>();

  disabled = true;
  isAuthor = false;
  oldComment: PAComment;

  commentCtrl = new FormControl();
  replyComment = false;

  constructor(
    public p: PrivilegeService,
  ) { }

  ngOnInit(): void {
  }
  /** BUTTON */
  edit() {
    this.oldComment = Object.assign({}, this.comment);
    this.disabled = false;
  }

  cancel() {
    this.comment = this.oldComment;
    this.disabled = true;
  }

  reply() {
    this.replyComment = !this.replyComment;
  }

  updateRating(ratingRequest: RatingModelRequest) {
    this.ratingEvent.next(new RatingEventModel(ratingRequest, this.comment));
  }

  async update() {
    let isCurrentUser = await this.p.isCurrentUser(this.comment.userId);
    if (isCurrentUser) {
      this.updateCommentEvent.emit(this.comment);
    }
  }

  delete() {
    this.deleteCommentEvent.emit(this.comment);
  }
}
