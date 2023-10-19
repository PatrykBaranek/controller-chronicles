import { Injectable, Logger } from "@nestjs/common";
import { ElementHandle, Page } from "puppeteer";

import { GamesService } from "src/games/services/games.service";
import { PuppeteerService } from "src/puppeteer/puppeteer.service";

import { SteamUtilityService } from "../../util/steam-utility.service";
import { SteamPlayersCountInGameDto } from "../../dto/steam-players-in-game.dto";
import { SteamRepository } from "../../steam.repository";

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
    private readonly steamRepository: SteamRepository,
    private readonly steamUtilityService: SteamUtilityService,
  ) { }

  async getSteamPlayersCountByGameId(id: number): Promise<SteamPlayersCountInGameDto> {
    const game = await this.gamesService.getGameById(id);

    await this.steamUtilityService.checkIfGameIsReleased(game);

    const steamUrl = await this.steamUtilityService.getSteamUrlByGameId(id);

    const scrapedData = await this.scrapeGamePlayersInGame(steamUrl);

    return {
      playersCount: scrapedData.playersCount,
      updatedAt: new Date(),
    };
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
      const playersCountRawText = await this.steamUtilityService.extractTextContent(page, playersCountElement);
      const playersCount = Number(playersCountRawText.split(' ')[0].replace(',', ''));

      return { playersCount };
    } catch (error) {
      this.logger.error(error);
      return { playersCount: 0 };
    }
  }
}