const {  By, Key, until, WebDriver } = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');

class StaysPage {
    constructor(driver) {
        this.driver = driver;
    }
    
    async choiseCurrency(currency) {
        const curr = "currency_" + currency;
        await this.driver.findElement(By.className("popover_trigger currency_va_middle")).click();
        await this.driver.findElement(By.className(curr)).click();
    }

    async choiseLanguage() {
        await this.driver.findElement(By.className("user_center_option uc_language js-uc-language")).click();
        await this.driver.findElement(By.className("lang_en-us")).click();
    }

    async manageCookieAccept() {
        await this.driver.findElement(By.id("onetrust-accept-btn-handler")).click()
    }

    async registerButtonClick() {
        await this.driver.findElement(By.className("header_link_register")).click();
    }

    async inputs(search) {
        await this.driver.findElement(By.id('ss')).sendKeys(search);
    };

    async closeNamerefisterModal() {
        await this.driver.findElement(By.xpath('//button[@title="Close"]')).click();
    }

    async clickMyDashboard() {
        await this.driver.findElement(By.id("profile-menu-trigger--content")).click();
        await this.driver.findElement(By.css(".profile-menu__link:nth-child(1)")).click();
    }
}

module.exports = StaysPage;