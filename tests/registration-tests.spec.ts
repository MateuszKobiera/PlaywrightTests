import { expect, test } from '@playwright/test';
import { WelcomePage } from '../page-models/welcome-page';
import { RegistrationPage } from '../page-models/registration-page';
import { faker } from '@faker-js/faker';
import { clickOutside } from '../utils/functions';

test.describe('TC2 - Registraion', () => {
  test('User should be able to register to the platform', async ({ page }) => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const birthdate = faker.date.birthdate().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const password = faker.internet.password();
    const welcomePage = new WelcomePage(page);
    const registrationPage = new RegistrationPage(page);

    await welcomePage.goto();
    await welcomePage.MenuAvatarButton.click();
    await welcomePage.DropdownRegisterButton.click();
    await expect(page).toHaveURL(registrationPage.url);

    await page.waitForResponse(
      (response: Response) => response.url().includes('/api/images/user') && response.status() === 200
    );
    const avatarOptions = await registrationPage.AvatarSelect.evaluate((el) =>
      Array.from(el.options).map((option) => option.value)
    );
    const randomAvatar = faker.helpers.arrayElement(avatarOptions);

    await expect(registrationPage.MenuArticlesButton).toBeVisible();
    await expect(registrationPage.MenuCommentsButton).toBeVisible();
    await expect(registrationPage.MenuFlashpostsButton).toBeVisible();

    await expect(registrationPage.RegisterFormHeader).toHaveText('Register');
    await expect(registrationPage.SignInText).toBeVisible();

    await expect(registrationPage.SignInButton).toBeVisible();
    await registrationPage.FirstNameInput.fill(firstName);
    await registrationPage.LastNameInput.fill(lastName);
    await registrationPage.EmailInput.fill(email);
    await registrationPage.BirthdateInput.fill(birthdate);
    await clickOutside(page);
    await registrationPage.PasswordInput.fill(password);
    await registrationPage.AvatarSelect.selectOption(randomAvatar);
    await registrationPage.RegisterButton.click();

    await expect(registrationPage.PopUp).toBeVisible();
    await expect(registrationPage.PopUp).toHaveText('User created');
    await expect(page).toHaveURL('/login/');
  });
});
