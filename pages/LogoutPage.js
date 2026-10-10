/**
 * Page Object for the OpenCart "Account Logout" confirmation page.
 */
export class LogoutPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        // Locators
        this.heading = page.getByRole('heading', { name: 'Account Logout' });
        this.linkContinue = page.getByRole('link', { name: 'Continue' });
    }

    /**
     * Confirms the logout and returns to the home page.
     * @returns {Promise<void>}
     */
    async clickContinue() {
        await this.linkContinue.click();
        await this.page.waitForURL(/route=common\/home/);
    }

    /**
     * Verifies the logout confirmation page is displayed.
     * @returns {Promise<boolean>} true if the logout page is displayed
     */
    async isLogoutPageExists() {
        try {
            return await this.heading.isVisible();
        } catch (error) {
            console.log(`Error checking logout page: ${error}`);
            return false;
        }
    }
}
