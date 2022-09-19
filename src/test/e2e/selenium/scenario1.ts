const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

(async function example() {
let driver = await new Builder().forBrowser(Browser.SAFARI).build();
driver.manage().window().maximize();
  try {
    await driver.get('http://localhost:8080');

    // check that version is displayed
    await driver.wait(until.elementLocated(By.css('[data-v-297babff]')), 10000);
    
    // delay 2 sec
    await driver.sleep(2000);

    // click data-v-3570f331
    await driver.findElement(By.css('[data-v-3570f331]')).click();

    // delay 2 sec
    await driver.sleep(2000);

    // select polkadot
    await driver.findElement(By.css('[class="items"] [data-v-3570f331]:nth-child(1)')).click();
    
    // delay 5 seconds
    await driver.sleep(2000);

    // enter text in the input field
    await driver.findElement(By.xpath('//input')).sendKeys('Roman', Key.RETURN);

    // delay 5 seconds
    await driver.sleep(2000);

    // check that data-v-4b668a19 exists
    await driver.wait(until.elementLocated(By.css('[data-v-4b668a19]')), 10000);

    await driver.sleep(2000);

    // click the first child of const a
    await driver.findElement(By.css('[data-v-4b668a19]:nth-child(1)')).click();

    // delay 5 seconds
    await driver.sleep(2000);

    console.log("All test have successfully passed");

  } finally {
    await driver.quit();
  }
})();