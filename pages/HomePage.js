/**
 * Page Object for the OpenCart storefront Home page.
 */
import { RegisterPage } from './RegisterPage';
import { LoginPage } from './LoginPage';
import { LogoutPage } from './LogoutPage';
import { SearchResultsPage } from './SearchResultsPage';
import { ShoppingCartPage } from './ShoppingCartPage';

export class HomePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        // Locators - header account menu (scoped to the top bar)
        this.topBar = page.locator('#top');
        this.accountToggle = this.topBar.getByRole('button', { name: 'My Account' });
        this.linkRegister = this.topBar.getByRole('link', { name: 'Register' });
        this.linkLogin = this.topBar.getByRole('link', { name: 'Login' });
        this.linkLogout = this.topBar.getByRole('link', { name: 'Logout' });
        this.linkShoppingCart = this.topBar.getByRole('link', { name: 'Shopping Cart' });

        // Locators - product search
        this.searchInput = page.getByPlaceholder('Search');
        this.searchButton = page.locator('form:has(input[name="search"]) button[type="submit"]');

        // Locators - branding
        this.storeLogo = page.getByRole('img', { name: 'Your Store' });
    }

    /**
     * Opens the "My Account" dropdown in the header.
     * @returns {Promise<void>}
     */
    async clickMyAccount() {
        await this.accountToggle.click();
    }

    /**
     * Opens the registration page from the account dropdown.
     * @returns {Promise<RegisterPage>} Instance of the registration page
     */
    async clickRegister() {
        await this.linkRegister.click();
        await this.page.waitForURL(/route=account\/register/);
        return new RegisterPage(this.page);
    }

    /**
     * Opens the login page from the account dropdown.
     * @returns {Promise<LoginPage>} Instance of the login page
     */
    async clickLogin() {
        await this.linkLogin.click();
        await this.page.waitForURL(/route=account\/login/);
        return new LoginPage(this.page);
    }

    /**
     * Logs the customer out from the account dropdown.
     * @returns {Promise<LogoutPage>} Instance of the logout confirmation page
     */
    async clickLogout() {
        await this.linkLogout.click();
        await this.page.waitForURL(/route=account\/logout/);
        return new LogoutPage(this.page);
    }

    /**
     * Opens the shopping cart from the header.
     * @returns {Promise<ShoppingCartPage>} Instance of the shopping cart page
     */
    async openShoppingCart() {
        await this.linkShoppingCart.click();
        await this.page.waitForURL(/route=checkout\/cart/);
        return new ShoppingCartPage(this.page);
    }

    /**
     * Searches for a product using the header search box.
     * @param {string} productName - Product name to search for
     * @returns {Promise<SearchResultsPage>} Instance of the search results page
     */
    async searchProduct(productName) {
        await this.searchInput.fill(productName);
        await this.searchButton.click();
        await this.page.waitForURL(/route=product\/search/);
        return new SearchResultsPage(this.page);
    }

    /**
     * Verifies the home page is displayed.
     * @returns {Promise<boolean>} true if the home page is displayed
     */
    async isHomePageExists() {
        try {
            return await this.storeLogo.isVisible();
        } catch (error) {
            console.log(`Error checking home page: ${error}`);
            return false;
        }
    }
}
