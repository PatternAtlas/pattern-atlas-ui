export class PatternLanguageSectionRestriction {

  name: string;
  restrictionType: string; // some, only, min, max, exactly
  type?: string;
  cardinality?: number;

  constructor(name: string, restrictionType: string, type: string, cardinality: number) {
    this.name = name;
    this.type = type;
    this.restrictionType = restrictionType;
    this.cardinality = cardinality;
  }
}

// sums up all restrictions that apply to a section
export class SectionRestrictionsResult {
  minCardinality: number;
  maxCardinality?: number;
  type: string;
}
