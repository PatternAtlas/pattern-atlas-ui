import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PAComment, Context } from '../../shared';
import { IssueManagementService, Issue } from '../../issue-management';
import { CandidateManagementService, Candidate } from '../../candidate-management';
import { AuthenticationService } from 'src/app/authentication/_services/authentication.service';

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


  commentText: string;

  constructor(
    private issueManagementService: IssueManagementService,
    private canididateManagementService: CandidateManagementService,
    public auth: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  cancelComment() {
    this.commentText = null;
  }

  submit() {
    switch (this.context) {
      case Context.ISSUE: {
        this.issueManagementService.createComment(this.commentEntity, new PAComment(this.commentText)).subscribe(result => {
          this.data.push(result)
          this.cancelComment();
        });
        break;
      }
      case Context.CANDIDATE: {
        this.canididateManagementService.createComment(this.commentEntity, new PAComment(this.commentText)).subscribe(result => {
          this.data.push(result)
          this.cancelComment();
        });
        break;
      }
      default: {
        console.log('Pattern comment');
        this.cancelComment();
        break;
      }
    }
  }

  deleteComment(comment: PAComment) {
    switch (this.context) {
      case Context.ISSUE: {
        this.issueManagementService.deleteComment(this.commentEntity, new PAComment(this.commentText)).subscribe(result => {
          if (result) {
            const index = this.data.indexOf(comment);
            if (index > -1) this.data.splice(index, 1);
          }
        });
        break;
      }
      case Context.CANDIDATE: {
        this.canididateManagementService.deleteComment(this.commentEntity, new PAComment(this.commentText)).subscribe(result => {
          if (result) {
            const index = this.data.indexOf(comment);
            if (index > -1) this.data.splice(index, 1);
          }
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
