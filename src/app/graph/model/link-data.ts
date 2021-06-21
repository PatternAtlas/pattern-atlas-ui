/**
 * Contains data for a link to be displayed.
 */
export default interface LinkData {
  // the source patterns of a link
  sourcePattern: { id: string, name: string };
  // the target patterns of a link
  targetPattern: { id: string, name: string };
  // descriptions of the link
  descriptions?: Array<string>;
  // weight of the link
  weight?: string;
}
