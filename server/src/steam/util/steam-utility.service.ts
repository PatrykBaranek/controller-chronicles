import { Injectable, NotFoundException } from "@nestjs/common";
import { ElementHandle, Page } from "puppeteer";
import { isBefore } from "date-fns";

import { GamesService } from "src/games/services/games.service";
import { Game } from "src/games/models/game.schema";
import { SteamRepository } from "../database/steam.repository";
import { SteamReviews } from "../models/steam-reviews.schema";
import { SteamReviewsDto } from "../dto/steam-reviews.dto";
import { SteamPlayersCountInGameDto } from "../dto/steam-players-in-game.dto";
import { SteamPlayersInGame } from "../models/steam-players-in-game.schema";

const SELECTORS = {
  approveAgeGateButton: '.age_gate',
  ageYearSelect: '#ageYear',
  viewProductPageButton: '#view_product_page_btn',
  approveAgeBeforeCommunityPageButton: '.btn_blue_steamui.btn_medium'
}

@Injectable()
export class SteamUtilityService {

  constructor(
    private readonly gamesService: GamesService,
    private readonly steamRepository: SteamRepository,
  ) { }

  public async checkIfGameIsReleased(game: Game) {
    if (isBefore(new Date(), new Date(game.rawgGame.released))) {
      throw new NotFoundException('Game is not released yet ' + game._id);
    }
  }

  public async getSteamUrlByGameId(id: number) {
    const stores = await this.gamesService.getGameStoresByGameId(id);

    if (!stores.some((store) => store.name === 'Steam')) {
      throw new NotFoundException('Game is not available on Steam');
    }

    return stores.find((store) => store.name === 'Steam').url;
  }

  public async checkIfApproveAgeGateButtonExists(page: Page) {
    const approveAgeGateButton = await page.$(SELECTORS.approveAgeGateButton);

    if (approveAgeGateButton === null) {
      return;
    }

    await page.select(SELECTORS.ageYearSelect, '1990');
    await page.click(SELECTORS.viewProductPageButton);
  }

  public async checkIfCommunityApproveAgeExists(page: Page) {
    const communityAppoveBtn = await page.waitForSelector(SELECTORS.approveAgeBeforeCommunityPageButton, {
      visible: true
    });

    if (communityAppoveBtn) {
      await communityAppoveBtn.click();
    }
  }

  public async checkIfOnlyOneReviewExists(reviewsContainerElement: ElementHandle<Element>) {
    const childrenCount = await reviewsContainerElement.evaluate((el) => {
      return el.children.length;
    });

    return childrenCount === 1;
  }

  public async checkIfTodaysBestSellersExist() {
    const bestSellers = await this.steamRepository.getBestSellers();

    if (!bestSellers) {
      return false;
    }

    return bestSellers?.games.length !== 0;
  }

  public async extractTextContent(page: Page, element: ElementHandle<Element>): Promise<string> {
    return await page.evaluate((el) => el.textContent, element);
  }

  public mapToSteamReviewsDto(steamReviews: SteamReviews): SteamReviewsDto {
    const dto = new SteamReviewsDto();

    dto.reviewsSummaryFrom30Days = steamReviews?.reviewsSummaryFrom30Days;
    dto.reviewsSummaryOverall = steamReviews?.reviewsSummaryOverall;

    return dto;
  }

  public mapToSteamPlayersCountInGameDto(steamPlayersInGame: SteamPlayersInGame): SteamPlayersCountInGameDto {
    const dto = new SteamPlayersCountInGameDto();

    dto.playersCount = steamPlayersInGame?.playersCount;
    dto.updatedAt = steamPlayersInGame?.updatedAt;

    return dto;
  }
}