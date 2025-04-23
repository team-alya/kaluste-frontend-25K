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
});

test('homepage elements renders correctly', async ({ page }) => {
  await expect(page.getByText('Valitse toiminta')).toBeVisible();
  await expect(page.getByTestId('Hei')).toBeVisible();
  await expect(page.getByTestId('username')).toBeVisible();
  await expect(page.getByText('Tervetuloa töihin, mitä haluaisit tehdä?')).toBeVisible();

  const recogniseButton = page.getByRole('button', { name: 'Tunnista tuote' });
  const AIButton = page.getByRole('button', { name: 'Tekoälyn tunnistamat' });
  const expertButton = page.getByRole('button', { name: 'Expertin käsittelemät' });
  const archiveButton = page.getByRole('button', { name: 'Arkisto' });

  await expect(recogniseButton).toBeVisible();
  await expect(AIButton).toBeVisible();
  await expect(expertButton).toBeVisible();
  await expect(archiveButton).toBeVisible();
});

test('open camera page and return to home', async ({ page }) => {
  await page.getByText('Tunnista tuote').click();
  await expect(page).toHaveURL('http://localhost:5173/camera');

  await page.click('[data-testid="back-button"]');

  await expect(page).toHaveURL('http://localhost:5173/home');
});

test('open evaluations page and return to home', async ({ page }) => {
  await page.getByText('Tekoälyn tunnistamat').click();
  await expect(page).toHaveURL('http://localhost:5173/evals');

  await page.click('[data-testid="back-button"]');

  await expect(page).toHaveURL('http://localhost:5173/home');
});

test('open reviewed page and return to home', async ({ page }) => {
  await page.getByText('Expertin käsittelemät').click();
  await expect(page).toHaveURL('http://localhost:5173/reviewed');

  await page.click('[data-testid="back-button"]');

  await expect(page).toHaveURL('http://localhost:5173/home');
});

test('open archive page and return to home', async ({ page }) => {
  await page.getByText('Arkisto').click();
  await expect(page).toHaveURL('http://localhost:5173/archive');

  await page.click('[data-testid="back-button"]');

  await expect(page).toHaveURL('http://localhost:5173/home');
});

test('open settings page and return to home', async ({ page }) => {
  await page.click('button.rounded-full');
  await expect(page).toHaveURL('http://localhost:5173/settings');

  await page.click('[data-testid="back-button"]');

  await expect(page).toHaveURL('http://localhost:5173/home');
});