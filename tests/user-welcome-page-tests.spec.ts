import { test, expect } from '@playwright/test';
import { UserWelcomePage } from '../page-models/user-welcome-page';
import { postRegistration } from '../API/registration';
import { validUser } from '../data/users';
import { postLogin } from '../API/login';



test.describe('User Welcome Page', () => {
  let userWelcomePage: UserWelcomePage;
  const newUser = validUser;

  test.beforeEach(async ({ page, request, context }) => {
    // const { response } = await postRegistration(request, newUser);
    // expect(response.status()).toBe(201);
    const { response: responseLogin, body } = await postLogin(request, { email: 'test@test.pl', password: 'Test' });
    expect(responseLogin.status()).toBe(200);
    const accessToken = body.access_token
    console.log(accessToken)


    userWelcomePage = new UserWelcomePage(page);
    await page.goto(userWelcomePage.url);

    const url = new URL(page.url());
    const domain = url.hostname;
    console.log(domain);
    const twoHoursFromNow = Math.floor(Date.now() / 1000 + 2 * 60 * 60).toString();

    await context.addCookies([
        {
          name: 'token',
          value: accessToken,
          domain: domain,
          path: '/',
          httpOnly: false,
          secure: false,
        },
        {
            name: 'expires',
            value: twoHoursFromNow,
            domain: domain,
            path: '/',
            httpOnly: true,
            secure: true
          },
          {
            name: 'avatar',
            value: '.%5Cdata%5Cusers%5C36b4bac5-dc16-4dc7-92d4-69804ab0df7b.jpg',
            domain: domain,
            path: '/'
          },
          {
            name: 'email',
            value: 'test%40test.pl',
            domain: domain,
            path: '/'
          },
          {
            name: 'firstname',
            value: 'TE',
            domain: domain,
            path: '/'
          },
          {
            name: 'id',
            value: '17',
            domain: domain,
            path: '/'
          },
          {
            name: 'username',
            value: 'test%40test.pl',
            domain: domain,
            path: '/'
          },
      ]);
      await context.setExtraHTTPHeaders({
        'Authorization': `Bearer ${accessToken}`
      });

      userWelcomePage = new UserWelcomePage(page);
      await page.goto(userWelcomePage.url);
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

  test('should display correct time and timezone', async () => {
    const currentTime = await userWelcomePage.CurrentTime.textContent();
    expect(currentTime).toMatch(/\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}/);

    const timeZone = await userWelcomePage.TimeZone.textContent();
    expect(timeZone).not.toBe('');
  });
});
