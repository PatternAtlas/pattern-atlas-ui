import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { IssueManagementStore } from '../../core/issue-management/_store/issue-management-store';
import { Router, ActivatedRoute } from '@angular/router';
import { PatternLanguageService } from 'src/app/core/service/pattern-language.service';
import PatternLanguageModel from 'src/app/core/model/hal/pattern-language-model.model';
import { Issue, IssueManagementService } from 'src/app/core/issue-management';
import { Candidate, CandidateManagementStore } from 'src/app/core/candidate-management';
import { RatingModelRequest, RatingManagementService } from 'src/app/core/rating-management';
import { AuthorManagementService, AuthorModelRequest, AuthorModel, Author } from 'src/app/core/author-management';
import { PrivilegeService } from 'src/app/authentication/_services/privilege.service';
import PatternLanguageSchemaModel from 'src/app/core/model/pattern-language-schema.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/core/component/confirm-dialog/confirm-dialog.component';
import { patternLanguageNone } from 'src/app/core/component/pattern-language-picker/pattern-language-picker.component';
import { PAEvidence } from 'src/app/core/shared';

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
    private cdRef : ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.issueManagementStore.issue.subscribe(_issue => {

      if (_issue && this.router.url.includes('detail')) {
        this.disabled = true;
        this.issue = _issue;
        this.treshold = !(this.issue.upVotes.length - this.issue.downVotes.length >= 1);
        console.log(this.treshold);

      } else if (_issue && this.router.url.includes('edit')) {
        this.issue = _issue;
        this.edit();
        this.treshold = !(this.issue.upVotes.length - this.issue.downVotes.length >= 1);

      } else if (!_issue && window.history.state.data) {
        this.issue = window.history.state.data as Issue;
        this.treshold = !(this.issue.upVotes.length - this.issue.downVotes.length >= 1);
      } else {
        this.disabled = false;
        this.issue = new Issue();
      }
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
    console.log('submit');
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

  /** Evidence */
  createEvidence(evidence: PAEvidence) {
    this.issueManagementService.createEvidence(this.issue, evidence).subscribe(result => {
      this.issue.evidences.push(result);
    });
  }

  updateEvidence(evidence: PAEvidence) {
    this.issueManagementService.updateEvidence(this.issue, evidence).subscribe(result => {
      console.log('update evidence: ', result);
      var toUpdateEvidence = this.issue.evidences.find(_evidence => _evidence.id = evidence.id);
      console.log(toUpdateEvidence);
      toUpdateEvidence = result;
      //this.issue = result;
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
          console.log('delete evidence: ', result);
          const index = this.issue.evidences.findIndex(evidence => evidence.id = evidenceId);
          if (index > -1) this.issue.evidences.splice(index, 1);
        })
      }
    });
  }

  /** UI */

  setCommentSectionHeight() {
    this.issueHeight = this.issueDiv.nativeElement.offsetHeight;
    this.cdRef.detectChanges();
  }
}
