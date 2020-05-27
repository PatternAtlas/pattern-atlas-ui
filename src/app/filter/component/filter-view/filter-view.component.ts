import { Component, OnInit, Input, Inject, ViewChild } from '@angular/core';
import { FilterFactoryService } from '../../service/filter-factory.service';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'pp-filter-view',
  templateUrl: './filter-view.component.html',
  styleUrls: ['./filter-view.component.scss']
})
/**
 * Displays the string-fields of a patterns that can be filtered.
 * Users can set the filter criteria via input fields provided in this view.
 */
export class FilterViewComponent implements OnInit {

  // holds a copy of the filter configuration
  data: any;

  @ViewChild('checkClrs') checkClrs: MatCheckbox;

  constructor(private filterFactory: FilterFactoryService,
    public thisDialogRef: MatDialogRef<FilterViewComponent>,
    @Inject(MAT_DIALOG_DATA) public patternLanguageUri: string) { }

  ngOnInit() {
    this.filterFactory.getConfig(this.patternLanguageUri)
      .then(config => {
        // copy object, don't use the original reference!
        this.data = JSON.parse(JSON.stringify(config));
      });
  }

  // you can't use Object.keys within a template. We assign it to a separate function
  objectKeys(obj: any) {
    return Object.keys(obj).filter(k => '' + k !== 'filterByClrs');
  }

  onCloseConfirm() {
    this.data.filterByClrs = this.checkClrs.checked;
    // apply changed config in factory
    this.filterFactory.setConfig(this.patternLanguageUri, this.data);
    this.thisDialogRef.close(true);
  }

  onCloseClear() {
    // reset all filter values to empty values
    Object.keys(this.data).forEach(k => this.data[k] = '');
    this.data.filterByClrs = false;
    this.filterFactory.setConfig(this.patternLanguageUri, this.data);
    this.thisDialogRef.close(true);
  }

  onCloseCancel() {
    // don't apply changes in config
    this.thisDialogRef.close(false);
  }

}
