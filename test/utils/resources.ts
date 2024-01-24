import { Logger } from '@nestjs/common';
import ax from 'axios';

import getApp from './../../src/app-factory';

export async function getE2ETestResources() {
  Logger.overrideLogger(false);
  const app = await getApp();

  await app.init();
  await app.listen(0);
  // Workaround for axios not being able to handle [::1] IPv6 addresses
  // in CI. See https://github.com/axios/axios/issues/5333
  const url = (await app.getUrl()).replace('[::1]', 'localhost');

  process.env.ZION_API_BASE = url;

  const axios = ax.create({
    baseURL: url,
    validateStatus: () => true,
  });

  return { app, axios };
}
