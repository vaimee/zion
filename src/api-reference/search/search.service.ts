import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchService {
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
