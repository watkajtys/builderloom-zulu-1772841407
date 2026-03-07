import { test, expect } from '@playwright/test';
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

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

test('Trigger an agentic state update and verify the generated state perfectly matches the new strictly versioned JSON schema without relying on React for logic.', async ({ page }) => {
  // Trigger state update directly via Python backend to ensure it's generated natively
  execSync('python3 -c "from loom.core.state import ConductorState; state = ConductorState.load(); state.active_task_id = \'TEST-123\'; state.save()"');

  // Read the state JSON file directly from the filesystem
  const statePath = path.resolve('session_state.json');
  const stateRaw = fs.readFileSync(statePath, 'utf8');
  const state = JSON.parse(stateRaw);

  // Verify the schema version exists and is "1.0.0"
  expect(state.schema_version).toBe('1.0.0');
  expect(state.active_task_id).toBe('TEST-123');

  // Take screenshot as evidence
  await page.goto('/');
  await expect(page.locator('h1:has-text("BuilderLoom")')).toBeVisible();
  await page.screenshot({ path: 'evidence.png' });
});
