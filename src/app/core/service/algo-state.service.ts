import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlgoStateService {

  //localstorage maybe not necessary anymore
  private variableToStore: string = "AlgoState";
  private variableForAlgoData: string = "AlgoDataVar";
  private tmpstore: string = "";
  
  private repoEndpoint = environment.API_URL;
  
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
	this.tmpstore = "";
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
		    console.log("response after save: ");
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
  
  clearAlgorithmData() {
    localStorage.removeItem(this.variableForAlgoData);
  }

  cleanAll() {
    localStorage.clear();
  }
  
}
