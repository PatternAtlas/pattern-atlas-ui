import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject, Subscription } from 'rxjs';
import { options } from 'marked';


@Component({
  selector: 'pp-technology-selector',
  templateUrl: './technology-selector.component.html',
  styleUrls: ['./technology-selector.component.scss']
})
export class TechnologySelectorComponent implements OnInit {

  private selectedTechnology = new Subject<{}>();

  private technologyCollectionObservableRef: Subscription;

  noTechnologyFound: boolean;

  selection = {};

  showTechSelection = true;


  constructor(@Inject(MAT_DIALOG_DATA) public data: { options: Observable<string[]> },
              public dialogRef: MatDialogRef<TechnologySelectorComponent>) {
  }


  ngOnInit(): void {
    this.technologyCollectionObservableRef = this.data.options.subscribe(
      options => {
        // Auto select single option
        if (options.length === 1) {
          this.selection [ options[ 0 ] ] = true;
          this.aggregate();
        }
      },
      error => {
        this.noTechnologyFound = true;
      }
    );
  }


  ngOnDestroy(): void {
    this.technologyCollectionObservableRef.unsubscribe();
  }


  aggregate() {
    for (const key of Object.keys(this.selection)) {
      if (!this.selection[ key ]) {
        delete this.selection[ key ];
      }
    }
    const selection = { technology: Object.keys(this.selection) };
    console.warn('Technology selection is', selection);
    this.selectedTechnology.next(selection);
  }


  getSelectedTechnology(): Observable<{}> {
    return this.selectedTechnology.asObservable();
  }
}
