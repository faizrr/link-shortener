import { Module } from '@nestjs/common';
import { RootController } from './root.controller';
import { LinksCommonModule } from '../links/links.common.module';

@Module({
  imports: [LinksCommonModule],
  controllers: [RootController],
})
export class RootModule {}
