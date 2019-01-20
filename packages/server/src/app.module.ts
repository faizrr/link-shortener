import { Module } from '@nestjs/common';
import { LinksModule } from './links/links.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RootModule } from './root/root.module';

@Module({
  imports: [TypeOrmModule.forRoot(), LinksModule, RootModule],
})
export class AppModule {}
