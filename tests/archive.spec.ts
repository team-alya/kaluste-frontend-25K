import { test, expect } from '@playwright/test';
 
test.beforeEach('Open start URL', async ({ page }) => {
  await page.goto('http://localhost:5173');
 
  const usernameField = page.locator('#username');
  await usernameField.fill("Admin");
 
  await expect(usernameField).toHaveValue("Admin");
 
  const passwordField = page.locator('#password');
  await passwordField.fill("Admin");
 
  await expect(passwordField).toHaveValue("Admin")
 
  await page.click('[data-testid="login-button"]');
 
  await expect(page).toHaveURL("http://localhost:5173/home");
 
  await page.click('[data-testid="archive-button"]');
 
  await expect(page).toHaveURL("http://localhost:5173/archive")
});

test('expert page renders correctly', async ({ page }) => {
    await expect(page.getByText('Arkistoidut')).toBeVisible();
  
    await expect(page.getByText('IKEA')).toBeVisible();

    await expect(page.getByTestId('trash-button')).toBeVisible();

  });