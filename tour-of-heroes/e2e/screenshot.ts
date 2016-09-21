import {ensureDirSync, outputFileSync} from 'fs-extra';
import {browser} from 'protractor/globals';

export function saveScreenshot(filename) {
  ensureDirSync('tmp/screenshots');
  return browser.takeScreenshot().then((png) => {
    outputFileSync('tmp/screenshots/' + filename + '-' + Date.now() + '.png', new Buffer(png, 'base64'));
  });
}
