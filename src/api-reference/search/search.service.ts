import { Injectable } from '@nestjs/common';

import { SearchAPI } from './search.interface';

@Injectable()
export class SearchService implements SearchAPI {
  public searchJSONPath(query: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

  public searchXPath(query: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

  public searchSPARQL(query: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
