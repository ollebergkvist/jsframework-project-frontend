const webdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/firefox");

const testConfig = {
  url: "https://app-trading.ollebergkvist.me/",
  getWebdriverWithPredefOpts: function() {
    return new webdriver.Builder()
      .forBrowser("firefox")
      .setFirefoxOptions(
        new firefox.Options().headless().addArguments("--no-sandbox")
      )
      .build();
  },
};

module.exports = testConfig;
