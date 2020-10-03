import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PAComment, Context } from '../../shared';
import { IssueManagementService, Issue } from '../../issue-management';
import { CandidateManagementService, Candidate } from '../../candidate-management';
import { AuthenticationService } from 'src/app/authentication/_services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'pp-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {

  @Input() data: PAComment[];
  @Input() commentEntity: any;
  @Input() context: number;
  @Output() createCommentEvent: EventEmitter<PAComment> = new EventEmitter<PAComment>();
  @Output() updateCommentEvent: EventEmitter<PAComment> = new EventEmitter<PAComment>();
  @Output() deleteCommentEvent: EventEmitter<PAComment> = new EventEmitter<PAComment>();

  commentForm: FormGroup;

  constructor(
    private issueManagementService: IssueManagementService,
    private canididateManagementService: CandidateManagementService,
    public auth: AuthenticationService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    this.auth.user.subscribe(_user => {
      if (_user) {
        this.commentForm = this.formBuilder.group({
          comment: {value: null, disabled: this.commentEntity.id ? false : true}
        });
      } else {
        this.commentForm = this.formBuilder.group({
          comment: {value: null, disabled: true}
        });
      }
    })
  }

  submit() {
    if (!this.commentForm.get('comment').value) return;
    switch (this.context) {
      case Context.ISSUE: {
        this.issueManagementService.createComment(this.commentEntity, new PAComment(this.commentForm.get('comment').value)).subscribe(result => {
          this.data.push(result)
          this.setForm();
        });
        break;
      }
      case Context.CANDIDATE: {
        this.canididateManagementService.createComment(this.commentEntity, new PAComment(this.commentForm.get('comment').value)).subscribe(result => {
          this.data.push(result)
          this.setForm();
        });
        break;
      }
      default: {
        console.log('Pattern comment');
        this.setForm();
        break;
      }
    }
  }

  deleteComment(comment: PAComment) {
    switch (this.context) {
      case Context.ISSUE: {
        this.issueManagementService.deleteComment(this.commentEntity, comment).subscribe(result => {
          const index = this.data.indexOf(comment);
          console.log(index);
          if (index > -1) this.data.splice(index, 1);
        });
        break;
      }
      case Context.CANDIDATE: {
        this.canididateManagementService.deleteComment(this.commentEntity, comment).subscribe(result => {
          const index = this.data.indexOf(comment);
          if (index > -1) this.data.splice(index, 1);
        });
        break;
      }
      default: {
        console.log('Pattern comment delete');
        break;
      }
    }
  }
}
