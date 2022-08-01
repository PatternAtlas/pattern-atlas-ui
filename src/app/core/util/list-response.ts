
export interface ListResponse<T> {
  _embedded : {
    [props:string]: T[]
  };
}
