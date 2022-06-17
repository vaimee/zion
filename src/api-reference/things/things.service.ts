import { randomUUID } from 'crypto';

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FastifyRequest as Request, FastifyReply as Response } from 'fastify';
import { apply as mergePatch } from 'json-merge-patch';

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
    const internalThingDescription = await this.thingDescriptionRepository.findFirst({ where: { urn: id } });
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

    const internalThingDescription = await this.thingDescriptionRepository.findFirst({ where: { urn: id } });
    if (internalThingDescription) {
      await this.thingDescriptionRepository.update({ where: { id: internalThingDescription.id }, data: { json: dto } });
      res.statusCode = 204;
    } else {
      await this.thingDescriptionRepository.create({ urn: id, json: dto, owner_id: user.id });
      res.statusCode = 201;
    }
  }

  public async update(id: string, dto: ThingDescriptionDto, req: Request, res: Response): Promise<void> {
    const isCorrectContentType = req.headers['content-type'] === 'application/merge-patch+json';
    if (!isCorrectContentType) {
      throw new BadRequestException();
    }

    const internalThingDescription = await this.thingDescriptionRepository.findFirst({ where: { urn: id } });
    if (!internalThingDescription) {
      throw new NotFoundException();
    }

    const patchedThingDescription = mergePatch(internalThingDescription.json, dto);
    const { valid, errors } = validateThingDescription(patchedThingDescription);
    if (!valid) {
      throw new BadRequestException({ validationErrors: errors });
    }

    await this.thingDescriptionRepository.update({
      where: { id: internalThingDescription.id },
      data: { json: patchedThingDescription },
    });
    res.statusCode = 204;
  }

  public async delete(id: string, res: Response): Promise<void> {
    const internalThingDescription = await this.thingDescriptionRepository.findFirst({ where: { urn: id } });
    if (!internalThingDescription) {
      throw new NotFoundException();
    }
    await this.thingDescriptionRepository.delete({ where: { id: internalThingDescription.id } });
    res.statusCode = 204;
  }

  public async list(query: ThingDescriptionsQueryDto): Promise<ThingDescription[]> {
    const thingDescriptions = await this.thingDescriptionRepository.find({});
    return thingDescriptions.map((td) => td.json);
  }
}
