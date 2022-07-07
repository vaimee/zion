import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SearchService } from './search.service';
import { ApiSearchJSONPath, ApiSearchSPARQL, ApiSearchXPath } from './search.swagger';

@ApiTags('Search')
@Controller('search')
export class SearchController {
  public constructor(private readonly searchService: SearchService) {}

  @Get('jsonpath')
  @ApiSearchJSONPath()
  public searchJSONPath(@Query('query') query: string): Promise<any> {
    return this.searchService.searchJSONPath(query);
  }

  @Get('xpath')
  @ApiSearchXPath()
  public searchXPath(@Query('query') query: string): Promise<any> {
    return this.searchService.searchXPath(query);
  }

  @Get('sparql')
  @ApiSearchSPARQL()
  public searchSPARQL(@Query('query') query: string): Promise<any> {
    return this.searchSPARQL(query);
  }
}
