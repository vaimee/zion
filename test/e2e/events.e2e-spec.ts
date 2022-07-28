import { Readable } from 'stream';

import { INestApplication, MessageEvent } from '@nestjs/common';
import { AxiosInstance } from 'axios';

import { User } from './../../src/common/models';
import * as validAnonymousThingDescription from './../utils/tds/validAnonymous.td.json';
import { getAccessToken } from '../utils/auth';
import { closeDatabase, createUser } from '../utils/database';
import { getE2ETestResources } from '../utils/resources';

type MessageEventAsArray = MessageEvent & { data: string[] };

describe('/events', () => {
  let axios: AxiosInstance;
  let app: INestApplication;
  let defaultAccessToken: string;
  let defaultUser: User;

  beforeAll(async () => {
    const res = await getE2ETestResources();
    axios = res.axios;
    app = res.app;
    defaultUser = await createUser();
    defaultAccessToken = getAccessToken(defaultUser);
  });

  afterAll(async () => {
    await closeDatabase();
    await app.close();
  });

  it('should support SSE', async () => {
    const { status, headers, data } = await axios.get('/events', {
      responseType: 'stream',
    });
    // ignore events
    data.destroy();

    expect(status).toBe(200);
    expect(headers['content-type']).toContain('text/event-stream');
  });

  it('should support SSE with query params', async () => {
    const { status, headers, data } = await axios.get('/events?diff=true', {
      responseType: 'stream',
    });
    // ignore events
    data.destroy();

    expect(status).toBe(200);
    expect(headers['content-type']).toContain('text/event-stream');
  });

  it('should fire an event', async () => {
    const { status, headers, data } = await axios.get('/events', { responseType: 'stream' });

    expect(status).toBe(200);
    expect(headers['content-type']).toContain('text/event-stream');

    const collectPromise = collectMessages(data, 1);

    const createRequest = await axios.post('/things', validAnonymousThingDescription, {
      headers: { Authorization: `Bearer ${defaultAccessToken}` },
    });

    expect(createRequest.status).toBe(201);

    const messages = await collectPromise;
    data.destroy();

    expect(messages.length).toBeGreaterThan(0);
    expect(messages[0].type).toBeDefined();
  });

  it('should support last-event-id', async () => {
    const { status, headers, data } = await axios.get('/events', { responseType: 'stream' });

    expect(status).toBe(200);
    expect(headers['content-type']).toContain('text/event-stream');

    const collectPromise = collectMessages(data, 3);

    for (let i = 0; i < 3; i++) {
      const createRequest = await axios.post('/things', validAnonymousThingDescription, {
        headers: { Authorization: `Bearer ${defaultAccessToken}` },
      });
      expect(createRequest.status).toBe(201);
    }

    const messages = await collectPromise;
    data.destroy();

    expect(messages.length).toBeGreaterThan(0);
    expect(messages[0].id).toBeDefined();

    // reconnect with last-event-id
    const reconnectResponse = await axios.get('/events', {
      responseType: 'stream',
      headers: { 'Last-Event-ID': `${messages[0].id}` },
    });

    expect(reconnectResponse.status).toBe(200);
    expect(reconnectResponse.headers['content-type']).toContain('text/event-stream');

    const nextMessages = await collectMessages(reconnectResponse.data, 2);
    reconnectResponse.data.destroy();

    expect(nextMessages.length).toBeGreaterThan(0);
    expect(nextMessages).toEqual(messages.slice(1));
  });

  it('should fire thing_created', async () => {
    const { status, headers, data } = await axios.get('/events', { responseType: 'stream' });

    expect(status).toBe(200);
    expect(headers['content-type']).toContain('text/event-stream');

    const collectPromise = collectMessages(data, 1);

    const createRequest = await axios.post('/things', validAnonymousThingDescription, {
      headers: { Authorization: `Bearer ${defaultAccessToken}` },
    });

    expect(createRequest.status).toBe(201);
    const id = createRequest.headers['location'].split('/').pop();

    const messages = await collectPromise;
    data.destroy();

    expect(messages.length).toBeGreaterThan(0);
    expect(messages[0].type).toBe('thing_created');
    expect(messages[0].data).toBeDefined();
    expect(messages[0].id).toBeDefined();

    const payload = messages[0].data.join('');
    const thing = JSON.parse(payload);

    expect(thing.id).toBe(id);
  });

  it('should fire thing_created with diff parameter', async () => {
    const { status, headers, data } = await axios.get('/events?diff=true', { responseType: 'stream' });

    expect(status).toBe(200);
    expect(headers['content-type']).toContain('text/event-stream');

    const collectPromise = collectMessages(data, 1);

    const createRequest = await axios.post('/things', validAnonymousThingDescription, {
      headers: { Authorization: `Bearer ${defaultAccessToken}` },
    });

    expect(createRequest.status).toBe(201);

    const messages = await collectPromise;
    data.destroy();

    expect(messages.length).toBeGreaterThan(0);
    expect(messages[0].type).toBe('thing_created');
    expect(messages[0].data).toBeDefined();
    expect(messages[0].id).toBeDefined();

    const payload = messages[0].data.join('');
    const thing = JSON.parse(payload);
    const location = createRequest.headers['location'];
    const id = location.split('/').pop();

    expect(thing).toEqual({ id, ...validAnonymousThingDescription });
  });

  it('should fire thing_updated', async () => {
    const createRequest = await axios.post('/things', validAnonymousThingDescription, {
      headers: { Authorization: `Bearer ${defaultAccessToken}` },
    });

    expect(createRequest.status).toBe(201);

    const location = createRequest.headers['location'];
    const id = location.split('/').pop();

    const { status, headers, data } = await axios.get('/events', { responseType: 'stream' });

    expect(status).toBe(200);
    expect(headers['content-type']).toContain('text/event-stream');

    const collectPromise = collectMessages(data, 1);

    const modifiedParts = { title: 'New Title' };

    await axios.patch(location, modifiedParts, {
      headers: { Authorization: `Bearer ${defaultAccessToken}`, 'Content-Type': 'application/merge-patch+json' },
    });

    expect(createRequest.status).toBe(201);

    const messages = await collectPromise;
    data.destroy();

    expect(messages.length).toBeGreaterThan(0);
    expect(messages[0].type).toBe('thing_updated');
    expect(messages[0].data).toBeDefined();
    expect(messages[0].id).toBeDefined();

    const payload = messages[0].data.join('');
    const thing = JSON.parse(payload);

    expect(thing.id).toBe(id);
  });

  it('should fire thing_updated with diff parameter', async () => {
    const createRequest = await axios.post('/things?diff=true', validAnonymousThingDescription, {
      headers: { Authorization: `Bearer ${defaultAccessToken}` },
    });

    expect(createRequest.status).toBe(201);

    const location = createRequest.headers['location'];
    const id = location.split('/').pop();

    const { status, headers, data } = await axios.get('/events', { responseType: 'stream' });

    expect(status).toBe(200);
    expect(headers['content-type']).toContain('text/event-stream');

    const collectPromise = collectMessages(data, 1);

    const modifiedParts = { title: 'New Title' };

    await axios.patch(location, modifiedParts, {
      headers: { Authorization: `Bearer ${defaultAccessToken}`, 'Content-Type': 'application/merge-patch+json' },
    });

    expect(createRequest.status).toBe(201);

    const messages = await collectPromise;
    data.destroy();

    expect(messages.length).toBeGreaterThan(0);
    expect(messages[0].type).toBe('thing_updated');
    expect(messages[0].data).toBeDefined();
    expect(messages[0].id).toBeDefined();

    const payload = messages[0].data.join('');
    const thing = JSON.parse(payload);

    const patch = { id, ...modifiedParts };
    expect(thing).toEqual(patch);
  });

  it('should fire thing_updated with diff parameter on PUT requests', async () => {
    const createRequest = await axios.post('/things?diff=true', validAnonymousThingDescription, {
      headers: { Authorization: `Bearer ${defaultAccessToken}` },
    });

    expect(createRequest.status).toBe(201);

    const location = createRequest.headers['location'];
    const id = location.split('/').pop();

    const { status, headers, data } = await axios.get('/events', { responseType: 'stream' });

    expect(status).toBe(200);
    expect(headers['content-type']).toContain('text/event-stream');

    const collectPromise = collectMessages(data, 1);

    const modifiedThingDescription = { ...validAnonymousThingDescription, title: 'New Title' };

    await axios.put(location, modifiedThingDescription, {
      headers: { Authorization: `Bearer ${defaultAccessToken}`, 'Content-Type': 'application/merge-patch+json' },
    });

    expect(createRequest.status).toBe(201);

    const messages = await collectPromise;
    data.destroy();

    expect(messages.length).toBeGreaterThan(0);
    expect(messages[0].type).toBe('thing_updated');
    expect(messages[0].data).toBeDefined();
    expect(messages[0].id).toBeDefined();

    const payload = messages[0].data.join('');
    const thing = JSON.parse(payload);

    const patch = { id, title: 'New Title' };
    expect(thing).toEqual(patch);
  });

  it('should fire thing_deleted', async () => {
    const createRequest = await axios.post('/things', validAnonymousThingDescription, {
      headers: { Authorization: `Bearer ${defaultAccessToken}` },
    });

    expect(createRequest.status).toBe(201);

    const location = createRequest.headers['location'];
    const id = location.split('/').pop();

    const { status, headers, data } = await axios.get('/events', { responseType: 'stream' });

    expect(status).toBe(200);
    expect(headers['content-type']).toContain('text/event-stream');

    const collectPromise = collectMessages(data, 1);

    await axios.delete(location, {
      headers: { Authorization: `Bearer ${defaultAccessToken}` },
    });

    expect(createRequest.status).toBe(201);

    const messages = await collectPromise;
    data.destroy();

    expect(messages[0].type).toBe('thing_deleted');
    expect(messages[0].data).toBeDefined();
    expect(messages[0].id).toBeDefined();

    const payload = messages[0].data.join('');
    const thing = JSON.parse(payload);

    expect(thing.id).toBe(id);
  });

  describe(':type', () => {
    it('should return not found for wrong event type', async () => {
      const { status, data } = await axios.get('/events/not_valid', {
        responseType: 'stream',
      });
      // ignore events
      data.destroy();

      expect(status).toBe(404);
    });

    it('should fire only thing_created', async () => {
      const { status, headers, data } = await axios.get('/events/thing_created', { responseType: 'stream' });
      expect(status).toBe(200);
      expect(headers['content-type']).toContain('text/event-stream');

      const collectPromise = collectMessages(data);

      const create = await axios.post('/things', validAnonymousThingDescription, {
        headers: { Authorization: `Bearer ${defaultAccessToken}` },
      });

      const modifiedParts = { title: 'New Title' };

      await axios.patch(create.headers['location'], modifiedParts, {
        headers: { Authorization: `Bearer ${defaultAccessToken}`, 'Content-Type': 'application/merge-patch+json' },
      });

      await axios.delete(create.headers['location'], {
        headers: { Authorization: `Bearer ${defaultAccessToken}` },
      });

      data.destroy();
      const collected = await collectPromise;

      expect(collected.length).toBe(1);
      expect(collected[0].type).toBe('thing_created');
      expect(collected[0].data).toBeDefined();
      expect(collected[0].id).toBeDefined();
    });

    it('should fire only thing_updated', async () => {
      const { status, headers, data } = await axios.get('/events/thing_updated', { responseType: 'stream' });
      expect(status).toBe(200);
      expect(headers['content-type']).toContain('text/event-stream');

      const collectPromise = collectMessages(data);

      const create = await axios.post('/things', validAnonymousThingDescription, {
        headers: { Authorization: `Bearer ${defaultAccessToken}` },
      });

      const modifiedParts = { title: 'New Title' };

      await axios.patch(create.headers['location'], modifiedParts, {
        headers: { Authorization: `Bearer ${defaultAccessToken}`, 'Content-Type': 'application/merge-patch+json' },
      });

      await axios.delete(create.headers['location'], {
        headers: { Authorization: `Bearer ${defaultAccessToken}` },
      });

      data.destroy();
      const collected = await collectPromise;

      expect(collected.length).toBe(1);
      expect(collected[0].type).toBe('thing_updated');
      expect(collected[0].data).toBeDefined();
      expect(collected[0].id).toBeDefined();
    });

    it('should fire only thing_deleted', async () => {
      const { status, headers, data } = await axios.get('/events/thing_deleted', { responseType: 'stream' });
      expect(status).toBe(200);
      expect(headers['content-type']).toContain('text/event-stream');

      const collectPromise = collectMessages(data);

      const create = await axios.post('/things', validAnonymousThingDescription, {
        headers: { Authorization: `Bearer ${defaultAccessToken}` },
      });

      const modifiedParts = { title: 'New Title' };

      await axios.patch(create.headers['location'], modifiedParts, {
        headers: { Authorization: `Bearer ${defaultAccessToken}`, 'Content-Type': 'application/merge-patch+json' },
      });

      await axios.delete(create.headers['location'], {
        headers: { Authorization: `Bearer ${defaultAccessToken}` },
      });

      //TODO: warning this timeout is dangerous, some how this test
      //is failing without this timeout
      await new Promise((resolve) => {
        setTimeout(resolve, 20);
      });

      data.destroy();
      const collected = await collectPromise;

      expect(collected.length).toBe(1);
      expect(collected[0].type).toBe('thing_deleted');
      expect(collected[0].data).toBeDefined();
      expect(collected[0].id).toBeDefined();
    });

    it('should support last-event-id', async () => {
      const { status, headers, data } = await axios.get('/events/thing_created', { responseType: 'stream' });

      expect(status).toBe(200);
      expect(headers['content-type']).toContain('text/event-stream');

      const collectPromise = collectMessages(data, 3);

      for (let i = 0; i < 3; i++) {
        const createRequest = await axios.post('/things', validAnonymousThingDescription, {
          headers: { Authorization: `Bearer ${defaultAccessToken}` },
        });
        expect(createRequest.status).toBe(201);
        const modifiedParts = { title: 'New Title' };

        await axios.patch(createRequest.headers['location'], modifiedParts, {
          headers: { Authorization: `Bearer ${defaultAccessToken}`, 'Content-Type': 'application/merge-patch+json' },
        });
      }

      const messages = await collectPromise;
      data.destroy();

      expect(messages.length).toBeGreaterThan(0);
      expect(messages[0].id).toBeDefined();

      // reconnect with last-event-id
      const reconnectResponse = await axios.get('/events/thing_created', {
        responseType: 'stream',
        headers: { 'Last-Event-ID': `${messages[0].id}` },
      });

      expect(reconnectResponse.status).toBe(200);
      expect(reconnectResponse.headers['content-type']).toContain('text/event-stream');

      const nextMessages = await collectMessages(reconnectResponse.data, 2);
      reconnectResponse.data.destroy();

      expect(nextMessages.length).toBeGreaterThan(0);
      expect(nextMessages).toEqual(messages.slice(1));
    });
  });
});

/**
 * @see https://html.spec.whatwg.org/multipage/server-sent-events.html#parsing-an-event-stream
 */
function parseSSEPayload(data: string): MessageEventAsArray[] {
  data.replace(/\FEFF/g, '');
  const result: MessageEventAsArray[] = [];
  const lines = data.split(/[\r\n]+/g);
  let currentEvent: MessageEventAsArray = { data: [] };
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith(':')) {
      continue;
    } else if (line.startsWith('data:')) {
      currentEvent.data.push(line.substring(5).trim());
    } else if (line.startsWith('id:')) {
      currentEvent.id = line.substring(3).trim();
    } else if (line.startsWith('event:')) {
      currentEvent.type = line.substring(6).trim();
    } else if (line === '') {
      // should be the end of the event
      // but abort if it is an empty event (i.e. no data and not type)
      if (currentEvent.data.length === 0 && currentEvent.type === undefined) {
        continue;
      }
      result.push(currentEvent);
      currentEvent = { data: [] };
    }
  }
  return result;
}

function collectMessages(data: Readable, minCount?: number | undefined): Promise<MessageEventAsArray[]> {
  return new Promise((resolve, reject) => {
    const messages: MessageEventAsArray[] = [];
    data.on('data', (chunk) => {
      const parsed = parseSSEPayload(chunk.toString());
      messages.push(...parsed);
      if (minCount && messages.length >= minCount) {
        resolve(messages);
      }
    });
    data.on('close', () => {
      // resolve only if we don't have the minCount required
      !minCount && resolve(messages);
    });
    data.on('error', reject);
  });
}
