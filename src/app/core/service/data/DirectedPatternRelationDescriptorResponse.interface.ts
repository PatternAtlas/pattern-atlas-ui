import { QueriedData } from './QueriedData.interface';
import { PatternRelationDescriptorResponse } from './PatternRelationDescriptorResponse.interface';

export interface DirectedPatternRelationDescriptorResponse extends PatternRelationDescriptorResponse {
  source: QueriedData;
  target: QueriedData;
}
