import {browser, element, by} from 'protractor';
// import {saveScreenshot} from './screenshot';

describe('Heroes page', () => {
  beforeEach(() => {
    browser.get('heroes');
  });

  it('should display the page title', () => {
    expect(element(by.css('app-heroes h2')).getText()).toEqual('My Heroes');
    // saveScreenshot('hero-screenshot');
  });

  it('should show the Heroes nav link as active', () => {
    const activeLink = element(by.css('nav a.active'));
    expect(activeLink.getText()).toEqual('Heroes');
    expect(activeLink.getAttribute('href')).toMatch(/\/heroes$/);
  });

  it('should display a list of heroes', () => {
    const heroesList = element.all(by.css('app-heroes li'));
    expect(heroesList.count()).toEqual(10);

    const firstHero = heroesList.first();
    expect(firstHero.element(by.css('span.badge')).getText()).toEqual('11');
    expect(firstHero.element(by.css('span:not(.badge)')).getText()).toEqual('Mr. Nice');
  });

  it('should add a new hero if I enter a name and click the "add" button', () => {
    const addHeroTextBox = element(by.css('input'));
    const addHeroButton = element(by.buttonText('Add'));
    const heroesList = element.all(by.css('app-heroes li'));

    addHeroTextBox.sendKeys('New Hero');
    addHeroButton.click();

    expect(heroesList.count()).toEqual(11);
    const lastHero = heroesList.last();
    expect(lastHero.element(by.css('span.badge')).getText()).toEqual('21');
    expect(lastHero.element(by.css('span:not(.badge)')).getText()).toEqual('New Hero');
  });

  it('should remove a hero from the list when I click its delete button', () => {
    const heroesList = element.all(by.css('app-heroes li'));
    const firstHeroDeleteButton = heroesList.first().element(by.css('button'));

    firstHeroDeleteButton.click();

    expect(heroesList.count()).toEqual(9);
    const firstHero = heroesList.first();
    expect(firstHero.element(by.css('span.badge')).getText()).toEqual('12');
    expect(firstHero.element(by.css('span:not(.badge)')).getText()).toEqual('Narco');
  });

  it('should show an "is my hero" message and a details button when I click on a hero', () => {
    const firstHero = element.all(by.css('app-heroes li')).first();
    const myHeroMessage = element(by.css('app-heroes div h2'));

    firstHero.click();

    expect(myHeroMessage.getText()).toEqual('MR. NICE is my hero');
  });

  it('should navigate to a hero detail page when I click on a hero and then click the "details" button', () => {
    const firstHero = element.all(by.css('app-heroes li')).first();
    const detailsButton = element(by.buttonText('View Details'));

    firstHero.click();
    detailsButton.click();

    expect(browser.getCurrentUrl()).toMatch(/\/detail\/11$/);
  });

});
