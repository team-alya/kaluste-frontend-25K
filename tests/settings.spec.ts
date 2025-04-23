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
 
    await page.click('[data-testid="settings-button"]');
    await expect(page).toHaveURL('http://localhost:5173/settings');
 
  });
 
  test('settings page renders correctly', async ({ page }) => {
    await expect(page.getByText('Asetukset')).toBeVisible();
 
    const button = page.getByRole('button', { name: 'Kirjaudu ulos' });
    await expect(button).toBeVisible();

    await expect(page.getByText('Värisokeus')).toBeVisible();

    await expect(page.getByTestId('color-blind')).toBeVisible();
 
  });

  test('color blind function works correctly', async ({ page }) => {
    await page.click('[data-testid="color-blind"]', { force: true });

    await expect(page.locator('body')).toHaveClass(/colorblind/);

    const button = page.getByRole('button', { name: 'Kirjaudu ulos' });
    await expect(button).toHaveCSS('background-color', 'rgb(29, 78, 216)');

  });
 
  test('logout function works correctly', async ({ page }) => {
    await page.click('[data-testid="logout-button"]');
   
    await expect(page).toHaveURL('http://localhost:5173');
   
  });

