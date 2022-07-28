import { Injectable } from '@nestjs/common';

import { BadRequestException, NotFoundException } from './../../common/exceptions';
import { ThingDescriptionRepository } from './../../persistence/thing-description.repository';

@Injectable()
export class SearchService {
  public constructor(private readonly thingDescriptionRepository: ThingDescriptionRepository) {}

  public async searchJSONPath(query: string): Promise<any> {
    try {
      return await this.thingDescriptionRepository.findJSONPath(query);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  public searchXPath(query: string): Promise<any> {
    throw new NotFoundException('Search by XPath is not implemented yet');
  }

  public searchSPARQL(query: string): Promise<any> {
    throw new NotFoundException('Search by SPARQL is not implemented yet');
  }
}
