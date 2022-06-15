import { randomUUID } from 'crypto';

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FastifyReply as Response } from 'fastify';

import { ThingDescription } from './../../common/models/thing-description';
import { User } from './../../common/models/user';
import { validateThingDescription } from './../../common/utils/thing-description-validator';
import { ConfigService } from './../../config/config.service';
import { ThingDescriptionRepository } from './../../persistence/thing-description.repository';
import { ThingDescriptionDto } from './dto/thing-description.dto';
import { ThingDescriptionsQueryDto } from './dto/thing-descriptions-query.dto';

@Injectable()
export class ThingsService {
  public constructor(
    private readonly config: ConfigService,
    private readonly thingDescriptionRepository: ThingDescriptionRepository,
  ) {}

  public async create(user: User, dto: ThingDescriptionDto, res: Response): Promise<void> {
    const { valid, errors } = validateThingDescription(dto);
    if (!valid) {
      throw new BadRequestException({ validationErrors: errors });
    }

    const uuid = randomUUID();
    const locationURL = `${this.config.apiBase}/things/${uuid}`;

    await this.thingDescriptionRepository.create({ urn: uuid, json: dto, owner_id: user.id });
    res.header('Location', locationURL);
  }

  public async retrieve(id: string): Promise<ThingDescription> {
    const internalThingDescription = await this.thingDescriptionRepository.findOne({ urn: id });
    if (!internalThingDescription) {
      throw new NotFoundException();
    }
    return internalThingDescription.json;
  }

  public async upsert(user: User, id: string, dto: ThingDescriptionDto, res: Response): Promise<void> {
    const { valid, errors } = validateThingDescription(dto);
    if (!valid) {
      throw new BadRequestException({ validationErrors: errors });
    }

    const internalThingDescription = await this.thingDescriptionRepository.findOne({ urn: id });
    if (internalThingDescription) {
      await this.thingDescriptionRepository.update(internalThingDescription.id, { json: dto });
      res.statusCode = 204;
    } else {
      await this.thingDescriptionRepository.create({ urn: id, json: dto, owner_id: user.id });
      res.statusCode = 201;
    }
  }

  public update(id: string, dto: ThingDescriptionDto): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public list(query: ThingDescriptionsQueryDto): Promise<ThingDescription[]> {
    throw new Error('Method not implemented.');
  }
}
