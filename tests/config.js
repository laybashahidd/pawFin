const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

class TestConfig {
  constructor() {
    this.baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    this.backendUrl = process.env.BACKEND_URL || 'http://localhost:4000';
    this.timeout = 10000;
  }

  async getDriver() {
    const options = new chrome.Options();
    
    // Headless mode enabled for EC2/CI deployment
    options.addArguments('--headless');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--disable-gpu');
    options.addArguments('--window-size=1920,1080');
    options.addArguments('--disable-extensions');
    options.addArguments('--disable-web-security');
    options.addArguments('--allow-insecure-localhost');

    const driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

    await driver.manage().setTimeouts({
      implicit: this.timeout,
      pageLoad: this.timeout * 3,
      script: this.timeout
    });

    return driver;
  }
}

module.exports = new TestConfig();
