const { Given, When, Then, AfterAll, BeforeAll, Status } = require('@cucumber/cucumber');
const {  Builder, Capabilities, By } = require('selenium-webdriver');
const StaysPage = require('../../helper/pageObjects/StaysPage');
const SignInPage = require('../../helper/pageObjects/SignInPage');
const CreatePerson = require('../../helper/global/CreatePerson');
const ClickButton = require('../../helper/global/clickButton');
const HotelDetailsPage = require('../../helper/pageObjects/HotelDetailsPage');
const CheckOutPage = require('../../helper/pageObjects/CheckoutPage');
const Url = require('../../helper/global/Url');

require("chromedriver");
let driver;
let staysPage;
let signInPage;
let person;
let clickButton;
let hotelDetailsPage;
let adultsNum;
let childNums;
let dateFrom;
let dateTo;
let price;
let gueasts;
let checkOutPage;
const url = new Url();
let originalWindow;

BeforeAll(async function(){
    const capabilities = Capabilities.chrome();
    capabilities.set('chromeOptions', { "w3c": false });
    driver = new Builder().withCapabilities(capabilities).build();
    const TIMEOUT = 10000;
    await driver.manage().setTimeouts( { implicit: TIMEOUT, pageLoad: 
      10000, script: TIMEOUT } )
      console.info( await driver.manage().getTimeouts());
    staysPage = new StaysPage(driver);
    signInPage = new SignInPage(driver);
    clickButton = new ClickButton(driver);
    checkOutPage = new CheckOutPage(driver);
    hotelDetailsPage = new HotelDetailsPage(driver);
    person = await CreatePerson.readPersonFromCsv();
});

Given('I have account created', { timeout: 30000 }, async function () {
    await driver.get(url.Home);
    originalWindow = await driver.getWindowHandle();
    await driver.manage().window().maximize();
    await staysPage.manageCookieAccept();
    await staysPage.choiseCurrency("USD");
    await staysPage.choiseLanguage();
    await staysPage.clickSignInButton();
    await signInPage.signIn(person);
    await staysPage.closeNamerefisterModal();
});

Given('I am in {string} page', async function (string) {
    return true;
});

When('I set up destination as {string}', async function (string) {
    await staysPage.inputsSearch(string);
});

When('I set dates {string} {float} {string}', async function (date1, float, date2) {
    dateFrom = date1;
    dateTo = date2;
    await staysPage.clickDates(date1, date2);
});

When('I select {string} adults and {string} children', async function (string, string2) {
    adultsNum = string;
    childNums = string2;
    await staysPage.chooseGuests(string, string2);
});

When('I click on {string} button',{ timeout: 30000 }, async function (string) {
    await clickButton.clickButtonClassName(staysPage.searchButton.class);
});

When('I click on {string} for fist hotel in the list', async function (string) {
    await clickButton.clickButtonSpan(string);
});

When('{string} page is opened for selected hotel \/\/ verify at least that hotel name, rating is displayed, information in available rooms section matches your previously entered information',  { timeout: 20000 }, async function (string) {
    const windows = await driver.getAllWindowHandles();
    await windows.forEach(async handle => {
    if (handle !== originalWindow) {
        await driver.switchTo().window(handle);
    }
    });
    await hotelDetailsPage.checkHotelNameAndRaiting();
    await hotelDetailsPage.checkDateAndGuests(dateFrom, dateTo, adultsNum, childNums);
});


When('I click on {string} button for recommended room', { timeout: 20000 }, async function (string) {
    await clickButton.clickButtonSpan(string);
    price = await hotelDetailsPage.getPrice();
    gueasts = await hotelDetailsPage.getGueastData();
});

When('I click on “I\'ll Reserve” button', { timeout: 50000 }, async function () {
    await hotelDetailsPage.QuantitySelectAndReserve();
});

Then('{string} page is displayed verify that dates are correct, check if price matches the price in details page, reservation time counter is decreasing, check other information based on previous inputs amount of adults, etc.', async function (string) {
    await checkOutPage.checkPriceAndGuests(price, gueasts);
});

Then('I enter valid booking information', async function () {
    await checkOutPage.typeLastName(person.LastName);
});

Then('And I click on {string} button', async function (string) {
    await clickButton.clickButtonSpan(string);
});

Then('{string} page is displayed', async function (string) {
    return true;
});

AfterAll(async function(){
    await driver.quit();
});
  