import {
  Body,
  Controller,
  Delete,
  Get,
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
import { ApiTags } from '@nestjs/swagger';
import { FastifyRequest as Request, FastifyReply as Response } from 'fastify';

import { AuthGuard } from './../../auth/auth.guard';
import { CurrentUser } from './../../common/decorators/current-user';
import { BadRequestException } from './../../common/exceptions';
import { ThingDescription } from './../../common/models/thing-description';
import { User } from './../../common/models/user';
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
  @ApiCreate()
  public async create(
    @CurrentUser() user: User,
    @Body() dto: ThingDescriptionDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const thingDescriptionId = await this.thingsService.create(user, dto);
    const locationURL = `${this.config.apiBase}/things/${thingDescriptionId}`;
    res.header('Location', locationURL);
  }

  @Get(':id')
  @ApiRetrieve()
  public retrieve(@Param('id') id: string): Promise<ThingDescription> {
    return this.thingsService.retrieve(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
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
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiUpdate()
  public update(@Param('id') id: string, @Body() dto: ThingDescriptionDto, @Req() req: Request): Promise<void> {
    const isCorrectContentType = req.headers['content-type'] === 'application/merge-patch+json';
    if (!isCorrectContentType) {
      throw new BadRequestException();
    }
    return this.thingsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiDelete()
  public delete(@Param('id') id: string): Promise<void> {
    return this.thingsService.delete(id);
  }

  @Get()
  @ApiList()
  public list(@Query() query: ThingDescriptionsQueryDto): Promise<ThingDescription[]> {
    return this.thingsService.list(query);
  }
}
