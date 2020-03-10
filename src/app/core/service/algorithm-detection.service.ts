import {Injectable} from '@angular/core';
import {AlgorithmType} from "../model/algorithm-type.enum";

@Injectable({
  providedIn: 'root'
})
export class AlgorithmDetectionService {

  constructor() {
  }

  checkForAlgorithmInput(content: string) {
    if (content) {
      if (content.includes('\\begin{quantikz}')) {
        return AlgorithmType.QUANTIKZ;
      }
    } if (content.includes('\\Qcircuit')) {
      return AlgorithmType.QCIRCUIT;
    }
  }

  returnQuantikz(content: string) {
    if (content.includes('\\begin{quantikz}')) {
      let originalContent;
      let quantikzContent;

      originalContent = content;
      return quantikzContent = content.slice(content.indexOf('\\begin{quantikz}'), content.indexOf('\\end{quantikz}') + 15);
    }
  }

}
