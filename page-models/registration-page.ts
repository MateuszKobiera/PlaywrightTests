import { type Locator, type Page } from '@playwright/test';
import { DefaultPage } from './default-page';

export class RegistrationPage extends DefaultPage {
  readonly Page: Page;
  readonly url = '/register.html';

  readonly RegisterForm: Locator;
  readonly RegisterFormHeader: Locator;
  readonly FirstNameInput: Locator;
  readonly LastNameInput: Locator;
  readonly EmailInput: Locator;
  readonly BirthdateInput: Locator;
  readonly CloseBirthdatePopUp: Locator;
  readonly PasswordInput: Locator;
  readonly UserPicture: Locator;
  readonly AvatarSelect: Locator;
  readonly RegisterButton: Locator;
  readonly SignInButton: Locator;
  readonly SignInText: Locator;

  constructor(page: Page) {
    super(page);
    this.Page = page;

    this.RegisterForm = page.locator('.form');
    this.RegisterFormHeader = this.RegisterForm.locator('h2');
    this.FirstNameInput = this.RegisterForm.getByTestId('firstname');
    this.LastNameInput = this.RegisterForm.getByTestId('lastname');
    this.EmailInput = this.RegisterForm.getByTestId('email');
    this.BirthdateInput = this.RegisterForm.getByTestId('datepicker');
    this.CloseBirthdatePopUp = this.RegisterForm.locator('.ui-datepicker-close');
    this.PasswordInput = this.RegisterForm.getByTestId('password');
    this.UserPicture = this.RegisterForm.locator('#userPicture');
    this.AvatarSelect = this.RegisterForm.locator('select#avatar');
    this.RegisterButton = this.RegisterForm.getByTestId('registerButton');
    this.SignInButton = this.RegisterForm.locator('a[href="/login"]');
    this.SignInText = page.getByText('Already have an account? Sign in');
  }

  async goto() {
    await this.Page.goto(this.url);
  }
}
