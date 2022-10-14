const { Builder, Browser, By, Key, until, webdriver } = require("selenium-webdriver");
const assert = require("assert");

// adjust this to your browser preference
const browser = Browser.SAFARI;
// adjust this to your frontend url
const frontendUrl = "http://localhost:8080";

/*
* To run these test you might need to install custom browser drivers for selenium.
* Refer to this page: https://www.selenium.dev/documentation/webdriver/getting_started/install_drivers/
*/

describe("Basic Search Scenario", function () {
    let driver;

    beforeAll(async function () {
        driver = await new Builder().forBrowser(browser).build();
        driver.manage().window().maximize();
        await driver.manage().setTimeouts( { implicit: 10000 } );
        await driver.get(frontendUrl);
    });

    it("Title should be \"Subidentity\"", async function () {
        const title = await driver.getTitle();
        assert.equal(title, "SubIdentity");
    });

    it("Choose polkadot option", async function () {
        const selectButton = await driver.findElement(By.css("[class=\"selected fw-light text-muted\"]"));
        await driver.sleep(2000);
        await selectButton.click();
        await driver.sleep(2000);
        await driver.findElement(By.css("[class=\"items\"] [data-v-3570f331]:nth-child(1)")).click();
        await driver.sleep(2000);
        const selectedOption = await selectButton.getText();
        assert(selectedOption.includes("Polkadot"));
    }, 500000);

    it("Search for \"Roman\" and check if results load", async function () {
        await driver.findElement(By.xpath("//input")).sendKeys("Roman", Key.RETURN);
        assert(await driver.findElement(By.xpath("//input")).getAttribute("value") === "Roman");
        await driver.wait(until.elementLocated(By.css("[class=\"fade-in\"]")), 10000);
        assert(await driver.findElement(By.css("[class=\"fade-in\"]")).isDisplayed());
    }, 500000);

    it("Click the first option of the list", async function () {
        const fadein = await driver.findElement(By.css("[class=\"fade-in\"]"));
        const fadeinChildren = await fadein.findElements(By.css("*"));
        await fadeinChildren[0].click();
    }, 500000);

    it("Check that basic info box exists", async function () {
        await driver.wait(until.elementLocated(By.css("[data-v-0255e7ed]")), 10000);
        assert(await driver.findElement(By.css("[data-v-0255e7ed]")).isDisplayed());
        await driver.sleep(2000);
    }, 500000);

    it("Check that address in the body info is correct in basic info box", async function () {
        const address = await driver.findElement(By.css("[class=\"fw-light text-muted\"]")).getText();
        const testAddress = "1hCMdtRsaRA4ZTEKpPKPvEjK9rZpGhyFnRHSDhqFMCEayRL";
        assert(address.includes(testAddress));
    }, 500000);

    afterAll(async function () {
        await driver.sleep(3000);
        await driver.quit();
    });
});

