import { test, expect } from '@playwright/test';
import { DevRunPage } from '../page-models/dev-run-page';

test.describe('DevRun Game', () => {
  let devRunPage: DevRunPage;

  test.beforeEach(async ({ page }) => {
    devRunPage = new DevRunPage(page);
    await page.goto(devRunPage.url);
  });

  test('starts the game when Start button is clicked', async ({ page }) => {
    await devRunPage.StartButton.click();
    await expect(devRunPage.GameContainer).toBeVisible();
  });

  test('jumps when space is pressed', async ({ page }) => {
    await devRunPage.StartButton.click();
    
    const initialBottom = await devRunPage.DevHero.evaluate((el) => window.getComputedStyle(el).bottom);
    
    await page.keyboard.press('Space');
    
    await expect(async () => {
      const newBottom = await devRunPage.DevHero.evaluate((el) => window.getComputedStyle(el).bottom);
      expect(newBottom).not.toBe(initialBottom);
    }).toPass();
  });

  test('ends game on collision and shows final score', async ({ page }) => {
    await devRunPage.StartButton.click();
    
    await expect(devRunPage.FinalScoreContainer).toBeHidden();
    
    // Wait for collision (you might need to adjust the wait time)
    await page.waitForTimeout(5000);
    
    await expect(devRunPage.FinalScoreContainer).toBeVisible();
    await expect(devRunPage.FinalScoreContainer).toContainText('Game Over!');

    await devRunPage.ReloadButton.click();
    await expect(devRunPage.ScoreDisplay).toContainText('Score: 0');
  });

  test('increases score by avoiding bugs', async ({ page }) => {
    // Start the game
    await devRunPage.StartButton.click();

    // Initial score should be 0
    await expect(devRunPage.ScoreDisplay).toContainText('Score: 0');

    // Function to jump when a bug is near
    const jumpWhenBugNear = async () => {
      const heroRect = await devRunPage.DevHero.boundingBox();
      const bugRect = await devRunPage.BugObstacle.boundingBox();

      if (heroRect && bugRect) {
        // If the bug is close to the hero, jump
        if (bugRect.x - (heroRect.x + heroRect.width) < 200) {
          await page.keyboard.press('Space');
        }
      }
    };

    // Play the game for a set duration
    const gameDuration = 10000; // 10 seconds
    const checkInterval = 100; // Check every 100ms
    const startTime = Date.now();

    while (Date.now() - startTime < gameDuration) {
      await jumpWhenBugNear();
      await page.waitForTimeout(checkInterval);
    }

    // After playing, check if the score has increased
    const finalScore = await devRunPage.ScoreDisplay.textContent();
    const score = finalScore ? parseInt(finalScore.split(': ')[1]) : 0;
    expect(score).toBeGreaterThan(0);
  });
});