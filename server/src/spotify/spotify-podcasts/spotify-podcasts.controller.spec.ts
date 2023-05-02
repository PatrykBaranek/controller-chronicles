import { Test, TestingModule } from '@nestjs/testing';
import { SpotifyPodcastsController } from './spotify-podcasts.controller';

describe('SpotifyPodcastsController', () => {
  let controller: SpotifyPodcastsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpotifyPodcastsController],
    }).compile();

    controller = module.get<SpotifyPodcastsController>(SpotifyPodcastsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
