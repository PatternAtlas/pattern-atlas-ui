import { PatternLanguageSectionRestriction } from '../../core/model/PatternLanguageSectionRestriction.model';
import { CustomPrefix } from './CustomPrefix.interface';

export interface DialogPatternLanguageResult {
  sections: string[];
  restrictions?: Map<string, PatternLanguageSectionRestriction[]>;
  name: string;
  iconUrl: string;
  prefixes?: CustomPrefix[];
}


