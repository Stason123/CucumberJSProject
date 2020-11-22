const {  By, Key, until, WebDriver } = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');

class ClickButton {
    constructor(driver) {
        this.driver = driver;
    }

    async clickButtonSpan(buttonName) {
        await this.driver.findElement(By.xpath(`//span[contains(text(), "${buttonName}")]`)).click()
    }

    async clickButtonClassName(className) {
        console.log('className', className);
        await this.driver.findElement(By.className(className)).click();
    }

    async clickButtonCss(css) {
        await this.driver.findElement(By.css(`.${css}`)).click();
    }

}

module.exports = ClickButton;