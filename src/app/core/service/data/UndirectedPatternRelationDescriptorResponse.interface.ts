import { QueriedData } from './QueriedData.interface';
import { PatternRelationDescriptorResponse } from './PatternRelationDescriptorResponse.interface';

export interface UndirectedPatternRelationDescriptorResponse extends PatternRelationDescriptorResponse {
  relationlink: QueriedData;
  pattern: QueriedData;
}
