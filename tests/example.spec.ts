import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('localhost:5173')
  console.log(await page.title());
  await expect(page).toHaveTitle(/Vite \+ React \+ TS/);
});

test('move to register page', async ({ page }) => {
  await page.goto('localhost:5173')
  await page.getByText("Rekisteröidy").click();
  await expect(page).toHaveURL('http://localhost:5173/register');
});

test('incorrect log in credentialss', async ({ page }) => {
  await page.goto('http://localhost:5173');

  const usernameField = page.locator('#username');
  await usernameField.fill("John Doe");

  await expect(usernameField).toHaveValue("John Doe");

  const passwordField = page.locator('#password');
  await passwordField.fill("Salasana");

  await expect(passwordField).toHaveValue("Salasana")
});


