var defaultConfig = require('./protractor.conf.js').config;

var ciConfig = {
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY
};

exports.config = Object.assign(defaultConfig, ciConfig);
console.log(exports.config);
