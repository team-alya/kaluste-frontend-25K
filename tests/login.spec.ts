import { test, expect } from '@playwright/test';

test('site has the correct title', async ({ page }) => {
  await page.goto('localhost:5173')
  console.log(await page.title());
  await expect(page).toHaveTitle("Kalustearvio");
});

test('default page renders correctly', async ({ page }) => {
  await page.goto('http://localhost:5173/')

  await expect(page.getByText('Tervetuloa töihin')).toBeVisible();

  const loginButton = page.getByRole('button', { name: 'Kirjaudu sisään' });
  await expect(loginButton).toBeVisible();

  const usernameInput = page.locator('input#username');
  const passwordInput = page.locator('input#password');
  await expect(usernameInput).toBeVisible();
  await expect(passwordInput).toBeVisible();

});

test('try to log in with incorrect log in credentials', async ({ page }) => {
  await page.goto('http://localhost:5173');

  const usernameField = page.locator('#username');
  await usernameField.fill("John Doe");

  await expect(usernameField).toHaveValue("John Doe");

  const passwordField = page.locator('#password');
  await passwordField.fill("Salasana");

  await expect(passwordField).toHaveValue("Salasana")

  await page.click('[data-testid="login-button"]');

  await expect(page.getByText('Kirjautuminen epäonnistui. Yritä uudelleen.')).toBeVisible();
});

test('try to log in with correct log in credentials', async ({ page }) => {
  await page.goto('http://localhost:5173');

  const usernameField = page.locator('#username');
  await usernameField.fill("Admin");

  await expect(usernameField).toHaveValue("Admin");

  const passwordField = page.locator('#password');
  await passwordField.fill("Admin");

  await expect(passwordField).toHaveValue("Admin")

  await page.click('[data-testid="login-button"]');

  await expect(page).toHaveURL("http://localhost:5173/home");
});