
/**
 * Contains information about a link
 */
export interface LinkInfo {
    // the id of the node that is refered within this link
    nodeId: string;
    // the name of the referenced node
    name: string;
    // the id of the link object itself
    linkId: string;
    // whether this link has a description or not
    hasDescription: boolean;
}

/**
 * Contains information about a group of relations of a pattern
 */
export interface GroupInfo {
    // the name / identifier of the group of related patterns
    id: string;
    // list of outgoing links
    outgoing: Array<LinkInfo>;
    // list of incoming links
    incoming: Array<LinkInfo>;
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