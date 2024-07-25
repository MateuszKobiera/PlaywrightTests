import { postRegistration } from '../API/registration';
import { expect, test } from '@playwright/test';
import { validUser } from '../data/users';
import { LoginPage } from '../page-models/login-page';

test.describe('TC3 - Login', () => {
  const newUser = validUser;
  test.beforeAll(async ({ request }) => {
    const { response, responseBody } = await postRegistration(request, newUser);
    expect(response.status()).toBe(201);
  });
  test('User should be able to register to the platform', async ({ page, request }) => {
    console.log(newUser);
  });
});
