const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const { Builder, By, Capabilities, Key } = require('selenium-webdriver');
const { expect } = require('chai');

require("chromedriver");

const capabilities = Capabilities.chrome();
capabilities.set('chromeOptions', { "w3c": false });
const driver = new Builder().withCapabilities(capabilities).build();


Given('I am in Sign Up page', async function () {
  await driver.get('https://www.booking.com/');
  await driver.findElement(By.css("button[data-modal-id='language-selection']")).click()
  await driver.findElement(By.xpath("//div[contains(English (US))]")).click();
  // await driver.get('https://account.booking.com/register');
  await driver.findElement(By.css("input[type='email']")).sendKeys('example@gmail.com');
});

When('I enter valid user email', async function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When('click on “GET STARTED” button', async function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});


When('I enter valid password', async function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When('click on “Create Account” button', async function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When('main page is opened', async function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When('I click on “My Dashboard” button under account menu', async function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('“My Dashboard” page is opened', async function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('correct value is prefilled in email verification placeholder  \/\/based on registered email', async function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});




//   const assert = require('assert');
// const { Given, When, Then } = require('@cucumber/cucumber');
// const { Builder, By, Capabilities, Key } = require('selenium-webdriver');
// const { expect } = require('chai');

// require("chromedriver");

// const capabilities = Capabilities.chrome();
// capabilities.set('chromeOptions', { "w3c": false });
// const driver = new Builder().withCapabilities(capabilities).build();

// Given('I am on the Google search page', async function () {
//     return await driver.get('http://www.google.com');
//   });


// When('I search for {string}', async function (string) {
//     const element = await driver.findElement(By.name('q'));
//     element.sendKeys(string, Key.RETURN);
//     return element.submit();
//     // // Write code here that turns the phrase above into concrete actions
//     // return 'pending';
// });


// Then('the page title should start with {string}', async function (string) {
//     const title = await driver.getTitle();
//     const isTitleStartWithCheese = title.toLowerCase().lastIndexOf(`${string}`, 0) === 0;
//     return expect(isTitleStartWithCheese).to.equal(true);
//     // // Write code here that turns the phrase above into concrete actions
//     // return 'pending';
// });