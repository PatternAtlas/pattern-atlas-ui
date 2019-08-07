// Dataformat retrieved by a SPARQL query
// e.g. SELECT ?s FROM ?s ?p ?o
// will retrieve an array of {s: {token: ..., value: ...} objects
export interface QueriedData {
  token?: string;
  value: string;
}
