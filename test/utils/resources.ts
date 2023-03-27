import { Logger } from '@nestjs/common';
import ax from 'axios';

import getApp from './../../src/app-factory';

export async function getE2ETestResources() {
  Logger.overrideLogger(false);
  const app = await getApp();

  await app.init();
  await app.listen(0);
  const url = await app.getUrl();

  process.env.ZION_API_BASE = url;

  const axios = ax.create({
    baseURL: url,
    validateStatus: () => true,
  });

  return { app, axios };
}
