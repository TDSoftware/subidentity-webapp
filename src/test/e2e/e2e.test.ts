const { Builder, Browser, By, Key, until, webdriver } = require('selenium-webdriver');
const assert = require('assert');

// adjust this to your browser preference
const browser = Browser.SAFARI;
// adjust this to your frontend url
const frontendUrl = "http://localhost:8080";

/*
* To run these test you might need to install custom browser drivers for selenium.
* Refer to this page: https://www.selenium.dev/documentation/webdriver/getting_started/install_drivers/
*/

describe('Basic Search Scenario', function () {
  let driver;

  beforeAll(async function () {
    driver = await new Builder().forBrowser(browser).build();
    driver.manage().window().maximize();
    await driver.manage().setTimeouts( { implicit: 10000 } );
    await driver.get(frontendUrl);
  });

  it('Title should be "Subidentity"', async function () {
    let title = await driver.getTitle();
    assert.equal(title, 'SubIdentity');
  });

  it('Choose polkadot option', async function () {
    const selectButton = await driver.findElement(By.css('[class="selected fw-light text-muted"]'))
    await selectButton.click();
    await driver.findElement(By.css('[class="items"] [data-v-3570f331]:nth-child(1)')).click();
    let selectedOption = await selectButton.getText();
    assert(selectedOption.includes('Polkadot'));
  });

  it('Search for "Roman" and check if results load', async function () {
      await driver.findElement(By.xpath('//input')).sendKeys('Roman', Key.RETURN);
      assert(await driver.findElement(By.xpath('//input')).getAttribute('value') === 'Roman');
      await driver.wait(until.elementLocated(By.css('[class="fade-in"]')), 10000);
      assert(await driver.findElement(By.css('[class="fade-in"]')).isDisplayed());
  });

  it('Click the first option of the list', async function () {
    const fadein = await driver.findElement(By.css('[class="fade-in"]'));
    const fadeinChildren = await fadein.findElements(By.css('*'));
    await fadeinChildren[0].click();
  });

  it('Check that basic info box exists', async function () {
    await driver.wait(until.elementLocated(By.css('[data-v-0255e7ed]')), 10000);
    assert(await driver.findElement(By.css('[data-v-0255e7ed]')).isDisplayed());
    await driver.sleep(2000);
  });

  it('Check that address in the body info is correct in basic info box', async function () {
    const address = await driver.findElement(By.css('[class="fw-light text-muted"]')).getText();
    const testAddress = '1hCMdtRsaRA4ZTEKpPKPvEjK9rZpGhyFnRHSDhqFMCEayRL'
    assert(address.includes(testAddress));
  });

  afterAll(async function () {
    await driver.sleep(3000);
    await driver.quit();
  });
});

describe('Plugin Scenario', function() {
  let driver;

  beforeAll(async function () {
    driver = await new Builder().forBrowser(browser).build();
    driver.manage().window().maximize();
    const exampleIdentityAddress = '1hCMdtRsaRA4ZTEKpPKPvEjK9rZpGhyFnRHSDhqFMCEayRL';
    await driver.get(frontendUrl + "/chain/polkadot/identity/" + exampleIdentityAddress);
    await driver.sleep(2000);
  });

  it('Check that governance section exists', async function () {
    await driver.wait(until.elementLocated(By.css('[data-v-cf40a3b0]')), 10000);
    assert(await driver.findElement(By.css('[data-v-cf40a3b0]')).isDisplayed());
  });

  it('Check that treasury section exists', async function () {
    await driver.wait(until.elementLocated(By.css('[data-v-7466b007]')), 10000);
    assert(await driver.findElement(By.css('[data-v-7466b007]')).isDisplayed());
  });

  it('Check that subscan redirect works for governance', async function () {
    const exampleLink = await driver.findElement(By.xpath('//a[contains(text(),"#163")]'));
    assert(await exampleLink.isDisplayed());
    await driver.executeScript("arguments[0].click();", exampleLink);
    await driver.getAllWindowHandles().then(async function (handles) {
      let newTabHandle;
      for (let i = 0; i < handles.length; i++) {
        await driver.switchTo().window(handles[i]);
        if (await driver.getTitle() !== 'SubIdentity') {
          newTabHandle = handles[i];
        }
      }
      await driver.switchTo().window(newTabHandle).then(async function () {
        await driver.sleep(2000);
        driver.getCurrentUrl().then(async function (url) {
          assert.equal(url, 'https://polkadot.subscan.io/council/163');
          await driver.sleep(3000);
        });
      });
    });
  });

  afterAll(async function () {
    await driver.sleep(2000);
    await driver.quit();
  });
});