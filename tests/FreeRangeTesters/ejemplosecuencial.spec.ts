import { test, type Page } from '@playwright/test';

// Anotamos todos los tests bajo Serial
test.describe.configure({ mode: 'serial' });

let page: Page;

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
});

test.afterAll(async () => {
    await page.close();
});

test('Si no corro primero exploto', async () => {
    await page.goto('https://playwright.dev/');
});

test('Si no corro segundo exploto', async () => {
    await page.getByText('Get Started').click();
});
