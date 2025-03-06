import { test, expect } from '@playwright/test';
 
test.beforeEach('Open start URL', async ({ page }) => {
  await page.goto('http://localhost:5173');
 
  const usernameField = page.locator('#username');
  await usernameField.fill("akseli");
 
  await expect(usernameField).toHaveValue("akseli");
 
  const passwordField = page.locator('#password');
  await passwordField.fill("tämäontesti");
 
  await expect(passwordField).toHaveValue("tämäontesti")
 
  await page.click('[data-testid="login-button"]');
 
  await expect(page).toHaveURL("http://localhost:5173/home");
 
  await page.click('[data-testid="evals-button"]');
 
  await expect(page).toHaveURL("http://localhost:5173/evals")
});
 
test('evals page renders correctly', async ({ page }) => {
    await expect(page.getByText('Tunnistetut tuotteet')).toBeVisible();
 
    await expect(page.getByText('Martela')).toBeVisible();
  });