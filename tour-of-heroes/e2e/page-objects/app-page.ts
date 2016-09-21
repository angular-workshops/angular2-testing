import { browser, element, by } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getHeadingText() {
    return element(by.css('app-root h1')).getText();
  }

  getTopHeroesText() {
    return element(by.css('app-dashboard h3')).getText();
  }
}
