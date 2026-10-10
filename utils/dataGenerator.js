const { faker } = require('@faker-js/faker');

class RandomDataUtil {
    static getFirstName() {
        return faker.person.firstName();
    }

    static getLastName() {
        return faker.person.lastName();
    }

    static getFullName() {
        return faker.person.fullName();
    }

    static getEmail() {
        return faker.internet.email();
    }

    static getPhoneNumber() {
        return faker.phone.number();
    }

    static getUsername() {
        return faker.internet.userName();
    }

    static getPassword(length = 10) {
        return faker.internet.password({ length });
    }

    static getCountry() {
        return faker.location.country();
    }

    static getState() {
        return faker.location.state();
    }

    static getCity() {
        return faker.location.city();
    }

    static getStreet() {
        return faker.location.street();
    }

    static getStreetAddress() {
        return faker.location.streetAddress();
    }

    static getZipCode() {
        return faker.location.zipCode();
    }

    static getLatitude() {
        return faker.location.latitude();
    }

    static getLongitude() {
        return faker.location.longitude();
    }

    static getCurrentDate() {
        return new Date().toISOString().split('T')[0];
    }

    static getRecentDate(days = 10) {
        const date = new Date();
        date.setDate(date.getDate() - days);
        return date.toISOString().split('T')[0];
    }

    static getFutureDate(years = 1) {
        const date = new Date();
        date.setFullYear(date.getFullYear() + years);
        return date.toISOString().split('T')[0];
    }

    static getPastDate(years = 1) {
        const date = new Date();
        date.setFullYear(date.getFullYear() - years);
        return date.toISOString().split('T')[0];
    }

    static getProductName() {
        return faker.commerce.productName();
    }

    static getProductDescription() {
        return faker.commerce.productDescription();
    }

    static getProductPrice() {
        return Number(faker.commerce.price({ min: 1, max: 500, dec: 2 }));
    }

    static getDepartment() {
        return faker.commerce.department();
    }

    static getImageUrl() {
        return faker.image.url();
    }

    static getNumber() {
        return faker.number.int({ min: 1, max: 999 });
    }

    static generateInvalidLoginPayload() {
        return {
            username: this.getUsername(),
            password: this.getPassword(),
        };
    }

    static generateProductPayload() {
        return {
            title: this.getProductName(),
            price: Number(this.getProductPrice()),
            description: this.getProductDescription(),
            image: this.getImageUrl(),
            category: this.getDepartment().toLowerCase(),
        };
    }

    static generateUpdatedProductPayload() {
        const product = this.generateProductPayload();
        product.title = `Updated ${product.title}`;
        return product;
    }

    static generateUserPayload() {
        return {
            email: this.getEmail(),
            username: this.getUsername(),
            password: this.getPassword(),
            name: {
                firstname: this.getFirstName(),
                lastname: this.getLastName(),
            },
            address: {
                city: this.getCity(),
                street: this.getStreet(),
                number: this.getNumber(),
                zipcode: this.getZipCode(),
                geolocation: {
                    lat: this.getLatitude(),
                    long: this.getLongitude(),
                },
            },
            phone: this.getPhoneNumber(),
        };
    }

    static generateUserUpdatePayload() {
        const user = this.generateUserPayload();
        user.username = `updated-${user.username}`;
        return user;
    }

    static generateCartPayload(userId) {
        return {
            userId,
            date: this.getCurrentDate(),
            products: [
                {
                    productId: this.getNumber(),
                    quantity: this.getNumber(),
                },
            ],
        };
    }

    static generateUpdatedCartPayload(userId) {
        return {
            userId,
            date: this.getCurrentDate(),
            products: [
                {
                    productId: this.getNumber(),
                    quantity: this.getNumber(),
                },
            ],
        };
    }
}

module.exports = { RandomDataUtil };
