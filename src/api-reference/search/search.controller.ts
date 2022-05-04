import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SearchAPI } from './search.interface';
import { SearchService } from './search.service';

@ApiTags('Search')
@Controller('search')
export class SearchController implements SearchAPI {
  public constructor(private readonly searchService: SearchService) {}

  @Get('jsonpath')
  public searchJSONPath(@Query() query: string): Promise<any> {
    return this.searchService.searchJSONPath(query);
  }

  @Get('xpath')
  public searchXPath(@Query() query: string): Promise<any> {
    return this.searchService.searchXPath(query);
  }

  @Get('sparql')
  public searchSPARQL(@Query() query: string): Promise<any> {
    return this.searchSPARQL(query);
  }
}
