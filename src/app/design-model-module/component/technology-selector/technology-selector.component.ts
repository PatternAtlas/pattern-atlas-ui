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

  private selectedTechnology = new Subject<string>();

  private technologyCollectionObservableRef: Subscription;

  noTechnologyFound: boolean;


  constructor(@Inject(MAT_DIALOG_DATA) public data: { options: Observable<string[]> },
              public dialogRef: MatDialogRef<TechnologySelectorComponent>) {
  }


  ngOnInit(): void {
    this.technologyCollectionObservableRef = this.data.options.subscribe(
      options => {
        // Auto select single option
        if (options.length === 1) {
          this.selected({ value: options[ 0 ] });
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


  selected(event) {
    console.warn(event.value);
    this.selectedTechnology.next(event.value);
  }


  getSelectedTechnology(): Observable<string> {
    return this.selectedTechnology.asObservable();
  }
}
