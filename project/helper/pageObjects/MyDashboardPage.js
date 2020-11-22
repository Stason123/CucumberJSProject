const {  By, Key, until, WebDriver } = require('selenium-webdriver');
const { expect } = require('chai');
const CreatePerson = require('../global/CreatePerson');

// const webdriver = require('selenium-webdriver');

class MyDashboardPage {
    constructor(driver) {
        this.driver = driver;
    }
    
    async checkEmail(person) {
        const emailInput = await this.driver.findElement(By.xpath('//input[@title="Your email address"]')).getAttribute("value");
        console.log('email', person.Email, emailInput);
        await expect(emailInput).to.equal(person.Email);
        if (person.Email === emailInput) {
            await CreatePerson.saveCsvhistory(person)
        }
    }

}

module.exports = MyDashboardPage;