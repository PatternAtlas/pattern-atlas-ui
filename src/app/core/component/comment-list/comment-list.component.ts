import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { PAComment, RatingEventModel } from '../../shared';
import { AuthenticationService } from 'src/app/authentication/_services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrivilegeService } from '../../../authentication/_services/privilege.service';

@Component({
  selector: 'pp-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit, OnChanges {

  @Input() disabled: boolean;
  @Input() data: PAComment[];
  @Output() createCommentEvent: EventEmitter<PAComment> = new EventEmitter<PAComment>();
  @Output() updateCommentEvent: EventEmitter<PAComment> = new EventEmitter<PAComment>();
  @Output() deleteCommentEvent: EventEmitter<PAComment> = new EventEmitter<PAComment>();
  @Output() ratingEvent: EventEmitter<RatingEventModel> = new EventEmitter<RatingEventModel>();

  commentForm: FormGroup;

  constructor(
    public auth: AuthenticationService,
    private formBuilder: FormBuilder,
    private p: PrivilegeService
  ) { }

  ngOnInit(): void {
    this.setForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setForm();
  }

  setForm() {
    this.auth.user.subscribe(_user => {
      if (_user) {
        this.commentForm = this.formBuilder.group({
          comment: { value: null, disabled: this.disabled }
        });
      } else {
        this.commentForm = this.formBuilder.group({
          comment: { value: null, disabled: true }
        });
      }
    })
  }

  async submit() {
    let hasCommentPrivilege = await this.p.hasPrivilege('ISSUE_COMMENT');
    if (hasCommentPrivilege) {
      let text = this.commentForm.get('comment').value;
      if (text) {
        this.createCommentEvent.next(new PAComment(text));
      } else {
        console.error('Empty comment');
      }
    }
  }

  update(comment: PAComment) {
    this.updateCommentEvent.next(comment);
  }

  delete(comment: PAComment) {
    this.deleteCommentEvent.next(comment);
  }

  updateRating(ratingRequest: RatingEventModel) {
    this.ratingEvent.next(ratingRequest);
  }
}
