export class Section {
  name: string;
  type: string;
  min?: number;
  max?: number;


  constructor(name: string, type: string, min: number = null, max: number = null) {
    this.name = name;
    this.type = type;
    this.min = min;
    this.max = max;
  }
}
