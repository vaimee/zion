import { INestApplication } from '@nestjs/common';
import { AxiosInstance } from 'axios';

import { validateThingDescription } from '../../src/common/utils/thing-description-validator';
import { getE2ETestResources } from './../utils/resources';

describe('/well-known', () => {
  /**
   * @see https://www.w3.org/TR/2023/REC-wot-discovery-20231205/#introduction-well-known
   */
  const SPECIFICATION_PATH = 'wot';
  /**
   * @see https://www.rfc-editor.org/rfc/rfc6690.html#section-7.1
   */
  const WELL_KNOWN_CORE_PATH = 'core';
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
       * @see https://www.w3.org/TR/2023/REC-wot-discovery-20231205/#introduction-well-known
       * @see https://www.w3.org/TR/2023/REC-wot-discovery-20231205/#exploration-server
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
       * @see https://www.w3.org/TR/2023/REC-wot-discovery-20231205/#introduction-well-known
       * @see https://www.w3.org/TR/2023/REC-wot-discovery-20231205/#exploration-server
       */
      it('should answer to HEAD according to specification', async () => {
        const { status, headers } = await axios.head(`/.well-known/${SPECIFICATION_PATH}`);

        expect(status).toBe(200);
        expect(headers['content-type']).toContain('application/td+json');
        expect(headers['content-length']).toBeDefined();
      });
    });
  });

  describe(`/${WELL_KNOWN_CORE_PATH}`, () => {
    describe('GET', () => {
      it('should answer to well-known', async () => {
        const { status } = await axios.get(`/.well-known/${WELL_KNOWN_CORE_PATH}`);
        expect(status).toBe(200);
      });

      /**
       * @see https://www.w3.org/TR/2023/REC-wot-discovery-20231205/#introduction-core-rd-sec
       */
      it('should follow the specification', async () => {
        const { status, headers, data } = await axios.get(`/.well-known/${WELL_KNOWN_CORE_PATH}`);

        expect(status).toBe(200);
        expect(data).toBe('</.well-known/wot>;rt="wot.directory";ct=432');
        expect(headers['content-type']).toContain('application/link-format');
      });
    });
  });
});
