
/**
 * Contains information about a group of relations of a pattern
 */
export interface GroupInfo {
    // the name / identifier of the group of related patterns
    id: string;
    // list of outgoing links
    outgoing: Array<{id: string, name: string}>;
    // list of incoming links
    incoming: Array<{id: string, name: string}>;
}

/**
 * Contains the information of a pattern to display
 */
export interface Info {
    // name of the pattern
    name: string;
    // group name of the pattern
    group: string;
    // multiple lines of descriptions of the pattern
    description: Array<string>;
    // related patterns in groups
    related: Array<GroupInfo>;
}