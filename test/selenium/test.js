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

  // Test case
  test.it("Test index route", function(done) {
    matchUrl("/");
    assertH1("JSRAMVERK APP");
    done();
  });

  test.it("Test reports route", function(done) {
    goToNavLink("Reports");
    matchUrl("/reports");
    assertH1("REPORTS");
    done();
  });

  test.it("Test login route", function(done) {
    goToNavLink("Login");
    matchUrl("/login");
    assertH4("Log in");
    done();
  });
});
