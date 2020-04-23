import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IssueComment } from 'src/app/issue-management/issue-management.service';

@Component({
  selector: 'pp-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {

  @Input() data: IssueComment[];
  @Output() createComment: EventEmitter<IssueComment> = new EventEmitter<IssueComment>();
  
  comment: string;

  constructor() { }

  ngOnInit(): void {
    // this.data = [{}, {}];
  }

  cancelComment() {
    // console.log('cancel');
    this.comment = '';
  }

  addComment() {
    // console.log(this.comment)
    const commentIssue = {} as IssueComment;
    commentIssue.text = this.comment
    this.createComment.emit(commentIssue);
  }

}
