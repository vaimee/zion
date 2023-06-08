import { Module, OnApplicationShutdown } from '@nestjs/common';
import { InjectKnex, Knex, KnexModule } from 'nestjs-knex';

import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { TDLifecycleEventRepository } from './td-lifecycle-event.repository';
import { ThingDescriptionRepository } from './thing-description.repository';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    ConfigModule,
    KnexModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        config: {
          client: 'pg',
          connection: {
            host: config.database.host,
            port: config.database.port,
            user: config.database.user,
            password: config.database.password,
            database: config.database.database,
            pool: { min: 0, max: 10, idleTimeoutMillis: 300000 },
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [UserRepository, ThingDescriptionRepository, TDLifecycleEventRepository],
  exports: [UserRepository, ThingDescriptionRepository, TDLifecycleEventRepository],
})
export class PersistenceModule implements OnApplicationShutdown {
  public constructor(@InjectKnex() private readonly knex: Knex) {}

  public onApplicationShutdown(signal?: string | undefined) {
    this.knex.destroy();
  }
}
