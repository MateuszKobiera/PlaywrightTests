import { APIRequestContext } from '@playwright/test';

export async function postRegistration(request: APIRequestContext, userData: any) {
  const response = await request.post('/api/users', {
    data: userData,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const responseBody = await response.json();
  return { response, responseBody };
}
