/**
 * Defines a relation between two patterns.
 */
export interface Relation {
  /** the id of the relation itself */
  relationId: string;
  /** the label that will be displayed for this link entry, e.g. the name of there referenced patterns */
  label: string;
  /** the id of the referenced patterns */
  patternId: string;
  /** the direction of the relation as seen from the current patterns */
  direction: 'outgoing' | 'incoming';
  /** whether there are more details about this relation or not. Will be requested separately */
  hasDescription: boolean;
}

/**
 * Contains relations from a certain patterns language.
 */
export interface LanguageRelation {
  /** the id of the language */
  languageId: string;
  /** the name of the language that will be displayed */
  languageName: string;
  /** relations of the patterns within that language */
  relations: Array<Relation>;
}

/**
 * Contains the informations displayed in the Node-Infobox component.
 */
export class NodeInfo {
  /** name of the patterns */
  name: string;
  /** group name */
  group?: string;
  /** summary set by corresponding module */
  summary: string;
  /** relations grouped by languages */
  languageRelations: Array<LanguageRelation>;
}
