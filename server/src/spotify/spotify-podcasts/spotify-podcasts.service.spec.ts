import { Test, TestingModule } from '@nestjs/testing';
import { SpotifyPodcastsService } from './spotify-podcasts.service';

describe('SpotifyPodcastsService', () => {
  let service: SpotifyPodcastsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpotifyPodcastsService],
    }).compile();

    service = module.get<SpotifyPodcastsService>(SpotifyPodcastsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
