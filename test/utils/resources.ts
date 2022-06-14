import { DynamicModule, ForwardReference, Type } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import ax from 'axios';

import { AppModule } from '../../src/app.module';

export async function getE2ETestResources(
  modules: Array<Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference<any>> = [],
) {
  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule, ...modules],
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
