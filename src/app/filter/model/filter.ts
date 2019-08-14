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
                    // FIXME description is a array of strings...
                    // Quick Hack: ignore description for now until real data is available
                    if (typeof p[k] !== 'string') {
                        return;
                    }
        
                    // and the value of that fields should match somehow
                    let test = this.matches(p[k], this.config[k]);
                    result = result && test;
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
    // for now, we check if one includes the other somehow
    private matches(a: string, b: string): boolean {
        // special case: b might be empty, i.e. "" if no filter value has been entered
        // this method works even in this situation. But keep this in mind, if we switch the match function!

        let shorter = (a.length < b.length) ? a : b;
        let longer = (a.length < b.length) ? b : a;

        return longer.toLowerCase().includes(shorter.toLowerCase());
    }
}