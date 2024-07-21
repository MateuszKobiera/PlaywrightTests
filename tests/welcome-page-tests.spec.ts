import {expect, test} from "@playwright/test";
import {WelcomePage} from "../page-models/welcome-page";


test.describe('TC1 - Welcome Page', () => {
    test('should be displayed', async ({page}) => {
        const welcomePage = new WelcomePage(page);
        await welcomePage.goto();

        await expect(welcomePage.pageHeader).toHaveText('Welcome on 🦎GUI API Demo');
        await expect(welcomePage.pageHeader2).toHaveText('Explore and create testing content!');

        await welcomePage.LetsStartButton.click();
        await expect(page).toHaveURL('/articles.html');

        await welcomePage.goto();
        await welcomePage.PracticePagesButton.click();
        await expect(page).toHaveURL('/practice/');

        await welcomePage.goto();
        await welcomePage.JakTestowacButton.click();
        await expect(page).toHaveURL('https://jaktestowac.pl');
    });
});