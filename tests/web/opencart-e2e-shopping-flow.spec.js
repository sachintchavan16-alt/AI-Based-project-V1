/**
 * Test Case: End-to-End Shopping Flow (OpenCart)
 *
 * Tags: @master @e2e
 *
 * Steps:
 * 1) Open the application
 * 2) Register a new customer using dynamically generated unique data
 * 3) Verify successful registration
 * 4) Log out
 * 5) Log in again using the newly created credentials
 * 6) Verify successful authentication
 * 7) Search for a known product
 * 8) Open the product details page
 * 9) Add the product to the cart
 * 10) Open the shopping cart
 * 11) Verify the correct product
 * 12) Verify the quantity
 * 13) Verify the product price
 * 14) Verify the applicable cart total
 * 15) Verify that the complete journey finishes without errors
 */

// using custom fixtures
import { test, expect } from '../../fixtures/pageFixtures';
import { RandomDataUtil } from '../../utils/dataGenerator';
import { Helper } from '../../utils/helper';

test('End-to-End Shopping Flow test @master @e2e', async ({
    homePage,
    registerPage,
    accountSuccessPage,
    loginPage,
    myAccountPage,
    logoutPage,
    searchResultsPage,
    productPage,
    shoppingCartPage,
}) => {
    const { productName, productQuantity, totalPrice } = Helper.getProductDetails();

    const firstName = RandomDataUtil.getFirstName();
    const lastName = RandomDataUtil.getLastName();
    const email = RandomDataUtil.getEmail();
    const password = RandomDataUtil.getPassword(12);

    await test.step('1) Open the application', async () => {
        const isHomePage = await homePage.isHomePageExists();
        expect(isHomePage).toBeTruthy();
    });

    await test.step('2) Register a new customer using dynamically generated unique data', async () => {
        await homePage.clickMyAccount();
        await homePage.clickRegister();

        const isRegisterPage = await registerPage.isRegisterPageExists();
        expect(isRegisterPage).toBeTruthy();

        await registerPage.completeRegistration({ firstName, lastName, email, password });
        await registerPage.clickContinue();
    });

    await test.step('3) Verify successful registration', async () => {
        const isAccountCreated = await accountSuccessPage.isAccountSuccessPageExists();
        expect(isAccountCreated).toBeTruthy();
        expect(await accountSuccessPage.getSuccessMessage()).toContain('Your Account Has Been Created!');
    });

    await test.step('4) Log out', async () => {
        await homePage.clickMyAccount();
        await homePage.clickLogout();

        const isLogoutPage = await logoutPage.isLogoutPageExists();
        expect(isLogoutPage).toBeTruthy();

        await logoutPage.clickContinue();
    });

    await test.step('5) Log in again using the newly created credentials', async () => {
        await homePage.clickMyAccount();
        await homePage.clickLogin();

        const isLoginPage = await loginPage.isLoginPageExists();
        expect(isLoginPage).toBeTruthy();

        await loginPage.login(email, password);
    });

    await test.step('6) Verify successful authentication', async () => {
        const isLoggedIn = await myAccountPage.isMyAccountPageExists();
        expect(isLoggedIn).toBeTruthy();
    });

    await test.step('7) Search for a known product', async () => {
        await homePage.searchProduct(productName);
        await expect(searchResultsPage.heading).toContainText(`Search - ${productName}`);
        expect(await searchResultsPage.isProductVisible(productName)).toBeTruthy();
    });

    await test.step('8) Open the product details page', async () => {
        await searchResultsPage.openProduct(productName);

        const isProductPage = await productPage.isProductPageExists();
        expect(isProductPage).toBeTruthy();
        expect(await productPage.getProductName()).toBe(productName);
        expect(await productPage.getProductPrice()).toBe(totalPrice);
    });

    await test.step('9) Add the product to the cart', async () => {
        await productPage.setQuantity(productQuantity);
        await productPage.addToCart();
        expect(await productPage.getSuccessMessage()).toContain(`You have added ${productName} to your shopping cart!`);
    });

    await test.step('10) Open the shopping cart', async () => {
        await homePage.openShoppingCart();

        const isCartPage = await shoppingCartPage.isShoppingCartPageExists();
        expect(isCartPage).toBeTruthy();
    });

    await test.step('11) Verify the correct product', async () => {
        expect(await shoppingCartPage.containsProduct(productName)).toBeTruthy();
        expect(await shoppingCartPage.getProductName()).toBe(productName);
    });

    await test.step('12) Verify the quantity', async () => {
        expect(await shoppingCartPage.getQuantity()).toBe(productQuantity);
    });

    await test.step('13) Verify the product price', async () => {
        expect(await shoppingCartPage.getUnitPrice()).toBe(totalPrice);
    });

    await test.step('14) Verify the applicable cart total', async () => {
        expect(await shoppingCartPage.getCartTotal()).toBe(totalPrice);
    });

    await test.step('15) Verify that the complete journey finishes without errors', async () => {
        expect(await shoppingCartPage.containsProduct(productName)).toBeTruthy();
        expect(await shoppingCartPage.getCartTotal()).toBe(totalPrice);
    });

    console.log('✅ ✔️ End-to-end shopping flow completed successfully!');
});
