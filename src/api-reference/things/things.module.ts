import { Module } from '@nestjs/common';

import { ThingsController } from './things.controller';
import { ThingsService } from './things.service';

@Module({
  controllers: [ThingsController],
  providers: [ThingsService],
})
export class ThingsModule {}
