import { type Locator, type Page } from '@playwright/test';
import { DefaultPage } from './default-page';

export class LoginPage extends DefaultPage {
  readonly Page: Page;
  readonly url = '/login/';

  constructor(page: Page) {
    super(page);
    this.Page = page;
  }

  async goto() {
    await this.Page.goto(this.url);
  }
}
