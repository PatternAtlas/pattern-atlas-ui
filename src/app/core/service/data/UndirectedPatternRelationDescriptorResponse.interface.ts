import { QueriedData } from './QueriedData.interface';

export interface UndirectedPatternRelationDescriptorResponse {
  description?: QueriedData;
  relationlink: QueriedData;
  pattern: QueriedData;
}
