import { type Locator, type Page } from '@playwright/test';

export class WelcomePage {
    readonly page: Page;
    readonly pageHeader: Locator;
    readonly pageHeader2: Locator;
    readonly LetsStartButton: Locator;
    readonly PracticePagesButton: Locator;
    readonly JakTestowacButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageHeader = page.getByTestId('pageHeader').locator('h1');
        this.pageHeader2 = page.getByTestId('pageHeader').locator('h2');
        this.LetsStartButton = page.getByTestId('btnGui');
        this.PracticePagesButton = page.getByTestId('btnPractice');
        this.JakTestowacButton = page.locator('div > [href="https://jaktestowac.pl"]').first();
    }

    async goto() {
        await this.page.goto('/');
    }

}