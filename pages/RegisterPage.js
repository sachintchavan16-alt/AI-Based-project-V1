/**
 * Page Object for the OpenCart "Register Account" page.
 */
import { AccountSuccessPage } from './AccountSuccessPage';

export class RegisterPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        // Locators
        this.heading = page.getByRole('heading', { name: 'Register Account' });
        this.inputFirstname = page.locator('#input-firstname');
        this.inputLastname = page.locator('#input-lastname');
        this.inputEmail = page.locator('#input-email');
        this.inputPassword = page.locator('#input-password');
        this.checkboxAgree = page.locator('input[name="agree"]');
        this.buttonContinue = page.locator('main form button.btn-primary');
    }

    /**
     * Fills the first name field.
     * @param {string} value - First name
     * @returns {Promise<void>}
     */
    async setFirstname(value) {
        await this.inputFirstname.fill(value);
    }

    /**
     * Fills the last name field.
     * @param {string} value - Last name
     * @returns {Promise<void>}
     */
    async setLastname(value) {
        await this.inputLastname.fill(value);
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
     * Accepts the privacy policy.
     * @returns {Promise<void>}
     */
    async acceptPrivacyPolicy() {
        await this.checkboxAgree.check();
    }

    /**
     * Completes the whole registration form and accepts the privacy policy.
     * @param {{firstName: string, lastName: string, email: string, password: string}} user - Customer details
     * @returns {Promise<void>}
     */
    async completeRegistration(user) {
        try {
            await this.setFirstname(user.firstName);
            await this.setLastname(user.lastName);
            await this.setEmail(user.email);
            await this.setPassword(user.password);
            await this.acceptPrivacyPolicy();
        } catch (error) {
            console.log(`Error completing registration: ${error}`);
            throw error;
        }
    }

    /**
     * Submits the registration form.
     * @returns {Promise<AccountSuccessPage>} Instance of the account created page
     */
    async clickContinue() {
        await this.buttonContinue.click();
        await this.page.waitForURL(/route=account\/success/);
        return new AccountSuccessPage(this.page);
    }

    /**
     * Verifies the registration page is displayed.
     * @returns {Promise<boolean>} true if the registration page is displayed
     */
    async isRegisterPageExists() {
        try {
            return await this.heading.isVisible();
        } catch (error) {
            console.log(`Error checking register page: ${error}`);
            return false;
        }
    }
}
