import { Test, TestingModule } from '@nestjs/testing';
import { RootController } from './root.controller';
import { LinksService } from '../links/links.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Link } from '../links/links.entity';

describe('Root Controller', () => {
  let controller: RootController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RootController],
      providers: [
        LinksService,
        {
          provide: getRepositoryToken(Link),
          useValue: jest.fn(),
        },
      ],
    }).compile();

    controller = module.get<RootController>(RootController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
