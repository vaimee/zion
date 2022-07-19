import { INestApplication } from '@nestjs/common';
import { AxiosInstance } from 'axios';

import { User } from './../../src/common/models';
import { getAccessToken } from './../utils/auth';
import { getShortUnique } from './../utils/data';
import { closeDatabase, createUser } from './../utils/database';
import * as validAnonymousThingDescription from './../utils/tds/validAnonymous.td.json';
import { getE2ETestResources } from '../utils/resources';

describe('/search', () => {
  let app: INestApplication;
  let axios: AxiosInstance;

  let defaultUser: User;
  let defaultAccessToken: string;

  beforeAll(async () => {
    const res = await getE2ETestResources();
    app = res.app;
    axios = res.axios;
    defaultUser = await createUser();
    defaultAccessToken = getAccessToken(defaultUser);
  });

  afterAll(async () => {
    await closeDatabase();
    await app.close();
  });

  describe('/jsonpath', () => {
    it('should fail the jsonpath search when the query is invalid', async () => {
      const { status, data } = await axios.get('/search/jsonpath', { params: { query: 'not-jsonpath' } });
      expect(status).toBe(400);
      expect(data).toMatchObject({
        type: '/errors/types/bad-request',
        title: 'Bad Request',
        status: 400,
      });
    });

    it('should perform the jsonpath search correctly', async () => {
      const uniqueProperty = getShortUnique();
      const thingDescription = { ...validAnonymousThingDescription, uniqueProperty };
      await axios.post('/things', thingDescription, {
        headers: { Authorization: `Bearer ${defaultAccessToken}` },
      });

      const { status, data } = await axios.get('/search/jsonpath', {
        params: { query: `$[?(@.uniqueProperty == '${uniqueProperty}')]` },
      });

      expect(status).toBe(200);
      expect(data).toStrictEqual([thingDescription]);
    });
  });
});
