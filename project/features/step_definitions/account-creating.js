const { Given, When, Then, AfterAll, BeforeAll, Status } = require('@cucumber/cucumber');
const {  Builder, Capabilities } = require('selenium-webdriver');
const StaysPage = require('../../helper/pageObjects/StaysPage');
const RegisterPage = require('../../helper/pageObjects/RegisterPage');
const MyDashboardPage = require('../../helper/pageObjects/MyDashboardPage');
// const Person = require('../../model/Person');
const CreatePerson = require('../../helper/global/CreatePerson'); 
const Url = require('../../helper/global/Url');
require("chromedriver");

let driver;
let staysPage;
let registerPage;
let myDashboard;
const url = new Url();
// const person = new Person();
let person;

BeforeAll(async function(){
  const capabilities = Capabilities.chrome();
  capabilities.set('chromeOptions', { "w3c": false });
  driver = new Builder().withCapabilities(capabilities).build();
  const TIMEOUT = 3000;
  await driver.manage().setTimeouts( { implicit: TIMEOUT, pageLoad: 
    10000, script: TIMEOUT } )
    console.info( await driver.manage().getTimeouts());
  person = await CreatePerson.getPatientInfo();
  staysPage = new StaysPage(driver);
  registerPage = new RegisterPage(driver);
  myDashboard = new MyDashboardPage(driver);
});

Given('I am in Sign Up page', { timeout: 30000 }, async function () {
  await driver.get(url.Home);
  await driver.manage().window().maximize();
  await staysPage.manageCookieAccept();
  await staysPage.choiseCurrency("USD");
  await staysPage.choiseLanguage();
  await staysPage.registerButtonClick();
});

When('I enter valid user email', async function () {
  await registerPage.registerTypeEmail(person.Email); 
});

When('first click on {string} button', async function (searchTerm) {
  await registerPage.registerAcceptButtonClick(searchTerm);
});


When('I enter valid password', async function () {
  await registerPage.typePassword(person.Password);
});

When('click on {string} button', async function (searchTerm) {
  await registerPage.registerAcceptButtonClick(searchTerm);
});

When('main page is opened', async function () {
  await staysPage.closeNamerefisterModal();
});

When('I click on “My Dashboard” button under account menu', async function () {
  await staysPage.clickMyDashboard();
});

Then('“My Dashboard” page is opened', { timeout: 30000 }, async function () {
  return true;
});

Then('correct value is prefilled in email verification placeholder  \/\/based on registered email', async function () {
  await myDashboard.checkEmail(person);
});

AfterAll(async function(){
  await driver.quit();
});

