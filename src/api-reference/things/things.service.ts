import { randomUUID } from 'crypto';

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { apply as mergePatch } from 'json-merge-patch';

import { ThingDescription } from './../../common/models/thing-description';
import { User } from './../../common/models/user';
import { validateThingDescription } from './../../common/utils/thing-description-validator';
import { ThingDescriptionRepository } from './../../persistence/thing-description.repository';
import { EventsService } from '../events/events.service';
import { ThingDescriptionDto } from './dto/thing-description.dto';
import { ThingDescriptionsQueryDto } from './dto/thing-descriptions-query.dto';

@Injectable()
export class ThingsService {
  public constructor(
    private readonly thingDescriptionRepository: ThingDescriptionRepository,
    private readonly events: EventsService,
  ) {}

  public async create(user: User, dto: ThingDescriptionDto): Promise<string> {
    this.requireValidThingDescription(dto);
    const thingDescriptionId = randomUUID();
    await this.thingDescriptionRepository.create({ urn: thingDescriptionId, json: dto, owner_id: user.id });

    this.events.emitCreated({ id: thingDescriptionId, ...dto });

    return thingDescriptionId;
  }

  public async retrieve(id: string): Promise<ThingDescription> {
    const internalThingDescription = await this.thingDescriptionRepository.findFirst({ where: { urn: id } });
    if (!internalThingDescription) {
      throw new NotFoundException();
    }
    return internalThingDescription.json;
  }

  public async upsert(user: User, id: string, dto: ThingDescriptionDto): Promise<boolean> {
    this.requireValidThingDescription(dto);
    const internalThingDescription = await this.thingDescriptionRepository.findFirst({ where: { urn: id } });
    if (internalThingDescription) {
      await this.thingDescriptionRepository.update({ where: { id: internalThingDescription.id }, data: { json: dto } });
      this.events.emitUpdated(dto);
      return true;
    } else {
      await this.thingDescriptionRepository.create({ urn: id, json: dto, owner_id: user.id });
      this.events.emitCreated(dto);
      return false;
    }
  }

  public async update(id: string, dto: ThingDescriptionDto): Promise<void> {
    const internalThingDescription = await this.thingDescriptionRepository.findFirst({ where: { urn: id } });
    if (!internalThingDescription) {
      throw new NotFoundException();
    }

    const patchedThingDescription = mergePatch(internalThingDescription.json, dto);
    this.requireValidThingDescription(patchedThingDescription);

    await this.thingDescriptionRepository.update({
      where: { id: internalThingDescription.id },
      data: { json: patchedThingDescription },
    });

    dto.id = internalThingDescription.urn;
    this.events.emitUpdated(dto);
  }

  public async delete(id: string): Promise<void> {
    const internalThingDescription = await this.thingDescriptionRepository.findFirst({ where: { urn: id } });
    if (!internalThingDescription) {
      throw new NotFoundException();
    }
    await this.thingDescriptionRepository.delete({ where: { id: internalThingDescription.id } });

    this.events.emitDeleted(internalThingDescription.urn);
  }

  public async list(query: ThingDescriptionsQueryDto): Promise<ThingDescription[]> {
    const thingDescriptions = await this.thingDescriptionRepository.find();
    return thingDescriptions.map((td) => td.json);
  }

  private requireValidThingDescription(data: unknown): void {
    const { valid, errors } = validateThingDescription(data);
    if (!valid) {
      throw new BadRequestException({ validationErrors: errors });
    }
  }
}
