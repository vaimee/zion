import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import getApp from './app-factory';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await getApp();
  const config = app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder().setTitle('Zion API').setVersion(config.version).build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('explorer', app, document);

  await app.listen(config.serverPort, '0.0.0.0');
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
  console.log(`Thing Description Directory is active on ${config.apiBase}`);
}

bootstrap();
