
const moment = require("moment");

Given(/^I search for a hotel$/, async() => {
  await browser.wait(EC.visibilityOf(homePage.destination()), 10000)
  await homePage.destination()
    .sendKeys("Espagne")
    .sendKeys(protractor.Key.ESCAPE);
  await homePage.date_from().newClick();
  const datesOut = homePage.getDate(moment().add(3, "day"));
  await datesOut.filter(
    async (date)=> (await date.getText()) == moment().add(3, "day").date()
  ).get(0).newClick();
  await element(by.css('.erase-button[data-target="checkout_date"]')).newClick();
  await homePage.date_to().newClick();
  const datesIn = homePage.getDate(moment().add(6, "day"));
  await datesIn.filter(
    async (date)=> (await date.getText()) == moment().add(6, "day").date()
  ).get(0).newClick();
  await homePage.paxSelector().newClick();
  await homePage.plusAdult().newClick();
  await homePage.btnShowResults().newClick();
  await element(by.css("#country_ESP")).newClick();
});

When(/^I open 1st option of belgium$/, async() => {
  await browser.wait(EC.presenceOf(element(by.css(".hotel-name-details-view"))), 10000)
  this.hotelName = await element.all(by.css(".hotel-name-details-view")).get(0).getText();
  await element.all(by.css(".hotel-name-details-view")).get(0).newClick();
});

Then(/^Hotel search opens$/, async() => {
  await browser.wait(EC.presenceOf(element(by.css("#block-hotel-hotel-dest-breadcrum .hotel-title"))), 5000)
  expect(await element(by.css("#block-hotel-hotel-dest-breadcrum .hotel-title")).getText())
  .to.equal(this.hotelName);
});

Given(/^I search for an escapade$/,async () => {
  await element(by.css('#content_block-menu-menu-onze-vakanties [href="/fr/promotions-pres"]')).newClick();
  await element(by.css('strong [href="https://www.tui.be/fr/escapades-nuit-gratuite"]')).newClick();
});

When(/^I select an option from belgium$/, async() => {
  await element(by.css('[href="/fr/hotels-list/78014,78016,78019,78025,78039,78148"]')).newClick();
});

Then(/^I should see search results list$/,async () => {
  expect(await element.all(by.css('.search-results-inner > div')).count()).to.be.above(2);
});

Given(/^I go to terms and conditions$/,async () => {
  await element(by.css('[href="/fr/informations-importantes-conditions"]')).newClick();
});

When(/^I open fuel conditions$/,async () => {
  await element(by.css('[href="/fr/fuel-protection-program"]')).newClick();
});

Then(/^I should see fuel conditions doc$/,async () => {
  expect(await element(by.css('.legal_titel')).getText()).to.equal('Fuel Protection Program');
});