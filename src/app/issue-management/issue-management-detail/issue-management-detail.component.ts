import {
  Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit, ChangeDetectorRef, OnDestroy
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Issue, IssueManagementService } from 'src/app/core/issue-management';
import { Candidate, CandidateManagementStore } from 'src/app/core/candidate-management';
import { AuthorModel, Author } from 'src/app/core/author-management';
import { PrivilegeService } from 'src/app/authentication/_services/privilege.service';
import PatternLanguageSchemaModel from 'src/app/core/model/pattern-language-schema.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/core/component/confirm-dialog/confirm-dialog.component';
import { patternLanguageNone } from 'src/app/core/component/pattern-language-picker/pattern-language-picker.component';
import { PAComment, PAEvidence, RatingEventModel, RatingModelRequest } from 'src/app/core/shared';
import { AuthenticationService } from 'src/app/authentication/_services/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pp-issue-management-detail',
  templateUrl: './issue-management-detail.component.html',
  styleUrls: ['./issue-management-detail.component.scss']
})
export class IssueManagementDetailComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('issueView') issueDiv: ElementRef;
  issueHeight;

  public patternLanguageSelected: PatternLanguageSchemaModel = patternLanguageNone;
  public issue: Issue;
  private oldIssue: Issue;

  disabled = true;
  settingsDisabled = true;
  candidate = false;
  treshold = true;

  private activeRouteSubscription: Subscription | null = null;

  constructor(
    private issueManagementService: IssueManagementService,
    public candidateManagementStore: CandidateManagementStore,
    private p: PrivilegeService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    public dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
    private auth: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.activeRouteSubscription = this.activeRoute.params.subscribe(params => {
      let issueUri = `/issues/${params.name}`;
      switch(params.action) {
        case 'detail': {
          this.disabled = true;
          this.settingsDisabled = false;
          this.issueManagementService.getIssueByUri(issueUri).subscribe(result => {
            this.issue = result;
          });
          break;
        }
        case 'edit': {
          this.settingsDisabled = false;
          this.issueManagementService.getIssueByUri(issueUri).subscribe(result => {
            this.issue = result;
            this.edit();
          });
          break;
        }
        case 'create': {
          this.disabled = false;
          this.issue = new Issue();
          // Preset author
          this.auth.user.subscribe(_user => {
            if (_user && !this.issue.authors) this.issue.authors = [new AuthorModel(_user.id, Author.OWNER, _user.name)];
          });
          break;
        }
        default: {
          // Unknown action - will show issue list
          this.router.navigateByUrl('/issue');
          break;
        }
      }
      if (this.issue) {
        this.p.isMaintainerOrOwner(this.issue.authors, 'ISSUE_DELETE_ALL')
          .subscribe(result => {
            this.settingsDisabled = !result;
          });
      }
    });
  }

  ngOnDestroy() {
    this.activeRouteSubscription?.unsubscribe();
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
    this.router.navigateByUrl('/issue');
  }

  settings() {
    this.router.navigateByUrl('/issue/authors/' + this.issue.name);
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
    let authorlist = this.issue.authors;
    let first_author = null;
    this.auth.user.subscribe(_user => {
      if (_user) first_author = _user.id;
    })

    // create
    this.issueManagementService.createIssue(this.issue).subscribe(result => {
      this.issue = result

      // call update for all additional authors
      for(let author of authorlist) {
        if(author.userId !== first_author) {
          this.issueManagementService.updateAuthorsIssue(this.issue, author).subscribe(result => {
            this.issue = result;
          })
        }
      }

      this.disabled = true;
      this.router.navigate(['./issue/detail', this.issue.name]);
    });

  }

  update() {
    this.issueManagementService.updateIssue(this.issue).subscribe(result => {
      this.issue = result;
      this.disabled = true;
      this.router.navigate(['./issue/detail', this.issue.name]);
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
    if(this.issue.id) {
      this.issueManagementService.updateAuthorsIssue(this.issue, author).subscribe(result => {
        this.issue = result;
      });
    } else {
      // not yet created - only save locally
      if(!this.issue.authors) {
        this.issue.authors = []
      }
      this.issue.authors.push(author)
    }
  }

  deleteAuthor(author: AuthorModel) {
    if(this.issue.id) {
      this.issueManagementService.deleteAuthorIssue(author, this.issue).subscribe(result => {
        this.issue = result;
      });
    } else {
      if(this.issue.authors) {
        // not yet created - only save locally
        const authorIndex = this.issue.authors.indexOf(author, 0);
        if(authorIndex >= 0) {
          this.issue.authors.splice(authorIndex, 1);
        }
      }
    }
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
        title: 'Delete Evidence',
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
