import { HeroDetailComponent } from './hero-detail.component';
import { tick, fakeAsync } from '@angular/core/testing';

describe('HeroDetailComponent (isolated tests)', () => {
  let heroes = [
    {id: 3, name: 'UltimaMan', strength:4},
    {id: 4, name: 'Dynama', strength:2}
  ];

  beforeEach(() => {
    this.mockHeroService = { getHero: () => {}, update: () => {} };
    this.mockActivatedRoute = {params: []};
    this.mockLocation = { back: () => {} }
  });

  it('should grab the right hero on init', fakeAsync(() => {
    this.mockActivatedRoute.params.push({id: '3'});
    let retPromise = Promise.resolve(heroes[0]);
    spyOn(this.mockHeroService, 'getHero').and.returnValue(retPromise);
    const component = new HeroDetailComponent(this.mockHeroService, this.mockActivatedRoute, this.mockLocation);

    component.ngOnInit();
    tick();

    expect(component.hero).toEqual(heroes[0]);
  }));

  // this test mocks the window.history.back method. The next test assumes that it's been fixed.
  // it('should call update on the right hero when save is called', fakeAsync(() => {
  //   let retPromise = Promise.resolve();
  //   spyOn(this.mockHeroService, 'update').and.returnValue(retPromise);
  //   spyOn(window.history, 'back');
  //   const component = new HeroDetailComponent(this.mockHeroService, this.mockActivatedRoute);
  //   component.hero = heroes[1];

  //   component.save();
  //   tick();

  //   expect(this.mockHeroService.update).toHaveBeenCalledWith(heroes[1]);
  // }));

  // this test is based on having the hero-detail component fixed with regards to 
  // the use of the window global variable
  it('should call update on the right hero when save is called', fakeAsync(() => {
    let retPromise = Promise.resolve();
    spyOn(this.mockHeroService, 'update').and.returnValue(retPromise);
    spyOn(this.mockLocation, 'back');
    const component = new HeroDetailComponent(this.mockHeroService, this.mockActivatedRoute, this.mockLocation);
    component.hero = heroes[1];

    component.save();
    tick();

    expect(this.mockHeroService.update).toHaveBeenCalledWith(heroes[1]);
  }));

  

});
