import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import getApp from './app-factory';
import { loadSwaggerExamples, loadSwaggerSchemas } from './common/swagger/global-definitions';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await getApp();
  const config = app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Zion API')
    .setDescription('A scalable Thing Description Directory')
    .setVersion(config.app.version)
    .setContact('VAIMEE', 'https://vaimee.com', 'info@vaimee.com')
    .setLicense('Apache-2.0', 'https://www.apache.org/licenses/LICENSE-2.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  loadSwaggerExamples(document);
  loadSwaggerSchemas(document);
  SwaggerModule.setup('explorer', app, document);

  await app.listen(config.app.port, '0.0.0.0'); //config.app.host ???
  printWelcomeMessage(config);
}

function printWelcomeMessage(config: ConfigService) {
  console.log(
    `
      **         ___________ ____  _   _ 
  ┌─**──**─┐    |___  /_   _/ __ \\| \\ | |    
  **┌────┐**       / /  | || |  | |  \\| |
 ** │    │ **     / /   | || |  | | . \` |
  **└────┘**     / /__ _| || |__| | |\\  |
  └─**──**─┘    /_____|_____\\____/|_| \\_|
      **
  `,
  );
  console.log(`Thing Description Directory is active on ${config.app.apiBase}`);
}

bootstrap();
