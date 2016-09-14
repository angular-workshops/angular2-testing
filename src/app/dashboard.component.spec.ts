/* tslint:disable:no-unused-variable */

import { TestBed, async, fakeAsync, flushMicrotasks, tick } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { Router } from '@angular/router';
import { RouterTestingModule, SpyNgModuleFactoryLoader } from '@angular/router/testing';
import { HeroService } from './hero.service';

let mockHeroService = { getHeroes: () => {} };
let mockRouter = jasmine.createSpyObj('router', ['navigate']);

describe('App: Ng2TestingWorkshop', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        DashboardComponent,
      ],
      providers: [
        {provide: Router, useValue: mockRouter},
        {provide: HeroService, useValue: mockHeroService}
      ],
    });
  });

  it('should create the dashboard', async(() => {
    let fixture = TestBed.createComponent(DashboardComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have the heroes its given`, fakeAsync(() => {
    let p = new Promise((resolve, reject) => {
      resolve([ 1, 2, 3, 4]);
    });
    spyOn(mockHeroService, 'getHeroes').and.returnValue(p);
    let fixture = TestBed.createComponent(DashboardComponent);
    let app = fixture.debugElement.componentInstance;

    app.ngOnInit();
    flushMicrotasks();

    expect(app.heroes.length).toEqual(4);
  }));

  it(`gotoDetail should call navigate with the right link`, async(() => {
    let hero = { id: 22 };

    let fixture = TestBed.createComponent(DashboardComponent);
    let app = fixture.debugElement.componentInstance;
    app.gotoDetail(hero);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/detail', 22]);
  }));
});
