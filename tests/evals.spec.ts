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
 
  await page.click('[data-testid="evals-button"]');
 
  await expect(page).toHaveURL("http://localhost:5173/evals")
});
  
test('evals page renders correctly', async ({ page }) => {
  await expect(page.getByText('Tunnistetut tuotteet')).toBeVisible();

  await expect(page.getByText('Pohjanmaan Kaluste')).toBeVisible();
});

test('furniture information can be seen and accessed', async ({ page }) => {
  await page.click('text=Pohjanmaan Kaluste');

  await expect(page).toHaveURL(/.*\/eval\/\d+/);

  await expect(page.getByText('Merkki')).toBeVisible();

  await expect(page.getByText('Malli')).toBeVisible();

  await expect(page.getByText('Väri')).toBeVisible();

  await expect(page.getByText('Mitat')).toBeVisible();

  await expect(page.getByText('Kunto')).toBeVisible();

  await expect(page.getByText('Hinta')).toBeVisible();

  await expect(page.getByText('Lisätiedot')).toBeVisible();
});

test('can edit and save furniture data', async ({ page }) => {
  await page.click('text=Pohjanmaan Kaluste');

  await expect(page).toHaveURL(/.*\/eval\/\d+/);

  await page.click('text=Muokkaa tietoja');

  await page.getByTestId('brand-test').fill('TestBrand');
  await page.getByTestId('model-test').fill('TestModel');
  await page.getByTestId('color-test').fill('TestColor');
  await page.getByTestId('width-test').fill('100');
  await page.getByTestId('height-test').fill('200');
  await page.getByTestId('length-test').fill('300');

  await page.click('text=Tallenna kaikki');

  await expect(page.getByText("TestBrand")).toBeVisible();
  await expect(page.getByText("TestModel")).toBeVisible();
  await expect(page.getByText("TestColor")).toBeVisible();
  await expect(page.getByText("100")).toBeVisible();
  await expect(page.getByText("200")).toBeVisible();
  await expect(page.getByText("300")).toBeVisible();
});
