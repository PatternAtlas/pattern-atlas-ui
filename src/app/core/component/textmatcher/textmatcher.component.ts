import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { createServiceTemplate, createDeploymentModel, updateServiceTemplate, createNodeType, updateNodeType } from '../../../core/util/winery-utils';
import { uploadCSARToContainer } from '../../util/opentosca-utils';
import Pattern from '../../model/hal/pattern.model';
import { UiFeatures } from '../../directives/pattern-atlas-ui-repository-configuration.service';
import { MatDialog } from '@angular/material/dialog';
import { DialoggraphComponent } from '../dialoggraph/dialoggraph.component';
import * as consts from '../../util/constants';
import { environment } from 'src/environments/environment';


const QUANTME_NAMESPACE_PULL = 'http://quantil.org/quantme/pull';
const OPENTOSCA_NAMESPACE_NODETYPE = 'http://opentosca.org/nodetypes';

@Component({
  selector: 'pp-textmatcher',
  templateUrl: './textmatcher.component.html',
  styleUrls: ['./textmatcher.component.scss']
})
export class TextmatcherComponent implements OnInit {


  patterns: Array<Pattern> = [];
  inputfield: FormControl;
  extractedAlgorithmInformation = []; // Array of arrays with extracted keywords
  infos = [];
  keyword_extractor: any;
  isLoadingLinkData = true;
  isLoadingPatternData = true;
  graphVisible = true
  progressValue = 0; // Value for the progress bar
  isAggregating = false; // Flag to control progress bar visibility
  readonly UiFeatures = UiFeatures;

  checked = true;

  showMatchingResults: boolean;
  resultAlgorithm: any;
  showAlgoPopups = true;

  numbers = [1, 3, 5, 10];
  selectednumber = 3;

  tabledata = new MatTableDataSource([{ name: 'test', cosineSimilarity: 1 }]); // Initial value
  fulltabledata: any;
  columnsToDisplay = ['name', 'cosineSimilarity'];
  deploymentFileContentUrl: any;

  rephrasedInput = '';
  showRephrasedInput: boolean;

  // New state variable for aggregation
  isAggregationComplete = false;

  constructor(
    public dialogRef: MatDialogRef<TextmatcherComponent>,
    private http: HttpClient,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    dialogRef.disableClose = true;
  }

  openGraphDialog() {
    console.log(environment.LATEX_RENDERER_API_URL)

    const dialogRef = this.dialog.open(DialoggraphComponent, {
      autoFocus: false,
      data: {
        nodes: consts.PATTERNS,
        highlightedNodes: consts.Grover.data,
        edges: consts.EDGES,
        edgeInformation: consts.EDGE_INFORMATION,
        optionalNodeIds: undefined,
        name: this.fulltabledata[0].name,
        href: '',
      },
      height: '70%',
      width: '100%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('closed dialog');
    });
  }

  setGraphVisible(newValueGraphVisible: boolean) {
    if (newValueGraphVisible) { // reset the search field so all patterns are shown in the graph
      //this.filter.setValue('');
    }
    this.graphVisible = newValueGraphVisible;
    console.log('graoh visile')
    console.log(newValueGraphVisible)
    // if user toggled to early, we will retrigger
    // this.toggleBeforeDataLoaded = this.isLoadingLinkData && this.isLoadingPatternData;
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
    this.http.get(environment.atlas + '/algorithms').subscribe((algodata: any) => {
      algodata.content.forEach((algorithm: any) => {
        if (algorithm.id === '3c7722e2-09c3-4667-9a0d-a45d3ddc42ae') {
          algorithm.applicationAreas = ['variables', 'boolean Problems', 'formula', 'computers', 'logic', 'assignment'];
        }

        this.infos.push({ name: algorithm.name, data: algorithm });
      });
    });

    console.log('Received Data:', this.data);
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
    let url = environment.textMatcher + '/api/matcher/';

    if (isRake) {
      url += 'rake/';
    }


    // url += 'openai';


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
    this.isAggregating = true; // Show progress bar
    this.progressValue = 0;
    console.log('Aggregation process started...');

    if (this.fulltabledata && this.fulltabledata.length > 0) {
      const totalSteps = this.fulltabledata.length; // Total number of steps to complete
      let completedSteps = 0; // Track completed steps

      const firstEntry = this.fulltabledata[0]; // Get the first entry of the table
      const atlasEndpoint = environment.atlas;

      // Find matching algorithm by name from the provided algorithms list
      const matchingAlgorithm = this.data.algorithms.find(algorithm => algorithm.name === firstEntry.name);

      if (matchingAlgorithm) {
        console.log('Matching algorithm found:', matchingAlgorithm);

        // Make the first request to get implementations
        const implementationsUrl = atlasEndpoint + `/algorithms/${matchingAlgorithm.id}/implementations`;
        this.http.get<any>(implementationsUrl).subscribe(implementations => {
          console.log('Implementations:', implementations);

          // For each implementation, get implementation packages
          implementations.content.forEach(implementation => {
            const packagesUrl = atlasEndpoint +`/algorithms/${matchingAlgorithm.id}/implementations/${implementation.id}/implementation-packages`;
            this.http.get<any>(packagesUrl).subscribe(packages => {
              console.log('Implementation Packages:', packages);

              // Filter packages where the description contains some word of the input field
              const inputKeywords = this.inputfield.value ? this.inputfield.value.split(' ') : [];
              console.log('Input Keywords:', inputKeywords);

              const filteredPackages = packages.content.filter(pkg => {
                return inputKeywords.some(keyword => pkg.description.toLowerCase().includes(keyword.toLowerCase()));
              });

              // For each package, fetch the file content
              filteredPackages.forEach(pkg => {
                const fileContentUrl = atlasEndpoint +`/algorithms/${matchingAlgorithm.id}/implementations/${implementation.id}/implementation-packages/${pkg.id}/file/content`;

                this.http.get(fileContentUrl, { responseType: 'text' }).subscribe(fileContent => {
                  // Store the file content in a variable for deployment
                  this.deploymentFileContentUrl = fileContentUrl;

                  // Update progress value
                  completedSteps++;
                  this.progressValue = Math.round((completedSteps / (2 * totalSteps)) * 100);

                  setTimeout(() => {
                    this.progressValue = Math.round((completedSteps / totalSteps) * 100);
                    this.isAggregationComplete = true; // Enable Deploy button once aggregation is done

                  }, 3000);
                  // Once aggregation is complete, hide the progress bar
                  if (completedSteps === totalSteps) {
                    //this.isAggregating = false;
                  }
                }, error => {
                  console.error('Error fetching file content:', error);
                  completedSteps++; // Count as completed even if it fails
                  this.progressValue = Math.round((completedSteps / totalSteps) * 100);
                  if (completedSteps === totalSteps) {
                    //this.isAggregating = false; // Hide progress bar if all attempts are done
                  }
                });
              });
            }, error => {
              console.error('Error fetching implementation packages:', error);
              completedSteps++; // Count as completed even if it fails
              this.progressValue = Math.round((completedSteps / totalSteps) * 100);
              if (completedSteps === totalSteps) {
                this.isAggregating = false; // Hide progress bar if all attempts are done
              }
            });
          });
        }, error => {
          console.error('Error fetching implementations:', error);
          this.isAggregating = false; // Hide progress bar on error
        });

      } else {
        console.log('No matching algorithm found for the first entry.');
        this.isAggregating = false; // Hide progress bar if no matching algorithm
      }
    } else {
      console.log('No data available to aggregate.');
      this.isAggregating = false; // Hide progress bar if no data
    }
  }


  async deploySolution() {
    if (this.isAggregationComplete) {
      if (this.fulltabledata && this.fulltabledata.length > 0) {
        const wineryEndpoint = environment.winery;
        const firstEntryName = this.fulltabledata[0].name; // Get the first entry of the table

        // Function to generate a random string of length 6
        const generateRandomString = (length = 6) => {
          return Math.random().toString(36).substring(2, 2 + length); // Generates a random string
        };


        // Make sure to properly wait for the file content to be fetched
        try {
          const fileContent = await this.http.get(this.deploymentFileContentUrl, { responseType: 'blob' }).toPromise();
          console.log('File content fetched successfully:', fileContent);

          const idwinery = firstEntryName.replaceAll('_', '') + generateRandomString();
          const opentoscaEndpoint = environment.openToscaContainer;
          console.log('ID Winery:', idwinery);

          // First, create the service template with the new activity id
          const serviceTemplate = await createServiceTemplate(idwinery, QUANTME_NAMESPACE_PULL);
          console.log('Service Template created:', serviceTemplate);

          // Create the nodetype to add it to the created service template
          await createNodeType(idwinery + 'Container', OPENTOSCA_NAMESPACE_NODETYPE);
          await updateNodeType(idwinery + 'Container', OPENTOSCA_NAMESPACE_NODETYPE);

          // Update the service template with the created node type
          const updatedServiceTemplate = await updateServiceTemplate(idwinery, QUANTME_NAMESPACE_PULL);
          console.log('Service Template updated:', updatedServiceTemplate);

          // Finally, create the deployment model containing the implementation
          const versionUrl = wineryEndpoint + 'servicetemplates/' + updatedServiceTemplate;
          const deploymentModelUrlResult = await createDeploymentModel(
            fileContent,
            wineryEndpoint,
            idwinery + '_DA',
            'http://opentosca.org/artifacttemplates',
            '{http://opentosca.org/artifacttypes}DockerContainerArtifact',
            'service',
            versionUrl
          );

          let uploadResult = await uploadCSARToContainer(
            opentoscaEndpoint,
            idwinery,
            wineryEndpoint + `/servicetemplates/http%253A%252F%252Fquantil.org%252Fquantme%252Fpull/${idwinery}/?csar`,
            wineryEndpoint
          );
          console.log('Deployment Model URL Result:', deploymentModelUrlResult);

          console.log('Solution deployed successfully!');
        } catch (error) {
          console.error('Error during solution deployment:', error);
        }
      } else {
        console.error('No fulltabledata available to deploy.');
      }
    } else {
      console.error('Aggregation process not completed, cannot deploy the solution.');
    }
  }


}  
