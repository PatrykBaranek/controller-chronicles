import { RawgApiGamesService } from "src/rawg/rawg-api/rawg-api-games/rawg-api-games.service";
import { GamesRepository } from "../../src/games/database/games.repository";
import { GamesService } from "../../src/games/services/games.service";


const mockRawgApiGamesServiceInstance = () => ({
  getGameById: jest.fn(),
  getGames: jest.fn(),
  getGameStoresByGameId: jest.fn(),
}) as unknown as RawgApiGamesService;

const mockGamesRepositoryInstance = () => ({
  saveGames: jest.fn(),
  saveGame: jest.fn(),
  updateGame: jest.fn(),
  updateGames: jest.fn(),
  getRecentGames: jest.fn(),
  getGamesAddedLastHour: jest.fn(),
  getAllGamesWithoutDescription: jest.fn(),
  findGame: jest.fn(),
  findGames: jest.fn(),
}) as unknown as GamesRepository;

describe('GamesService', () => {
  let gamesService: GamesService;
  let mockRawgApiGamesService: RawgApiGamesService;
  let mockGamesRepository: GamesRepository;

  beforeEach(async () => {
    mockRawgApiGamesService = mockRawgApiGamesServiceInstance();
    mockGamesRepository     = mockGamesRepositoryInstance();

    gamesService = new GamesService(mockRawgApiGamesService, mockGamesRepository);
  });

  describe('getGames', async () => {
    const mockGame = { _id: 1, rawgGame: {} };
    mockGamesRepository.findGame(mockGame._id);

    const result = await gamesService.getGameById(mockGame._id);

    expect(mockGamesRepository.findGame).toHaveBeenCalledWith(mockGame._id);
    expect(result).toEqual(mockGame);
  })
})