import { TestBed, fakeAsync, tick, async, ComponentFixture, inject } from '@angular/core/testing';
import { HeroComponent } from '../hero.component/hero.component';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service/hero.service';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('HeroDetailComponent (shallow tests)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let component: HeroesComponent;
  let element;
  let heroes = [
    {id: 3, name: 'Magneta', strength: 4},
    {id: 4, name: 'Dynama', strength: 2}
  ];

  beforeEach(() => {

    const mockHeroService = {
      getHeros: () => Promise.resolve(heroes),
      delete: () => Promise.resolve()
    };

    const mockRouter = {};

    TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [
        HeroComponent,
        HeroesComponent
      ],
      providers: [
        { provide: HeroService, useValue: mockHeroService },
        { provide: Router, useValue: mockRouter },
      ],
      schemas: [
        // NO_ERRORS_SCHEMA will hide that angular doesn't know about ngModel
      ]
    });

    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  describe('initial display', () => {
    it('should show the hero id and name for each hero', fakeAsync(() => {
      console.log(2.5);
      expect(3).toBe(3);
    }))
  });

  it('should select the hero when the hero is clicked');

  it('should delete the hero when the delete button is clicked');

});

function createEvent(eventName: string, bubbles = false, cancelable = false) {
  let evt = document.createEvent('CustomEvent');  // MUST be 'CustomEvent'
  evt.initCustomEvent(eventName, bubbles, cancelable, null);
  return evt;
}

function getHeadingText(fixture) {
  return fixture.debugElement.query(By.css('h2')).nativeElement.textContent;
}

