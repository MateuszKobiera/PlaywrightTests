import { type Locator, type Page } from '@playwright/test';

export class DefaultPage {
  readonly Page: Page;
  readonly PopUp: Locator;
  readonly MenuBanner: Locator;
  readonly MenuMainPageButton: Locator;
  readonly MenuAvatarButton: Locator;
  readonly DropdownLoginButton: Locator;
  readonly DropdownRegisterButton: Locator;
  readonly MenuBackofficeButton: Locator;
  readonly MenuJakTestowacButton: Locator;

  constructor(page: Page) {
    this.Page = page;

    this.PopUp = page.locator('#alertPopup');

    this.MenuBanner = page.getByTestId('menu-main');
    this.MenuMainPageButton = this.MenuBanner.locator('[href="/"]');
    this.MenuAvatarButton = page.locator('[data-testid="user-dropdown"]');
    this.DropdownLoginButton = page.getByTestId('loginBtn');
    this.DropdownRegisterButton = page.getByTestId('registerBtn');
    this.MenuBackofficeButton = page.locator('[href="/tools/backoffice.html"]');
    this.MenuJakTestowacButton = page
      .locator('[href="https://jaktestowac.pl"]')
      .locator('[data-hover="Visit jaktestowac.pl"]');
  }
}
