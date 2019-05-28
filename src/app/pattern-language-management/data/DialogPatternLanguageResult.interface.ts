import { Section } from '../../core/model/section.model';

export interface DialogPatternLanguageResult {
  sections: Section[];
  name: string;
  iconUrl: string;
}

export interface SectionRestrictionForm {
  name: string;
  restrictionType: string; // some, only, exactly, min, max
  type?: string; // e.g. xsd:string
  cardinality?: number;
}
