import { join } from 'path';

import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path as rootPath } from 'app-root-path';

import { ApiReferenceModule } from './api-reference/api-reference.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { IntroductionModule } from './introduction/introduction.module';
import { PersistenceModule } from './persistence/persistence.module';

@Module({
  imports: [
    ConfigModule,
    PersistenceModule,
    IntroductionModule,
    AuthModule,
    ApiReferenceModule,
    ServeStaticModule.forRoot({
      rootPath: join(rootPath, 'static'),
      renderPath: '/(^$|css|images|js|assets)',
      serveStaticOptions: {
        extensions: ['html', 'svg', 'png', 'json', 'js', 'css'],
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
