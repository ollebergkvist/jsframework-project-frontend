"use strict";

const assert = require("assert");
const test = require("selenium-webdriver/testing");
const firefox = require("selenium-webdriver/firefox");
const webdriver = require("selenium-webdriver");
const { Builder, By, until } = require("selenium-webdriver");
let browser;

const testUtils = {
  url: "https://app-trading.ollebergkvist.me/",
  getWebdriverWithPredefOpts: function() {
    return new webdriver.Builder();
  },
};

test.describe("Route /login", function() {
  test.beforeEach(function(done) {
    this.timeout(10000);
    browser = new webdriver.Builder()
      .forBrowser("firefox")
      .setFirefoxOptions(
        new firefox.Options().headless().addArguments("--no-sandbox")
      )
      .build();

    browser.get("https://trading-app.ollebergkvist.me");
    done();
  });

  test.afterEach(function(done) {
    browser.quit();

    done();
  });

  test.it("Trying to log in", function(done) {
    let emailElInp = browser.findElement(webdriver.By.id("input-1"));
    emailElInp.sendKeys("test@test.com");

    let passwdElInp = browser.findElement(webdriver.By.id("input-2"));
    passwdElInp.sendKeys("testtest");

    let formEl = browser.findElement(webdriver.By.id("login"));
    formEl.submit();

    browser.wait(until.elementLocated(By.id("h4-account")));

    done();
  });
});
