import { Component, OnInit, ViewChild } from '@angular/core';
import { CandidateManagementService, Candidate } from '../candidate-management.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IssueManagementStore } from 'src/app/core/stores/issue-management-store';
import { Issue, Rating } from 'src/app/issue-management/issue-management.service';
import { TdTextEditorComponent } from '@covalent/text-editor';
import { PatternLanguageService } from 'src/app/core/service/pattern-language.service';
import PatternLanguageModel from 'src/app/core/model/hal/pattern-language-model.model';

@Component({
  selector: 'pp-candidate-management-home-detail',
  templateUrl: './candidate-management-home-detail.component.html',
  styleUrls: ['./candidate-management-home-detail.component.scss']
})
export class CandidateManagementHomeDetailComponent implements OnInit {

  candidateMarkdown: any;
  options: any = {};
  defaultSections = ['# Candidate Name\n', '## Icon\n', '## Context\n', '## Driving Question\n', '## Solution\n']
  candidate: Candidate;

  @ViewChild('textEditor') private _textEditor: TdTextEditorComponent;

  private nameRegex = /\s(.*?)\n/;

  public patternLanguages: PatternLanguageModel[];
  public patternLanguageSelected: string;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    public issueStore: IssueManagementStore,
    private candidateService: CandidateManagementService,
    private patternLanguageService: PatternLanguageService,
  ) { }

  ngOnInit(): void {
    this.getPatternLanguages();

    this.activeRoute.params.subscribe(params => {
      const name = params.name;
      if (name && this.router.url.includes('/create') && window.history.state.data) {
        this.candidate = window.history.state.data as Candidate;
        this.patternLanguageSelected = this.candidate.patternLanguageId;
        this.candidateMarkdown =
          `# ${this.candidate.name}\n` +
          this.defaultSections[1] +
          this.defaultSections[2] +
          `${this.candidate.content}\n` +
          this.defaultSections[3] +
          this.defaultSections[4];

      } else if (name && this.router.url.includes('/edit') && window.history.state.data) {
        this.candidate = window.history.state.data as Candidate;
        this.patternLanguageSelected = this.candidate.patternLanguageId;
        this.candidateMarkdown = this.candidate.content;
      } else if (!name && this.router.url.includes('/create') && !window.history.state.data) {
        this.candidate = new Candidate()
        this.candidateMarkdown = this.defaultSections.join("");
      } else if (name && this.router.url.includes('/detail') && window.history.state.data) {
        this.candidate = window.history.state.data as Candidate;
        this.patternLanguageSelected = this.candidate.patternLanguageId;
        this.candidateMarkdown = this.candidate.content;
      }
    })
  }

  getPatternLanguages() {
    this.patternLanguageService.getPatternLanguages().subscribe(result => {
      console.log(result);
      this.patternLanguages = result;
    })
  }

  create() {
    console.log(this._textEditor.value);
    this.candidate.name = this.nameRegex.exec(this._textEditor.value)[1];
    this.candidate.content = this._textEditor.value;
    this.candidate.patternLanguageId = this.patternLanguageSelected;
    console.log(this.candidate);

    this.candidateService.createCandidate(this.candidate, this.patternLanguageSelected).subscribe(result => {
      console.log('created canddiate: ', result);
    })
  }

  update() {
    this.candidateService.updateCandidate(this.candidate).subscribe(result => {
      // this.changed.emit();
      // this.disabled = true;
    })
  }

  delete() {
    // console.log('Delete', this.issue)
    // this.issueManagementService.deleteIssue(this.issue).subscribe(result => {
    //   this.changed.emit();
    //   this.disabled = true;
    // })
  }

  createComment(candidateComment: Comment) {
    // console.log(issueComment);
    // this.issueManagementService.createComment(this.issue, issueComment).subscribe((result: Issue) => {
    //   console.log('createComment: ', result);
    //   this.issue = result;
    //   this.changed.emit();
    // });
  }

  updateRating(rating: Rating) {
    // console.log(this.issue, rating);
    // this.issueManagementService.updateRating(this.issue, rating).subscribe((result: Issue) => {
    //   console.log('updateRating: ', result);
    //   this.issue = result;
    //   this.changed.emit();
    // });
  }

  updateCommentRating(issueCommentRatingEvent: any) {
    console.log(issueCommentRatingEvent);
    // this.issueManagementService.updateCommentRating(issueCommentRatingEvent.issueComment, issueCommentRatingEvent.issueCommentRating).subscribe((result: Issue) => {
    //   console.log('updateCommentRating: ', result);
    //   this.issue = result;
    //   this.changed.emit();
    // });
  }

  exit() {
    this.router.navigate(['candidate/']);
  }

}
