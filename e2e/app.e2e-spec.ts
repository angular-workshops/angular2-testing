import { Mission2MarsPage } from './app.po';

describe('mission-2-mars App', function() {
  let page: Mission2MarsPage;

  beforeEach(() => {
    page = new Mission2MarsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
