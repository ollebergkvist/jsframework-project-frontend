"use strict";

const test = require("selenium-webdriver/testing");
const webdriver = require("selenium-webdriver");
const TestUtils = require("../../src/models/test");

test.describe("Route /login", function() {
  let browser;

  test.beforeEach(function(done) {
    this.timeout(10000);

    browser = TestUtils.getWebdriverWithPredefOpts();

    browser.get(TestUtils.url);

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

    browser.wait(until.elementLocated(By.id("h4-account")), 5000);

    done();
  });
});