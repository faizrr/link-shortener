import { Test, TestingModule } from '@nestjs/testing';
import { LinksService } from './links.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Link } from './links.entity';
import mockRepository, {
  mockSave,
  mockFindOne,
  mockFindOneOrFail,
} from 'shared/mocks/repository';

describe('LinksService', () => {
  let service: LinksService;

  beforeEach(async () => {
    mockSave.mockClear();
    mockFindOne.mockClear();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LinksService,
        {
          provide: getRepositoryToken(Link),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<LinksService>(LinksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('successfully creates new link', async () => {
      await service.create({ fullLink: 'https://google.com/' });
      expect(mockSave.mock.calls[0][0]).toHaveProperty(
        'fullLink',
        'https://google.com/',
      );
    });
  });

  describe('findOne', () => {
    it('returns link from DB if it exists', async () => {
      const info = {
        id: 'some-id',
        fullLink: 'https://google.com',
        visitsNumber: 0,
        createdAt: new Date(),
      };
      mockFindOneOrFail.mockImplementation(() => info);
      const result = await service.findOne(info.id);

      expect(result.id).toEqual(info.id);
      expect(result.fullLink).toEqual(info.fullLink);
    });

    it('increments visitsNumber after executing', async () => {
      const info = {
        id: 'some-id',
        fullLink: 'https://google.com',
        visitsNumber: 0,
        createdAt: new Date(),
      };
      mockFindOneOrFail.mockImplementation(() => info);
      await service.findOne(info.id);

      expect(mockSave.mock.calls[0][0]).toHaveProperty('visitsNumber', 1);
    });
  });
});
