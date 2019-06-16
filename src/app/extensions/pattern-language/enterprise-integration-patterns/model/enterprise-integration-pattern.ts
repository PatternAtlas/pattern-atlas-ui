import Pattern from 'src/app/core/model/pattern.model';

/**
 * Container class holding all information of an enterprise integration pattern.
 * Used to convert the Turtle data into a Typescript equivalent representation.
 */
export default class EnterpriseIntegrationPattern extends Pattern {
    description: { label: 'Description', value: Array<string>} = { label: 'Description', value: [] };

    constructor(iri: string, name?: string, description?: Array<string>) {
        super(iri, name);
        this.description.value = description;
    }
}