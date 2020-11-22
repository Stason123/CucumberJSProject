const {  By, Key, until, WebDriver } = require('selenium-webdriver');
const { expect } = require('chai');

class CheckOutPage {
    constructor(driver) {
        this.driver = driver;
        this.FinalDetails = 'bui-button__text js-button__text';
    }

    async checkPriceAndGuests(price, guests) {
        const repReg = /[(]+[0-9]* *[\w]* *[\w]*[)]/;
        const p = await this.driver.findElement(By.xpath('//td[@class="topCurrencyClar"]//span//span')).getText();
        let g = await this.driver.findElement(By.css(".bp_sidebar_content_block__li_content")).getText();
        console.log('p g', p, g);
        g = g.replace(repReg, '');
        guests = guests.replace(repReg, '');
        console.log(guests, g);
        // console.log(guests, g[0]);

        await expect(p).to.equal(price);
        await expect(g).to.equal(guests);
    }

    async typeLastName(lastname) {
        await this.driver.findElement(By.id("lastname")).sendKeys(lastname);
    }

}

module.exports = CheckOutPage;