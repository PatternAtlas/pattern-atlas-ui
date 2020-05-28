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
   * @param config an object containing the filter criteria. The filter will filter the later given objects depending on the values of the config object
   */
  constructor(config: any) {
    this.config = config;
  }

  /**
   * Filters a given list of patterns based on the config.
   *
   * The Filter method checks, if the given config value is contained in the patterns fields.
   * Example:
   * Pattern Name - Message Filter
   * Config Name  - message
   * Filtering will include this patterns, as the test will be successful.
   *
   * @param patterns the list of patterns objects that will be filtered based on the config
   */
  filterPatterns(patterns: Array<any>): Array<any> {
    // filter based on patterns properties
    let filtered = patterns.filter(p => {
      let result = true;
      Object.keys(this.config).forEach(k => {
        // patterns should contain same fields as the config
        if (p[ k ]) {
          // and the value of that fields should match somehow
          const test = this.matches(p[ k ], this.config[ k ]);
          // all tests have to be successful! Aggregate the individual results
          result = result && test;
        } else {
          // result = false;
        }
      });
      return result;
    });

    // filter based on link properties
    if (this.config.filterByClrs) {
      filtered = filtered.filter(p => p.hasClrs);
    }

    return filtered;
  }

  // TODO use a similarity measure here!
  // for now, we check if one includes the other somehow
  // values can be string arrays! E.g. when there are multiple description values -> description is a string array
  private matches(value: string | Array<string>, config: string): boolean {
    // special case: b might be empty, i.e. "" if no filter value has been entered
    // this method works even in this situation. But keep this in mind, if we switch the match function!

    if (value instanceof Array) {
      let result = false;
      for (const s of value) {
        const shorter = (s.length < config.length) ? s : config;
        const longer = (s.length < config.length) ? config : s;
        // if one element of the list passes the test, return true
        result = result || longer.toLowerCase().includes(shorter.toLowerCase());
      }
      return result;
    } else {
      const shorter = (value.length < config.length) ? value : config;
      const longer = (value.length < config.length) ? config : value;

      return longer.toLowerCase().includes(shorter.toLowerCase());
    }
  }
}
