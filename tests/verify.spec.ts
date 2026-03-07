import { test, expect } from '@playwright/test';

test('App initializes correctly', async ({ page }) => {
  await page.goto('/viewer/');
  await expect(page.locator('h1:has-text("BuilderLoom")')).toBeVisible();
  await page.screenshot({ path: 'evidence.png' });
});
