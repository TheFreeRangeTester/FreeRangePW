import { Locator, Page } from "@playwright/test";

const baseURL = 'https://react-shopping-cart-67954.firebaseapp.com';

export class ReactShoppingPage {
    readonly page: Page;
    readonly addToCartButtons: Locator;
    readonly closeCheckoutButton: Locator;
    readonly cartAmount: Locator;


    constructor(page: Page) {
        let amount: number = 0;
        this.page = page;
        this.addToCartButtons = page.locator('text=Add to cart');
        this.closeCheckoutButton = page.getByRole('button', { name: 'X' });
        this.cartAmount = page.locator('#root > div > div.sc-1h98xa9-1.fMOJZp > button > div > div');
        page.goto(baseURL);
    };

    async clickAddToCartButton(index: number) {
        await this.addToCartButtons.nth(index).click();
    };

    async clickCloseCheckoutButton() {
        await this.page.waitForTimeout(500);
        await this.closeCheckoutButton.click();
    };

    async getItemsAmount() {
        return await this.addToCartButtons.count();
    };

    async addMultipleItemsToCart(count: number) {
        const itemsCount = await this.getItemsAmount();
        console.log(`Total items available: ${itemsCount}`);
        for (let i = 0; i < Math.min(count, itemsCount); i++) {
            console.log(`Adding item ${i + 1} to the cart`);
            await this.clickAddToCartButton(i);
            await this.clickCloseCheckoutButton();
        }
    };

    async fetchCartAmount() {
        return await this.cartAmount.textContent();
    };
}