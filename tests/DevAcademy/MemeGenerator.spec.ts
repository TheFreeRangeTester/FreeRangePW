import { test, expect } from '@playwright/test';

test.describe('Meme Generator', () => {
    let initialMemeSrc: string | null;

    test.beforeEach(async ({ page }) => {
        await page.goto('https://meme-generator-pocodev.netlify.app/');

        // Capture initial meme image source
        const memeSelector = 'img.meme--image';
        initialMemeSrc = await page.getAttribute(memeSelector, 'src');
    });

    test('Clicking button gets a new meme', async ({ page }) => {
        const memeSelector = 'img.meme--image';

        // Find button and click
        await page.waitForTimeout(600);
        await page.getByRole('button', { name: 'Get a new meme image 🖼️' }).click();

        // Capture new meme image source
        const newMemeSrc = await page.getAttribute(memeSelector, 'src');

        // Validate that image source has changed
        expect(newMemeSrc).not.toBe(initialMemeSrc);
    });
});
