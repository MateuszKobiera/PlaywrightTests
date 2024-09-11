import { type Locator, type Page } from '@playwright/test';
import { DefaultPage } from './default-page';

export class DevRunPage extends DefaultPage {
  readonly Page: Page;
  // @ts-ignore
  readonly url = '/games/devrun.html';
  readonly StartButton: Locator;
  readonly GameContainer: Locator;
  readonly DevHero: Locator;
  readonly FinalScoreContainer: Locator;
  readonly ReloadButton: Locator;
  readonly ScoreDisplay: Locator;
  readonly BugObstacle: Locator;

  constructor(page: Page) {
    super(page);
    this.Page = page;

    this.StartButton = page.locator('#start-button');
    this.GameContainer = page.locator('#game-container');
    this.DevHero = page.locator('#devHero');
    this.FinalScoreContainer = page.locator('#final-score-container');
    this.ReloadButton = page.locator('#reload-button');
    this.ScoreDisplay = page.locator('#score');
    this.BugObstacle = page.locator('.bug');
  }
}
