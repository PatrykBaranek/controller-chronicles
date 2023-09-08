import { Injectable, NotFoundException } from "@nestjs/common";
import { ElementHandle, Page } from "puppeteer";
import { isBefore } from "date-fns";

import { GamesService } from "src/games/services/games.service";
import { Game } from "src/games/models/game.schema";
import { SteamRepository } from "../steam.repository";

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
    if (isBefore(Date.now(), new Date(game.rawgGame.released))) {
      throw new NotFoundException('Game is not released yet');
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

    return bestSellers.games.length !== 0;
  }

  public async extractTextContent(page: Page, element: ElementHandle<Element>): Promise<string> {
    return await page.evaluate((el) => el.textContent, element);
  }
}