import { test, expect } from '@playwright/test';

test.describe('Broken Images Page Tests', () => {

  // Navigate to Broken Images page
  test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    await page.getByRole('link', { name: 'Broken Images' }).click();
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/broken_images');
  });



test('Detect all broken images generically', async ({ page }) => {
  const images = await page.locator('.example img').elementHandles();
  const brokenIndexes: number[] = [];

  for (let i = 0; i < images.length; i++) {
    const img = images[i];

    const isValid = await img.evaluate(img => img.complete && img.naturalWidth > 0);
    const isBroken = !isValid;

    if (isBroken) {
      console.log(`Image #${i + 1} is BROKEN`);
      brokenIndexes.push(i);
    } else {
      console.log(`Image #${i + 1} is OK`);
    }
  }

  expect(brokenIndexes.length).toBeGreaterThan(0);
});


});