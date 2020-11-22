const {  By, Key, until, WebDriver } = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');

class ClickButton {
    constructor(driver) {
        this.driver = driver;
    }

    async clickButtonSpan(buttonName) {
        await this.driver.findElement(By.xpath(`//span[contains(text(), ${buttonName})]`)).click()
    }
}

module.exports = ClickButton;