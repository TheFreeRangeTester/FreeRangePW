import { expect, type Locator, type Page } from '@playwright/test';


export class SandboxPage {
    readonly page: Page;
    readonly pastaCheckbox: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pastaCheckbox = page.getByLabel('Pasta 🍝');
    }

    async checkPasta() {
        await this.pastaCheckbox.check();
    }

    async verifyPastaChecked() {
        expect(this.pastaCheckbox).toBeChecked;
    }
}


