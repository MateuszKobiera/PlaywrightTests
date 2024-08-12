import { APIRequestContext } from '@playwright/test';

export async function postLogin(request: APIRequestContext, userData: any) {
  const response = await request.post('/api/login', {
    data: userData,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return { response };
}
