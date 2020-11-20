const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const { Builder, By, Capabilities, Key } = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const { expect } = require('chai');

require("chromedriver");

const capabilities = Capabilities.chrome();
capabilities.set('chromeOptions', { "w3c": false });
const driver = new Builder().withCapabilities(capabilities).build();
const TIMEOUT = 3000
const email = 'ssttttasss@gmail.com';


Given('I am in Sign Up page', { timeout: 10000 }, async function () {
  await driver.manage().setTimeouts( { implicit: TIMEOUT, pageLoad: 
    TIMEOUT, script: TIMEOUT } )
    console.info( await driver.manage().getTimeouts() )
  await driver.get('https://www.booking.com/index.html?lang=en-us&&selected_currency=USD');
  await driver.manage().window().maximize();
  console.log('loded')
  await driver.findElement(By.id("onetrust-accept-btn-handler")).click()
  await driver.findElement(By.xpath(`//div[@class="sign_in_wrapper"]//span[contains(text(), Register)]`)).click();
});

When('I enter valid user email', async function () {
  var existed = await driver.findElement(webdriver.By.id('login_name_register')).then(function() {
    return true;//it existed
  }, function(err) {
      if (err instanceof webdriver.error.NoSuchElementError) {
          return false;//it was not found
      } else {
          webdriver.promise.rejected(err);
      }
  });
  console.log('existed', existed);
  if (existed) {
    await driver.findElement(By.id("login_name_register")).sendKeys(email)
  } else {
    await driver.findElement(By.id("username")).sendKeys(email)
  }
  
});

When('click on “GET STARTED” button', async function () {
  await driver.findElement(By.xpath(`//button[@class="bui-button bui-button--large bui-button--wide"]`)).click();

});


When('I enter valid password', async function () {
  await driver.findElement(By.id("password")).sendKeys("Sss123123123")
  await driver.findElement(By.id("confirmed_password")).sendKeys("Sss123123123")
});

When('click on “Create Account” button', async function () {
  await driver.findElement(By.xpath(`//button[@class="bui-button bui-button--large bui-button--wide"]`)).click();
});

When('main page is opened', async function () {
  await driver.findElement(By.xpath('//button[@title="Close"]')).click();

});

When('I click on “My Dashboard” button under account menu', async function () {
  await driver.findElement(By.id("profile-menu-trigger--content")).click();
  await driver.findElement(By.css(".profile-menu__link:nth-child(1)")).click()

});

Then('“My Dashboard” page is opened', async function () {
  // Write code here that turns the phrase above into concrete actions
  return true;
});

Then('correct value is prefilled in email verification placeholder  \/\/based on registered email', async function () {
  const emailInput = await driver.findElement(By.xpath('//input[@title="Your email address"]')).getAttribute("value");
  console.log('email', email);
  await expect(emailInput).to.equal(email);
});