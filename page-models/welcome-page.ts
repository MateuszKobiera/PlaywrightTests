import { type Locator, type Page } from '@playwright/test';
import { DefaultPage } from './default-page';

export class WelcomePage extends DefaultPage {
  readonly page: Page;

  readonly PageHeader: Locator;
  readonly PageHeader2: Locator;
  readonly GadImage: Locator;
  readonly LetsStartButton: Locator;
  readonly PracticePagesButton: Locator;
  readonly JakTestowacButton: Locator;
  readonly Footer: Locator;
  readonly FooterJakTestowacButton: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;

    this.PageHeader = page.getByTestId('pageHeader').locator('h1');
    this.PageHeader2 = page.getByTestId('pageHeader').locator('h2');
    this.GadImage = page.locator('[src="./data/gad-front-banner.png"]');
    this.LetsStartButton = page.getByTestId('btnGui');
    this.PracticePagesButton = page.getByTestId('btnPractice');
    this.JakTestowacButton = page.locator('div > [href="https://jaktestowac.pl"]').first();
    this.Footer = page.locator('footer');
    this.FooterJakTestowacButton = page.locator('footer > div > a[href="https://jaktestowac.pl"]');
  }

  async goto() {
    await this.page.goto('/');
  }
}
