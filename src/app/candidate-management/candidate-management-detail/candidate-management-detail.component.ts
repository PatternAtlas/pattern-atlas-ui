import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TdTextEditorComponent } from '@covalent/text-editor';
import { Candidate, CandidateManagementService, CandidateManagementStore } from 'src/app/core/candidate-management';
import PatternLanguageSchemaModel from 'src/app/core/model/pattern-language-schema.model';
import PatternSectionSchema from 'src/app/core/model/hal/pattern-section-schema.model';
import { patternLanguageNone } from 'src/app/core/component/pattern-language-picker/pattern-language-picker.component';
import { PatternService } from 'src/app/core/service/pattern.service';
import * as marked from 'marked';
import * as MarkdownIt from 'markdown-it';
import * as markdownitKatex from 'markdown-it-katex';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmData } from 'src/app/core/component/confirm-dialog/confirm-dialog.component';
import { globals } from 'src/app/globals';
import { RatingManagementService, RatingModelRequest } from 'src/app/core/rating-management';
import { RatingType } from 'src/app/core/rating-management/_models/rating.model.request';
import { ContentObserver } from '@angular/cdk/observers';
import { PAEvidence } from 'src/app/core/shared';
import { PrivilegeService } from 'src/app/authentication/_services/privilege.service';

@Component({
  selector: 'pp-candidate-management-detail',
  templateUrl: './candidate-management-detail.component.html',
  styleUrls: ['./candidate-management-detail.component.scss']
})
export class CandidateManagementDetailComponent implements OnInit, AfterViewInit {

  @ViewChild('textEditor') private _textEditor: TdTextEditorComponent;
  @ViewChild('candidateView') candidateDiv: ElementRef;
  candidateHeight;

  markdown;
  value;

  candidateMarkdown = '';
  options: any = {};

  candidate: Candidate;
  private oldCandidate: Candidate;

  private patternSchema: PatternSectionSchema[];

  disabled = true;
  pattern = false;
  confirmDialog: ConfirmData;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private candidateManagementService: CandidateManagementService,
    private ratingManagementService: RatingManagementService,
    public candidateStore: CandidateManagementStore,
    private patternService: PatternService,
    public dialog: MatDialog,
    private p: PrivilegeService,
    private ref: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {

    this.candidateStore.candidate.subscribe((_candidate: Candidate) => {
      if (_candidate && this.router.url.includes('detail')) {
        this.disabled = true;
        this.candidate = _candidate;
        this.contentToMarkdown();
        console.log(this.candidate);

      } else if (_candidate && this.router.url.includes('edit')) {
        this.candidate = _candidate;
        this.contentToMarkdown();
        this.edit();

      } else if (!_candidate && window.history.state.data) {
        this.candidate = window.history.state.data as Candidate
        console.log(this.candidate);
        this.contentToMarkdown();
        this.edit();

      } else {
        this.disabled = false;
        this.candidate = new Candidate(null, 'New Candidate', null, null);
        this.patternLanguageSelectedChange(patternLanguageNone);
      }
      this.confirmDialog = {
        title: `Change Pattern Language for Candidate ${this.candidate.name}`,
        text: 'If you change the language everything writen will be deleted and the'
          + ' new pattern schema will be used'
      }
    });
  }

  ngAfterViewInit(): void {
    this.setCommentSectionHeight();
  }

  // CHANGE MARKDOWN
  contentToMarkdown() {
    this.candidateMarkdown = `# ${this.candidate.name}\n`;
    for (let key in this.candidate.content) {
      this.candidateMarkdown = this.candidateMarkdown + `## ${key}\n${this.candidate.content[key]}\n`;
    }
    this.markdown = new MarkdownIt();
    this.markdown.use(markdownitKatex);
    this.value = this.markdown.render(this.candidateMarkdown);
  }

  /** BUTTONS */
  edit() {
    this.oldCandidate = Object.assign({}, this.candidate);
    this.disabled = false;
  }

  cancel() {
    if (!this.oldCandidate) this.exit();
    this.candidate = this.oldCandidate;
    this.disabled = true
  }

  exit() {
    this.router.navigateByUrl('/candidate')
  }

  /** Pattern Language */
  patternLanguageSelectedChange(patternLanguage: PatternLanguageSchemaModel) {
    console.log(patternLanguage);
    this.candidate.patternLanguageId = patternLanguage.patternLanguageId;
    this.candidate.patternLanguageName = patternLanguage.patternLanguageName;
    const content: { [key: string]: string } = {};
    for (let section of patternLanguage.patternSchema) {
      content[section.label] = 'Enter your input for this section here.';
    }
    this.candidate.content = content;
    this.contentToMarkdown();
  }

  /** Pattern */
  confirmPattern() {
    this.pattern = !this.pattern;
    console.log(this.candidate.patternLanguageId);
  }

  createPattern() {
    let confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `Create Candidate out of Candidate ${this.candidate.name}`,
        text: 'Are you sure that you want to create a pattern out of this pattern candidate?'
      }
    });

    confirmDialog.afterClosed().subscribe(result => {
      if (result) {
        this.candidateManagementService.deleteCandidate(this.candidate).subscribe(res => {
          const url = `http://localhost:8080/patternLanguages/${this.candidate.patternLanguageId}/patterns`;
          this.patternService.savePattern(url, this.candidate).subscribe(result => {
            this.router.navigate([globals.pathConstants.patternLanguages, this.candidate.patternLanguageId]);
          })
        })
      }
    });

  }

  cancelPattern() {
    this.pattern = !this.pattern;
  }

  /** SERVICE */
  /** ISSUE */
  createContent(): boolean {
    const textEditorValue = marked.lexer(this._textEditor.value);
    const content: { [key: string]: string } = {};
    var currentKey;
    console.log(textEditorValue);
    for (let line of textEditorValue) {
      // NAME
      if (line.type == 'heading' && line.depth == 1) {
        this.candidate.name = line.text;
        // HEADING
      } else if (line.type == 'heading' && line.depth == 2) {
        currentKey = line.text;
        content[currentKey] = '';
        // PARAGRAPH
      } else if (line.type == 'paragraph' || line.type == 'code') {
        content[currentKey] = content[currentKey] + line.text;
        // SPACE
      } else if (line.type == 'space') {
        content[currentKey] = content[currentKey] + '\n\n';
      } else {
        console.error('Type not supported yet: ', line.type);
        return false;
      }
    }
    this.candidate.content = content;
    return true;
  }

  submit() {
    if (this.createContent()) {
      if (this.candidate.patternLanguageId === '-1') this.candidate.patternLanguageId = null;
      this.candidate.uri = `/candidates/${this.candidate.name}`
      this.candidate.id ? this.update() : this.create();
    }
  }

  create() {
    this.candidateManagementService.createCandidate(this.candidate).subscribe(result => {
      this.candidate = result;
      this.contentToMarkdown();
      this.disabled = true;
    })
  }

  update() {
    this.candidateManagementService.updateCandidate(this.candidate).subscribe(result => {
      this.candidate = result;
      this.contentToMarkdown();
      this.disabled = true;
    })
  }

  delete() {
    let confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `Delete Candidate ${this.candidate.name}`,
        text: 'Are you sure you want to delete this pattern candidate?'
      }
    });

    confirmDialog.afterClosed().subscribe(result => {
      if (result) {
        this.candidateManagementService.deleteCandidate(this.candidate).subscribe(result => {
          this.exit();
        })
      }
    });
  }

  updateRatingReadability(rating: number) {
    this.ratingManagementService.updateRatingCandidate(this.candidate, new RatingModelRequest(rating, RatingType.READABILITY)).subscribe(res => {
      let index = this.candidate.readability.findIndex(_rating => _rating.userId = res.userId)
      index > -1 ?
        this.candidate.readability = Object.assign([], this.candidate.readability, { [index]: res }) :
        this.candidate.readability = this.candidate.readability.concat([res]);
    });
  }

  updateRatingUnderstandability(rating: number) {
    this.ratingManagementService.updateRatingCandidate(this.candidate, new RatingModelRequest(rating, RatingType.UNDERSTANDABILITY)).subscribe(res => {
      let index = this.candidate.understandability.findIndex(_rating => _rating.userId = res.userId)
      index > -1 ?
        this.candidate.understandability = Object.assign([], this.candidate.understandability, { [index]: res }) :
        this.candidate.understandability = this.candidate.understandability.concat([res]);
    });
  }

  updateRatingAppropriateness(rating: number) {
    this.ratingManagementService.updateRatingCandidate(this.candidate, new RatingModelRequest(rating, RatingType.APPROPIATENESS)).subscribe(res => {
      let index = this.candidate.appropriateness.findIndex(_rating => _rating.userId = res.userId)
      index > -1 ?
        this.candidate.appropriateness = Object.assign([], this.candidate.appropriateness, { [index]: res }) :
        this.candidate.appropriateness = this.candidate.appropriateness.concat([res]);
    });
  }

  /** Evidence */
  createEvidence(evidence: PAEvidence) {
    this.candidateManagementService.createEvidence(this.candidate, evidence).subscribe(result => {
      this.candidate.evidences.push(result);
    });
  }

  updateEvidence(evidence: PAEvidence) {
    this.candidateManagementService.updateEvidence(this.candidate, evidence).subscribe(result => {
      console.log('update evidence: ', result);
      var toUpdateEvidence = this.candidate.evidences.find(_evidence => _evidence.id = evidence.id);
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
        this.candidateManagementService.deleteEvidence(this.candidate, evidenceId).subscribe(result => {
          console.log('delete evidence: ', result);
          const index = this.candidate.evidences.findIndex(evidence => evidence.id = evidenceId);
          if (index > -1) this.candidate.evidences.splice(index, 1);
        })
      }
    });
  }

  /** UI */

  setCommentSectionHeight() {
    this.candidateHeight = this.candidateDiv.nativeElement.offsetHeight;
    this.ref.detectChanges();
  }
}
