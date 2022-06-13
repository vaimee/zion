import { Test } from '@nestjs/testing';
import ax from 'axios';

import { AppModule } from '../../src/app.module';

export async function getE2ETestResources() {
  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  const app = moduleFixture.createNestApplication();

  await app.init();
  await app.listen(0);
  const url = await app.getUrl();
  const axios = ax.create({
    baseURL: url,
    validateStatus: () => true,
  });

  return { app, axios };
}
