import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinksController } from './links.controller';
import { Link } from './links.entity';
import { LinksService } from './links.service';

@Module({
  imports: [TypeOrmModule.forFeature([Link])],
  controllers: [LinksController],
  providers: [LinksService],
})
export class LinksModule {}
