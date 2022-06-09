import { Test } from '@nestjs/testing';
import ax from 'axios';

import { AppModule } from '../../src/app.module';
import { ConfigService } from '../../src/config/config.service';

export async function getE2ETestResources() {
  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  const app = moduleFixture.createNestApplication();
  const config = app.get(ConfigService);

  await app.init();
  await app.listen(config.serverPort);

  const axios = ax.create({
    baseURL: `http://127.0.0.1:${config.serverPort}`,
    validateStatus: () => true,
  });

  return { app, axios };
}
