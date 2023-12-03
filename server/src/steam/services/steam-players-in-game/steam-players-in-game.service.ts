import { Injectable, Logger } from '@nestjs/common';
import { ElementHandle, Page } from 'puppeteer';
import { differenceInHours } from 'date-fns';

import { GamesService } from 'src/games/services/games.service';
import { PuppeteerService } from 'src/puppeteer/services/puppeteer.service';

import { SteamUtilityService } from '../../util/steam-utility.service';
import { SteamPlayersCountInGameDto } from '../../dto/steam-players-in-game.dto';
import { GamesRepository } from 'src/games/database/games.repository';
import { plainToInstance } from 'class-transformer';
import { SteamPlayersInGame } from 'src/steam/models/steam-players-in-game.schema';

const SELECTORS = {
  communityButton: '.apphub_HomeHeaderContent a.btnv6_blue_hoverfade.btn_medium',
  playersCount: '.apphub_NumInApp',
}

@Injectable()
export class SteamPlayersInGameService {
  private readonly logger = new Logger(SteamPlayersInGameService.name);

  constructor(
    private readonly puppeteerService: PuppeteerService,
    private readonly gamesService: GamesService,
    private readonly gamesRepository: GamesRepository,
    private readonly steamUtilityService: SteamUtilityService,
  ) { }

  async getSteamPlayersCountByGameId(id: number): Promise<SteamPlayersCountInGameDto> {
    const game = await this.gamesService.getGameById(id);
    const now = new Date();

    if (game.steam_players_in_game && differenceInHours(now, new Date(game.steam_players_in_game?.updatedAt)) < 3) {
      return this.steamUtilityService.mapToSteamPlayersCountInGameDto(game.steam_players_in_game);
    }

    await this.steamUtilityService.checkIfGameIsReleased(game);

    const steamUrl = await this.steamUtilityService.getSteamUrlByGameId(id);

    const scrapedData = await this.scrapeGamePlayersInGame(steamUrl);

    await this.gamesRepository.updateGame(id, { steam_players_in_game: plainToInstance(SteamPlayersInGame, scrapedData) })

    return plainToInstance(SteamPlayersCountInGameDto, scrapedData);
  }

  private async scrapeGamePlayersInGame(steamUrl: string): Promise<SteamPlayersCountInGameDto> {
    return this.puppeteerService.withBrowser(async (browser) => {
      const page = await this.puppeteerService.createPage(browser, steamUrl);

      await this.handleAgeGate(page);
      await this.navigateToCommunityPage(page);
      await this.handleCommunityAgeGate(page);

      return await this.extractPlayersCount(page);
    });
  }

  private async handleAgeGate(page: Page) {
    await this.steamUtilityService.checkIfApproveAgeGateButtonExists(page);
  }

  private async navigateToCommunityPage(page: Page) {
    const communityButton = await page.waitForSelector(SELECTORS.communityButton) as ElementHandle<HTMLAnchorElement>;
    const communityHref = await communityButton.evaluate((el) => el.href);
    await page.goto(communityHref);
  }

  private async handleCommunityAgeGate(page: Page) {
    await this.steamUtilityService.checkIfCommunityApproveAgeExists(page);
  }

  private async extractPlayersCount(page: Page): Promise<SteamPlayersCountInGameDto> {
    try {
      const playersCountElement = await page.waitForSelector(SELECTORS.playersCount);
      if (!playersCountElement) {
        return null;
      }
      const playersCountRawText = await this.steamUtilityService.extractTextContent(page, playersCountElement);
      const playersCount = Number(playersCountRawText.split(' ')[0].replace(',', ''));

      return { 
        playersCount,
        updatedAt: new Date(),
      };
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }
}