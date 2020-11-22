var faker = require('faker');

class Person {
    constructor() {
        this.FirstName = faker.name.firstName();
        this.LastName = faker.name.lastName();
        this.Email = faker.internet.email(this.FirstName.toLowerCase(), this.LastName.toLowerCase(), 'testexample.com');
        this.Password = 'Password12345';
    }
}

module.exports = Person;