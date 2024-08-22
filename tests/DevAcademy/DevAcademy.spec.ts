import { test, expect } from '@playwright/test';

test.describe('Exercises of Week 2', () => {

    test("Validate the title of the Test Automation Essentials page", async ({ page }) => {
        await page.goto('https://devacademy.co.nz/testing-automation/');
        await page.getByRole('link', { name: 'Testing Automation Essentials' }).click();
        await page.getByText("Testing Automation Essentials").click();
        await expect(page.getByText("Apply now")).toBeEnabled();
    });

    test("Dropdowns!", async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/dropdown');
        await page.locator('#dropdown').selectOption('Option 2');

    });

    test('Selecting dropdown options', async ({ page }) => {
        await page.goto("https://the-internet.herokuapp.com/dropdown");
        const dropdown = page.locator("#dropdown");
        await dropdown.selectOption('Option 2');
        await expect(dropdown).toHaveValue('2');
    });

    test('Checkboxes', async ({ page }) => {
        await page.goto("https://the-internet.herokuapp.com/checkboxes");

    });

    test('Inputs', async ({ page }) => {
        await page.goto("https://the-internet.herokuapp.com/inputs");
        await page.getByRole('spinbutton').press('ArrowDown');
    });

    test('Add multiple Delete elements', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');

        const numberOfButtonsToAdd = 2000;

        for (let i = 0; i < numberOfButtonsToAdd; i++) {
            await page.getByRole('button', { name: 'Add Element' }).click();

            const deleteButtons = await page.locator('button:has-text("Delete")');
            await expect(deleteButtons).toHaveCount(i + 1);
        }

    });

    test('Add multiple Delete elements and see limit', async ({ page }) => {

        await page.goto("https://the-internet.herokuapp.com/add_remove_elements/");

        const numberOfButtonsToAdd: number = 700;
        let addedButtons: number = 0;

        try {
            for (let i = 0; i < numberOfButtonsToAdd; i++) {
                await page.click('button:has-text("Add Element")');
                const deleteButtons = await page.locator('button:has-text("Delete")');
                await expect(deleteButtons).toHaveCount(i + 1);
                addedButtons++;
            }
        } catch (error) {
            console.error(`Error after adding ${addedButtons} buttons:`, error);
        }
    });




});

