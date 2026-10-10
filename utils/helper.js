class Helper {
    static convertPriceToNumber(price) {
        return Number(String(price).replace(/[^0-9.]/g, ''));
    }

    static getProductDetails() {
        return {
            productName: 'MacBook',
            productQuantity: '1',
            totalPrice: '$602.00',
        };
    }

    static getLoginDetails() {
        return {
            email: 'pavanol@xyz.com',
            password: 'test@123',
        };
    }
}

module.exports = { Helper };
