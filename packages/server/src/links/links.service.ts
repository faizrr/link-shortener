import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Link } from './links.entity';
import { CreateLinkDto } from './dto/create-link.dto';
import nanoid from 'shared/helpers/nanoid';

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(Link)
    private readonly linksRepository: Repository<Link>,
  ) {}

  async create(linkData: CreateLinkDto) {
    const link = new Link();
    link.id = nanoid();
    link.fullLink = linkData.fullLink;

    const shortLinkExists = await this.hasUniqueId(link);
    if (shortLinkExists) {
      return await this.create(linkData);
    } else {
      return await this.linksRepository.save(link);
    }
  }

  async findOne(id: string) {
    const link = await this.linksRepository.findOneOrFail(id);
    link.visitsNumber += 1;
    await this.linksRepository.save(link); // TODO: move to async queue
    return link;
  }

  private async hasUniqueId(link: Link): Promise<boolean> {
    const existingLink = await this.linksRepository.findOne(link.id);

    return Boolean(existingLink);
  }
}
