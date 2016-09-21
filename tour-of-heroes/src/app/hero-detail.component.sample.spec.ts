import {
  async, ComponentFixture, fakeAsync, inject, TestBed, tick
} from '@angular/core/testing';

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

// import {
  
//   ActivatedRoute, ActivatedRouteStub, Router, RouterStub
// } from '../../testing';

// import { HEROES, FakeHeroService } from '../model/testing';


// import { HeroModule }          from './hero.module';
import { HeroDetailComponent } from './hero-detail.component';
// import { HeroDetailService }   from './hero-detail.service';
import { /*Hero, */HeroService }   from './hero.service';

class Hero {
  constructor(public id = 0, public name = '', public strength = 1) { }
  clone() { return new Hero(this.id, this.name, this.strength); }
}

var HEROES: Hero[] = [
  new Hero(41, 'Bob', 2),
  new Hero(42, 'Carol', 3),
  new Hero(43, 'Ted', 4),
  new Hero(44, 'Alice', 2),
  new Hero(45, 'Speedy', 2),
  new Hero(46, 'Stealthy', 4)
];

class FakeHeroService {

  heroes = HEROES.map(h => h.clone());
  lastPromise: Promise<any>;  // remember so we can spy on promise calls

  getHero(id: number | string) {
    if (typeof id === 'string') {
      id = parseInt(id as string, 10);
    }
    let hero = this.heroes.find(h => h.id === id);
    return this.lastPromise = Promise.resolve(hero);
  }

  getHeroes() {
    return this.lastPromise = Promise.resolve<Hero[]>(this.heroes);
  }

  updateHero(hero: Hero): Promise<Hero> {
    return this.lastPromise = this.getHero(hero.id).then(h => {
      return h ?
        Object.assign(h, hero) :
        Promise.reject(`Hero ${hero.id} not found`) as any as Promise<Hero>;
    });
  }
}

function newEvent(eventName: string, bubbles = false, cancelable = false) {
  let evt = document.createEvent('CustomEvent');  // MUST be 'CustomEvent'
  evt.initCustomEvent(eventName, bubbles, cancelable, null);
  return evt;
}

////// Testing Vars //////
// let activatedRoute: ActivatedRouteStub;
let comp: HeroDetailComponent;
let fixture: ComponentFixture<HeroDetailComponent>;
let page: Page;

//////////  Tests  ////////////////////

xdescribe('HeroDetailComponent', () => {
  let templateHeroService, templateActivatedRoute, templateLocation;

  beforeEach( async(() => {
    // addMatchers();
    // activatedRoute = new ActivatedRouteStub();
    templateHeroService = { getHero: () => {}, update: () => {} };
    templateActivatedRoute = {params: [{id: '3'}]};
    templateLocation = { back: () => {}};

    TestBed.configureTestingModule({
      imports: [ FormsModule ],

      // DON'T RE-DECLARE because already declared in HeroModule
      declarations: [HeroDetailComponent], // No!

      providers: [
        // { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: HeroService,    useClass: FakeHeroService },
        // { provide: Router,         useClass: RouterStub},
        { provide: ActivatedRoute, useValue: templateActivatedRoute },
        { provide: Location, useValue: templateLocation }

      ]
    })
    .compileComponents();
  }));

  describe('when navigate to hero id=' + HEROES[0].id, () => {
    let expectedHero: Hero;

    beforeEach( async(() => {
      expectedHero = HEROES[0];
      // activatedRoute.testParams = { id: expectedHero.id };
      createComponent();
    }));

    xit('should display that hero\'s name', () => {
      expect(page.nameDisplay.textContent).toBe(expectedHero.name);
    });

    xit('should navigate when click cancel', () => {
      page.cancelBtn.triggerEventHandler('click', null);
      expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
    });

    xit('should save when click save but not navigate immediately', () => {
      page.saveBtn.triggerEventHandler('click', null);
      // expect(page.saveSpy.calls.any()).toBe(true, 'HeroDetailService.save called');
      expect(page.navSpy.calls.any()).toBe(false, 'router.navigate not called');
    });

    xit('should navigate when click save and save resolves', fakeAsync(() => {
      page.saveBtn.triggerEventHandler('click', null);
      tick(); // wait for async save to "complete" before navigating
      expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
    }));

    it('should convert hero name to Title Case', fakeAsync(() => {
      const inputName = 'quick BROWN  fox';
      const titleCaseName = 'Quick Brown  Fox';

      // simulate user entering new name into the input box
      page.nameInput.value = inputName;

      // dispatch a DOM event so that Angular learns of input value change.
      page.nameInput.dispatchEvent(newEvent('input'));

      // detectChanges() makes [(ngModel)] push input value to component property
      // and Angular updates the output span through the title pipe
      fixture.detectChanges();

      expect(page.nameDisplay.textContent).toBe(titleCaseName);
    }));
  });

  xdescribe('when navigate with no hero id', () => {
    beforeEach( async( createComponent ));

    it('should have hero.id === 0', () => {
      expect(comp.hero.id).toBe(0);
    });

    it('should display empty hero name', () => {
      expect(page.nameDisplay.textContent).toBe('');
    });
  });

  

  ///////////////////////////

});

/////////// Helpers /////

/** Create the HeroDetailComponent, initialize it, set test variables  */
function createComponent() {
  fixture = TestBed.createComponent(HeroDetailComponent);
  comp    = fixture.componentInstance;
  page    = new Page();

  // 1st change detection triggers ngOnInit which gets a hero
  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    // 2nd change detection displays the async-fetched hero
    comp.hero = HEROES[0];
    fixture.detectChanges();
    page.addPageElements();
  });
}

class Page {
  gotoSpy:      jasmine.Spy;
  navSpy:       jasmine.Spy;
  saveSpy:      jasmine.Spy;

  saveBtn:      DebugElement;
  cancelBtn:    DebugElement;
  nameDisplay:  HTMLElement;
  nameInput:    HTMLInputElement;

  constructor() {
    // Use component's injector to see the services it injected.
    const compInjector = fixture.debugElement.injector;
    // const hds          = compInjector.get(HeroDetailService);
    // const router       = compInjector.get(Router);
    // this.gotoSpy       = spyOn(comp, 'gotoList').and.callThrough();
    // this.saveSpy       = spyOn(hds, 'saveHero').and.callThrough();
    // this.navSpy        = spyOn(router, 'navigate').and.callThrough();
  }

  /** Add page elements after hero arrives */
  addPageElements() {
    console.log(1)
    if (comp.hero) {
      console.log(2)
      // have a hero so these elements are now in the DOM
      const buttons    = fixture.debugElement.queryAll(By.css('button'));
      console.log(3)
      this.saveBtn     = buttons[0];
      console.log(4)
      this.cancelBtn   = buttons[1];
      console.log(5)
      this.nameDisplay = fixture.debugElement.query(By.css('h2')).nativeElement;
      console.log(6)
      this.nameInput   = fixture.debugElement.query(By.css('input')).nativeElement;
      console.log(7)
      console.log('input', this.nameInput);
    }
  }
}
