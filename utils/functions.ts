import { Page } from '@playwright/test';

export async function clickOutside(page: Page) {
  await page.mouse.click(1, 1);
}
