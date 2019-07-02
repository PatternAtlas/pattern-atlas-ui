export class PatternLanguageSectionRestriction {

  name: string;
  restrictionType: string;
  type?: string;
  cardinality?: number;

  constructor(name: string, restrictionType: string, type: string, cardinality: number) {
    this.name = name;
    this.type = type;
    this.restrictionType = restrictionType;
    this.cardinality = cardinality;
  }
}
