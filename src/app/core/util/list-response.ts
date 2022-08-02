/**
 * Wrapper for response containing embedded resources.
 * Beware: Although this wrapper is typed, the inner object containing the data is variable and its name will not be
 * checked for correctness or existence.
 *
 * Example:
 * let result : ListResponse<AuthorModel> = ...
 *
 * Both
 *  result._embedded.authorModels
 * and
 *  result._embedded.randomName
 * are valid according to the typechecker, even though only
 *  result._embedded.authorModels
 * actually exists.
 */
export interface ListResponse<T> {
  _embedded : {
    [props:string]: T[]
  };
}
