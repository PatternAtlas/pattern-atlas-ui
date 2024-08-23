import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'pp-create-algorithm',
  templateUrl: './create-algorithm.component.html',
  styleUrls: ['./create-algorithm.component.scss']
})
export class CreateAlgorithmComponent implements OnInit {

  patterns: any[];
  res = [];
  opt = [];
  name: string;
  planqkref: string;
  
  infos: any;
  
  
  constructor(public dialogRef: MatDialogRef<CreateAlgorithmComponent>,
              private http: HttpClient,
             @Inject(MAT_DIALOG_DATA) public data) {
				 this.patterns = data.patterns;
  }

  ngOnInit(): void {
	  
	  let href = "https://platform.planqk.de/qc-catalog/algorithms/fae60bca-d2b6-4aa2-88b7-58caace34179";
	  this.http.get(href).subscribe(data => {
		  this.infos = data;
	  });
	  
  }
  
  closeDialog() {
	  if(this.res.length > 0){
		  const result = { name: this.name, patterns: this.res , optional: this.opt, href: this.planqkref};
		  this.dialogRef.close(result);
	  } else {
		  alert("no patterns selected!");
	  }
  }

}
