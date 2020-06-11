import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TdTextEditorComponent } from '@covalent/text-editor';
import PatternLanguageModel from 'src/app/core/model/hal/pattern-language-model.model';
import { Candidate, CandidateManagementService, CandidateManagementStore } from 'src/app/core/candidate-management';
import { merge } from 'rxjs';

@Component({
  selector: 'pp-candidate-management-detail',
  templateUrl: './candidate-management-detail.component.html',
  styleUrls: ['./candidate-management-detail.component.scss']
})
export class CandidateManagementDetailComponent implements OnInit {



  @ViewChild('textEditor') private _textEditor: TdTextEditorComponent;
  private nameRegex = /\s(.*?)\n/;

  candidateMarkdown: any;
  options: any = {};
  defaultSections = ['# Candidate Name\n', '## Icon\n', '## Context\n', '## Driving Question\n', '## Solution\n']


  public patternLanguageSelected: string;
  candidate: Candidate;
  private oldCandidate: Candidate;

  disabled: boolean = true;
  pattern: boolean = false;


  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private candidateManagementService: CandidateManagementService,
    public candidateStore: CandidateManagementStore,
  ) { }

  ngOnInit(): void {
    this.candidateStore.candidate.subscribe(_candidate => {
      // console.log(_candidate);

      if (_candidate && this.router.url.includes('detail')) {
        this.disabled = true;
        this.candidate = _candidate;
        this.candidateMarkdown = this.candidate.content;
        this.patternLanguageSelected = this.candidate.patternLanguageId ? this.candidate.patternLanguageId : '-1';

      } else if (_candidate && this.router.url.includes('edit')) {
        this.candidate = _candidate;
        this.candidateMarkdown = this.candidate.content;
        this.patternLanguageSelected = this.candidate.patternLanguageId ? this.candidate.patternLanguageId : '-1';

      } else if (!_candidate && window.history.state.data) {
        this.candidate = window.history.state.data as Candidate
        console.log(this.candidate);
        this.edit();
        this.candidateMarkdown =
          `# ${this.candidate.name}\n` +
          this.defaultSections[1] +
          this.defaultSections[2] +
          `${this.candidate.content}\n` +
          this.defaultSections[3] +
          this.defaultSections[4];
        this.patternLanguageSelected = this.candidate.patternLanguageId ? this.candidate.patternLanguageId : '-1';

      } else {
        this.disabled = false;
        this.candidate = new Candidate();
        this.candidateMarkdown = this.defaultSections.join("");
      }
    });
  }

  /** BUTTONS */
  edit() {
    this.oldCandidate = Object.assign({}, this.candidate);
    this.disabled = !this.disabled;
  }

  cancel() {
    if (!this.oldCandidate) this.exit();
    this.candidate = this.oldCandidate;
    this.disabled = !this.disabled;
  }

  exit() {
    this.router.navigateByUrl('/candidate')
  }

  /** Pattern */
  confirmPattern() {
    this.pattern = !this.pattern;
  }

  createPattern() {
    console.log('Create Candidate: ', this.candidate, this.patternLanguageSelected);
    // const candidate = new Candidate(this.candidate.description, this.candidate.name, this.patternLanguageSelected.id, this.candidate.authors)
    // this.router.navigate(['candidate/create', this.candidate.name], { state: { data: candidate } });
  }

  cancelPattern() {
    this.pattern = !this.pattern;
  }

  /** SERVICE */
  /** ISSUE */
  submit() {
    this.candidate.name = this.nameRegex.exec(this._textEditor.value)[1];
    this.candidate.content = this._textEditor.value;
    this.candidate.uri = `/candidates/${this.candidate.name}`
    this.candidate.patternLanguageId = this.patternLanguageSelected == '-1' ? null : this.patternLanguageSelected;
    this.candidate.id ? this.update() : this.create();
  }

  create() {
    this.candidateManagementService.createCandidate(this.candidate).subscribe(result => {
      this.candidate = result
      this.disabled = true;
    })
  }

  update() {
    this.candidateManagementService.updateCandidate(this.candidate).subscribe(result => {
      this.candidate = result;
      this.disabled = true;
    })
  }

  delete() {
    this.candidateManagementService.deleteCandidate(this.candidate).subscribe(result => {
      this.exit();
    })
  }
}
