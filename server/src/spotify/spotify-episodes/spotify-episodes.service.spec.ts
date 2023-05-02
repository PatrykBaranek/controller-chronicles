import { Test, TestingModule } from '@nestjs/testing';
import { SpotifyEpisodesService } from './spotify-episodes.service';

describe('SpotifyEpisodesService', () => {
  let service: SpotifyEpisodesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpotifyEpisodesService],
    }).compile();

    service = module.get<SpotifyEpisodesService>(SpotifyEpisodesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
