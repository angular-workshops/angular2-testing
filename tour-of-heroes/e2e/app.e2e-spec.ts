import {browser} from 'protractor';
import { AppPage } from './page-objects/app-page';

describe('App', function() {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getHeadingText()).toEqual('Tour of Heroes');
  });

  it('should display the top heroes text', () => {
    page.navigateTo();
    expect(page.getTopHeroesText()).toEqual('Top Heroes');
  });
});
