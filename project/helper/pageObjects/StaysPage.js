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

    async inputsSearch(search) {
        await this.driver.findElement(By.id('ss')).sendKeys(search);
    };

    async closeNamerefisterModal() {
        await this.driver.findElement(By.xpath('//button[@title="Close"]')).click();
    }

    async clickMyDashboard() {
        await this.driver.findElement(By.id("profile-menu-trigger--content")).click();
        await this.driver.findElement(By.css(".profile-menu__link:nth-child(1)")).click();
    }

    async clickSignInButton() {
        await this.driver.findElement(By.id("current_account")).click();
    }

    async clickDates(date1, date2) {
        await this.driver.findElement(By.className("xp__dates xp__group")).click();
        await this.driver.findElement(By.xpath(`//td[@data-date="${date1}"]`)).click();
        await this.driver.findElement(By.xpath(`//td[@data-date="${date2}"]`)).click();
    }

    async chooseGuests(adult, child) {
        await this.driver.findElement(By.className("xp__input-group xp__guests")).click();
        
        const adults = await this.driver.findElement(By.id("group_adults")).getAttribute("value");
        console.log('adults', adults);
        
        const children = await this.driver.findElement(By.id("group_children")).getAttribute("value");
        const adNum = parseInt(adult, 10);
        const chNum = parseInt(child, 10);
        if (adults !== adNum) {
            if(adults < adNum) {
                let click = adNum - adults;
                for(let i = 0; i < click; i++) {
                    await this.driver.findElement(By.xpath(`//button[@aria-label="Increase number of Adults"]`)).click();
                }
            } else {
                let click = adults - adNum;
                for(let i = 0; i < click; i++) {
                    await this.driver.findElement(By.xpath(`//button[@aria-label="Decrease number of Adults"]`)).click();
                }
            }
        }
        if (children !== chNum) {
            if(children < chNum) {
                let click = chNum - children;
                for(let i = 0; i < click; i++) {
                    console.log(i);
                    await this.driver.findElement(By.xpath(`//button[@aria-label="Increase number of Children"]`)).click();
                }
            } else {
                let click = children - chNum;
                for(let i = 0; i < click; i++) {
                    await this.driver.findElement(By.xpath(`//button[@aria-label="Decrease number of Children"]`)).click();
                }
            }
        }
    }
}

module.exports = StaysPage;