import { INestApplication } from '@nestjs/common';
import { AxiosInstance } from 'axios';

import { User } from './../../src/common/models';
import { getAccessToken } from './../utils/auth';
import { getShortUnique, getThingDescriptionIdFromHeaderLocation } from './../utils/data';
import { closeDatabase, createUser } from './../utils/database';
import * as invalidThingDescription from './../utils/tds/invalid.td.json';
import * as validThingDescription from './../utils/tds/valid.td.json';
import * as validAnonymousThingDescription from './../utils/tds/validAnonymous.td.json';
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
    await closeDatabase();
    await app.close();
  });

  describe('POST', () => {
    it('should fail to register the Thing Description when the user is not authenticated', async () => {
      const { status, data, headers } = await axios.post('/things', validAnonymousThingDescription);
      expect(status).toBe(401);
      expect(data).toMatchObject({
        type: '/errors/types/invalid-token',
        title: 'Invalid Token',
        status: 401,
      });

      expect(headers).toHaveProperty('www-authenticate', 'Bearer realm=things');
    });

    it('should fail to register the Thing Description when it is not anonymous', async () => {
      const { status, data } = await axios.post('/things', validThingDescription, {
        headers: { Authorization: `Bearer ${defaultAccessToken}` },
      });

      expect(status).toBe(400);
      expect(data).toMatchObject({
        type: '/errors/types/non-anonymous-thing-description',
        title: 'Invalid Identified Thing Description',
        status: 400,
        detail: 'POST /things endpoint does not accept Thing Description with id, only anonymous Thing Description.',
      });
    });

    it('should fail to register the Thing Description when it is invalid', async () => {
      const { status, data } = await axios.post('/things', invalidThingDescription, {
        headers: { Authorization: `Bearer ${defaultAccessToken}` },
      });

      expect(status).toBe(400);
      expect(data).toMatchObject({
        type: '/errors/types/invalid-thing-description',
        title: 'Invalid Thing Description',
        status: 400,
        validationErrors: [
          {
            field: '/properties/status',
            description: "must have required property 'forms'",
          },
        ],
      });
    });

    it('should register the Thing Description', async () => {
      const { status, headers } = await axios.post('/things', validAnonymousThingDescription, {
        headers: { Authorization: `Bearer ${defaultAccessToken}` },
      });

      const { data } = await axios.get(headers.location);

      expect(status).toBe(201);
      expect(headers.location).toBeDefined();
      expect(data).toStrictEqual({
        id: getThingDescriptionIdFromHeaderLocation(headers.location),
        ...validAnonymousThingDescription,
      });
    });
  });

  describe('GET', () => {
    it('should retrieve all the Thing Descriptions (no pagination)', async () => {
      await axios.post('/things', validAnonymousThingDescription, {
        headers: { Authorization: `Bearer ${defaultAccessToken}` },
      });

      const { status, data, headers } = await axios.get('/things');

      expect(status).toBe(200);
      expect(headers['content-type']).toContain('application/ld+json; charset=utf-8');
      expect(data.length).toBeGreaterThanOrEqual(1);
    });

    it('should retrieve all the Enriched Thing Descriptions (no pagination)', async () => {
      await axios.post('/things', validAnonymousThingDescription, {
        headers: { Authorization: `Bearer ${defaultAccessToken}` },
      });

      const { status, data, headers } = await axios.get('/things', { params: { enriched: true } });
      const now = new Date();

      expect(status).toBe(200);
      expect(headers['content-type']).toContain('application/ld+json; charset=utf-8');
      expect(data.length).toBeGreaterThanOrEqual(1);
      expect(data[0].registration).toBeDefined();
      expect(new Date(data[0].registration.created).getTime()).toBeLessThan(now.getTime());
      expect(new Date(data[0].registration.modified).getTime()).toBeLessThan(now.getTime());
      expect(new Date(data[0].registration.retrieved).getTime()).toBeLessThanOrEqual(now.getTime());
    });
  });

  describe(':id', () => {
    describe('GET', () => {
      it('should fail to retrieve the Thing Description when it does not exist', async () => {
        const { status, data } = await axios.get(`/things/not-exist`);
        expect(status).toBe(404);
        expect(data).toMatchObject({
          type: '/errors/types/not-found',
          title: 'Not Found',
          status: 404,
        });
      });

      it('should retrieve the Thing Description', async () => {
        const { headers } = await axios.post('/things', validAnonymousThingDescription, {
          headers: { Authorization: `Bearer ${defaultAccessToken}` },
        });

        const retrieveResponse = await axios.get(headers.location);

        expect(retrieveResponse.status).toBe(200);
        expect(retrieveResponse.headers['content-type']).toContain('application/td+json; charset=utf-8');
        expect(retrieveResponse.data).toStrictEqual({
          id: getThingDescriptionIdFromHeaderLocation(headers.location),
          ...validAnonymousThingDescription,
        });
      });

      it('should retrieve the Enriched Thing Description', async () => {
        const { headers } = await axios.post('/things', validAnonymousThingDescription, {
          headers: { Authorization: `Bearer ${defaultAccessToken}` },
        });

        const { status, data } = await axios.get(headers.location, { params: { enriched: true } });
        const now = new Date();

        expect(status).toBe(200);
        expect(data).toMatchObject({
          id: getThingDescriptionIdFromHeaderLocation(headers.location),
          ...validAnonymousThingDescription,
          '@context': [
            'https://www.w3.org/2022/wot/td/v1.1',
            'https://w3c.github.io/wot-discovery/context/discovery-context.jsonld',
          ],
        });
        expect(data.registration).toBeDefined();
        expect(new Date(data.registration.created).getTime()).toBeLessThan(now.getTime());
        expect(new Date(data.registration.modified).getTime()).toBeLessThan(now.getTime());
        expect(new Date(data.registration.retrieved).getTime()).toBeLessThanOrEqual(now.getTime());
      });
    });

    describe('PUT', () => {
      it('should fail to update/create the Thing Description when it is invalid', async () => {
        const { status, data } = await axios.put('/things/no-matter', invalidThingDescription, {
          headers: { Authorization: `Bearer ${defaultAccessToken}` },
        });

        expect(status).toBe(400);
        expect(data).toMatchObject({
          type: '/errors/types/invalid-thing-description',
          title: 'Invalid Thing Description',
          status: 400,
          validationErrors: [
            {
              field: '/properties/status',
              description: "must have required property 'forms'",
            },
          ],
        });
      });

      it('should fail to create the Thing Description if the URL id does not match the body id', async () => {
        const id = getShortUnique();

        const { status, data } = await axios.put(`/things/${id}`, validThingDescription, {
          headers: { Authorization: `Bearer ${defaultAccessToken}` },
        });

        expect(status).toBe(400);
        expect(data).toMatchObject({
          type: '/errors/types/mismatch-id-expection',
          title: 'Mismatch ID',
          status: 400,
          detail: 'The id specified in the URL does not match the id in the Thing Description body',
        });
      });

      it('should fail to create the Thing Description if a anonymous Thing Description is sent', async () => {
        const id = getShortUnique();

        const { status, data } = await axios.put(`/things/${id}`, validAnonymousThingDescription, {
          headers: { Authorization: `Bearer ${defaultAccessToken}` },
        });

        expect(status).toBe(400);
        expect(data).toMatchObject({
          type: '/errors/types/mismatch-id-expection',
          title: 'Mismatch ID',
          status: 400,
          detail: 'The id specified in the URL does not match the id in the Thing Description body',
        });
      });

      it('should fail to create the Thing Description if a anonymous Thing Description is sent and no id is provided in the URL', async () => {
        const { status, data } = await axios.put(`/things/`, validAnonymousThingDescription, {
          headers: { Authorization: `Bearer ${defaultAccessToken}` },
        });

        expect(status).toBe(400);
        expect(data).toMatchObject({
          type: '/errors/types/mismatch-id-expection',
          title: 'Mismatch ID',
          status: 400,
          detail: 'The id specified in the URL does not match the id in the Thing Description body',
        });
      });

      it('should fail to create the Thing Description if no id is provided in the URL', async () => {
        const { status, data } = await axios.put(`/things/`, validThingDescription, {
          headers: { Authorization: `Bearer ${defaultAccessToken}` },
        });

        expect(status).toBe(400);
        expect(data).toMatchObject({
          type: '/errors/types/mismatch-id-expection',
          title: 'Mismatch ID',
          status: 400,
          detail: 'The id specified in the URL does not match the id in the Thing Description body',
        });
      });

      it('should fail to update the Thing Description id if the id is already exist', async () => {
        const thingDescriptions = [];
        const id = `${validThingDescription.id}:${getShortUnique()}`;
        for (let i = 0; i < 2; i++) {
          const validThingDescriptionObject = validThingDescription;
          validThingDescriptionObject.id = `${id}:${i}`;
          thingDescriptions.push(validThingDescriptionObject);
          const response = await axios.put(`/things/${validThingDescriptionObject.id}`, validThingDescriptionObject, {
            headers: { Authorization: `Bearer ${defaultAccessToken}` },
          });
          expect(response.status).toBe(201);
        }
        const { status, data } = await axios.put(`/things/${id}:0`, thingDescriptions[1], {
          headers: { Authorization: `Bearer ${defaultAccessToken}` },
        });

        expect(status).toBe(409);
        expect(data).toMatchObject({
          type: '/errors/types/duplicate-id',
          title: 'Duplicate Id',
          status: 409,
          detail: `The id ${validThingDescription.id} is already in use by another Thing Description`,
        });
      });

      it('should update the Thing Description', async () => {
        const { headers } = await axios.post('/things', validAnonymousThingDescription, {
          headers: { Authorization: `Bearer ${defaultAccessToken}` },
        });
        const updatedThingDescription = { ...validAnonymousThingDescription, newField: 'test' };

        const { status } = await axios.put(headers.location, updatedThingDescription, {
          headers: { Authorization: `Bearer ${defaultAccessToken}` },
        });

        const { data } = await axios.get(headers.location);
        expect(status).toBe(204);
        expect(data).toStrictEqual({
          id: getThingDescriptionIdFromHeaderLocation(headers.location),
          ...updatedThingDescription,
        });
      });

      it('should update the Thing Description id and update the URL urn', async () => {
        const { headers } = await axios.post('/things', validAnonymousThingDescription, {
          headers: { Authorization: `Bearer ${defaultAccessToken}` },
        });
        const id = `urn:dev:ops:${getShortUnique()}`;
        const updatedThingDescription = { ...validAnonymousThingDescription, id: id };

        await axios.put(headers.location, updatedThingDescription, {
          headers: { Authorization: `Bearer ${defaultAccessToken}` },
        });

        const { status } = await axios.get(headers.location);
        expect(status).toBe(404);

        const { data } = await axios.get(`/things/${id}`);
        expect(data).toMatchObject(updatedThingDescription);
      });

      it('should create the Thing Description', async () => {
        const id = `${validThingDescription.id}:${getShortUnique()}`;
        const validThingDescriptionObject = validThingDescription;
        validThingDescriptionObject.id = id;
        const { status } = await axios.put(`/things/${id}`, validThingDescriptionObject, {
          headers: { Authorization: `Bearer ${defaultAccessToken}` },
        });

        const { data } = await axios.get(`/things/${id}`);

        expect(status).toBe(201);
        expect(data).toStrictEqual(validThingDescriptionObject);
      });
    });

    describe('PATCH', () => {
      it('should fail to update the Thing Description when missing Content-Type header', async () => {
        const { status, data } = await axios.patch('/things/no-matter', validThingDescription, {
          headers: { Authorization: `Bearer ${defaultAccessToken}` },
        });
        expect(status).toBe(400);
        expect(data).toMatchObject({
          type: '/errors/types/bad-request',
          title: 'Bad Request',
          status: 400,
        });
      });

      it('should fail to update the Thing Description when wrong Content-Type header', async () => {
        const { status, data } = await axios.patch('/things/no-matter', validThingDescription, {
          headers: { Authorization: `Bearer ${defaultAccessToken}`, 'Content-Type': 'application/json' },
        });
        expect(status).toBe(400);
        expect(data).toMatchObject({
          type: '/errors/types/bad-request',
          title: 'Bad Request',
          status: 400,
        });
      });

      it('should fail to update the Thing Description when it does not exist', async () => {
        const { status, data } = await axios.patch('/things/not-exist', validThingDescription, {
          headers: { Authorization: `Bearer ${defaultAccessToken}`, 'Content-Type': 'application/merge-patch+json' },
        });
        expect(status).toBe(404);
        expect(data).toMatchObject({
          type: '/errors/types/not-found',
          title: 'Not Found',
          status: 404,
        });
      });

      it('should fail to update the Thing Description id if the id is already exist', async () => {
        const thingDescriptions = [];
        const id = `${validThingDescription.id}:${getShortUnique()}`;
        for (let i = 0; i < 2; i++) {
          const validThingDescriptionObject = validThingDescription;
          validThingDescriptionObject.id = `${id}:${i}`;
          thingDescriptions.push(validThingDescriptionObject);
          const response = await axios.put(`/things/${validThingDescriptionObject.id}`, validThingDescriptionObject, {
            headers: { Authorization: `Bearer ${defaultAccessToken}` },
          });
          expect(response.status).toBe(201);
        }
        const { status, data } = await axios.patch(`/things/${id}:0`, thingDescriptions[1], {
          headers: { Authorization: `Bearer ${defaultAccessToken}`, 'Content-Type': 'application/merge-patch+json' },
        });

        expect(status).toBe(409);
        expect(data).toMatchObject({
          type: '/errors/types/duplicate-id',
          title: 'Duplicate Id',
          status: 409,
          detail: `The id ${validThingDescription.id} is already in use by another Thing Description`,
        });
      });

      it('should fail to update the Thing Description when the patched Thing Description is invalid', async () => {
        const { headers } = await axios.post('/things', validAnonymousThingDescription, {
          headers: { Authorization: `Bearer ${defaultAccessToken}` },
        });
        const modifiedParts = { title: null };

        const { status, data } = await axios.patch(headers.location, modifiedParts, {
          headers: { Authorization: `Bearer ${defaultAccessToken}`, 'Content-Type': 'application/merge-patch+json' },
        });

        expect(status).toBe(400);
        expect(data).toMatchObject({
          type: '/errors/types/invalid-thing-description',
          title: 'Invalid Thing Description',
          status: 400,
          validationErrors: [
            {
              field: '',
              description: "must have required property 'title'",
            },
          ],
        });
      });

      it('should update the Thing Description', async () => {
        const { headers } = await axios.post('/things', validAnonymousThingDescription, {
          headers: { Authorization: `Bearer ${defaultAccessToken}` },
        });
        const modifiedParts = { title: 'New Title' };

        const { status } = await axios.patch(headers.location, modifiedParts, {
          headers: { Authorization: `Bearer ${defaultAccessToken}`, 'Content-Type': 'application/merge-patch+json' },
        });

        const { data } = await axios.get(headers.location);

        expect(status).toBe(204);
        expect(data).toStrictEqual({
          id: getThingDescriptionIdFromHeaderLocation(headers.location),
          ...validAnonymousThingDescription,
          ...modifiedParts,
        });
      });

      it('should update the Thing Description id and update the URL urn', async () => {
        const { headers } = await axios.post('/things', validAnonymousThingDescription, {
          headers: { Authorization: `Bearer ${defaultAccessToken}` },
        });
        const modifiedId = { id: `urn:dev:ops:${getShortUnique()}` };

        await axios.patch(headers.location, modifiedId, {
          headers: { Authorization: `Bearer ${defaultAccessToken}`, 'Content-Type': 'application/merge-patch+json' },
        });

        const { status } = await axios.get(headers.location);
        expect(status).toBe(404);

        const { data } = await axios.get(`/things/${modifiedId.id}`);
        expect(data).toStrictEqual({
          ...validAnonymousThingDescription,
          ...modifiedId,
        });
      });
    });

    describe('DELETE', () => {
      it('should fail to delete the Thing Description when it does not exist', async () => {
        const { status, data } = await axios.delete('/things/not-exist', {
          headers: { Authorization: `Bearer ${defaultAccessToken}` },
        });
        expect(status).toBe(404);
        expect(data).toMatchObject({
          type: '/errors/types/not-found',
          title: 'Not Found',
          status: 404,
        });
      });

      it('should delete the Thing Description', async () => {
        const { headers } = await axios.post('/things', validAnonymousThingDescription, {
          headers: { Authorization: `Bearer ${defaultAccessToken}` },
        });

        const { status } = await axios.delete(headers.location, {
          headers: { Authorization: `Bearer ${defaultAccessToken}` },
        });

        const getResponse = await axios.get(headers.location);

        expect(status).toBe(204);
        expect(getResponse.status).toBe(404);
      });
    });
  });
});
