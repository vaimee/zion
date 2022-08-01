import { INestApplication } from '@nestjs/common';
import { AxiosInstance } from 'axios';

import { validateThingDescription } from '../../src/common/utils/thing-description-validator';
import { getE2ETestResources } from './../utils/resources';

describe('/well-known', () => {
  /**
   * @see https://w3c.github.io/wot-discovery/#introduction-well-known
   */
  const SPECIFICATION_PATH = 'wot';
  let axios: AxiosInstance;
  let app: INestApplication;

  beforeAll(async () => {
    const res = await getE2ETestResources();
    app = res.app;
    axios = res.axios;
  });

  afterAll(async () => {
    await app.close();
  });

  describe(`/${SPECIFICATION_PATH}`, () => {
    describe('GET', () => {
      it('should answer to well-known', async () => {
        const { status } = await axios.get(`/.well-known/${SPECIFICATION_PATH}`);
        expect(status).toBe(200);
      });

      it('should answer with a valid Thing Description', async () => {
        const { status, data } = await axios.get(`/.well-known/${SPECIFICATION_PATH}`);
        const result = validateThingDescription(data);

        expect(status).toBe(200);
        // TODO: probably it is better to use a custom matcher so that we can return errors
        expect(result.valid).toBe(true);
      });

      /**
       * @see https://w3c.github.io/wot-discovery/#introduction-well-known
       * @see https://w3c.github.io/wot-discovery/#exploration-self
       */
      it('should follow the specification', async () => {
        const { status, headers, data } = await axios.get(`/.well-known/${SPECIFICATION_PATH}`);
        const result = validateThingDescription(data);

        expect(status).toBe(200);
        // TODO: probably it is better to use a custom matcher so that we can return errors
        expect(result.valid).toBe(true);
        expect(headers['content-type']).toContain('application/td+json');
      });
    });

    describe('HEAD', () => {
      /**
       * @see https://w3c.github.io/wot-discovery/#introduction-well-known
       * @see https://w3c.github.io/wot-discovery/#exploration-self
       */
      it('should answer to HEAD according to specification', async () => {
        const { status, headers } = await axios.head(`/.well-known/${SPECIFICATION_PATH}`);

        expect(status).toBe(200);
        expect(headers['content-type']).toContain('application/td+json');
        expect(headers['content-length']).toBeDefined();
      });
    });
  });
});
