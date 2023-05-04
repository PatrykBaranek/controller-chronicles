import { Test, TestingModule } from '@nestjs/testing';
import { RawgApiService } from './rawg-api.service';

describe('RawgApiService', () => {
  let service: RawgApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RawgApiService],
    }).compile();

    service = module.get<RawgApiService>(RawgApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
