
/**
 * Defines a relation between two patterns.
 */
export interface Relation {
  /** the id of the relation itself */
  relationId: string;
  /** the label that will be displayed for this link entry, e.g. the name of there referenced pattern */
  label: string;
  /** the id of the referenced pattern */
  patternId: string;
  /** the direction of the relation as seen from the current pattern */
  direction: 'outgoing' | 'incoming';
  /** whether there are more details about this relation or not. Will be requested separately */
  hasDescription: boolean;
}

/**
 * Contains relations from a certain pattern language.
 */
export interface LanguageRelation {
  /** the id of the language */
  languageId: string;
  /** the name of the language that will be displayed */
  languageName: string;
  /** relations of the pattern within that language */
  relations: Array<Relation>;
}

/**
 * Contains the informations displayed in the Node-Infobox component.
 */
export class NodeInfo {
  /** name of the pattern */
  name: string;
  /** group name */
  group?: string;
  /** summary set by corresponding module */
  summary: string;
  /** relations grouped by languages */
  languageRelations: Array<LanguageRelation>;
}
