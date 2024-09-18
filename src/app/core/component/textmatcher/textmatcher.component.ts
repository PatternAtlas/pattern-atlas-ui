import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';


@Component({
  selector: 'pp-textmatcher',
  templateUrl: './textmatcher.component.html',
  styleUrls: ['./textmatcher.component.scss']
})
export class TextmatcherComponent implements OnInit {
	
	
    inputfield: FormControl;
	extractedAlgorithmInformation = []; //array of arrays with extracted keywords
	infos = [];
	keyword_extractor: any;
	
	checked = true;
	
	showMatchingResults: boolean;
	resultAlgorithm: any;
	
	numbers = [1,3,5,10];
	selectednumber = 3;
	
	tabledata = new MatTableDataSource([{ name: 'test', cosineSimilarity: 1 }]); // initial value
	fulltabledata: any;
	columnsToDisplay = ['name', 'cosineSimilarity'];
	
	rephrasedInput = '';
	showRephrasedInput: boolean;

	constructor(public dialogRef: MatDialogRef<TextmatcherComponent>,
              private http: HttpClient,
              @Inject(MAT_DIALOG_DATA) public data) { 
			  //onbackground click handler als andere lösung
			  dialogRef.disableClose = true;
			 
	}

  
	ngOnInit(): void {
		this.showMatchingResults = false;
		this.showRephrasedInput = false;
	  
		if (this.data.prev.length > 0) {
		  // Step 1: Filter out entries with null cosineSimilarity
		  const filteredFullTableData = this.data.prev[0].fulltabledata.filter(
			(r: any) => r.cosineSimilarity != null
		  );
	  
		  this.resultAlgorithm = this.data.prev[0].resultAlgorithm;
		  this.fulltabledata = filteredFullTableData;
		  this.tabledata = new MatTableDataSource(
			this.fulltabledata.slice(0, this.selectednumber)
		  );
		  this.columnsToDisplay = this.data.prev[0].columnsToDisplay;
		  this.rephrasedInput = this.data.prev[0].rephrasedInput;
		  this.selectednumber = this.data.prev[0].selectedNumber;
	  
		  // Initialize inputfield with previous value if available
		  if (this.data.prev[0].inputfieldvalue != '') {
			this.inputfield = new FormControl(this.data.prev[0].inputfieldvalue);
		  } else {
			this.inputfield = new FormControl('');
		  }
	  
		  this.showMatchingResults = true;
		  if (this.rephrasedInput != '') {
			this.showRephrasedInput = true;
		  }
		} else {
		  this.inputfield = new FormControl('');
		}
	  
		
		// Existing HTTP call to fetch algorithms
		this.http.get("http://localhost:6626/atlas/algorithms").subscribe((algodata: any) => {
		  algodata.content.forEach((algorithm: any) => {
				if(algorithm.id === "3c7722e2-09c3-4667-9a0d-a45d3ddc42ae"){
				algorithm.applicationAreas = ["Search", "clauses Problems", "Computers", "satisfiable"];
				}
			  
			this.infos.push({ name: algorithm.name, data: algorithm });
		  });
		});
	  
		console.log("Die Daten:", this.data);
		console.log(this.infos);
	  }
	  
	
	
	checkboxClicked(event){
	  if(this.checked){
	    this.checked = false;
	  }else{
	    this.checked = true;
	  }
	}
	
	numberChanged() {
	  this.tabledata.data = this.fulltabledata.slice(0, this.selectednumber);
	}
	
	closeDialog(algorithmName: string) {
	  let previous = { resultAlgorithm: this.resultAlgorithm,
	    tabledata: this.tabledata,
	    fulltabledata: this.fulltabledata,
	    columnsToDisplay: this.columnsToDisplay,
	    inputfieldvalue: this.inputfield.value,
	    rephrasedInput: this.rephrasedInput,
	    selectedNumber: this.selectednumber, };
			
	  this.dialogRef.close({ algoname: algorithmName, prev: previous });
	}
	
	closeDialog2() {
	  if((this.inputfield.value != '') && this.showMatchingResults){
	    let previous = { resultAlgorithm: this.resultAlgorithm,
	      tabledata: this.tabledata,
	      fulltabledata: this.fulltabledata,
	      columnsToDisplay: this.columnsToDisplay,
	      inputfieldvalue: this.inputfield.value,
	      rephrasedInput: this.rephrasedInput,
	      selectedNumber: this.selectednumber, };
			
	    this.dialogRef.close({ algoname: undefined, prev: previous });
	  }else{
	    this.dialogRef.close(null);
	  }
	}
	
   
	openLink(){
	  let alg = this.data.data.filter(algorithm => algorithm.name == this.resultAlgorithm.name);
	  if(alg.length > 0){	
	    this.closeDialog(this.resultAlgorithm.name);
	  };
		
	}
	
	openLink2(algname){
	  let alg = this.data.data.filter(algorithm => algorithm.name == algname);
		    if(alg.length > 0){	
	    this.closeDialog(algname);
		    };
	}

	extractInformation(isRake: boolean) {
		const datatosend = { input: this.inputfield.value, algodata: this.infos };
		let url = 'http://localhost:1985/api/matcher/';
		
		if (isRake) {
		  url += 'rake/';
		}
	  
		if (this.checked) {
		  url += 'openai';
		}
	  
		// Reset rephrased input
		this.rephrasedInput = '';
		this.showRephrasedInput = false;
	  
		this.http.post<any>(url, datatosend).subscribe(resultdata => {
		  // Step 1: Filter out results with null or undefined cosineSimilarity
		  const filteredResults = resultdata.result.filter(
			(r: any) => r.cosineSimilarity != null
		  );
	  
		  // Step 2: Assign filtered data to fulltabledata
		  this.fulltabledata = filteredResults;
	  
		  // Step 3: Update tabledata with the sliced data based on selectednumber
		  this.tabledata.data = this.fulltabledata.slice(0, this.selectednumber);
		  
		  console.log('Filtered tabledata:', this.fulltabledata);
	  
		  // Step 4: Handle rephrased input if available
		  if (resultdata.hasOwnProperty('rephrasedInput')) {
			this.rephrasedInput = resultdata.rephrasedInput;
			this.showRephrasedInput = true;
		  }
	  
		  // Step 5: Determine the algorithm with the highest cosineSimilarity
		  if (this.fulltabledata.length > 0) {
			const maximumkey = this.fulltabledata.reduce((prev: any, current: any) => {
			  return prev.cosineSimilarity > current.cosineSimilarity ? prev : current;
			});
	  
			if (maximumkey.cosineSimilarity > 0) {
			  this.showMatchingResults = true;
			  this.resultAlgorithm = maximumkey;
			} else {
			  this.showMatchingResults = false;
			  console.log('No similarities found!');
			}
		  } else {
			this.showMatchingResults = false;
			console.log('No data available after filtering.');
		  }
		}, error => {
		  console.error('Error during information extraction:', error);
		  this.showMatchingResults = false;
		});
	  }
}
