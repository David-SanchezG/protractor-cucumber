const { program } = require("commander");

program.option("-t, --tags <tags>", "@firstTag and @secondTag");
program.parse(process.argv);

exports.config = {
  framework: "custom",
  frameworkPath: require.resolve("protractor-cucumber-framework"),

  //  change to false and change seleniumAddress when running on grid
  directConnect: false,
  seleniumAddress: "http://localhost:4444/wd/hub",

  specs: [
    "./features/**/*.feature" // accepts a glob
  ],

  // baseUrl: string;
  allScriptsTimeout: 60000,

  restartBrowserBetweenTests: false,
  ignoreUncaughtExceptions: true,
  logLevel: "INFO", //'ERROR'|'WARN'|'INFO'|'DEBUG';
  SELENIUM_PROMISE_MANAGER: false,

  capabilities: {
    browserName: "chrome",
    // name: 'Unnamed Job',
    // logName: 'Chrome - English',
    // count: 1,
    shardTestFiles: false,
    chromeOptions: {
      prefs: { "profile.default_content_setting_values.notifications": 2 }
    },
    maxInstances: 3
    // specs: ['spec/chromeOnlySpec.js'],
    // exclude: ['spec/doNotRunInChromeSpec.js'],
    // seleniumAddress: 'http://localhost:4444/wd/hub'
  },

  cucumberOpts: {
    format: "json:reports/report.json",
    require: ["./features/**/*.js"],
    tags: program.tags != undefined ? program.tags : ""
  },
  beforeLaunch: () => console.log("Start at: ",new Date()),
  onPrepare: () => {
    const { Given, When, Then } = require("cucumber");
    global.Given = Given;
    global.When = When;
    global.Then = Then;
    global.expect = require("chai").expect;
    global.homePage = require("./logic/pages/homePage").homePage;
    global.EC = protractor.ExpectedConditions;

    browser.driver
      .manage()
      .window()
      .maximize();

    let { ElementFinder } = require("protractor");
    ElementFinder.prototype.newClick = async function() {
      await browser.wait(EC.visibilityOf(this), 6000).then(undefined, ()=> {throw new Error()});
      let location = await this.getLocation();
      const newLocationY =
        location.y > 600 ? location.y - 100 : location.y + 200;
      await browser.executeScript(
        "window.scrollTo(" + location.x + ", " + newLocationY + ")"
      );
      location = await this.getLocation();
      let notMoving = 0;
      await browser.wait(async () => {
        const nextLocation = await this.getLocation();
        if (nextLocation.y == location.y && notMoving == 3) return true;
        else if (nextLocation.y == location.y && notMoving < 3) {
          notMoving++;
        } else {
          location = nextLocation;
          notMoving = 0;
        }
        await browser.sleep(400);
        return false;
      }, 5000).then(undefined, ()=> {throw new Error()});
      await this.click();
      return new ElementFinder(this.browser_, this.parentElementArrayFinder);
    };
  },
    // onComplete: () => 
  afterLaunch: (exitCode) => console.log("Finish at: ",new Date())
};
