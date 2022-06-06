import { Test } from '@nestjs/testing';

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
    expect(td).toBeDefined();
    expect(td.title).toBeDefined();
    // TODO: use node-wot to validate the TD; currently node-wot does not have a validator
  });

  it('should build a TD with the right base address', async () => {
    expect(builder).toBeDefined();
    const td = await builder.build();
    expect(td).toBeDefined();
    expect(td.base).toBe('http://localhost:3000');
  });
});
