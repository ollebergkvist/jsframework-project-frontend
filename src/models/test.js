const webdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

const testConfig = {
  url: "https://app-trading.ollebergkvist.me/",
  getWebdriverWithPredefOpts: function() {
    return new webdriver.Builder()
      .forBrowser("chrome")
      .setChromeOptions(
        new chrome.Options().headless().addArguments("--no-sandbox")
      )
      .build();
  },
};

module.exports = testConfig;
