/**
 * Page Object for the OpenCart "Account Login" page.
 */
import { MyAccountPage } from './MyAccountPage';

export class LoginPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        // Locators
        this.heading = page.getByRole('heading', { name: 'Returning Customer' });
        this.inputEmail = page.locator('#input-email');
        this.inputPassword = page.locator('#input-password');
        this.buttonLogin = page.locator('main form button.btn-primary');
        this.warningMessage = page.locator('.alert-danger');
    }

    /**
     * Fills the e-mail field.
     * @param {string} value - E-mail address
     * @returns {Promise<void>}
     */
    async setEmail(value) {
        await this.inputEmail.fill(value);
    }

    /**
     * Fills the password field.
     * @param {string} value - Password
     * @returns {Promise<void>}
     */
    async setPassword(value) {
        await this.inputPassword.fill(value);
    }

    /**
     * Submits the login form.
     * @returns {Promise<MyAccountPage>} Instance of the My Account page
     */
    async clickLogin() {
        await this.buttonLogin.click();
        await this.page.waitForURL(/route=account\/account/);
        return new MyAccountPage(this.page);
    }

    /**
     * Logs in with the supplied credentials.
     * @param {string} email - Customer e-mail address
     * @param {string} password - Customer password
     * @returns {Promise<void>}
     */
    async login(email, password) {
        try {
            await this.setEmail(email);
            await this.setPassword(password);
            await this.clickLogin();
        } catch (error) {
            console.log(`Error logging in: ${error}`);
            throw error;
        }
    }

    /**
     * Reads the login warning/error message.
     * @returns {Promise<string>} Warning message text
     */
    async getWarningMessage() {
        return (await this.warningMessage.innerText()).trim();
    }

    /**
     * Verifies the login page is displayed.
     * @returns {Promise<boolean>} true if the login page is displayed
     */
    async isLoginPageExists() {
        try {
            return await this.heading.isVisible();
        } catch (error) {
            console.log(`Error checking login page: ${error}`);
            return false;
        }
    }
}
