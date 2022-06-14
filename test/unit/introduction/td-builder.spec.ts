import { Test } from '@nestjs/testing';

import { validateThingDescription } from '../../../src/common/utils/thing-description-validator';
import { ConfigModule } from '../../../src/config/config.module';
import { ThingDescriptionBuilderService } from '../../../src/introduction/td-builder.service';

describe('ThingDescriptionBuilder', () => {
  let builder: ThingDescriptionBuilderService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [ThingDescriptionBuilderService],
    }).compile();
    builder = moduleRef.get<ThingDescriptionBuilderService>(ThingDescriptionBuilderService);
  });

  it('should build something', async () => {
    expect(builder).toBeDefined();
    expect(await builder.build()).toBeDefined();
  });

  it('should build a valid TD', async () => {
    expect(builder).toBeDefined();

    const td = await builder.build();
    const result = validateThingDescription(td);

    expect(td).toBeDefined();
    expect(td.title).toBeDefined();
    expect(result.valid).toBe(true);
  });

  it('should build a TD with the right base address', async () => {
    expect(builder).toBeDefined();
    const td = await builder.build();
    expect(td).toBeDefined();
    expect(td.base).toBe('http://localhost:3000');
  });
});
