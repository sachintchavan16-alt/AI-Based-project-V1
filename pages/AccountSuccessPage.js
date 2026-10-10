/**
 * Page Object for the OpenCart "Your Account Has Been Created!" success page.
 */
export class AccountSuccessPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        // Locators
        this.heading = page.getByRole('heading', { name: 'Your Account Has Been Created!' });
    }

    /**
     * Reads the account created confirmation message.
     * @returns {Promise<string>} Confirmation heading text
     */
    async getSuccessMessage() {
        return (await this.heading.innerText()).trim();
    }

    /**
     * Verifies the account created page is displayed.
     * @returns {Promise<boolean>} true if the success page is displayed
     */
    async isAccountSuccessPageExists() {
        try {
            return await this.heading.isVisible();
        } catch (error) {
            console.log(`Error checking account success page: ${error}`);
            return false;
        }
    }
}
