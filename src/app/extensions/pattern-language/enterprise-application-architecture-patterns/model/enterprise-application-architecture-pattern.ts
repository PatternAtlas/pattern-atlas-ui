import Pattern from 'src/app/core/model/pattern.model';

export default class EnterpriseApplicationArchitecturePattern extends Pattern {
  intent: string;
  sketch?: string;
  motivation?: string;

  constructor(iri: string, name?: string) {
    super(iri, name);
  }
}
