import { type Locator, type Page } from '@playwright/test';

export class WelcomePage {
  readonly page: Page;
  readonly MenuButton: Locator;
  readonly MenuMainPageButton: Locator;
  readonly MenuAvatarButton: Locator;
  readonly DropdownLoginButton: Locator;
  readonly DropdownRegisterButton: Locator;
  readonly MenuBackofficeButton: Locator;
  readonly MenuJakTestowacButton: Locator;
  readonly PageHeader: Locator;
  readonly PageHeader2: Locator;
  readonly GadImage: Locator;
  readonly LetsStartButton: Locator;
  readonly PracticePagesButton: Locator;
  readonly JakTestowacButton: Locator;
  readonly Footer: Locator;
  readonly FooterJakTestowacButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.MenuButton = page.getByTestId('menu-main');
    this.MenuMainPageButton = this.MenuButton.locator('[href="/"]');
    this.MenuAvatarButton = page.locator('[data-testid="user-dropdown"]');
    this.DropdownLoginButton = page.getByTestId('loginBtn');
    this.DropdownRegisterButton = page.getByTestId('registerBtn');
    this.MenuBackofficeButton = page.locator('[href="/tools/backoffice.html"]');
    this.MenuJakTestowacButton = page
      .locator('[href="https://jaktestowac.pl"]')
      .locator('[data-hover="Visit jaktestowac.pl"]');
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
