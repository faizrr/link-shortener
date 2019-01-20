import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link } from './links.entity';
import { LinksService } from './links.service';

@Module({
  imports: [TypeOrmModule.forFeature([Link])],
  providers: [LinksService],
  exports: [TypeOrmModule, LinksService],
})
export class LinksCommonModule {}
