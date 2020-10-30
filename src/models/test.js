const webdriver = require("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");

const testUtils = {
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

module.exports = testUtils;
