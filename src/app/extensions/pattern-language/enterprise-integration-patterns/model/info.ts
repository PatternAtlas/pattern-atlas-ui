
/**
 * Contains the information of a pattern to display
 */
export default interface Info {
    // name of the pattern
    name: string;
    // group name of the pattern
    group: string;
    // multiple lines of descriptions of the pattern
    description: Array<string>;
    // outgoing links
    outgoing: Array<{id: string, name: string}>;
    // incoming links
    incoming: Array<{id: string, name: string}>;
}