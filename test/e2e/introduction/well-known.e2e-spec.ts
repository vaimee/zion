import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { IntroductionModule } from '../../../src/introduction/introduction.module';

describe('Well-known endpoint', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [IntroductionModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should answer to well-known', () => {
    return request(app.getHttpServer()).get('/well-known/wot-thing-description').expect(200);
  });

  it('should answer with a valid Thing Description', () => {
    // TODO: validate Thing Description using node-wot
    return request(app.getHttpServer()).get('/well-known/wot-thing-description').expect(200);
  });

  /**
   * @see https://w3c.github.io/wot-discovery/#introduction-well-known
   * @see https://w3c.github.io/wot-discovery/#exploration-self
   */
  it('should answer to GET according to specification', () => {
    // TODO: validate Thing Description using node-wot
    return request(app.getHttpServer())
      .get('/well-known/wot-thing-description')
      .expect(200)
      .expect('Content-type', 'application/td+json');
  });

  /**
   * @see https://w3c.github.io/wot-discovery/#introduction-well-known
   * @see https://w3c.github.io/wot-discovery/#exploration-self
   */
  it('should answer to HEAD according to specification', () => {
    // TODO: validate Thing Description using node-wot
    return request(app.getHttpServer())
      .head('/well-known/wot-thing-description')
      .expect(200)
      .expect('Content-type', 'application/td+json')
      .expect((response) => expect(response.headers['content-length']).toBeDefined());
  });
});
