import {ensureDirSync, outputFileSync} from 'fs-extra';
import {browser} from 'protractor';

export function saveScreenshot(filename) {
  ensureDirSync('tmp/screenshots');
  return browser.takeScreenshot().then((png) => {
    filename = 'tmp/screenshots/' + filename + '-' + Date.now() + '.png';
    console.log('Saving screenshot:', filename);
    outputFileSync(filename, new Buffer(png, 'base64'));
  });
}
