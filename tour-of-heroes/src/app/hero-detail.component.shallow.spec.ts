import { TestBed, fakeAsync, tick, async, ComponentFixture } from '@angular/core/testing';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { FormsModule, NgModel }   from '@angular/forms';

fdescribe('HeroDetailComponent (shallow tests)', () => {
  let fixture: ComponentFixture<HeroDetailComponent>;
  let component: HeroDetailComponent;
  let element,  mockHeroService;
  let heroes = [
    {id: 3, name: 'Magneta', strength: 4},
    {id: 4, name: 'Dynama', strength: 2}
  ];

  beforeEach(() => {
    mockHeroService = { getHero: () => {}, update: () => {} };
    spyOn(mockHeroService, 'getHero').and.returnValue(Promise.resolve(heroes[0]));
    spyOn(mockHeroService, 'update').and.returnValue(Promise.resolve());

    const mockActiveRoute = {params: [{id: '3'}]};

    TestBed.configureTestingModule({
      imports: [
        // you must import this so that [(ngModel)] is recognized.
        FormsModule
      ],
      declarations: [
        HeroDetailComponent
      ],
      providers: [
        // useValue creates a clone of our service object
        { provide: HeroService, useFactory: () => mockHeroService },
        { provide: ActivatedRoute, useFactory: () => mockActiveRoute }
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
    beforeEach(fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
    }));

    xit(`should update the hero service`, fakeAsync(() => {
      const button = getSaveButton(fixture);
      button.triggerEventHandler('click', null);
      expect(mockHeroService.update).toHaveBeenCalledWith(heroes[0]);
    }));
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
