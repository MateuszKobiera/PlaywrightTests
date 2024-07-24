import {expect, test} from "@playwright/test";
import {WelcomePage} from "../page-models/welcome-page";


test.describe('TC1 - Welcome Page', () => {
    const currentYear = new Date().getFullYear();
    test('should be displayed', async ({page}) => {
        const welcomePage = new WelcomePage(page);
        const newPagePromise = page.waitForEvent('popup');
        await welcomePage.goto();

        await welcomePage.MenuMainPageButton.click();
        await expect(page).toHaveURL('http://localhost:3000');
        await expect(welcomePage.MenuAvatarButton).toBeVisible();
        await expect(welcomePage.MenuBackofficeButton).toBeVisible();
        await expect(welcomePage.MenuJakTestowacButton).toBeVisible();
        await welcomePage.MenuJakTestowacButton.click();
        const newPage = await newPagePromise;
        await expect(newPage).toHaveURL('https://jaktestowac.pl');

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

        await welcomePage.goto();
        await expect(welcomePage.Footer).toContainText(`Version: v2.7.1 © Copyright ${currentYear} jaktestowac.pl`);
        await welcomePage.FooterJakTestowacButton.click();
        const newPage2 = await newPagePromise;
        await expect(newPage2).toHaveURL('https://jaktestowac.pl');
    });
});