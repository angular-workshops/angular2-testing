import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent (shallow tests)', () => {

  let fixture, component, element;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    element = fixture.debugElement.nativeElement;
  });

  it(`should have as title 'Tour of Heroes'`, async(() => {
    expect(component.title).toEqual('Tour of Heroes');
  }));

  it('should render title in a h1 tag', async(() => {
    fixture.detectChanges();
    expect(element.querySelector('h1').textContent).toContain('Tour of Heroes');
  }));
});
