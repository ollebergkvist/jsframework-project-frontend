/**
 * Selenium test suite
 */
"use strict";

const assert = require("assert");
const test = require("selenium-webdriver/testing");
const firefox = require("selenium-webdriver/firefox");
const webdriver = require("selenium-webdriver");
const By = webdriver.By;

let browser;

async function goToNavLink(target) {
  await browser.findElement(By.linkText(target)).then(function(element) {
    element.click();
  });
}

async function matchUrl(target) {
  await browser.getCurrentUrl().then(function(url) {
    assert.ok(url.endsWith(target));
  });
}

async function assertH4(target) {
  await browser.findElement(By.css("h4")).then(function(element) {
    element.getText().then(function(text) {
      assert.equal(text, target);
    });
  });
}

// Test suite
test.describe("Test suite me-vue-app", function() {
  this.timeout(0);

  test.beforeEach(async function(done) {
    browser = new webdriver.Builder()
      .withCapabilities(webdriver.Capabilities.firefox())
      .setFirefoxOptions(new firefox.Options().headless())
      .forBrowser("firefox")
      .build();

    await browser.get("http://localhost:8082/");
    done();
  });

  afterEach(function(done) {
    browser.quit();
    done();
  });

  // Test functions
  async function signin() {
    let email = "test@test.test";
    let password = "testtest";

    goToNavLink("Login");

    const element = await browser.findElement(By.id("input-1"));
    await element.sendKeys(email);

    const element2 = await browser.findElement(By.id("input-2"));
    await element2.sendKeys(password);

    const element3 = await browser.findElement(By.id("login"));
    await element3.click();

    browser.wait(until.elementLocated(By.id("h4-account")));
  }

  async function register() {
    let email = "test1234@test.test";
    let password = "testtest";
    let firstname = "test";
    let lastname = "test";

    goToNavLink("Register");

    const element = await browser.findElement(By.id("input-1"));
    await element.sendKeys(email);

    const element2 = await browser.findElement(By.id("input-2"));
    await element2.sendKeys(password);

    const element3 = await browser.findElement(By.id("input-3"));
    await element3.sendKeys(firstname);

    const element4 = await browser.findElement(By.id("input-4"));
    await element4.sendKeys(lastname);

    const element5 = await browser.findElement(By.id("button"));
    await element5.click();

    browser.wait(until.elementLocated(By.id("h4-login")));
  }

  // Test case
  test.it("Test index route", function(done) {
    matchUrl("/");
    assertH4("Log in");
    done();
  });

  // Test case
  test.it("Test register route", function(done) {
    goToNavLink("Register");
    matchUrl("/register");
    assertH4("Register account");
    done();
  });

  // Test case
  test.it("Test to register account", function(done) {
    register();
    done();
  });

  // Test case
  test.it("Test sign in", function(done) {
    signin();
    done();
  });

  // Test case
  test.it("Test sign in and navigate to Deposit", function(done) {
    signin();
    goToNavLink("Deposit");
    matchUrl("/deposit");
    done();
  });
});
