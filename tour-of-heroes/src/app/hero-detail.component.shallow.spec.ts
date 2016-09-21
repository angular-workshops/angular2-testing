/* write tests for:
clicking save
clicking back
changing the name input box
the hero name & hero id correctly show up
*/
// THEN DECIDE WHAT HOMEWORK TO SHOW

import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

describe('HeroDetailComponent (shallow tests)', () => {
  let fixture, component, element, templateHeroService, templateActivatedRoute, templateLocation, mockHeroService;
  let heroes = [
    {id: 3, name: 'Magneta', strength: 4},
    {id: 4, name: 'Dynama', strength: 2}
  ];


  beforeEach(() => {
    templateHeroService = { getHero: () => {}, update: () => {} };
    templateActivatedRoute = {params: [{id: '3'}]};
    templateLocation = { back: () => {}};

    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        HeroDetailComponent
      ],
      providers: [
        { provide: HeroService, useValue: templateHeroService },
        { provide: ActivatedRoute, useValue: templateActivatedRoute },
        { provide: Location, useValue: templateLocation }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.debugElement.componentInstance;
    element = fixture.debugElement.nativeElement;
  });

  beforeEach(() => {
    let retPromise = Promise.resolve(heroes[0]);
    mockHeroService = TestBed.get(HeroService);
    spyOn(mockHeroService, 'getHero').and.returnValue(retPromise);
    spyOn(mockHeroService, 'update').and.returnValue(Promise.resolve());
  });

  it(`should have the correct hero's name & id`, fakeAsync(() => {

    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    
    expect(element.querySelector('div').textContent).toContain('id: 3');
    expect(element.querySelector('div').textContent).toContain('Magneta');
  }));
  
  it(`should call update on the hero service when save is clicked`, fakeAsync(() => {

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    fixture.debugElement.queryAll(By.css('button'))[1].triggerEventHandler('click', null);

    expect(mockHeroService.update).toHaveBeenCalledWith(heroes[0]);
  }));

  it(`should change the hero's name when the input box is set`, fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    let e = fixture.debugElement.query(By.css('input')).nativeElement;
    e.value = 'Joe';
    e.dispatchEvent(newEvent('input'))
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('h2')).nativeElement.textContent).toContain('Joe');
  }));

  

  
});

function newEvent(eventName: string, bubbles = false, cancelable = false) {
  let evt = document.createEvent('CustomEvent');  // MUST be 'CustomEvent'
  evt.initCustomEvent(eventName, bubbles, cancelable, null);
  return evt;
}

