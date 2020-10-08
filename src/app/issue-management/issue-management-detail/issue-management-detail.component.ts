import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { IssueManagementStore } from '../../core/issue-management/_store/issue-management-store';
import { Router, ActivatedRoute } from '@angular/router';
import { PatternLanguageService } from 'src/app/core/service/pattern-language.service';
import PatternLanguageModel from 'src/app/core/model/hal/pattern-language-model.model';
import { Issue, IssueManagementService } from 'src/app/core/issue-management';
import { Candidate, CandidateManagementStore } from 'src/app/core/candidate-management';
import { AuthorManagementService, AuthorModelRequest, AuthorModel, Author } from 'src/app/core/author-management';
import { PrivilegeService } from 'src/app/authentication/_services/privilege.service';
import PatternLanguageSchemaModel from 'src/app/core/model/pattern-language-schema.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/core/component/confirm-dialog/confirm-dialog.component';
import { patternLanguageNone } from 'src/app/core/component/pattern-language-picker/pattern-language-picker.component';
import { PAComment, PAEvidence, RatingEventModel, RatingModelRequest } from 'src/app/core/shared';
import { AuthorEventModel } from 'src/app/core/shared/_models/autor-event.model';

@Component({
  selector: 'pp-issue-management-detail',
  templateUrl: './issue-management-detail.component.html',
  styleUrls: ['./issue-management-detail.component.scss']
})
export class IssueManagementDetailComponent implements OnInit, AfterViewInit {

  @ViewChild('issueView') issueDiv: ElementRef;
  issueHeight;

  public patternLanguageSelected: PatternLanguageSchemaModel = patternLanguageNone;
  public issue: Issue;
  private oldIssue: Issue;

  disabled = true;
  candidate = false;
  treshold = true;

  constructor(
    private issueManagementService: IssueManagementService,
    public issueManagementStore: IssueManagementStore,
    public candidateManagementStore: CandidateManagementStore,
    private p: PrivilegeService,
    private router: Router,
    public dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.issueManagementStore.issue.subscribe(_issue => {

      if (_issue && this.router.url.includes('detail')) {
        this.disabled = true;
        this.issue = _issue;

      } else if (_issue && this.router.url.includes('edit')) {
        this.issue = _issue;
        this.edit();

      } else if (!_issue && window.history.state.data) {
        this.issue = window.history.state.data as Issue;
      } else {
        this.disabled = false;
        this.issue = new Issue();
      }
      this.treshold = !(this.issue.rating >= 3);
    });


  }

  ngAfterViewInit(): void {
    this.setCommentSectionHeight();
  }

  /** BUTTONS */
  edit() {
    this.oldIssue = Object.assign({}, this.issue);
    this.disabled = !this.disabled;
  }

  cancel() {
    if (!this.oldIssue) this.exit();
    this.issue = this.oldIssue;
    this.disabled = !this.disabled;
  }

  exit() {
    this.router.navigateByUrl('/issue')
  }

  /** CANDIDATE */
  patternLanguageSelectedChange(patternLanguage: PatternLanguageSchemaModel) {
    this.patternLanguageSelected = patternLanguage;
  }
  selectLanguage() {
    this.candidate = !this.candidate;
  }

  createCandidate() {
    let confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `Create Candidate out of Issue ${this.issue.name}`,
        text: 'Are you sure that you want to create a Pattern Candidate out of this Issue?'
      }
    });

    confirmDialog.afterClosed().subscribe(result => {
      if (result) {
        const content: { [key: string]: string } = {};
        for (let section of this.patternLanguageSelected.patternSchema) {
          section.label === 'Context' ? content[section.label] = this.issue.description : content[section.label] = 'Enter your input for this section here.';
        }
        const candidate = new Candidate(content, this.issue.name, this.patternLanguageSelected.patternLanguageId, this.issue.authors, this.issue.id)
        this.router.navigate(['candidate/create', this.issue.name], { state: { data: candidate } });
      }
    });


  }

  cancelCandidate() {
    this.candidate = !this.candidate;
  }

  /** SERVICE */
  /** ISSUE */
  submit() {
    this.issue.uri = `/issues/${this.issue.name}`
    this.issue.id ? this.update() : this.create();
  }

  create() {
    this.issueManagementService.createIssue(this.issue).subscribe(result => {
      this.issue = result
      this.disabled = true;
    });
  }

  update() {
    this.issueManagementService.updateIssue(this.issue).subscribe(result => {
      this.issue = result;
      this.disabled = true;
    })
  }

  delete() {
    let confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `Delete Issue ${this.issue.name}`,
        text: 'Are you sure that you want to delete this Issue?'
      }
    });

    confirmDialog.afterClosed().subscribe(result => {
      if (result) {
        this.issueManagementService.deleteIssue(this.issue).subscribe(result => {
          this.exit();
        })
      }
    });
  }

  updateRating(ratingRequest: RatingModelRequest) {
    this.issueManagementService.updateRatingIssue(this.issue, ratingRequest).subscribe(result => {
      this.issue = result;
    });
  }

  /** Author */
  updateAuthor(author: AuthorModel) {
    this.issueManagementService.updateAuthorsIssue(this.issue, author).subscribe(result => {
      this.issue = result;
    });
  }

  deleteAuthor(author: AuthorModel) {
    this.issueManagementService.deleteAuthorIssue(author, this.issue).subscribe(result => {
      this.issue = result;
    });
  }

  /** Comment */
  createComment(comment: PAComment) {
    this.issueManagementService.createComment(this.issue, comment).subscribe(result => {
      this.issue = result;
    });
  }

  updateComment(comment: PAComment) {
    this.issueManagementService.updateComment(this.issue, comment).subscribe(result => {
      this.issue = result;
    });
  }

  deleteComment(comment: PAComment) {
    this.issueManagementService.deleteComment(this.issue, comment).subscribe(result => {
      this.issue = result;
    });
  }

  updateRatingComment(ratingRequest: RatingEventModel) {
    this.issueManagementService.updateRatingIssueComment(this.issue, ratingRequest.entity, ratingRequest.rating).subscribe(result => {
      this.issue = result;
    })
  }

  /** Evidence */
  createEvidence(evidence: PAEvidence) {
    this.issueManagementService.createEvidence(this.issue, evidence).subscribe(result => {
      this.issue = result;
    });
  }

  updateEvidence(evidence: PAEvidence) {
    this.issueManagementService.updateEvidence(this.issue, evidence).subscribe(result => {
      this.issue = result;
    })
  }

  deleteEvidence(evidenceId: string) {
    let confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `Delete Evidence`,
        text: 'Are you sure that you want to delete this evidence submission?'
      }
    });

    confirmDialog.afterClosed().subscribe(result => {
      if (result) {
        this.issueManagementService.deleteEvidence(this.issue, evidenceId).subscribe(result => {
          this.issue = result;
        })
      }
    });
  }

  updateRatingEvidence(ratingRequest: RatingEventModel) {
    this.issueManagementService.updateRatingIssueEvidence(this.issue, ratingRequest.entity, ratingRequest.rating).subscribe(result => {
      this.issue = result;
    })
  }

  /** UI */

  setCommentSectionHeight() {
    this.issueHeight = this.issueDiv.nativeElement.offsetHeight;
    this.cdRef.detectChanges();
  }
}
