import {expect, test} from "@playwright/test";
import {WelcomePage} from "../page-models/welcome-page";


test.describe('TC1 - Welcome Page', () => {
    test('should be displayed', async ({page}) => {
        const welcomePage = new WelcomePage(page);
        await welcomePage.goto();
        await expect(welcomePage.pageHeader).toBeVisible();
        await expect(welcomePage.pageHeader).toHaveText('Welcome on 🦎GUI API Demo');
    });
});