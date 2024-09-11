import { type Locator, type Page } from '@playwright/test';
import { DefaultPage } from './default-page';

export class UserWelcomePage extends DefaultPage {
  readonly Page: Page;
  // @ts-ignore
  readonly url = '/welcome';

  readonly HelloMessage: Locator;
  readonly CountdownMessage: Locator;
  readonly MyProfileButton: Locator;
  readonly MyArticlesButton: Locator;
  readonly MyCommentsButton: Locator;
  readonly SurveysButton: Locator;
  readonly GamesButton: Locator;
  readonly LogoutButton: Locator;
  readonly DeleteAccountButton: Locator;
  readonly EditDashboardButton: Locator;
  readonly DarkModeToggle: Locator;
  readonly CurrentTime: Locator;
  readonly TimeZone: Locator;
  readonly MyAvatar: Locator;

  constructor(page: Page) {
    super(page);
    this.Page = page;

    this.HelloMessage = page.locator('[data-testid="hello"]');
    this.CountdownMessage = page.getByTestId('countDown');
    this.MyProfileButton = page.locator('#btnMyAccountLink');
    this.MyArticlesButton = page.locator('#btnArticlesLink');
    this.MyCommentsButton = page.locator('#btnCommentsLink');
    this.SurveysButton = page.locator('#btnSurveysLink');
    this.GamesButton = page.locator('#btnGamesLink');
    this.LogoutButton = page.getByTestId('btnLogout');
    this.DeleteAccountButton = page.getByTestId('btnDeleteAccount');
    this.EditDashboardButton = page.locator('#btnEditDashbaord');
    this.DarkModeToggle = page.locator('#darkmode-switch');
    this.CurrentTime = page.getByTestId('current-time');
    this.TimeZone = page.getByTestId('time-zone');
    this.MyAvatar = page.locator('#myAvatar');
  }
}
