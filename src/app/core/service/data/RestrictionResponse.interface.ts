import { QueriedData } from './QueriedData.interface';

export interface RestrictionResponse {
  property: QueriedData;
  exactCardinality?: QueriedData;
  minCardinality?: QueriedData;
  maxCardinality?: QueriedData;
  dataRange?: QueriedData;
  allValuesdataRange?: QueriedData;
  someValuesdataRange?: QueriedData;
}
