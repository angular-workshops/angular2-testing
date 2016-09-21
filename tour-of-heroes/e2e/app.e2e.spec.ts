import {browser} from 'protractor/globals';
import { TourOfHeroesPage } from './app.po';

describe('Tour Of Heroes App', function() {
  let page: TourOfHeroesPage;

  beforeEach(() => {
    page = new TourOfHeroesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getHeadingText()).toEqual('Tour of Heroes');
  });

  it('should display the top heroes text', () => {
    page.navigateTo();
    browser.debugger();
    expect(page.getTopHeroesText()).toEqual('Top Heroes');
  });
});
