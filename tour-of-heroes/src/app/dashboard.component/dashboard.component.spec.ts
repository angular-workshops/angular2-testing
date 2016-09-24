import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HeroService } from '../hero.service/hero.service';
import { ExponentialStrengthPipe } from '../exponential-strength.pipe/exponential-strength.pipe';

let mockHeroService = { getHeroes: () => {} };
let mockRouter = jasmine.createSpyObj('router', ['navigate']);

describe('dashboard.component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        DashboardComponent,
        ExponentialStrengthPipe
      ],
      providers: [
        {provide: Router, useValue: mockRouter},
        {provide: HeroService, useValue: mockHeroService}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  it('should create the dashboard', async(() => {
    let fixture = TestBed.createComponent(DashboardComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  // this test will point out the bug with the slice command in the dashboard.component.spec.ts file
  it(`should have the heroes its given`, fakeAsync(() => {
    let p = new Promise((resolve, reject) => {
      resolve([ 1, 2, 3, 4]);
    });
    spyOn(mockHeroService, 'getHeroes').and.returnValue(p);
    let fixture = TestBed.createComponent(DashboardComponent);
    let app = fixture.debugElement.componentInstance;

    app.ngOnInit();
    tick();

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
