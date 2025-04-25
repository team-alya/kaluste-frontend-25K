import { test, expect } from '@playwright/test';

test('Open start URL', async ({ page }) => {
    // FIRST LOGIN AND GO TO CAMERA PAGE
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
    
    // SECOND UPLOAD AN IMAGE AND SAVE IT
    const fileChooserPromise =  page.waitForEvent('filechooser')
    await page.getByText('Galleria').click();
    const filechooser = await fileChooserPromise;
    await filechooser.setFiles('kaluste-backend-25K/src/tests/images/marius.png');

    await expect(page.locator('img[alt="Captured"]')).toBeVisible();

    await page.click('[data-testid="check-image"]');

    await page.click('[data-testid="accept-image"]');

    await page.click('[data-testid="save-button"]');

    // THIRD GO BACK TO HOME PAGE AND THEN TO EVALS PAGE
    await expect(page).toHaveURL("http://localhost:5173/home");
 
    await page.click('[data-testid="evals-button"]');
    
    await expect(page).toHaveURL("http://localhost:5173/evals")

    // FOURTH EDIT THE FIELDS OF THE UPLOADED FURNITURE
    await page.click('text=Marius');

    await expect(page).toHaveURL(/.*\/eval\/\d+/);

    await page.click('text=Muokkaa tietoja');

    await page.getByTestId('brand-test').fill('TestBrand');
    await page.getByTestId('model-test').fill('TestModel');
    await page.getByTestId('color-test').fill('TestColor');
    await page.getByTestId('width-test').fill('100');
    await page.getByTestId('height-test').fill('200');
    await page.getByTestId('length-test').fill('300');

    await page.click('text=Tallenna tiedot');

    await expect(page.getByText("TestBrand")).toBeVisible();
    await expect(page.getByText("TestModel")).toBeVisible();
    await expect(page.getByText("TestColor")).toBeVisible();
    await expect(page.getByText("100")).toBeVisible();
    await expect(page.getByText("200")).toBeVisible();
    await expect(page.getByText("300")).toBeVisible();

    // FIFTH SEND THE EDITED FURNITURE TO THE EXPERT PAGE AND THEN TO ARCHIVE PAGE
    await page.click('text=Lähetä expertille');

    await expect(page).toHaveURL("http://localhost:5173/reviewed")

    await page.click('text=TestBrand');

    await page.getByTestId("archive-button").click();

    // SIXTH DELETE THE FURNITURE FROM THE ARCHIVE
    await page.click('text=TestBrand');

    await page.getByTestId("delete-button").click();

    await page.getByTestId("delete-button").click();

    await expect(page.getByText("TestBrand")).toHaveCount(0);
});
