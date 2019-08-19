import { QueriedData } from './QueriedData.interface';

/* Model of SPARQL result for querying the order of the existing sections */
export interface SectionResponse {
  section: QueriedData;
  position: QueriedData;
}
