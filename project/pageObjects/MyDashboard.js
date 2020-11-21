const {  By, Key, until, WebDriver } = require('selenium-webdriver');
const { expect } = require('chai');

// const webdriver = require('selenium-webdriver');

class MyDashboard {
    constructor(driver) {
        this.driver = driver;
    }
    
    async checkEmail(email) {
        const emailInput = await this.driver.findElement(By.xpath('//input[@title="Your email address"]')).getAttribute("value");
        console.log('email', email, emailInput);
        await expect(emailInput).to.equal(email);
    }

}

module.exports = MyDashboard;