const {  By, Key, until, WebDriver } = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');

class SignInPage {
    constructor(driver) {
        this.driver = driver;
    }
    
    async signIn(person) {
        console.log('signIn', person);
        await this.driver.findElement(By.id("username")).sendKeys(person.Email)
        await this.driver.findElement(By.className("bui-button bui-button--large bui-button--wide")).click();
        await this.driver.findElement(By.id("password")).sendKeys(person.Password);
        await this.driver.findElement(By.className("bui-button bui-button--large bui-button--wide")).click();       
    }
}

module.exports = SignInPage;