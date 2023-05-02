import { Test, TestingModule } from '@nestjs/testing';
import { SpotifyEpisodesController } from './spotify-episodes.controller';

describe('SpotifyEpisodesController', () => {
  let controller: SpotifyEpisodesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpotifyEpisodesController],
    }).compile();

    controller = module.get<SpotifyEpisodesController>(SpotifyEpisodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
