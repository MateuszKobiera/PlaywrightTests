
import { test, expect } from '@playwright/test';

test.describe('DevRun Game', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/games/devrun.html');
  });

  test('starts the game when Start button is clicked', async ({ page }) => {
    await page.click('#start-button');
    await expect(page.locator('#game-container')).toBeVisible();
  });

  test('jumps when space is pressed', async ({ page }) => {
    await page.click('#start-button');
    
    const devHero = page.locator('#devHero');
    const initialBottom = await devHero.evaluate((el) => window.getComputedStyle(el).bottom);
    
    await page.keyboard.press('Space');
    
    await expect(async () => {
      const newBottom = await devHero.evaluate((el) => window.getComputedStyle(el).bottom);
      expect(newBottom).not.toBe(initialBottom);
    }).toPass();
  });

  test('ends game on collision and shows final score', async ({ page }) => {
    await page.click('#start-button');
    
    await expect(page.locator('#final-score-container')).toBeHidden();
    
    // Wait for collision (you might need to adjust the wait time)
    await page.waitForTimeout(5000);
    
    await expect(page.locator('#final-score-container')).toBeVisible();
    await expect(page.locator('#final-score-container')).toContainText('Game Over!');

    await page.click('#reload-button');
    await expect(page.locator('#score')).toContainText('Score: 0');
  });

  test('increases score by avoiding bugs', async ({ page }) => {
    // Start the game
    await page.click('#start-button');

    // Initial score should be 0
    await expect(page.locator('#score')).toContainText('Score: 0');

    // Function to jump when a bug is near
    const jumpWhenBugNear = async () => {
      const heroRect = await page.locator('#devHero').boundingBox();
      const bugRect = await page.locator('.bug').boundingBox();

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
    const finalScore = await page.locator('#score').textContent();
    const score = finalScore ? parseInt(finalScore.split(': ')[1]) : 0;
    expect(score).toBeGreaterThan(0);
  });
});