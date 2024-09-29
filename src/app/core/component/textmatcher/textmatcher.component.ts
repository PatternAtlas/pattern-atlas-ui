import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import {createServiceTemplate, createDeploymentModel, updateServiceTemplate, createNodeType, updateNodeType} from '../../../core/util/winery-utils';
import { uploadCSARToContainer } from '../../util/opentosca-utils';

const QUANTME_NAMESPACE_PULL = "http://quantil.org/quantme/pull";
const OPENTOSCA_NAMESPACE_NODETYPE = "http://opentosca.org/nodetypes";

@Component({
  selector: 'pp-textmatcher',
  templateUrl: './textmatcher.component.html',
  styleUrls: ['./textmatcher.component.scss']
})
export class TextmatcherComponent implements OnInit {


  inputfield: FormControl;
  extractedAlgorithmInformation = []; // Array of arrays with extracted keywords
  infos = [];
  keyword_extractor: any;

  checked = true;

  showMatchingResults: boolean;
  resultAlgorithm: any;

  numbers = [1, 3, 5, 10];
  selectednumber = 3;

  tabledata = new MatTableDataSource([{ name: 'test', cosineSimilarity: 1 }]); // Initial value
  fulltabledata: any;
  columnsToDisplay = ['name', 'cosineSimilarity'];
  deploymentFileContentUrl:any;

  rephrasedInput = '';
  showRephrasedInput: boolean;

  // New state variable for aggregation
  isAggregationComplete = false;

  constructor(
    public dialogRef: MatDialogRef<TextmatcherComponent>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.showMatchingResults = false;
    this.showRephrasedInput = false;

    if (this.data.prev.length > 0) {
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

    // HTTP call to fetch algorithms
    this.http.get("http://localhost:6626/atlas/algorithms").subscribe((algodata: any) => {
      algodata.content.forEach((algorithm: any) => {
        if (algorithm.id === "3c7722e2-09c3-4667-9a0d-a45d3ddc42ae") {
          algorithm.applicationAreas = ["Search", "clauses Problems", "Computers", "satisfiable"];
        }

        this.infos.push({ name: algorithm.name, data: algorithm });
      });
    });

    console.log("Received Data:", this.data);
    console.log(this.infos);
  }

  checkboxClicked(event) {
    this.checked = !this.checked;
  }

  numberChanged() {
    this.tabledata.data = this.fulltabledata.slice(0, this.selectednumber);
  }

  closeDialog(algorithmName: string) {
    const previous = {
      resultAlgorithm: this.resultAlgorithm,
      tabledata: this.tabledata,
      fulltabledata: this.fulltabledata,
      columnsToDisplay: this.columnsToDisplay,
      inputfieldvalue: this.inputfield.value,
      rephrasedInput: this.rephrasedInput,
      selectedNumber: this.selectednumber,
    };

    this.dialogRef.close({ algoname: algorithmName, prev: previous });
  }

  closeDialog2() {
    if (this.inputfield.value != '' && this.showMatchingResults) {
      const previous = {
        resultAlgorithm: this.resultAlgorithm,
        tabledata: this.tabledata,
        fulltabledata: this.fulltabledata,
        columnsToDisplay: this.columnsToDisplay,
        inputfieldvalue: this.inputfield.value,
        rephrasedInput: this.rephrasedInput,
        selectedNumber: this.selectednumber,
      };

      this.dialogRef.close({ algoname: undefined, prev: previous });
    } else {
      this.dialogRef.close(null);
    }
  }

  openLink() {
    const alg = this.data.data.filter(algorithm => algorithm.name == this.resultAlgorithm.name);
    if (alg.length > 0) {
      this.closeDialog(this.resultAlgorithm.name);
    }
  }

  openLink2(algname) {
    const alg = this.data.data.filter(algorithm => algorithm.name == algname);
    if (alg.length > 0) {
      this.closeDialog(algname);
    }
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

    this.rephrasedInput = '';
    this.showRephrasedInput = false;

    this.http.post<any>(url, datatosend).subscribe(resultdata => {
      const filteredResults = resultdata.result.filter(
        (r: any) => r.cosineSimilarity != null
      );

      this.fulltabledata = filteredResults;
      this.tabledata.data = this.fulltabledata.slice(0, this.selectednumber);

      if (resultdata.hasOwnProperty('rephrasedInput')) {
        this.rephrasedInput = resultdata.rephrasedInput;
        this.showRephrasedInput = true;
      }

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

  aggregateSolutions() {
	console.log("Aggregation process started...");
  
	if (this.fulltabledata && this.fulltabledata.length > 0) {
	  const firstEntry = this.fulltabledata[0]; // Get the first entry of the table
  
	  // Find matching algorithm by name from the provided algorithms list
	  const matchingAlgorithm = this.data.algorithms.find(algorithm => algorithm.name === firstEntry.name);
  
	  if (matchingAlgorithm) {
		console.log("Matching algorithm found:", matchingAlgorithm);
  
		// Make the first request to get implementations
		const implementationsUrl = `http://localhost:6626/atlas/algorithms/${matchingAlgorithm.id}/implementations`;
		this.http.get<any>(implementationsUrl).subscribe(implementations => {
		  console.log("Implementations:", implementations);
  
		  // For each implementation, get implementation packages
		  implementations.content.forEach(implementation => {
			const packagesUrl = `http://localhost:6626/atlas/algorithms/${matchingAlgorithm.id}/implementations/${implementation.id}/implementation-packages`;
			this.http.get<any>(packagesUrl).subscribe(packages => {
			  console.log("Implementation Packages:", packages);
  
			  // Filter packages where the description contains some word of the input field
			  // Split input field value by spaces into individual keywords
			  const inputKeywords = this.inputfield.value ? this.inputfield.value.split(' ') : [];
			  console.log("Input Keywords:", inputKeywords);

			 // Filter packages whose description contains any of the input keywords
			 const filteredPackages = packages.content.filter(pkg => {
				return inputKeywords.some(keyword => pkg.description.toLowerCase().includes(keyword.toLowerCase()));
			  });
  
			  // For each package, fetch the file content
			  filteredPackages.forEach(pkg => {
				const fileContentUrl = `http://localhost:6626/atlas/algorithms/${matchingAlgorithm.id}/implementations/${implementation.id}/implementation-packages/${pkg.id}/file/content`;
  
				this.http.get(fileContentUrl, { responseType: 'text' }).subscribe(fileContent => {
				  //console.log("File content:", fileContent);
  
				  // Store the file content in a variable for deployment
				  this.deploymentFileContentUrl = fileContentUrl;
				  this.isAggregationComplete = true; // Enable Deploy button once we have the file content
				}, error => {
				  console.error("Error fetching file content:", error);
				});
			  });
			}, error => {
			  console.error("Error fetching implementation packages:", error);
			});
		  });
		}, error => {
		  console.error("Error fetching implementations:", error);
		});
  
	  } else {
		console.log("No matching algorithm found for the first entry.");
	  }
	} else {
	  console.log("No data available to aggregate.");
	}
  }
  

  async deploySolution() {
	if (this.isAggregationComplete) {
	  if (this.fulltabledata && this.fulltabledata.length > 0) {
		const wineryEndpoint = "http://localhost:8093/winery/";
		const firstEntryName = this.fulltabledata[0].name; // Get the first entry of the table

		// Function to generate a random string of length 6
		const generateRandomString = (length = 6) => {
			return Math.random().toString(36).substring(2, 2 + length); // Generates a random string
		  };
	
  
		// Make sure to properly wait for the file content to be fetched
		try {
		  const fileContent = await this.http.get(this.deploymentFileContentUrl, { responseType: 'blob' }).toPromise();
		  console.log("File content fetched successfully:", fileContent);
  
		  const idwinery = firstEntryName.replaceAll("_", "") + generateRandomString();
		  console.log("ID Winery:", idwinery);
  
		  // First, create the service template with the new activity id
		  const serviceTemplate = await createServiceTemplate(idwinery, QUANTME_NAMESPACE_PULL);
		  console.log("Service Template created:", serviceTemplate);
  
		  // Create the nodetype to add it to the created service template
		  await createNodeType(idwinery + "Container", OPENTOSCA_NAMESPACE_NODETYPE);
		  await updateNodeType(idwinery + "Container", OPENTOSCA_NAMESPACE_NODETYPE);
  
		  // Update the service template with the created node type
		  const updatedServiceTemplate = await updateServiceTemplate(idwinery, QUANTME_NAMESPACE_PULL);
		  console.log("Service Template updated:", updatedServiceTemplate);
  
		  // Finally, create the deployment model containing the implementation
		  const versionUrl = wineryEndpoint + "servicetemplates/" + updatedServiceTemplate;
		  const deploymentModelUrlResult = await createDeploymentModel(
			fileContent,
			wineryEndpoint,
			idwinery + "_DA",
			"http://opentosca.org/artifacttemplates",
			"{http://opentosca.org/artifacttypes}DockerContainerArtifact",
			idwinery + "_DA",
			versionUrl
		  );

		  let uploadResult = await uploadCSARToContainer(
            "http://localhost:1337/",
            idwinery,
            "http://localhost:8093/winery/servicetemplates/http%253A%252F%252Fquantil.org%252Fquantme%252Fpull/Grover-SAToe3yau/?csar",
            "http://localhost:8093/winery"
          );
		  console.log("Deployment Model URL Result:", deploymentModelUrlResult);
  
		  console.log("Solution deployed successfully!");
		} catch (error) {
		  console.error("Error during solution deployment:", error);
		}
	  } else {
		console.error("No fulltabledata available to deploy.");
	  }
	} else {
	  console.error("Aggregation process not completed, cannot deploy the solution.");
	}
  }
}  
