import { APIRequestContext, BrowserContext, expect, Page, request } from '@playwright/test';
import { validUser } from '../data/users';
import { postRegistration } from '../API/registration';
import { postLogin } from '../API/login';
import { UserWelcomePage } from '../page-models/user-welcome-page';
import { User } from '../models/user';

export async function clickOutside(page: Page) {
  await page.mouse.click(1, 1);
}

export async function loginAsUser(page: Page, request: APIRequestContext, context: BrowserContext, user: User) {
  const { response: responseLogin, body: bodyLogin } = await postLogin(request, { email: user.email, password: user.password });
  expect(responseLogin.status()).toBe(200);
  const accessToken = bodyLogin.access_token;

  const userWelcomePage = new UserWelcomePage(page);
  await page.goto(userWelcomePage.url);

  const url = new URL(page.url());
  const domain = url.hostname;
  const fiveDaysFromNow = Date.now() + 5 * 24 * 60 * 60 * 1000;
  const expireTimestamp = Math.floor(fiveDaysFromNow).toString();
  const expiresTwoHoursFromNow = new Date(Date.now() + 2 * 60 * 60 * 1000).getTime() / 1000;

  await context.addCookies([
    {
      name: 'token',
      value: accessToken,
      domain: domain,
      path: '/',
      expires: expiresTwoHoursFromNow,
      httpOnly: false,
      secure: false,
      sameSite: "Lax"
    },
    {
      name: 'expires',
      value: expireTimestamp,
      domain: domain,
      path: '/',
      httpOnly: false,
      expires: expiresTwoHoursFromNow,
      secure: false,
      sameSite: "Lax"
    },
    {
      name: 'avatar',
      value: '.%5Cdata%5Cusers%5C' + user.avatar,
      domain: domain,
      expires: expiresTwoHoursFromNow,
      path: '/',
      httpOnly: false,
      secure: false,
      sameSite: "Lax"
    },
    {
      name: 'email',
      value: user.email.replace('@', '%40'),
      domain: domain,
      expires: expiresTwoHoursFromNow,
      path: '/',
      httpOnly: false,
      secure: false,
      sameSite: "Lax"
    },
    {
      name: 'firstname',
      value: user.firstname,
      domain: domain,
      expires: expiresTwoHoursFromNow,
      path: '/',
      httpOnly: false,
      secure: false,
      sameSite: "Lax"
    },
    {
      name: 'id',
      value: user.id.toString(),
      domain: domain,
      expires: expiresTwoHoursFromNow,
      path: '/',
      httpOnly: false,
      secure: false,
      sameSite: "Lax"
    },
    {
      name: 'username',
      value: user.email.replace('@', '%40'),
      domain: domain,
      expires: expiresTwoHoursFromNow,
      path: '/',
      httpOnly: false,
      secure: false,
      sameSite: "Lax"
    },
  ]);
  await context.setExtraHTTPHeaders({
    'Authorization': `Bearer ${accessToken}`
  });

  return userWelcomePage
}

export async function createVendorAndLogin(page: Page, request: APIRequestContext, context: BrowserContext) {
  let user = validUser;
  const { response: responseRegistration, body: bodyRegistration } = await postRegistration(request, user);
  expect(responseRegistration.status()).toBe(201);
  user.id = bodyRegistration.id;
  let userWelcomePage = await loginAsUser(page, request, context, user);

  return {userWelcomePage, user};
}
