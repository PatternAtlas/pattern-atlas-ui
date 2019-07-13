import { PatternLanguageSectionRestriction } from '../../core/model/PatternLanguageSectionRestriction.model';
import { CustomPrefix } from './CustomPrefix.interface';

export interface DialogPatternLanguageResult {
  sections: string[];
  restrictions?: PatternLanguageSectionRestriction[];
  name: string;
  iconUrl: string;
  prefixes?: CustomPrefix[];
}

export interface SectionRestrictionForm {
  name: string;
  restrictionType: string; // some, only, exactly, min, max
  type?: string; // e.g. xsd:string
  cardinality?: number;

}
