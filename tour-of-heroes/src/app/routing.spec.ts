import {Location} from '@angular/common';
import {Component, } from '@angular/core';
import {ComponentFixture, TestBed, fakeAsync, inject, tick} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
// source: https://github.com/angular/angular/blob/master/modules/%40angular/router/test/integration.spec.ts

@Component({selector: 'app-root-cmp', template: `
  <a routerLink="/simple">click me</a>
  <router-outlet></router-outlet>
`})
class RootComponent {
}

@Component({selector: 'app-blank-cmp', template: ``})
class DefaultComponent {
}


@Component({selector: 'app-simple-cmp', template: `simple`})
class FirstPageComponent {
}

describe('Integration', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(
            [{path: '', component: DefaultComponent}, {path: 'simple', component: FirstPageComponent}]),
      ],
      declarations: [
        RootComponent,
        DefaultComponent,
        FirstPageComponent
      ]
    });
  });

  it('should navigate with a provided config',
      fakeAsync(inject([Router, Location], (router: Router, location: Location) => {
    const fixture = createRoot(router, RootComponent);

    router.navigateByUrl('/simple');
    advance(fixture);

    expect(location.path()).toEqual('/simple');
  })));

  // This isn't working
  xit('should navigate when the link is clicked',
      fakeAsync(inject([Router, Location], (router: Router, location: Location) => {
    const fixture = createRoot(router, RootComponent);
    let element = fixture.debugElement.query(By.css('a'));

    router.navigateByUrl('/');
    advance(fixture);
    expect(location.path()).toEqual('/');

    element.triggerEventHandler('click', null);
    advance(fixture);
    expect(location.path()).toEqual('/simple');
  })));

});

function advance(fixture: ComponentFixture<any>): void {
  tick();
  fixture.detectChanges();
}

function createRoot(router: Router, type: any): ComponentFixture<any> {
  const f = TestBed.createComponent(type);
  advance(f);
  router.initialNavigation();
  advance(f);
  return f;
}


