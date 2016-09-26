var defaultConfig = require('./protractor.conf.js').config;

var testName = 'Tour of Heroes Smoke Tests'

var ciConfig = {
  // Note that seleniumAddress must be unset in order for SauceLabs to work.
  seleniumAddress: false,
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,

  directConnect: false,
  multiCapabilities: [{
    'browserName': 'chrome',
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    'build': process.env.TRAVIS_BUILD_NUMBER,
    'name': testName,
    'version': '51',
    'selenium-version': '2.53.1',
    'chromedriver-version': '2.22',
    'platform': 'OS X 10.9'
  }, {
    'browserName': 'firefox',
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    'build': process.env.TRAVIS_BUILD_NUMBER,
    'name': testName,
    'version': '44',
    'selenium-version': '2.53.1'
  }, {
    'browserName': 'safari',
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    'build': process.env.TRAVIS_BUILD_NUMBER,
    'name': testName,
    'version': '9',
    'selenium-version': '2.44.0' // Use an old version because Safari has
                                 // issues loading pages after 2.44.
  }, {
    'browserName': 'internet explorer',
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    'build': process.env.TRAVIS_BUILD_NUMBER,
    'name': testName,
    'version': '11',
    'selenium-version': '2.53.1',
    'platform': 'Windows 7'
  }]
};

exports.config = Object.assign(defaultConfig, ciConfig);
console.log(exports.config);
