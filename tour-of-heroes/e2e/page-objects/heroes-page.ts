import {browser, element, by, ElementFinder} from 'protractor';

export class HeroesPage {

  get() {
    browser.get('heroes');
  }

  getHeadingText() {
    return element(by.css('app-heroes h2')).getText();
  }

  getActiveLink() {
    return element(by.css('nav a.active'));
  }

  getHeroesList() {
    return element.all(by.css('app-heroes li'));
  }

  getFirstHero() {
    return this.getHeroesList().first();
  }

  getLastHero() {
    return this.getHeroesList().last();
  }

  getAddHeroTextBox() {
    return element(by.css('input'));
  }

  getAddHeroButton() {
    return element(by.buttonText('Add'));
  }

  addNewHero(name: string) {
    this.getAddHeroTextBox().sendKeys('New Hero');
    this.getAddHeroButton().click();
  }

  getHeroBadgeText(hero: ElementFinder) {
    return hero.element(by.css('span.badge')).getText();
  }

  getHeroName(hero: ElementFinder) {
    return hero.element(by.css('span:not(.badge)')).getText();
  }

  getHeroDeleteButton(hero: ElementFinder) {
    return hero.element(by.css('button'));
  }

  deleteHero(hero: ElementFinder) {
    this.getHeroDeleteButton(hero).click();
  }

  getCurrentHeroText() {
    return element(by.css('app-heroes div h2')).getText();
  }

  clickViewDetails() {
    return element(by.buttonText('View Details')).click();
  }
}
