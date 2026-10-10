/**
 * Page Object for the OpenCart product "Search Results" page.
 */
import { ProductPage } from './ProductPage';

export class SearchResultsPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        // Locators
        this.heading = page.getByRole('heading', { name: /^Search - / });
    }

    /**
     * Verifies a product with the given name is listed in the results.
     * @param {string} productName - Product name to look for
     * @returns {Promise<boolean>} true if the product is listed
     */
    async isProductVisible(productName) {
        return await this.page.getByRole('link', { name: productName, exact: true }).first().isVisible();
    }

    /**
     * Opens the product details page for the given product.
     * @param {string} productName - Product name to open
     * @returns {Promise<ProductPage>} Instance of the product details page
     */
    async openProduct(productName) {
        await this.page.getByRole('link', { name: productName, exact: true }).first().click();
        await this.page.waitForURL(/route=product\/product/);
        return new ProductPage(this.page);
    }

    /**
     * Verifies the search results page is displayed.
     * @returns {Promise<boolean>} true if the search results page is displayed
     */
    async isSearchResultsPageExists() {
        try {
            return await this.heading.isVisible();
        } catch (error) {
            console.log(`Error checking search results page: ${error}`);
            return false;
        }
    }
}
