import { Component, OnInit, Input } from '@angular/core';



@Component({
  selector: 'pp-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {

  @Input() data: any[]; 
  comment: string;

  constructor() { }

  ngOnInit(): void {
    this.data = [{}, {}];
  }

  cancelComment() {

  }

  addComment() {
    console.log(this.comment)
  }

}
