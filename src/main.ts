import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  const config = app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder().setTitle('Zion API').setVersion(config.version).build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('explorer', app, document);

  await app.listen(config.serverPort, '0.0.0.0');
}

bootstrap();
