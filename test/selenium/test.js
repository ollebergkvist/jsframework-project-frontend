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
const screen = {
  width: 1920,
  height: 1080,
};

async function takeScreenshot(file) {
  let image = await browser.takeScreenshot();
  await fsp.writeFile(`./test/images/${file}`, image, "base64");
}

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
      .setFirefoxOptions(new firefox.Options().headless().windowSize(screen))
      .forBrowser("firefox")
      .build();

    await browser.get("https://app-trading.ollebergkvist.me");
    done();
  });

  afterEach(function(done) {
    browser.quit();
    done();
  });

  // Test functions
  async function login() {
    const email = "test@test.test";
    const password = "testtest";

    try {
      const element = await browser.findElement(By.id("input-1"));
      await element.sendKeys(email);

      const element2 = await browser.findElement(By.id("input-2"));
      await element2.sendKeys(password);

      const element3 = await browser.findElement(By.id("login"));
      await element3.click();

      browser.wait(until.elementLocated(By.id("h4-account")));
      await takeScreenshot("login.png");
    } catch (err) {
      console.log(err);
    }
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

  // async function dashboardLinks() {
  //   let account = await browser.findElement(By.linkText("Account"));
  //   let portfolio = await browser.findElement(By.linkText("Portfolio"));
  //   let stocks = await browser.findElement(By.linkText("Stocks"));
  //   let deposit = await browser.findElement(By.linkText("Deposit"));

  //   assert.ok(account);
  //   assert.ok(portfolio);
  //   assert.ok(stocks);
  //   assert.ok(deposit);
  // }

  // Test case #1

  // Test case #4
  // test.it("Test sign in", function(done) {
  //   login();
  //   done();
  // });

  test.it("Test index route", function(done) {
    matchUrl("/");
    assertH4("Log in");
    await takeScreenshot("index.png");
    done();
  });

  // // Test case #2
  // test.it("Test register route", function(done) {
  //   goToNavLink("Register");
  //   matchUrl("/register");
  //   assertH4("Register account");
  //   done();
  // });

  // Test case #3
  // test.it("Test to register account", function(done) {
  //   goToNavLink("Register");
  //   register();
  //   done();
  // });

  // Test case #5
  // test.it("Test signin and find dashboard links", function(done) {
  //   signin();
  //   dashboardLinks();
  //   done();
  // });
});
