import { Ng2TestingWorkshopPage } from './app.po';

describe('ng2-testing-workshop App', function() {
  let page: Ng2TestingWorkshopPage;

  beforeEach(() => {
    page = new Ng2TestingWorkshopPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
