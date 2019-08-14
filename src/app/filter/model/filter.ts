/**
 * Class that provides filtering functionality for various causes.
 */
export default class Filter {

    private config: any;

    /**
     * Creates a new filter based on the given configuration.
     * The configuration determines how the filter will do the work.
     * 
     * Example: config contains a field named 'name' and has the string value 'John'.
     * If later a list of objects should be filtered, the filter checks the individual objects for a field with 'name' and a value that somehow relates to 'John'.
     * If both checks are passed, the object will remain in the list, otherwise it will be removed.
     * 
     * @param config an object containing the filter criterias. The filter will be able to filter the later given objects depending on the values of the config object
     */
    constructor(config: any) {
        this.config = config;
    }

    /**
     * Filters a given list of patterns based on the config.
     * TODO what type of filtering? Fuzzy? How?
     * @param patterns the list of pattern objects that will be filtered based on the config
     */
    filterPatterns(patterns: Array<any>): Array<any> {
        // filter based on pattern properties
        const filtered = patterns.filter(p => {
            let result = true;
            Object.keys(this.config).forEach(k => {
                // pattern should contain same fields as the config
                if (p[k]) {
                    // and the value of that fields should match somehow
                    result = result || this.matches(p[k], this.config[k]);
                } else {
                    result = false;
                }
            }); 
            return result;
        });

        // TODO filter based on link properties

        return filtered;
    }

    // TODO use a similarity measure here!
    private matches(a: string, b: string): boolean {
        return false;
    }
}