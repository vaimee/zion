import { Module } from '@nestjs/common';

import { PersistenceModule } from './../../persistence/persistence.module';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [PersistenceModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
