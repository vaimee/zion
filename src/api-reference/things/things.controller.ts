import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ThingDescription } from 'wot-thing-description-types';

import { ListQuery, ThingsAPI } from './things.interface';
import { ThingsService } from './things.service';

@ApiTags('Things')
@Controller('things')
export class ThingsController implements ThingsAPI {
  public constructor(private readonly thingsService: ThingsService) {}

  @Post()
  public create(@Body() td: ThingDescription): Promise<void> {
    return this.thingsService.create(td);
  }

  @Get(':id')
  public retrieve(@Param('id') id: string): Promise<ThingDescription> {
    return this.thingsService.retrieve(id);
  }

  @Put(':id')
  public upsert(@Param('id') id: string, @Body() td: ThingDescription): Promise<void> {
    return this.thingsService.upsert(id, td);
  }

  @Patch(':id')
  public update(@Param('id') id: string, @Body() td: Partial<ThingDescription>): Promise<void> {
    return this.thingsService.update(id, td);
  }

  @Delete(':id')
  public delete(@Param('id') id: string): Promise<void> {
    return this.thingsService.delete(id);
  }

  @Get()
  public list(@Query() query: ListQuery): Promise<ThingDescription[]> {
    return this.thingsService.list(query);
  }
}
