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

function goToNavLink(target) {
  browser.findElement(By.linkText(target)).then(function(element) {
    element.click();
  });
}

function matchUrl(target) {
  browser.getCurrentUrl().then(function(url) {
    assert.ok(url.endsWith(target));
  });
}

function assertH1(target) {
  browser.findElement(By.css("h1")).then(function(element) {
    element.getText().then(function(text) {
      assert.equal(text, target);
    });
  });
}

function assertH4(target) {
  browser.findElement(By.css("h4")).then(function(element) {
    element.getText().then(function(text) {
      assert.equal(text, target);
    });
  });
}

// Test suite
test.describe("Test suite me-vue-app", function() {
  this.timeout(0);

  test.beforeEach(function(done) {
    browser = new webdriver.Builder()
      .withCapabilities(webdriver.Capabilities.firefox())
      .setFirefoxOptions(new firefox.Options().headless())
      .forBrowser("firefox")
      .build();

    browser.get("http://localhost:8082/");
    done();
  });

  afterEach(function(done) {
    browser.quit();
    done();
  });

  // Test functions
  function signin() {
    let email = "test@test.test";

    let password = "test";

    browser.findElement(By.name("email")).then(function(element) {
      element.sendKeys(email);
    });

    browser.findElement(By.name("password")).then(function(element) {
      element.sendKeys(password);
    });

    browser.findElement(By.css("button")).then(function(element) {
      element.click();
    });
  }

  // Test case
  test.it("Test index route", function(done) {
    matchUrl("/");
    assertH4("Log in");
    done();
  });

  // Test case
  test.it("Test signin", function(done) {
    signin();
    matchUrl("/");
    assertH4("Account");
    done();
  });

  // Test case
  test.it("Test sign in and sign out", function(done) {
    signin();

    browser.findElement(By.linkText("Logout")).then(function(element) {
      element.click();
    });
    assertH1("Log in");
    done();
  });
});
