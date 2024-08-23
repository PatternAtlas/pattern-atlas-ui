import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'pp-delete-algorithm',
  templateUrl: './delete-algorithm.component.html',
  styleUrls: ['./delete-algorithm.component.scss']
})
export class DeleteAlgorithmComponent implements OnInit {

  algorithms: any[];
  res = [];
  
  constructor(public dialogRef: MatDialogRef<DeleteAlgorithmComponent>,
             @Inject(MAT_DIALOG_DATA) public data) {
				 this.algorithms = data.algorithms;
			 }

  ngOnInit(): void {
  }
  
  closeDialog() {
	  if(this.res.length > 0){
		  const result = this.res;
		  this.dialogRef.close(result);
	  } else {
		  alert("no algorithm selected!");
	  }
  }

}
