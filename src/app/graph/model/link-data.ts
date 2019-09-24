
/**
 * Contains data for a link to be displayed.
 */
export default interface LinkData {
  // the source pattern of a link
  sourcePattern: { id: string, name: string };
  // the target pattern of a link
  targetPattern: { id: string, name: string};
  // descriptions of the link
  descriptions?: Array<string>;
  // weight of the link
  weight?: string;
}
