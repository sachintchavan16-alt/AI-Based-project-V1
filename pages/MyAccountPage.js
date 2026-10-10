/**
 * Page Object for the OpenCart authenticated "My Account" page.
 */
export class MyAccountPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        // Locators
        this.heading = page.getByRole('heading', { name: 'My Account', level: 1 });
    }

    /**
     * Verifies the authenticated My Account page is displayed.
     * @returns {Promise<boolean>} true if the My Account page is displayed
     */
    async isMyAccountPageExists() {
        try {
            return await this.heading.isVisible();
        } catch (error) {
            console.log(`Error checking my account page: ${error}`);
            return false;
        }
    }
}
