const { Given, When, Then, AfterAll, BeforeAll, Status } = require('@cucumber/cucumber');
const {  Builder, Capabilities } = require('selenium-webdriver');
const StaysPage = require('../../helper/pageObjects/StaysPage');
const SignInPage = require('../../helper/pageObjects/SignInPage');
const CreatePerson = require('../../helper/global/CreatePerson');
const ClickButton = require('../../helper/global/clickButton');
const HotelDetailsPage = require('../../helper/pageObjects/HotelDetailsPage');
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
const url = new Url();

BeforeAll(async function(){
    const capabilities = Capabilities.chrome();
    capabilities.set('chromeOptions', { "w3c": false });
    driver = new Builder().withCapabilities(capabilities).build();
    const TIMEOUT = 3000;
    await driver.manage().setTimeouts( { implicit: TIMEOUT, pageLoad: 
      TIMEOUT, script: TIMEOUT } )
      console.info( await driver.manage().getTimeouts());
    staysPage = new StaysPage(driver);
    signInPage = new SignInPage(driver);
    clickButton = new ClickButton(driver);
    hotelDetailsPage = new HotelDetailsPage(driver);
    person = await CreatePerson.readPersonFromCsv();
    console.log('person', person);
});


Given('I have account created', { timeout: 20000 }, async function () {
    await driver.get(url.Home);
    await driver.manage().window().maximize();
    await staysPage.manageCookieAccept();
    await staysPage.choiseCurrency("USD");
    await staysPage.choiseLanguage();
    await staysPage.clickSignInButton();
    await signInPage.signIn(person);
    await staysPage.closeNamerefisterModal();

    // Write code here that turns the phrase above into concrete actions
    // return 'pending';
});


Given('I am in {string} page', async function (string) {
    return true;
});


When('I set up destination as {string}', async function (string) {
    await staysPage.inputsSearch(string);
});


When('I set dates {string} {float} {string}', async function (date1, float, date2) {
    console.log(date1, float, date2);
    await staysPage.clickDates(date1, date2);
});


When('I select {string} adults and {string} children', async function (string, string2) {
    console.log(string, string2);
    adultsNum = string;
    childNums = string2;
    await staysPage.chooseGuests(string, string2);
});


When('I click on {string} button', async function (string) {
    console.log(string);
    await clickButton.clickButtonSpan(string);
});



When('I click on {string} for fist hotel in the list', async function (string) {
    await clickButton.clickButtonSpan(string);
});



When('{string} page is opened for selected hotel \/\/ verify at least that hotel name, rating is displayed, information in available rooms section matches your previously entered information', async function (string) {
    return true;
});


When('I click on {string} button for recommended room', async function (string) {
    await clickButton.clickButtonSpan(string);
});



When('I click on “I\'ll Reserve” button', async function () {
// Write code here that turns the phrase above into concrete actions
return 'pending';
});


Then('{string} page is displayed \/\/verify that dates are correct, check if price matches the price in details page, reservation time counter is decreasing, check other information based on previous inputs \(amount of adults, etc.)', async function (string) {
// Write code here that turns the phrase above into concrete actions
return 'pending';
});



Then('I enter valid booking information', async function () {
// Write code here that turns the phrase above into concrete actions
return 'pending';
});



Then('And I click on {string} button', async function (string) {
// Write code here that turns the phrase above into concrete actions
return 'pending';
});

Then('{string} page is displayed', async function (string) {
// Write code here that turns the phrase above into concrete actions
return 'pending';
});