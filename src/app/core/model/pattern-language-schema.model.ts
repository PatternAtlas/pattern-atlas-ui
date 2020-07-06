import PatternSectionSchema from './hal/pattern-section-schema.model';

class PatternLanguageSchemaModel {
    patternLanguageId: string;
    patternLanguageName: string;
    patternSchema: PatternSectionSchema[];

    constructor()
    constructor(_patternLanguageId: string, _patternLanguageName: string, _patternSchema:  PatternSectionSchema[])
    constructor(_patternLanguageId?: string, _patternLanguageName?: string, _patternSchema?:  PatternSectionSchema[]) {
      this.patternLanguageId = _patternLanguageId;
      this.patternLanguageName = _patternLanguageName;
      this.patternSchema = _patternSchema;
    }
}

export default PatternLanguageSchemaModel;
