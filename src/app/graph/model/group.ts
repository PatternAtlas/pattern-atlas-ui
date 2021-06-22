/**
 * Class representing the information of a group of patterns.
 */
export default class Group {
  /** the uri of the group from the store */
  uri: string;

  /** the name of the group for labeling */
  groupName: string;

  /** list of patterns ids of included patterns */
  patterns: Array<string>;
}
