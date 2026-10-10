/**
 * Page Object for the OpenCart product details page.
 */
export class ProductPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        // Locators
        this.heading = page.locator('main h1');
        this.price = page.locator('main h2 .price-new');
        this.inputQuantity = page.locator('#input-quantity');
        this.buttonAddToCart = page.locator('#button-cart');
        this.alertSuccess = page.locator('.alert');
    }

    /**
     * Sets the product quantity.
     * @param {string|number} quantity - Quantity to add
     * @returns {Promise<void>}
     */
    async setQuantity(quantity) {
        await this.inputQuantity.fill(String(quantity));
    }

    /**
     * Adds the product to the shopping cart.
     * @returns {Promise<void>}
     */
    async addToCart() {
        await this.buttonAddToCart.click();
        await this.alertSuccess.waitFor({ state: 'visible' });
    }

    /**
     * Reads the product name.
     * @returns {Promise<string>} Product name
     */
    async getProductName() {
        return (await this.heading.innerText()).trim();
    }

    /**
     * Reads the displayed product price.
     * @returns {Promise<string>} Product price
     */
    async getProductPrice() {
        return (await this.price.innerText()).trim();
    }

    /**
     * Reads the add to cart success message.
     * @returns {Promise<string>} Success message text
     */
    async getSuccessMessage() {
        return (await this.alertSuccess.innerText()).trim();
    }

    /**
     * Verifies the product details page is displayed.
     * @returns {Promise<boolean>} true if the product details page is displayed
     */
    async isProductPageExists() {
        try {
            return await this.heading.isVisible();
        } catch (error) {
            console.log(`Error checking product page: ${error}`);
            return false;
        }
    }
}
