import { TestBed, inject, fakeAsync, tick, ComponentFixture } from '@angular/core/testing';
import { LocationStrategy, Location } from '@angular/common';
import { MockLocationStrategy, SpyLocation } from '@angular/common/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppModule } from './app.module';
import { AppComponent } from './app.component/app.component';

describe('app (deep integration tests)', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LocationStrategy, useClass: MockLocationStrategy },
        { provide: Location, useClass: SpyLocation}
      ],
      imports: [
        AppModule,
        RouterTestingModule
      ]
    });
    fixture = TestBed.createComponent(AppComponent);
  });

  describe('dashboard', () => {
    it('should let us edit a hero', fakeAsync(inject([Router, Location], (router: Router, location: SpyLocation) => {
      tick();
      fixture.detectChanges();
      console.log(router.url);
      tick();
      fixture.detectChanges();
      console.log(router.url);
      expect(location.path()).toEqual('/dashboard');
    })));
  });
});
