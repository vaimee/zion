import { INestApplication } from '@nestjs/common';
import { AxiosInstance } from 'axios';

import { User } from './../../src/common/models/user';
import { getAccessToken } from './../utils/auth';
import { createUser } from './../utils/database';
import * as invalidThingDescription from './../utils/tds/invalid.td.json';
import * as validThingDescription from './../utils/tds/valid.td.json';
import { getE2ETestResources } from '../utils/resources';

describe('/things', () => {
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
    await app.close();
  });

  describe('POST', () => {
    it('should fail to register the Thing Description when the user is not authenticated', async () => {
      const { status } = await axios.post('/things', validThingDescription);
      expect(status).toBe(401);
    });

    it('should fail to register the Thing Description when it is invalid', async () => {
      const { status, data } = await axios.post('/things', invalidThingDescription, {
        headers: { Authorization: `Bearer ${defaultAccessToken}` },
      });

      expect(status).toBe(400);
      expect(data.validationErrors).toStrictEqual([
        { field: '/properties/status', description: "must have required property 'forms'" },
      ]);
    });

    it('should register the Thing Description', async () => {
      const { status, headers } = await axios.post('/things', validThingDescription, {
        headers: { Authorization: `Bearer ${defaultAccessToken}` },
      });

      const { data } = await axios.get(headers.location);

      expect(status).toBe(201);
      expect(headers.location).toBeDefined();
      expect(data).toStrictEqual(validThingDescription);
    });
  });

  describe(':id', () => {
    describe('GET', () => {
      it('should fail to retrieve the Thing Description when it does not exist', async () => {
        const { status } = await axios.get(`/things/not-exist`);
        expect(status).toBe(404);
      });

      it('should retrieve the Thing Description', async () => {
        const { headers } = await axios.post('/things', validThingDescription, {
          headers: { Authorization: `Bearer ${defaultAccessToken}` },
        });

        const { status, data } = await axios.get(headers.location);

        expect(status).toBe(200);
        expect(data).toStrictEqual(validThingDescription);
      });
    });
  });
});
