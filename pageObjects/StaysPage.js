const {  By, Key, until, WebDriver } = require('selenium-webdriver');

class StaysPage {
    constructor(driver) {
        this.driver = driver;
    }
    buttons = {
        
    };
    async inputs(search) {
        await this.driver.findElement(By.id('ss')).sendKeys(search);
    };
}

module.exports = StaysPage();