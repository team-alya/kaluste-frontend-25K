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

    await page.getByText('Tunnista tuote').click();
    await expect(page).toHaveURL('http://localhost:5173/camera');
  });

test('camera page elements render correctly', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Ota kuva' })).toBeVisible();
  
  const cameraButton = page.getByRole('button', { name: 'Ota kuva' });
  await expect(cameraButton).toBeVisible();

  const galleryButton = page.getByRole('button', { name: 'Galleria' });
  await expect(galleryButton).toBeVisible();

});

test('open settings page and return to camera', async ({ page }) => {
  await page.click('button.rounded-full');
  await expect(page).toHaveURL('http://localhost:5173/settings');

  await page.click('[data-testid="back-button"]');

  await expect(page).toHaveURL('http://localhost:5173/camera');
});

test('open gallery and upload image', async ({ page }) => {
  const fileChooserPromise =  page.waitForEvent('filechooser')
  await page.getByText('Galleria').click();
  const filechooser = await fileChooserPromise;
  await filechooser.setFiles('kaluste-backend-25K/src/tests/images/marius.png');

  await expect(page.locator('img[alt="Captured"]')).toBeVisible();

  await page.click('[data-testid="check-image"]');

  await page.click('[data-testid="accept-image"]');

  await page.click('[data-testid="save-button"]');
});

test('open gallery and reject image', async ({ page }) => {
  const fileChooserPromise =  page.waitForEvent('filechooser')
  await page.getByText('Galleria').click();
  const filechooser = await fileChooserPromise;
  await filechooser.setFiles('kaluste-backend-25K/src/tests/images/marius.png');

  await expect(page.locator('img[alt="Captured"]')).toBeVisible();

  await page.click('[data-testid="check-image"]');

  await page.click('[data-testid="accept-image"]');

  await page.click('[data-testid="reject-button"]');

  await expect(page).toHaveURL('http://localhost:5173/home');
});

test('open camera and take a picture', async ({ page, context }) => {

  await context.grantPermissions(['camera']);

  await page.waitForSelector('[data-testid="capture-button"]', { state: 'visible' });

  await page.click('[data-testid="capture-button"]');
});
