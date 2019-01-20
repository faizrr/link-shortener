import { Module } from '@nestjs/common';
import { LinksController } from './links.controller';
import { LinksCommonModule } from './links.common.module';

@Module({
  imports: [LinksCommonModule],
  controllers: [LinksController],
})
export class LinksModule {}
