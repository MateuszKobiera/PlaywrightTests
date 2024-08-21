import { test, expect } from '@playwright/test';
import { UserWelcomePage } from '../page-models/user-welcome-page';
import { postRegistration } from '../API/registration';
import { postLogin } from '../API/login';
import { validUser } from '../data/users';
import { createVendorAndLogin } from '../utils/functions';



test.describe('User Welcome Page', () => {
  let userWelcomePage: UserWelcomePage;

  test.beforeEach(async ({ page, request, context }) => {
    userWelcomePage = await createVendorAndLogin(page, request, context);

    await userWelcomePage.goto();
    await expect(page).toHaveURL(userWelcomePage.url);
  });

  test('should display welcome message and user information', async () => {
    await expect(userWelcomePage.HelloMessage).toBeVisible();
    await expect(userWelcomePage.CountdownMessage).toBeVisible();
    await expect(userWelcomePage.MyAvatar).toBeVisible();
    await expect(userWelcomePage.CurrentTime).toBeVisible();
    await expect(userWelcomePage.TimeZone).toBeVisible();
  });

  test('should have functional navigation buttons', async () => {
    await userWelcomePage.MyProfileButton.click();
    await expect(userWelcomePage.Page).toHaveURL(/\/user\.html\?id=\d+/);

    await userWelcomePage.Page.goto(userWelcomePage.url);
    await userWelcomePage.MyArticlesButton.click();
    await expect(userWelcomePage.Page).toHaveURL(/\/articles\.html\?user_id=\d+/);

    await userWelcomePage.Page.goto(userWelcomePage.url);
    await userWelcomePage.MyCommentsButton.click();
    await expect(userWelcomePage.Page).toHaveURL(/\/comments\.html\?user_id=\d+/);

    await userWelcomePage.Page.goto(userWelcomePage.url);
    await userWelcomePage.SurveysButton.click();
    await expect(userWelcomePage.Page).toHaveURL('/surveys.html');

    await userWelcomePage.Page.goto(userWelcomePage.url);
    await userWelcomePage.GamesButton.click();
    await expect(userWelcomePage.Page).toHaveURL('/games/games.html');
  });

  test('should have functional account management buttons', async () => {
    await userWelcomePage.LogoutButton.click();
    // Add assertion for logout behavior

    await userWelcomePage.Page.goto(userWelcomePage.url);
    const deleteAccountDialog = userWelcomePage.Page.locator('dialog');
    await userWelcomePage.DeleteAccountButton.click();
    await expect(deleteAccountDialog).toBeVisible();
    // Add more assertions for delete account dialog
  });

  test('should have functional additional features', async () => {
    await userWelcomePage.EditDashboardButton.click();
    // Add assertions for edit dashboard behavior

    const initialTheme = await userWelcomePage.Page.evaluate(() => document.body.classList.contains('darkmode'));
    await userWelcomePage.DarkModeToggle.click();
    const updatedTheme = await userWelcomePage.Page.evaluate(() => document.body.classList.contains('darkmode'));
    expect(updatedTheme).not.toBe(initialTheme);
  });

    test('should display correct time and timezone', async ({ page }) => {
      await expect(async () => {
        const currentTime = await userWelcomePage.CurrentTime.textContent();
        expect(currentTime).toMatch(/\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}/);
      }).toPass({ timeout: 5000 });

      const timeZone = await userWelcomePage.TimeZone.textContent();
      expect(timeZone).not.toBe('');
    });
  });