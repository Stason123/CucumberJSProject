const {  By, Key, until, WebDriver } = require('selenium-webdriver');
const { expect } = require('chai');
const Months = require('../enums/Months');
const ClickButton = require('../global/clickButton');

class HotelDetailsPage {
    constructor(driver) {
        this.driver = driver;
    }
    
    async checkHotelNameAndRaiting() {
        const hotelName = await this.driver.findElement(By.id("hp_hotel_name")).then(function() {
            return true;
            }, function(err) {
                return false;
            });

        const raiting = await this.driver.findElement(By.className("bui-rating bui-rating--smaller")).then(function() {
            return true;
            }, function(err) {
                return false;
            });

        console.log('raiting',  raiting);
        console.log('hotelName',  hotelName);

        await expect(true).to.equal(raiting);
        await expect(true).to.equal(hotelName);
    }

    async checkDateAndGuests(dateFrom, dateTo, adults, kids) {
        const regAdult = /[0-9]+ adults/;
        const regDelAdult = / adults/;
        const regChild = /[0-9]+ child/;
        const regDelChild = / child/;
        const dateReplace = /^[a-zA-Z]+, /;
        const regTakeNum = /[0-9]+/g;
        const checkInDate = await this.driver.findElement(By.id("av-summary-checkin")).getText();
        const checkOutDate = await this.driver.findElement(By.id("av-summary-checkout")).getText();
        const gueasts = await this.getGueastData();
        let adultReg = regAdult.exec(gueasts);
        let childReg = regChild.exec(gueasts);
        adultReg = adultReg[0].toString().replace(regDelAdult, '');
        childReg = childReg[0].toString().replace(regDelChild, '');
        let checkInDateReplace = checkInDate.replace(dateReplace, '');
        let checkOutDateReplace = checkOutDate.replace(dateReplace, '');
        const dateCheckInBuild = dateFrom.match(regTakeNum);
        const dateCheckOutBuild = dateTo.match(regTakeNum);
        const months = new Months();
        let stringCheckIn = `${months.Months[parseInt(dateCheckInBuild[1], 10)]} ${dateCheckInBuild[2]}, ${dateCheckInBuild[0]}`;
        let stringCheckOut = `${months.Months[parseInt(dateCheckOutBuild[1], 10)]} ${dateCheckOutBuild[2]}, ${dateCheckOutBuild[0]}`;
        await expect(adults).to.equal(adultReg.toString());
        await expect(kids).to.equal(childReg.toString());
        await expect(checkInDateReplace).to.equal(stringCheckIn);
        await expect(checkOutDateReplace).to.equal(stringCheckOut);
    }

    async QuantitySelectAndReserve() {
        const wait = async (ms) => {
            return new Promise((res, rej) => { setTimeout(() => { res() }, ms) });
        }
        await this.driver.findElement(By.css('.hprt-nos-select>option[value=\'1\']')).click();
        await wait(2000);
        await this.driver.findElement(By.xpath(`//div[@data-component="hotel/new-rooms-table/reservation-cta"]//button`)).click();
    }

    async getGueastData() {
        return await this.driver.findElement(By.id("av-summary-occupancy")).getText();
    }

    async getPrice() {
        const price = await this.driver.findElement(By.className("prco-valign-middle-helper")).getText();
        console.log('price', price);
        return price;
    }


}

module.exports = HotelDetailsPage;