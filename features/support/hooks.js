var { After, Before, Status } = require("cucumber");

Before({ timeout: 30000 }, async () => {
  const { setDefaultTimeout } = require("cucumber");
  setDefaultTimeout(60 * 1000);
  browser.ignoreSynchronization = true;

});

Before({ tags: "@test1" }, async () => {
  await browser.get("https://www.tui.be");
  await browser
    .wait(EC.visibilityOf(element(by.css(".agree-button"))), 10000)
    .then(
      async () => {
        await element(by.css(".agree-button")).click();
      },
      () => console.log('agree not clicked')
    );
  await homePage.dropdownLanguage().click();
  await homePage.frenchOption().newClick();
});

After(async function(testCase) {
  if (testCase.result.status === Status.FAILED) {
    var stream = await browser.takeScreenshot();
    await this.attach(stream, "image/png");
  }
});
