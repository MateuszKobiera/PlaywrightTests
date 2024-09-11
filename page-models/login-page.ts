import { type Locator, type Page } from '@playwright/test';
import { DefaultPage } from './default-page';

export class LoginPage extends DefaultPage {
  readonly Page: Page;
  // @ts-ignore
  readonly url = '/login/';
  readonly LoginHeader: Locator;
  readonly UsernameInput: Locator;
  readonly PasswordInput: Locator;
  readonly KeepSignInCheckbox: Locator;
  readonly RegisterButton: Locator;
  readonly DontHaveAccountText: Locator;
  readonly LoginButton: Locator;
  readonly LoginErrorText: Locator;

  constructor(page: Page) {
    super(page);
    this.Page = page;

    this.LoginHeader = page.getByRole('heading', { name: 'Login' });
    this.UsernameInput = page.getByTestId('pageHeader').getByTestId('username');
    this.PasswordInput = page.getByTestId('password');
    this.KeepSignInCheckbox = page.getByTestId('keepSignIn');
    this.DontHaveAccountText = page.getByText("Don't have an account? Register, it's quick and free!");
    this.RegisterButton = page.getByRole('link', { name: 'Register' });
    this.LoginButton = page.getByTestId('loginButton');
    this.LoginErrorText = page.locator('[data-testid="login-error"]');
  }
}
