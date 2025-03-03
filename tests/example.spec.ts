import { test, expect } from '@playwright/test';


// Default page tests

test('site has the correct title', async ({ page }) => {
  await page.goto('localhost:5173')
  console.log(await page.title());
  await expect(page).toHaveTitle(/Vite \+ React \+ TS/);
});

test('default page renders correctly', async ({ page }) => {
  await page.goto('http://localhost:5173/')

  await expect(page.getByText('Tervetuloa töihin')).toBeVisible();

  const loginButton = page.getByRole('button', { name: 'Kirjaudu sisään' });
  await expect(loginButton).toBeVisible();

  const registerButton = page.getByRole('button', { name: 'Rekisteröidy' });
  await expect(registerButton).toBeVisible();

  const usernameInput = page.locator('input#username');
  const passwordInput = page.locator('input#password');
  await expect(usernameInput).toBeVisible();
  await expect(passwordInput).toBeVisible();

});

test('move to register page', async ({ page }) => {
  await page.goto('localhost:5173')
  await page.getByText("Rekisteröidy").click();
  await expect(page).toHaveURL('http://localhost:5173/register');
});

test('try to log in with incorrect log in credentials', async ({ page }) => {
  await page.goto('http://localhost:5173');

  const usernameField = page.locator('#username');
  await usernameField.fill("John Doe");

  await expect(usernameField).toHaveValue("John Doe");

  const passwordField = page.locator('#password');
  await passwordField.fill("Salasana");

  await expect(passwordField).toHaveValue("Salasana")
});

// Homepage tests

test('homepage renders correctly', async ({ page }) => {
  await page.goto('http://localhost:5173/home')

  await expect(page.getByText('Tervetuloa töihin, mitä haluaisit tehdä?')).toBeVisible();

  const button = page.getByRole('button', { name: 'Tunnista tuote' });
  await expect(button).toBeVisible();

});

test('open camera page and return to home', async ({ page }) => {
  await page.goto('http://localhost:5173/home')

  await page.getByText('Tunnista tuote').click();
  await expect(page).toHaveURL('http://localhost:5173/camera');

  await page.click('[data-testid="back-button"]');

  await expect(page).toHaveURL('http://localhost:5173/home');
});

test('open settings page and return to home', async ({ page }) => {
  await page.goto('http://localhost:5173/home')

  await page.click('button.rounded-full');
  await expect(page).toHaveURL('http://localhost:5173/settings');

  await page.click('[data-testid="back-button"]');

  await expect(page).toHaveURL('http://localhost:5173/home');
});


// Camera page tests

test('camera page renders correctly', async ({ page }) => {
  await page.goto('http://localhost:5173/camera')

  const cameraButton = page.getByRole('button', { name: 'Ota kuva' });
  await expect(cameraButton).toBeVisible();

  const galleryButton = page.getByRole('button', { name: 'Galleria' });
  await expect(galleryButton).toBeVisible();

});

test('open gallery and upload image', async ({ page }) => {
  await page.goto('http://localhost:5173/camera')

  const fileChooserPromise =  page.waitForEvent('filechooser')
  await page.getByText('Galleria').click();
  const filechooser = await fileChooserPromise;
  await filechooser.setFiles('C:/Users/lassi/Desktop/090.jpg');

  await expect(page.locator('img[alt="Captured"]')).toBeVisible();
});

