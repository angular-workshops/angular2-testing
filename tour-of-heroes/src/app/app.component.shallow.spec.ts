import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent (shallow tests)', () => {

  let fixture;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(AppComponent);
  });

  it(`should have as title 'Tour of Heroes'`, async(() => {
    expect(fixture.componentInstance.title).toEqual('Tour of Heroes');
  }));

  it('should render title in a h1 tag', async(() => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('Tour of Heroes');
  }));
});
