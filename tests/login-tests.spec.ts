import { postRegistration } from '../API/registration';
import { expect, test } from '@playwright/test';
import { validUser } from '../data/users';
import { LoginPage } from '../page-models/login-page';
import { RegistrationPage } from '../page-models/registration-page';
import { faker } from '@faker-js/faker';
import { UserWelcomePage } from '../page-models/user-welcome-page';


test.describe('TC3 - Login', () => {
  const newUser = validUser;

  test.beforeAll(async ({ request }) => {
    const { response, responseBody } = await postRegistration(request, newUser);
    expect(response.status()).toBe(201);
  });

  test('User should be able to register to the platform', async ({ page, request }) => {
    const loginPage = new LoginPage(page);
    const registerPage = new RegistrationPage(page);
    const userWelcomePage = new UserWelcomePage(page);

    await loginPage.goto();
    await expect(loginPage.LoginHeader).toBeVisible();
    await expect(loginPage.DontHaveAccountText).toBeVisible();
    await loginPage.RegisterButton.click();
    await expect(page).toHaveURL(registerPage.url);

    await loginPage.goto();
    await loginPage.UsernameInput.fill(faker.internet.userName());
    await loginPage.PasswordInput.fill(faker.internet.password());
    await loginPage.LoginButton.click();
    await expect(loginPage.LoginErrorText).toBeVisible();

    await loginPage.UsernameInput.fill(newUser.email);
    await loginPage.PasswordInput.fill(newUser.password);
    await loginPage.KeepSignInCheckbox.check();
    await loginPage.LoginButton.click();
    await expect(page).toHaveURL(userWelcomePage.url);
  });
});
