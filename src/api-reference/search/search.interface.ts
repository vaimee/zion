/**
 * @see https://w3c.github.io/wot-discovery/#exploration-directory-api-search
 */
export interface SearchAPI {
  searchJSONPath(query: string): Promise<any>;
  searchXPath(query: string): Promise<any>;
  searchSPARQL(query: string): Promise<any>;
}
