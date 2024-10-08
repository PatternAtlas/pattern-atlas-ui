import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlgoStateService {

  //localstorage maybe not necessary anymore
  private variableToStore = 'AlgoState';
  private variableForAlgoData = 'AlgoDataVar';
  private tmpstore = '';
  
  private repoEndpoint = environment.API_URL;
  private qcAtlasEndpoint = 'http://localhost:6626/atlas/algorithms'
  
  constructor(private http: HttpClient) {
  }
  
  saveAlgoState(algorithm: string){
	  //localStorage.setItem(this.variableToStore, algorithm);
	  this.tmpstore = algorithm;
  }
  
  getAlgoState() {
	  //let data = localStorage.getItem(this.variableToStore);
	  //return data;
	  return this.tmpstore;
  }

  clearAlgoState() {
    //localStorage.removeItem(this.variableToStore);
    this.tmpstore = '';
  }
  
  //
  saveAlgorithmData(data: any){
	  localStorage.setItem(this.variableForAlgoData, JSON.stringify(data));
  }
  
  saveAlgorithmData2(data: any, patternLanguageId: string){
	  console.log(this.repoEndpoint);
	  console.log(patternLanguageId);
	  
	  const url = this.repoEndpoint + '/patternForAlgorithm/' + patternLanguageId + '/saveData';
		
	  this.http.post<any>(url, data, { observe: 'response' }).subscribe(response => {
		    console.log('response after save: ');
      console.log(response);
      console.log(response.status);
    });
  }
  
  //
  getAlgorithmData(){
	  let algodata = JSON.parse(localStorage.getItem(this.variableForAlgoData));
	  return algodata;
  }
  
  getAlgorithmData2(patternLanguageId: string){
	  const url = this.repoEndpoint + '/patternForAlgorithm/' + patternLanguageId;
	  return this.http.get<any>(url);
  }

  async getAlgorithmData3() {
    const url = 'http://localhost:6626/atlas/algorithms';
    return await this.http.get<any>(url).toPromise();
  }

  async getAlgorithmData4() {
    const url = 'http://localhost:6626/atlas/algorithms/3c7722e2-09c3-4667-9a0d-a45d3ddc42ae/application-areas';
    return await this.http.get<any>(url).toPromise();
  }
  
  
  clearAlgorithmData() {
    localStorage.removeItem(this.variableForAlgoData);
  }

  cleanAll() {
    localStorage.clear();
  }
  
}
function getAlgorithmData3() {
  throw new Error('Function not implemented.');
}

