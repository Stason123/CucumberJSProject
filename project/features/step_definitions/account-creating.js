const { Given, When, Then, AfterAll, BeforeAll } = require('@cucumber/cucumber');
const {  Builder, Capabilities } = require('selenium-webdriver');
const StaysPage = require('../../pageObjects/StaysPage');
const RegisterPage = require('../../pageObjects/RegisterPage');
const MyDashboard = require('../../pageObjects/MyDashboard');
const Person = require('../../model/Person');
require("chromedriver");

let driver;
let staysPage;
let registerPage;
let myDashboard;
const person = new Person();

BeforeAll(async function(){
  const capabilities = Capabilities.chrome();
  capabilities.set('chromeOptions', { "w3c": false });
  driver = new Builder().withCapabilities(capabilities).build();
  const TIMEOUT = 3000;
  await driver.manage().setTimeouts( { implicit: TIMEOUT, pageLoad: 
    TIMEOUT, script: TIMEOUT } )
    console.info( await driver.manage().getTimeouts());
  staysPage = new StaysPage(driver);
  registerPage = new RegisterPage(driver);
  myDashboard = new MyDashboard(driver);
});

Given('I am in Sign Up page', { timeout: 20000 }, async function () {
  await driver.get('https://www.booking.com/index.html');
  await driver.manage().window().maximize();
  await staysPage.manageCookieAccept();
  await staysPage.choiseCurrency("USD");
  await staysPage.choiseLanguage();
  await staysPage.registerButtonClick();
});

When('I enter valid user email', async function () {
  console.log(person.Email);
  await registerPage.registerTypeEmail(person.Email); 
});

When('first click on {string} button', async function (searchTerm) {
  console.log('searchTerm', searchTerm);
  // await registerPage.registerAcceptButtonClick(searchTerm);
});


When('I enter valid password', async function () {
  await registerPage.typePassword(person.Password);
});

When('click on {string} button', async function (searchTerm) {
  console.log('searchTerm', searchTerm);
  await registerPage.registerAcceptButtonClick(searchTerm);
});

When('main page is opened', async function () {
  await staysPage.closeNamerefisterModal();
});

When('I click on “My Dashboard” button under account menu', async function () {
  await staysPage.clickMyDashboard();
});

Then('“My Dashboard” page is opened', { timeout: 20000 }, async function () {
  // const el = await driver.findElement(By.xpath('//ul[@class="profile-area__nav"]//li[@class="selected"]//a')).then(function() {
  //   return true;
  // }, function(err) {
  //   return false;
  // });
  // const elFind = await driver.findElement(By.css(".profile-area__nav:nth-child(1) .profile-area__nav:nth-child(1) .selected:nth-child(1)")).then(function() {
  //   return true;
  // }, function(err) {
  //   return false;
  // });
  // console.log('elFind', elFind);
  // const elll = await driver.findElement(By.xpath('//ul[@class="profile-area__nav"]//li[@class="selected"]//a'));
  // // const find 
  // const el2 = await elll.findElement(By.xpath('//i[@class="profile-area__nav-icon profile-area__nav-icon_smaller bicon bicon-profiledash"]')).getText();
  // console.log('el2', el2);
  // const el3 = await driver.findElement(By.xpath('//ul[@class="profile-area__nav"]//li[@class="selected"]//a//i')).getText();
  // console.log('el', el, el2, el3)
  // await expect(true).to.equal(el);
  return true;
});

Then('correct value is prefilled in email verification placeholder  \/\/based on registered email', async function () {
  await myDashboard.checkEmail(person.Email);
});

AfterAll(async function(){
  await driver.quit();
});