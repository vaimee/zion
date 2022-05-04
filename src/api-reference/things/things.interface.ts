import { ThingDescription } from 'wot-thing-description-types';

/**
 * @see https://w3c.github.io/wot-discovery/#exploration-directory-api-things
 */
export interface ThingsAPI {
  create(td: ThingDescription): Promise<void>;
  retrieve(id: string): Promise<ThingDescription>;
  upsert(id: string, td: ThingDescription): Promise<void>;
  update(id: string, td: Partial<ThingDescription>): Promise<void>;
  delete(id: string): Promise<void>;
  list(query: ListQuery): Promise<ThingDescription[]>;
}

export interface ListQuery {
  offset: number;
  limit?: number;
  format: ListPayloadFormat;
  sort_by: string;
  sort_order: ListSortOrder;
}

export enum ListPayloadFormat {
  ARRAY = 'array',
  COLLECTION = 'collection',
}

export enum ListSortOrder {
  ASC = 'asc',
  DESC = 'desc',
}
