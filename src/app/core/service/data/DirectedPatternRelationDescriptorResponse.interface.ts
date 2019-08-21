import { QueriedData } from './QueriedData.interface';

export interface DirectedPatternRelationDescriptorResponse {
  description?: QueriedData;
  source: QueriedData;
  target: QueriedData;
}
