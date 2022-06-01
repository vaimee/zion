/**
 * Check how farshid is implementing well-known
 * Design questions:
 * 1. DNS-SD discovery requires a DNS-SD service to be running.
 *   - How to model a running process using nestjs abstractions? is it a service?
 *   - Who handles the service lifecycle (i.e. start and stops it)? Next has lifecycle hooks that we can exploit. In theory we can start/stop the service automatically when the module is loaded/unloaded.
 * 2. file names convention: well-known.service.ts or wellKnown.service.ts? well-known.service.ts
 * 3. We need a way to build a ThingDescription from the endpoints defined in other modules:
 *  - How to retrieve the actual URL? from config
 *  - How to handle standard and not standard endpoints? update static template -> use a template
 * 4. I created two different services: one for the well-known document and one for the ThingDescription building. Maybe is it too over-engineering? No is more future-proof and easier to maintain.
 */

import { Module } from '@nestjs/common';

import { ConfigModule } from '../config/config.module';
import { ThingDescriptionBuilderService } from './td-builder.service';
import { WellKnownController } from './well-known.controller';
import { WellKnownService } from './well-known.service';

@Module({
  imports: [ConfigModule],
  controllers: [WellKnownController],
  providers: [WellKnownService, ThingDescriptionBuilderService],
})
export class IntroductionModule {}
