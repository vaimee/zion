import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import { AppModule } from './app.module';

export default async function (): Promise<NestFastifyApplication> {
  const fastify = new FastifyAdapter();
  const fastifyInstance = fastify.getInstance();
  fastifyInstance.addContentTypeParser(
    /application\/(.+\+)?json/,
    { parseAs: 'string' },
    fastifyInstance.getDefaultJsonParser('ignore', 'ignore'),
  );

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, fastify);

  const validationPipe = new ValidationPipe({ transform: true });
  app.useGlobalPipes(validationPipe);

  return app;
}
