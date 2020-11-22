const {  By, Key, until, WebDriver } = require('selenium-webdriver');
const { expect } = require('chai');

class HotelDetailsPage {
    constructor(driver) {
        this.driver = driver;
    }
    
    async checkHotelNameAndRaiting() {
        const hotelName = await this.driver.findElement(By.className('hp__hotel-name')).then(function() {
            return true;
            }, function(err) {
                return false;
            });
          
        const raiting = await this.driver.findElement(By.className('hp__hotel_ratings')).then(function() {
            return true;
            }, function(err) {
                return false;
            });
        await expect(true).to.equal(hotelName);
        await expect(true).to.equal(raiting);
    }

    

}

module.exports = HotelDetailsPage;