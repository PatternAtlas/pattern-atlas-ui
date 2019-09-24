import { Pattern } from 'src/app/graph/model';

export class CloudComputingPatternData extends Pattern {
  intent: string;
  context: string;
  drivingQuestion: string;
  solution: string;
  result: string;
  icon: string;
  solutionSketches: Array<string>;
  variations: Array<string>;
}
