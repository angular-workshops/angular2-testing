import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';
// you must import this so that [(ngModel)] is recognized. 
// otherwise the NO_ERRORS_SCHEMA will hide that angular doesn't
// know about ngModel
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
      ]
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

    let el = fixture.debugElement.query(By.css('input')).nativeElement;
    el.value = 'Mr. Nice';
    el.dispatchEvent(newEvent('input')); // this must be called so that detectChanges will know that something has changed
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('h2')).nativeElement.textContent).toContain('Mr. Nice');
  }));
  
});

function newEvent(eventName: string, bubbles = false, cancelable = false) {
  let evt = document.createEvent('CustomEvent');  // MUST be 'CustomEvent'
  evt.initCustomEvent(eventName, bubbles, cancelable, null);
  return evt;
}

