import { test, expect } from '@playwright/test';
import { UserWelcomePage } from '../page-models/user-welcome-page';
import { createVendorAndLogin, loginAsUser } from '../utils/functions';
import { User } from '../models/user';

test.describe('User Welcome Page', () => {
  let userWelcomePage: UserWelcomePage;
  let user: User;

  test.beforeEach(async ({ page, request, context }) => {
    ({ userWelcomePage, user } = await createVendorAndLogin(page, request, context));

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

  test('should have functional account management buttons', async ({ page, request, context }) => {
    await userWelcomePage.LogoutButton.click();
    const cookies = await context.cookies();
    expect(cookies).toHaveLength(0);
    expect(page.url()).toContain('/login');

    await loginAsUser(page, request, context, user);

    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Are you sure you want to delete your account?');
      await dialog.accept(); // or dialog.dismiss() to cancel
    });

    await userWelcomePage.goto();
    await userWelcomePage.DeleteAccountButton.click();

    page.off('dialog', () => {});
  });

  test('should have functional additional features', async () => {
    await userWelcomePage.EditDashboardButton.click({ timeout: 10000 });
    // Add assertions for edit dashboard behavior

    const initialTheme = await userWelcomePage.Page.evaluate(() => document.body.classList.contains('darkmode'));
    await userWelcomePage.DarkModeToggle.click();
    const updatedTheme = await userWelcomePage.Page.evaluate(() => document.body.classList.contains('darkmode'));
    expect(updatedTheme).not.toBe(initialTheme);
  });

  test('should display correct time and timezone', async () => {
    await expect(async () => {
      const currentTime = await userWelcomePage.CurrentTime.textContent();
      expect(currentTime).toMatch(/\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}/);
    }).toPass({ timeout: 5000 });

    const timeZone = await userWelcomePage.TimeZone.textContent();
    expect(timeZone).not.toBe('');
  });
});
