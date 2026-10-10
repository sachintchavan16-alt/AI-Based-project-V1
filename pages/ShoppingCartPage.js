/**
 * Page Object for the OpenCart "Shopping Cart" page.
 */
export class ShoppingCartPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        // Locators
        this.heading = page.getByRole('heading', { name: /Shopping Cart/, level: 1 });
        this.firstRow = page.locator('main table tbody tr').first();
        this.productNameLink = this.firstRow.locator('td').nth(1).getByRole('link');
        this.quantityInput = page.locator('main table tbody input[name="quantity"]');
        this.unitPrice = this.firstRow.locator('td').nth(3);
        this.totalRow = page.locator('main table tfoot tr').filter({ has: page.getByText('Total', { exact: true }) });
        this.cartTotal = this.totalRow.locator('td').last();
    }

    /**
     * Verifies the given product is present in the cart.
     * @param {string} productName - Product name to look for
     * @returns {Promise<boolean>} true if the product is in the cart
     */
    async containsProduct(productName) {
        return await this.page.getByRole('link', { name: productName, exact: true }).first().isVisible();
    }

    /**
     * Reads the product name shown in the cart.
     * @returns {Promise<string>} Product name
     */
    async getProductName() {
        return (await this.productNameLink.innerText()).trim();
    }

    /**
     * Reads the quantity shown in the cart.
     * @returns {Promise<string>} Quantity value
     */
    async getQuantity() {
        return await this.quantityInput.inputValue();
    }

    /**
     * Reads the unit price shown in the cart.
     * @returns {Promise<string>} Unit price
     */
    async getUnitPrice() {
        return (await this.unitPrice.innerText()).trim();
    }

    /**
     * Reads the applicable cart total.
     * @returns {Promise<string>} Cart total
     */
    async getCartTotal() {
        return (await this.cartTotal.innerText()).trim();
    }

    /**
     * Verifies the shopping cart page is displayed.
     * @returns {Promise<boolean>} true if the shopping cart page is displayed
     */
    async isShoppingCartPageExists() {
        try {
            return await this.heading.isVisible();
        } catch (error) {
            console.log(`Error checking shopping cart page: ${error}`);
            return false;
        }
    }
}
