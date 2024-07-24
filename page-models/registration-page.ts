import { type Locator, type Page } from '@playwright/test';
import { DefaultPage } from './default-page';

export class RegistrationPage extends DefaultPage {
  readonly Page: Page;
  readonly url = '/register.html';

  readonly FirstNameInput: Locator;
  readonly LastNameInput: Locator;
  readonly EmailInput: Locator;
  readonly BirthdateInput: Locator;
  readonly CloseBirthdatePopUp: Locator;
  readonly PasswordInput: Locator;
  readonly UserPicture: Locator;
  readonly AvatarSelect: Locator;
  readonly RegisterButton: Locator;

  constructor(page: Page) {
    super(page);
    this.Page = page;

    this.FirstNameInput = page.getByTestId('firstname');
    this.LastNameInput = page.getByTestId('lastname');
    this.EmailInput = page.getByTestId('email');
    this.BirthdateInput = page.getByTestId('datepicker');
    this.CloseBirthdatePopUp = page.locator('.ui-datepicker-close');
    this.PasswordInput = page.getByTestId('password');
    this.UserPicture = page.locator('#userPicture');
    this.AvatarSelect = page.locator('select#avatar');
    this.RegisterButton = page.getByTestId('registerButton');
  }

  async goto() {
    await this.Page.goto(this.url);
  }
}
