import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FastifyReply as Response } from 'fastify';

import { AuthGuard } from './../../auth/auth.guard';
import { CurrentUser } from './../../common/decorators/current-user';
import { ThingDescription } from './../../common/models/thing-description';
import { User } from './../../common/models/user';
import { ThingDescriptionDto } from './dto/thing-description.dto';
import { ThingDescriptionsQueryDto } from './dto/thing-descriptions-query.dto';
import { ThingsService } from './things.service';

@ApiTags('Things')
@Controller('things')
export class ThingsController {
  public constructor(private readonly thingsService: ThingsService) {}

  @Post()
  @UseGuards(AuthGuard)
  public create(
    @CurrentUser() user: User,
    @Body() dto: ThingDescriptionDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    return this.thingsService.create(user, dto, res);
  }

  @Get(':id')
  public retrieve(@Param('id') id: string): Promise<ThingDescription> {
    return this.thingsService.retrieve(id);
  }

  @Put(':id')
  public upsert(@Param('id') id: string, @Body() dto: ThingDescriptionDto): Promise<void> {
    return this.thingsService.upsert(id, dto);
  }

  @Patch(':id')
  public update(@Param('id') id: string, @Body() dto: ThingDescriptionDto): Promise<void> {
    return this.thingsService.update(id, dto);
  }

  @Delete(':id')
  public delete(@Param('id') id: string): Promise<void> {
    return this.thingsService.delete(id);
  }

  @Get()
  public list(@Query() query: ThingDescriptionsQueryDto): Promise<ThingDescription[]> {
    return this.thingsService.list(query);
  }
}
