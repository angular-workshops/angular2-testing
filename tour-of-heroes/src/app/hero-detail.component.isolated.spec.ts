import { HeroDetailComponent } from './hero-detail.component';
import { tick, fakeAsync } from '@angular/core/testing';

describe('HeroDetailComponent (isolated tests)', () => {
  const mockHero = {id: 3, name: 'Magneta', strength: 4};
  let mockHeroService;
  let mockRoute;
  let component: HeroDetailComponent;

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj('heroService', ['getHero', 'update']);
    mockRoute = {params: []};
    component = new HeroDetailComponent(mockHeroService, mockRoute);
  });

  describe('ngOnInit', () => {
    it('should get the hero ', fakeAsync(() => {
      mockRoute.params.push({id: '3'});
      mockHeroService.getHero.and.returnValue(Promise.resolve(mockHero));

      component.ngOnInit();
      tick();

      expect(mockHeroService.getHero).toHaveBeenCalledWith(3);
      expect(component.hero).toEqual(mockHero);
    }));
  });

  describe('save()', () => {
    it('should update the heroService and then goBack', fakeAsync(() => {
      mockHeroService.update.and.returnValue(Promise.resolve());
      spyOn(component, 'goBack');
      component.hero = mockHero;

      component.save();
      tick();

      expect(mockHeroService.update).toHaveBeenCalledWith(mockHero);
      expect(component.goBack).toHaveBeenCalled();
    }));
  });
});
