import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PrivilegeService } from 'src/app/authentication/_services/privilege.service';
import { PAEvidence } from '../../shared';

@Component({
  selector: 'pp-evidence-dialog',
  templateUrl: './evidence-dialog.component.html',
  styleUrls: ['./evidence-dialog.component.scss']
})
export class EvidenceDialogComponent implements OnInit {

  evidenceForm: FormGroup;
  // typeControl = new FormControl();
  typeOptions = ['Website', 'Paper', 'Book']
  filteredOptions: Observable<string[]>;

  constructor(
    public dialogRef: MatDialogRef<EvidenceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PAEvidence,
    private formBuilder: FormBuilder,
    public p: PrivilegeService,
  ) { }

  ngOnInit(): void {
    this.evidenceForm = this.formBuilder.group({
      title: [this.data.title, Validators.required],
      context: [this.data.context, Validators.required],
      source: [this.data.source, Validators.required],
      type: [this.data.type, Validators.required],
      supporting: [this.data.supporting, Validators.required]
    });

    this.p.isNotCurrentUser(this.data.userId).subscribe(_disabled => {
      if(_disabled) this.evidenceForm.disable();
    })

    this.filteredOptions = this.evidenceForm.get('type').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.typeOptions.filter(option => option.toLowerCase().includes(filterValue));
  }
  onSubmit() {
    this.data.title = this.evidenceForm.get('title').value;
    this.data.context = this.evidenceForm.get('context').value;
    this.data.source = this.evidenceForm.get('source').value;
    this.data.type = this.evidenceForm.get('type').value;
    this.data.supporting = this.evidenceForm.get('supporting').value;
    this.dialogRef.close(this.data);
  }
}
