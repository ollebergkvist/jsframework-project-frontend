const assert = require("assert");
const test = require("selenium-webdriver/testing");
const firefox = require("selenium-webdriver/firefox");
const webdriver = require("selenium-webdriver");
const By = webdriver.By;

let browser;

test.describe("Me-page", async function() {
  test.beforeEach(async function(done) {
    browser = new webdriver.Builder()
      .withCapabilities(webdriver.Capabilities.firefox())
      .setFirefoxOptions(new firefox.Options().headless())
      .forBrowser("firefox")
      .build();

    await browser.get("https://app-trading.ollebergkvist.me");
    await done();
  });

  test.afterEach(async function(done) {
    await browser.quit();
    await done();
  });

  async function goToNavLink(target) {
    await browser
      .findElement(By.linkText(target))
      .then(async function(element) {
        await element.click();
      });
  }

  async function matchUrl(target) {
    await browser.getCurrentUrl().then(async function(url) {
      await assert.ok(url.endsWith(target));
    });
  }

  async function assertH4(target) {
    await browser.findElement(By.css("h4")).then(async function(element) {
      await element.getText().then(async function(text) {
        await assert.equal(text, target);
      });
    });
  }

  test.it("Test go to Login", async (done) => {
    // try use nav link
    await goToNavLink("Login");
    await browser.sleep(1000);
    await assertH4("Log in");
    await matchUrl("/");
    var username = await browser.findElement(By.id("input-1"));
    await username.sendKeys("test@test.test");
    var password = await browser.findElement(By.id("input-2"));
    await password.sendKeys("testtest");
    var button = await browser.findElement(By.id("login"));
    await button.click();
    await browser.sleep(2000);
    browser.wait(until.elementLocated(By.id("h4-account")));
    await done();
  });

  //   test.it("Register", async (done) => {
  //     await goToNavLink("Register");
  //     await browser.sleep(1000);
  //     await assertH1("Register here");
  //     await matchUrl("register");

  //     var firstname = await browser.findElement(By.name("firstname"));
  //     await firstname.sendKeys("Yeet");
  //     string = await firstname.getAttribute("value");
  //     await assert.equal(string, "Yeet");

  //     var lastname = await browser.findElement(By.name("lastname"));
  //     await lastname.sendKeys("Yeeters");
  //     string = await lastname.getAttribute("value");
  //     await assert.equal(string, "Yeeters");

  //     var password = await browser.findElement(By.name("password"));
  //     await password.sendKeys("yeeters");
  //     string = await password.getAttribute("value");
  //     await assert.equal(string, "yeeters");

  //     var email = await browser.findElement(By.name("email"));
  //     await email.sendKeys("yeet@yeetson.se");
  //     string = await email.getAttribute("value");
  //     await assert.equal(string, "yeet@yeetson.se");

  //     var year = await browser.findElement(By.name("year"));
  //     await year.sendKeys("2002");
  //     string = await year.getAttribute("value");
  //     await assert.equal(string, "2002");

  //     var month = await browser.findElement(By.name("month"));
  //     await month.sendKeys("April");
  //     string = await month.getAttribute("value");
  //     await assert.equal(string, "April");

  //     var day = await browser.findElement(By.name("day"));
  //     await day.sendKeys("20");
  //     string = await day.getAttribute("value");
  //     await assert.equal(string, "20");

  //     await done();
  //   });
});
