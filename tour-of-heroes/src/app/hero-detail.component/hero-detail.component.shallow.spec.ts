import { TestBed, fakeAsync, tick, async, ComponentFixture, inject } from '@angular/core/testing';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from '../hero.service/hero.service';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { FormsModule, NgModel }   from '@angular/forms';
import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';

describe('HeroDetailComponent (shallow tests)', () => {
  let fixture: ComponentFixture<HeroDetailComponent>;
  let component: HeroDetailComponent;
  let element;
  let heroes = [
    {id: 3, name: 'Magneta', strength: 4},
    {id: 4, name: 'Dynama', strength: 2}
  ];

  beforeEach(() => {

    const mockHeroService = {
      getHero: () => Promise.resolve(heroes[0]),
      update: () => Promise.resolve()
    };
    const mockActivatedRoute = {
      params: [ { id: '3' } ]
    };

    TestBed.configureTestingModule({
      imports: [
        // you must import this so that [(ngModel)] is recognized.
        FormsModule
      ],
      declarations: [
        HeroDetailComponent
      ],
      providers: [
        // useValue may create a clone of the objects passed
        { provide: HeroService, useValue: mockHeroService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Location, useFactory: () => new SpyLocation() }
      ],
      schemas: [
        // NO_ERRORS_SCHEMA will hide that angular doesn't know about ngModel
      ]
    });

    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  describe('initial display', () => {

    it('should show the correct hero name & id (using async and detectChanges)', async(() => {

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(element.querySelector('div').textContent).toContain('id: 3');
        expect(element.querySelector('div').textContent).toContain('Magneta');
      });
    }));

    it('should show the correct hero name & id (using async and autoDetectChanges)', async(() => {

      fixture.autoDetectChanges();
      fixture.whenStable().then(() => {
        expect(element.querySelector('div').textContent).toContain('id: 3');
        expect(element.querySelector('div').textContent).toContain('Magneta');
      });
    }));

    it('should show the correct hero name & id (using fakeAsync and tick)', fakeAsync(() => {

      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(element.querySelector('div').textContent).toContain('id: 3');
      expect(element.querySelector('div').textContent).toContain('Magneta');
    }));
  });

  describe('name input changing', () => {
    beforeEach(fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
    }));

    it(`should change the hero's name (via nativeElement API)`, fakeAsync(() => {
      const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;

      inputElement.value = 'Mr. Nice';
      inputElement.dispatchEvent(createEvent('input')); // this must be called so that detectChanges will know that something has changed
      fixture.detectChanges();

      expect(getHeadingText(fixture)).toContain('Mr. Nice');
    }));

    it(`should change the hero's name (via debugElement API)`, () => {
      const ngModel = fixture.debugElement.query(By.directive(NgModel));

      ngModel.triggerEventHandler('ngModelChange', 'Mr. Nice');
      fixture.detectChanges();

      expect(getHeadingText(fixture)).toContain('Mr. Nice');
    });
  });

  describe('clicking save', () => {
    let saveButton;
    beforeEach(fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      saveButton = getSaveButton(fixture);
    }));

    it(`should update the hero service`, inject([HeroService], (heroService) => {
      spyOn(heroService, 'update').and.callThrough();
      saveButton.triggerEventHandler('click', null);
      expect(heroService.update).toHaveBeenCalledWith(heroes[0]);
    }));

    it(`should navigate back`, fakeAsync(inject([Location], (location: Location) => {
      spyOn(location, 'back');
      saveButton.triggerEventHandler('click', null);
      // we need this `tick` because the location.back is called in a then handler for the promise returned by heroService.update()
      tick();
      expect(location.back).toHaveBeenCalled();
    })));
  });
});

function createEvent(eventName: string, bubbles = false, cancelable = false) {
  let evt = document.createEvent('CustomEvent');  // MUST be 'CustomEvent'
  evt.initCustomEvent(eventName, bubbles, cancelable, null);
  return evt;
}

function getHeadingText(fixture) {
  return fixture.debugElement.query(By.css('h2')).nativeElement.textContent;
}

function getSaveButton(fixture) {
  return fixture.debugElement.queryAll(By.css('button'))[1];
}
