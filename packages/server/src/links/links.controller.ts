import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';

@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post()
  async create(@Body() link: CreateLinkDto) {
    return this.linksService.create(link);
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return this.linksService.findOne(id);
  }
}
