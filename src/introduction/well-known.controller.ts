import { Controller, Get, Head, Header, Response } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';

import { WellKnownService } from './well-known.service';

/**
 * This controller is used to expose the Thing Description document.
 *
 * @see https://w3c.github.io/wot-discovery/#introduction-well-known
 */
@ApiTags('Introduction')
@Controller('well-known')
export class WellKnownController {
  public constructor(private readonly service: WellKnownService) {}

  @Get('wot')
  @Header('Content-type', 'application/td+json')
  public thingDescription() {
    return this.service.getThingDescription();
  }

  @Head('wot')
  @Header('Content-type', 'application/td+json')
  public async ping(@Response() response: FastifyReply) {
    const size = await this.service.size();
    response.header('Content-length', `${size}`);
    await response.send();
  }
}
