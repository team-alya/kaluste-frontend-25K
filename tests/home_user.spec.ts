import { test, expect } from '@playwright/test';

test.beforeEach('Open start URL', async ({ page }) => {
  await page.goto('http://localhost:5173');

  const usernameField = page.locator('#username');
  await usernameField.fill("User");

  await expect(usernameField).toHaveValue("User");

  const passwordField = page.locator('#password');
  await passwordField.fill("User");

  await expect(passwordField).toHaveValue("User")

  await page.click('[data-testid="login-button"]');

  await expect(page).toHaveURL("http://localhost:5173/home");
});

test('homepage elements shouldnt render for regular user', async ({ page }) => {
    await expect(page.getByText('Valitse toiminta')).toBeVisible();
    await expect(page.getByTestId('Hei')).toBeVisible();
    await expect(page.getByTestId('username')).toBeVisible();
    await expect(page.getByText('Tervetuloa töihin, mitä haluaisit tehdä?')).toBeVisible();
  
    const AIButton = page.getByRole('button', { name: 'Tekoälyn tunnistamat' });
    const expertButton = page.getByRole('button', { name: 'Expertin käsittelemät' });
    const archiveButton = page.getByRole('button', { name: 'Arkisto' });
  
    await expect(AIButton).toBeVisible();
    await expect(expertButton).toBeVisible();
    await expect(archiveButton).toBeVisible();
  });


  test('homepage elements renders correctly for regular user', async ({ page }) => {
    await expect(page.getByText('Valitse toiminta')).toBeVisible();
    await expect(page.getByTestId('Hei')).toBeVisible();
    await expect(page.getByTestId('username')).toBeVisible();
    await expect(page.getByText('Tervetuloa töihin, mitä haluaisit tehdä?')).toBeVisible();
  
    const recogniseButton = page.getByRole('button', { name: 'Tunnista tuote' });
  
    await expect(recogniseButton).toBeVisible();
  });