import { test, expect } from '@playwright/test';

test('App initializes correctly and renders dashboard components', async ({ page }) => {
  await page.goto('/');
  
  // Wait for the main title
  await expect(page.locator('h1:has-text("BuilderLoom")')).toBeVisible();

  // Wait for the components to load (useOrchestration takes some time to resolve mock data)
  // Wait for the Active Agents and Container Infrastructure headers which we moved to subcomponents
  await expect(page.locator('h2:has-text("Container Infrastructure")')).toBeVisible({ timeout: 10000 });
  await expect(page.locator('h2:has-text("Active Agents")')).toBeVisible({ timeout: 10000 });

  // Take screenshot as evidence
  await page.screenshot({ path: 'evidence.png' });
});
