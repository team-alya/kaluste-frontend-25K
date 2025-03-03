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
});

test('homepage renders correctly', async ({ page }) => {
  await expect(page.getByText('Tervetuloa töihin, mitä haluaisit tehdä?')).toBeVisible();

  const button = page.getByRole('button', { name: 'Tunnista tuote' });
  await expect(button).toBeVisible();

});

test('open camera page and return to home', async ({ page }) => {
  await page.getByText('Tunnista tuote').click();
  await expect(page).toHaveURL('http://localhost:5173/camera');

  await page.click('[data-testid="back-button"]');

  await expect(page).toHaveURL('http://localhost:5173/home');
});

test('open settings page and return to home', async ({ page }) => {
  await page.click('button.rounded-full');
  await expect(page).toHaveURL('http://localhost:5173/settings');

  await page.click('[data-testid="back-button"]');

  await expect(page).toHaveURL('http://localhost:5173/home');
});

