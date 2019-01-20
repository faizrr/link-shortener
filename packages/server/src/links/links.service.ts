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

  async getStats() {
    const createdLinksNumber = await this.getCreatedLinksNumber();
    const linksVisitsNumber = await this.getLinksVisitsNumber();
    const lastCreatedLinkTime = await this.getLastCreatedLinkTime();

    return {
      createdLinks: createdLinksNumber,
      linksVisits: linksVisitsNumber,
      lastCreatedLinkTime,
    };
  }

  private async hasUniqueId(link: Link): Promise<boolean> {
    const existingLink = await this.linksRepository.findOne(link.id);

    return Boolean(existingLink);
  }

  private async getCreatedLinksNumber() {
    return await this.linksRepository.count();
  }

  private async getLinksVisitsNumber() {
    const { sum = 0 } = await this.linksRepository
      .createQueryBuilder('link')
      .select('SUM(link.visitsNumber)', 'sum')
      .cache(5000)
      .getRawOne();

    return Number(sum);
  }

  private async getLastCreatedLinkTime() {
    const { link_createdAt = null } =
      (await this.linksRepository
        .createQueryBuilder('link')
        .select('link.createdAt')
        .orderBy('link.createdAt', 'DESC')
        .limit(1)
        .cache(5000)
        .getRawOne()) || {};

    return link_createdAt;
  }
}
