import { Test, TestingModule } from '@nestjs/testing';
import { LinksController } from './links.controller';
import { LinksService } from './links.service';
import { Link } from './links.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('Links Controller', () => {
  let controller: LinksController;
  let service: LinksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LinksController],
      providers: [
        LinksService,
        {
          provide: getRepositoryToken(Link),
          useValue: jest.fn(),
        },
      ],
    }).compile();

    controller = module.get<LinksController>(LinksController);
    service = module.get<LinksService>(LinksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call LinksService.create', async () => {
      const body = { fullLink: 'https://google.com/' };
      const result = { foo: 'bar' };
      jest.spyOn(service, 'create').mockImplementation(() => result);
      expect(await controller.create(body)).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should call LinksService.findOne', async () => {
      const result = { foo: 'bar' };
      jest.spyOn(service, 'findOne').mockImplementation(() => result);
      expect(await controller.findOne('a123')).toBe(result);
    });
  });
});
