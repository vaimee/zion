import { randomUUID } from 'crypto';

import { Injectable } from '@nestjs/common';
import { generate as generatePatch, apply as mergePatch } from 'json-merge-patch';

import { InvalidThingDescriptionException, NotFoundException } from './../../common/exceptions';
import { ThingDescription } from './../../common/interfaces/thing-description';
import { User } from './../../common/models';
import {
  deanonymizeThingDescription,
  deanonymizeThingDescriptions,
  enrichThingDescription,
  enrichThingDescriptions,
} from './../../common/utils';
import { validateThingDescription } from './../../common/utils/thing-description-validator';
import { ThingDescriptionRepository } from './../../persistence/thing-description.repository';
import { EventsService } from '../events/events.service';
import { ThingDescriptionDto } from './dto/thing-description.dto';
import { ThingDescriptionsQueryDto } from './dto/thing-descriptions-query.dto';

@Injectable()
export class ThingsService {
  public constructor(
    private readonly thingDescriptionRepository: ThingDescriptionRepository,
    private readonly eventsService: EventsService,
  ) {}

  public async create(user: User, dto: ThingDescriptionDto): Promise<string> {
    this.requireValidThingDescription(dto);
    const urn = `urn:uuid:${randomUUID()}`;
    const now = new Date().toISOString();
    await this.thingDescriptionRepository.create({
      urn,
      json: dto,
      created: now,
      modified: now,
      owner_id: user.id,
    });
    this.eventsService.emitCreated({ id: urn, ...dto });
    return urn;
  }

  public async retrieve(id: string, enriched: boolean): Promise<ThingDescription> {
    const internalThingDescription = await this.thingDescriptionRepository.findFirst({ where: { urn: id } });
    if (!internalThingDescription) {
      throw new NotFoundException();
    }

    const thingDescription = enriched
      ? enrichThingDescription(internalThingDescription)
      : deanonymizeThingDescription(internalThingDescription);

    return thingDescription;
  }

  public async upsert(user: User, id: string, dto: ThingDescriptionDto): Promise<boolean> {
    this.requireValidThingDescription(dto);
    const now = new Date().toISOString();
    const internalThingDescription = await this.thingDescriptionRepository.findFirst({ where: { urn: id } });
    if (internalThingDescription) {
      await this.thingDescriptionRepository.update({
        where: { id: internalThingDescription.id },
        data: { json: dto, modified: now },
      });
      const patch = generatePatch(internalThingDescription.json, dto) ?? {};
      this.eventsService.emitUpdated({ id, ...patch });
      return true;
    } else {
      await this.thingDescriptionRepository.create({
        urn: id,
        json: dto,
        created: now,
        modified: now,
        owner_id: user.id,
      });
      this.eventsService.emitCreated(dto);
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
    const now = new Date().toISOString();

    await this.thingDescriptionRepository.update({
      where: { id: internalThingDescription.id },
      data: { json: patchedThingDescription, modified: now },
    });

    this.eventsService.emitUpdated({ id: internalThingDescription.urn, ...dto });
  }

  public async delete(id: string): Promise<void> {
    const internalThingDescription = await this.thingDescriptionRepository.findFirst({ where: { urn: id } });
    if (!internalThingDescription) {
      throw new NotFoundException();
    }

    await this.thingDescriptionRepository.delete({ where: { id: internalThingDescription.id } });
    this.eventsService.emitDeleted(internalThingDescription.urn);
  }

  public async list(query: ThingDescriptionsQueryDto, enriched: boolean): Promise<ThingDescription[]> {
    const internalThingDescriptions = await this.thingDescriptionRepository.find();
    const thingDescriptions = enriched
      ? enrichThingDescriptions(internalThingDescriptions)
      : deanonymizeThingDescriptions(internalThingDescriptions);
    return thingDescriptions;
  }

  private requireValidThingDescription(data: unknown): void {
    const { valid, errors } = validateThingDescription(data);
    if (!valid && errors) {
      throw new InvalidThingDescriptionException(errors);
    }
  }
}
