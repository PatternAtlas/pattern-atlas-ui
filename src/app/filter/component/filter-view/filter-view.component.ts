import { Component, OnInit, Input, Inject } from '@angular/core';
import { FilterFactoryService } from '../../service/filter-factory.service';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: 'pp-filter-view',
  templateUrl: './filter-view.component.html',
  styleUrls: ['./filter-view.component.scss']
})
/**
 * Displays the string-fields of a pattern that can be filtered.
 * Users can set the filter criteria via input fields provided in this view.
 */
export class FilterViewComponent implements OnInit {

  // you can't use Object.keys within a template. We assign it to a separate function
  objectKeys = Object.keys;
  // holds a copy of the filter configuration
  data: any;

  constructor(private filterFactory: FilterFactoryService,
    public thisDialogRef: MatDialogRef<FilterViewComponent>,
    @Inject(MAT_DIALOG_DATA) public patternLanguageUri: string) { }

  ngOnInit() {
    this.filterFactory.getConfig(this.patternLanguageUri)
      .then(config => {
        // copy object, don't use the original reference!
        this.data = Object.assign(config);
      });
  }

  onCloseConfirm() {
    // apply changed config in factory
    this.filterFactory.setConfig(this.patternLanguageUri, this.data);
    this.thisDialogRef.close(true);
  }

  onCloseCancel() {
    // don't apply changes in config
    this.thisDialogRef.close(false);
  }

}
