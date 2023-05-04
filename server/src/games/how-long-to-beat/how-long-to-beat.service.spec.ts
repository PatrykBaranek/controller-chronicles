import { Test, TestingModule } from '@nestjs/testing';
import { HowLongToBeatService } from './how-long-to-beat.service';

describe('HowLongToBeatService', () => {
  let service: HowLongToBeatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HowLongToBeatService],
    }).compile();

    service = module.get<HowLongToBeatService>(HowLongToBeatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
