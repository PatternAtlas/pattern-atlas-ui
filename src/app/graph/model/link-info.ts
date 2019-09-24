/**
 * Contains information about the link between patterns to display in the link infobox.
 */
export default interface LinkInfo {
  // the currently selected pattern with id and name
  currPattern: {id: string, name: string};
  // the refered pattern with id and name
  linkedPattern: {id: string, name: string};
  // the description of the link. The reason this link exists
  descriptions: Array<string>;
  // the direction of the link
  direction: 'incoming' | 'outgoing';
}

