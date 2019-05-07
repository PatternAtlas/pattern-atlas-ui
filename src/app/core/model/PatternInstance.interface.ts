export class PatternInstance {
  uri: string;
  type: string;
  sectionProperties: Map<string, string | string[]>;

  constructor(uri: string = null, sectionProperties: Map<string, string | string[]> = null, type: string = null) {
    this.uri = uri;
    this.type = type;
    this.sectionProperties = sectionProperties;
  }


  addProperty(property: string, value: string | string[]): PatternInstance {
    this.sectionProperties.set(property, value);
    return this;
  }


}
