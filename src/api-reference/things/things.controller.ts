import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
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

@ApiTags('Things')
@Controller('things')
export class ThingsController {
  public constructor(private readonly config: ConfigService, private readonly thingsService: ThingsService) {}

  @Post()
  @UseGuards(AuthGuard)
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
  public retrieve(@Param('id') id: string): Promise<ThingDescription> {
    return this.thingsService.retrieve(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  public async upsert(
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Body() dto: ThingDescriptionDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const updated = await this.thingsService.upsert(user, id, dto);
    res.statusCode = updated ? 204 : 201;
  }

  @Patch(':id')
  @HttpCode(204)
  public update(@Param('id') id: string, @Body() dto: ThingDescriptionDto, @Req() req: Request): Promise<void> {
    const isCorrectContentType = req.headers['content-type'] === 'application/merge-patch+json';
    if (!isCorrectContentType) {
      throw new BadRequestException();
    }
    return this.thingsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  public delete(@Param('id') id: string): Promise<void> {
    return this.thingsService.delete(id);
  }

  @Get()
  public list(@Query() query: ThingDescriptionsQueryDto): Promise<ThingDescription[]> {
    return this.thingsService.list(query);
  }
}
