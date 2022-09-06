import { randomUUID } from 'crypto';

import { Injectable } from '@nestjs/common';
import { generate as generatePatch, apply as mergePatch } from 'json-merge-patch';

import {
  DuplicateIdException,
  InvalidThingDescriptionException,
  MismatchIdException,
  NonAnonymousThingDescription,
  NotFoundException,
} from './../../common/exceptions';
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
    this.assertValidThingDescription(dto);
    if (dto.id) throw new NonAnonymousThingDescription();
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
    this.assertValidThingDescription(dto);
    const now = new Date().toISOString();
    const internalThingDescription = await this.thingDescriptionRepository.findFirst({ where: { urn: id } });
    if (internalThingDescription) {
      await this.assertUniqueThingDescriptionId(internalThingDescription.urn, dto.id);
      await this.thingDescriptionRepository.update({
        where: { id: internalThingDescription.id },
        data: { json: dto, urn: dto.id, modified: now },
      });
      const patch = generatePatch(internalThingDescription.json, dto) ?? {};
      this.eventsService.emitUpdated({ id, ...patch });
      return true;
    } else {
      if (id !== dto.id) throw new MismatchIdException();
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
    this.assertValidThingDescription(patchedThingDescription);
    await this.assertUniqueThingDescriptionId(internalThingDescription.urn, patchedThingDescription.id);
    const now = new Date().toISOString();

    await this.thingDescriptionRepository.update({
      where: { id: internalThingDescription.id },
      data: { json: patchedThingDescription, urn: patchedThingDescription.id, modified: now },
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

  private assertValidThingDescription(data: unknown): void {
    const { valid, errors } = validateThingDescription(data);
    if (!valid && errors) {
      throw new InvalidThingDescriptionException(errors);
    }
  }

  private async assertUniqueThingDescriptionId(currentId: string, newId: string | undefined): Promise<void> {
    if (!newId || newId === currentId) return;
    const idExist = await this.thingDescriptionRepository.exist({ where: { urn: newId } });
    if (idExist) throw new DuplicateIdException(newId as string);
  }
}
