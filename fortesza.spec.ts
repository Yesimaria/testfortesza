import { test, expect } from '@playwright/test';


test('register', async ({ page },) => {
    // Runs before each test and signs in each page.
    await page.goto('https://staging.fortesza.com/register');
    await page.fill('input[formcontrolname="email"]', 'yesimar@email.com');
    await page.fill('input[formcontrolname="password"]', 'Password123$');
    const validationError = await page.locator('.text-red').count();
    if (validationError > 0)
        await page.screenshot({ path: 'test/result/screenshotRegister1.png' });
    else {
        await page.click('#check-terms-and-conditions > label > span > span.color.text-check');
        await page.click('#btn-register-user')


        const alert = await page.waitForSelector('.toast-message');
        if (alert)
            await page.screenshot({ path: 'test/result/screenshotRegisterAlert.png' });
        else {
            await page.waitForNavigation();
            await page.screenshot({ path: 'test/result/screenshotRegister2.png' });
        }

    }

});

test('login', async ({ page }) => {
    // Runs before each test and signs in each page.
    await page.goto('https://staging.fortesza.com/login');
    await page.fill('input[formcontrolname="emailOrUser"]', 'yesimar@email.com');
    await page.fill('input[formcontrolname="password"]', 'Password123$');
    const validationError = await page.locator('.mat-error').count();
    if (validationError > 0)
        await page.screenshot({ path: 'test/result/screenshotLogin1.png' });
    else {
        await page.click('#btn-sign-in-page');
        await page.waitForNavigation();
        await page.screenshot({ path: 'test/result/screenshotLogin2.png' });


    }
});


