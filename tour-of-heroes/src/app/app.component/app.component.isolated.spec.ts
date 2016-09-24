import { AppComponent } from './app.component';

describe('AppComponent (isolated tests)', () => {

  it('should have a title of "Tour of Heroes"', () => {
    const component = new AppComponent();
    expect(component.title).toEqual('Tour of Heroes');
  });
});
