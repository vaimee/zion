import {
  Body,
  Controller,
  Delete,
  Get,
  Head,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { FastifyRequest as Request, FastifyReply as Response } from 'fastify';

import { AuthGuard } from './../../auth/auth.guard';
import { CurrentUser } from './../../common/decorators/current-user';
import { BadRequestException } from './../../common/exceptions';
import { EnrichedThingDescription, ThingDescription } from './../../common/interfaces/thing-description';
import { User } from './../../common/models';
import { ConfigService } from './../../config/config.service';
import { ThingDescriptionDto } from './dto/thing-description.dto';
import { ThingDescriptionsQueryDto } from './dto/thing-descriptions-query.dto';
import { ThingsService } from './things.service';
import { ApiCreate, ApiDelete, ApiList, ApiRetrieve, ApiUpdate, ApiUpsert } from './things.swagger';

@ApiTags('Things')
@Controller('things')
export class ThingsController {
  public constructor(private readonly config: ConfigService, private readonly thingsService: ThingsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiCreate()
  public async create(
    @CurrentUser() user: User,
    @Body() dto: ThingDescriptionDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const thingDescriptionId = await this.thingsService.create(user, dto);
    const locationURL = `${this.config.app.apiBase}/things/${thingDescriptionId}`;
    res.header('Location', locationURL);
  }

  @Head(':id')
  @Header('Content-type', 'application/td+json')
  @ApiExcludeEndpoint()
  public retrieveHead(
    @Param('id') id: string,
    @Query('enriched') enriched: boolean,
  ): ReturnType<ThingsController['retrieve']> {
    return this.retrieve(id, enriched);
  }

  @Get(':id')
  @Header('Content-type', 'application/td+json')
  @ApiRetrieve()
  public retrieve(
    @Param('id') id: string,
    @Query('enriched') enriched: boolean,
  ): Promise<ThingDescription | EnrichedThingDescription> {
    return this.thingsService.retrieve(id, enriched);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiUpsert()
  public async upsert(
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Body() dto: ThingDescriptionDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const updated = await this.thingsService.upsert(user, id, dto);
    res.statusCode = updated ? HttpStatus.NO_CONTENT : HttpStatus.CREATED;
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiUpdate()
  public update(@Param('id') id: string, @Body() dto: ThingDescriptionDto, @Req() req: Request): Promise<void> {
    const isCorrectContentType = req.headers['content-type'] === 'application/merge-patch+json';
    if (!isCorrectContentType) {
      throw new BadRequestException();
    }
    return this.thingsService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiDelete()
  public delete(@Param('id') id: string): Promise<void> {
    return this.thingsService.delete(id);
  }

  @Head()
  @Header('Content-type', 'application/ld+json')
  @ApiExcludeEndpoint()
  public listHead(
    @Query() query: ThingDescriptionsQueryDto,
    @Query('enriched') enriched: boolean,
  ): ReturnType<ThingsController['list']> {
    return this.list(query, enriched);
  }

  @Get()
  @Header('Content-type', 'application/ld+json')
  @ApiList()
  public list(
    @Query() query: ThingDescriptionsQueryDto,
    @Query('enriched') enriched: boolean,
  ): Promise<ThingDescription[] | EnrichedThingDescription[]> {
    return this.thingsService.list(query, enriched);
  }
}
