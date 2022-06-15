import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FastifyRequest as Request, FastifyReply as Response } from 'fastify';

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
  @UseGuards(AuthGuard)
  public upsert(
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Body() dto: ThingDescriptionDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    return this.thingsService.upsert(user, id, dto, res);
  }

  @Patch(':id')
  public update(
    @Param('id') id: string,
    @Body() dto: ThingDescriptionDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    return this.thingsService.update(id, dto, req, res);
  }

  @Delete(':id')
  public delete(@Param('id') id: string, @Res({ passthrough: true }) res: Response): Promise<void> {
    return this.thingsService.delete(id, res);
  }

  @Get()
  public list(@Query() query: ThingDescriptionsQueryDto): Promise<ThingDescription[]> {
    return this.thingsService.list(query);
  }
}
