/**
 * Selenium test suite
 */
"use strict";

const assert = require("assert");
const test = require("selenium-webdriver/testing");
const firefox = require("selenium-webdriver/firefox");
const webdriver = require("selenium-webdriver");
const By = webdriver.By;
var browser;

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
  test.beforeEach(function(done) {
    browser = new webdriver.Builder()
      .withCapabilities(webdriver.Capabilities.firefox())
      .setFirefoxOptions(new firefox.Options().headless())
      .forBrowser("firefox")
      .build();

    browser.get("https://app-trading.ollebergkvist.me");
    done();
  });

  afterEach(function(done) {
    browser.quit();
    done();
  });

  // Test functions
  async function login() {
    goToNavLink("Login");
    const email = "test@test.test";
    const password = "testtest";

    const element = await browser.findElement(By.name("email"));
    await element.sendKeys(email);

    const element2 = await browser.findElement(By.name("password"));
    await element2.sendKeys(password);

    const element3 = await browser.findElement(By.id("login"));
    await element3.click();

    browser.wait(until.elementLocated(By.id("h4-account")));
  }

  async function register() {
    let email = "test12345@gmail.com";
    let password = "testtest";
    let firstname = "test";
    let lastname = "test";

    const element = await browser.findElement(By.id("input-1"));
    await element.sendKeys(email);

    const element2 = await browser.findElement(By.id("input-2"));
    await element2.sendKeys(password, Key.RETURN);

    const element3 = await browser.findElement(By.id("input-3"));
    await element3.sendKeys(firstname);

    const element4 = await browser.findElement(By.id("input-4"));
    await element4.sendKeys(lastname);

    const element5 = browser.findElement(By.id("button"));
    await element5.click();

    browser.wait(until.elementLocated(By.id("h4-login")));
  }

  async function navigationLinks() {
    let login = await browser.findElement(By.linkText("Login"));
    let register = await browser.findElement(By.linkText("Register"));

    assert.ok(login);
    assert.ok(register);
  }

  // Test case #1
  test.it("Test index route", function(done) {
    matchUrl("/");
    assertH4("Log in");
    done();
  });

  // // Test case #2
  test.it("Test register route", function(done) {
    goToNavLink("Register");
    matchUrl("/register");
    assertH4("Register account");
    done();
  });

  // // Test case #3
  // test.it("Test navbar", function(done) {
  //   navigationLinks();
  //   done();
  // });

  // // Test case #4
  // test.it("Test to register account", function(done) {
  //   goToNavLink("Register");
  //   register();
  //   done();
  // });

  // Test case #5
  // test.it("Test sign in", function(done) {
  //   login();
  //   done();
  // });
});