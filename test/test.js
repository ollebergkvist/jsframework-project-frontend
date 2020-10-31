/**
 * Selenium test suite
 */
"use strict";

const assert = require("assert");
const test = require("selenium-webdriver/testing");
const firefox = require("selenium-webdriver/firefox");
const webdriver = require("selenium-webdriver");
const { Builder, By, until } = require("selenium-webdriver");

let browser;

// Helper functions
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

async function navigationLinks() {
  let login = await browser.findElement(By.linkText("Login"));
  let register = await browser.findElement(By.linkText("Register"));

  assert.ok(login);
  assert.ok(register);
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

  // Test case #1
  test.it("Test index route", function(done) {
    matchUrl("/");
    assertH4("Log in");
    done();
  });

  // Test case #2
  test.it("Test register route", function(done) {
    goToNavLink("Register");
    matchUrl("/register");
    assertH4("Register account");
    done();
  });

  // // Test case #4
  test.it("Test navbar", function(done) {
    navigationLinks();
    done();
  });

  // Test case #4
  test.it("Test to find logtype", function(done) {
    const logotype = browser.findElement(By.id("logotype"));
    assert(logotype);
    done();
  });

  // Test case #5
  test.it("Test to find link to my website and that it works", function(done) {
    const element = browser.findElement(By.id("logotype"));
    element.click();
    browser.wait(until.urlIs("https://www.ollebergkvist.com/"));
    done();
  });
});
