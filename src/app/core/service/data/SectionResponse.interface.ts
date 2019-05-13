import { QueriedData } from './QueriedData.interface';

export interface SectionResponse {
  property: QueriedData;
  dataRange: QueriedData;
  cardinality?: QueriedData;
}
