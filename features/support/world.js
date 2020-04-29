const { setWorldConstructor } = require("cucumber");
// const seleniumWebdriver = require("selenium-webdriver");

function CustomWorld({ attach, parameters }) {
  this.attach = attach;
  this.parameters = parameters;

  var { setDefaultTimeout } = require("cucumber");
  setDefaultTimeout(60 * 1000);

}

setWorldConstructor(CustomWorld);
