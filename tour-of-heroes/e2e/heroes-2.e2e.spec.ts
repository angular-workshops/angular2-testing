import {browser, element, by} from 'protractor/globals';
// import {saveScreenshot} from './screenshot';
import {HeroesPage} from './page-objects/heroes-page';

describe('Heroes page (using Page Object)', () => {
  const heroesPage = new HeroesPage();

  beforeEach(() => {
    heroesPage.get();
  });

  it('should display the page title', () => {
    expect(heroesPage.getHeadingText()).toEqual('My Heroes');
    // saveScreenshot('hero-screenshot');
  });

  it('should show the Heroes nav link as active', () => {
    const activeLink = heroesPage.getActiveLink();
    expect(activeLink.getText()).toEqual('Heroes');
    expect(activeLink.getAttribute('href')).toMatch(/\/heroes$/);
  });

  it('should display a list of heroes', () => {
    expect(heroesPage.getHeroesList().count()).toEqual(10);

    const firstHero = heroesPage.getFirstHero();
    expect(firstHero.element(by.css('span.badge')).getText()).toEqual('11');
    expect(firstHero.element(by.css('span:not(.badge)')).getText()).toEqual('Mr. Nice');
  });

  it('should add a new hero when I enter a name and click the "add" button', () => {
    heroesPage.addNewHero('New Hero');
    const lastHero = heroesPage.getLastHero();

    expect(heroesPage.getHeroesList().count()).toEqual(11);
    expect(heroesPage.getHeroBadgeText(lastHero)).toEqual('21');
    expect(heroesPage.getHeroName(lastHero)).toEqual('New Hero');
  });

  it('should remove a hero from the list when I click its delete button', () => {
    const heroesList = element.all(by.css('app-heroes li'));

    heroesPage.deleteHero(heroesPage.getFirstHero());
    const firstHero = heroesList.first();

    expect(heroesPage.getHeroesList().count()).toEqual(9);
    expect(heroesPage.getHeroBadgeText(firstHero)).toEqual('12');
    expect(heroesPage.getHeroName(firstHero)).toEqual('Narco');
  });

  it('should show an "is my hero" message and a details button when I click on a hero', () => {
    heroesPage.getFirstHero().click();

    expect(heroesPage.getCurrentHeroText()).toEqual('MR. NICE is my hero');
  });

  it('should navigate to a hero detail page when I click on a hero and then click the "details" button', () => {
    heroesPage.getFirstHero().click();
    heroesPage.clickViewDetails();

    expect(browser.getCurrentUrl()).toMatch(/\/detail\/11$/);
  });
});
