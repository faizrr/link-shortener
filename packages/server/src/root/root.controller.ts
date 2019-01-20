import { Controller, Get, Param, Res, Response } from '@nestjs/common';
import { LinksService } from '../links/links.service';

@Controller('')
export class RootController {
  constructor(private readonly linksService: LinksService) {}

  @Get(':id')
  async findOne(@Param('id') id, @Res() res: Response) {
    const link = await this.linksService.findOne(id);
    const redirectUrl = new URL(link.fullLink);
    (res as any).redirect(redirectUrl.toString());
  }
}
