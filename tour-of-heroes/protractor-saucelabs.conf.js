var testName = 'Tour of Heroes Smoke Tests'
var SpecReporter = require('jasmine-spec-reporter');

exports.config = {
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,

  capabilities: {
    'browserName': 'internet explorer',
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    'build': process.env.TRAVIS_BUILD_NUMBER,
    'name': testName,
    'version': '11',
    'selenium-version': '2.53.1',
    'platform': 'Windows 7'
  },

  allScriptsTimeout: 30000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  useAllAngular2AppRoots: true,
  beforeLaunch: function() {
    require('ts-node').register({
      project: 'e2e'
    });
  },
  onPrepare: function() {
    jasmine.getEnv().addReporter(new SpecReporter());
  }
};
