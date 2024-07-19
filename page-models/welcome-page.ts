import { type Locator, type Page } from '@playwright/test';

export class WelcomePage {
    readonly page: Page;
    readonly pageHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageHeader = page.getByTestId('pageHeader').locator('h1');
    }

    async goto() {
        await this.page.goto('/');
    }

}