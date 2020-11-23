const {  By, Key, until, WebDriver } = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');

class RegisterPage {
    constructor(driver) {
        this.driver = driver;
    }
    
    async registerAcceptButtonClick(buttonText) {
        const exist = await this.driver.findElement(By.xpath(`//span[contains(text(), ${buttonText})]`)).then(function() {
            return true;
          }, function(err) {
            return false;
        });
        if (exist) {
            await this.driver.findElement(By.xpath(`//span[contains(text(), ${buttonText})]`)).click()
        } else {
            await this.driver.findElement(By.className("bui-button bui-button--large bui-button--wide")).click();
        }
    }

    async registerTypeEmail(email) {
        var exist = await this.driver.findElement(By.id('login_name_register')).then(function() {
            return true;
          }, function(err) {
              return false;
          });
        if (exist) {
            await this.driver.findElement(By.id("login_name_register")).sendKeys(email)
        } else {
            await this.driver.findElement(By.id("username")).sendKeys(email)
        }
    }

    async typePassword(password) {
        await this.driver.findElement(By.id("password")).sendKeys(password)
        await this.driver.findElement(By.id("confirmed_password")).sendKeys(password)
    }

}

module.exports = RegisterPage;