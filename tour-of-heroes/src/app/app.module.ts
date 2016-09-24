import './rxjs-extensions';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
import { InMemoryDataService }  from './shared/in-memory-data.service';

import { AppComponent }         from './app.component/app.component';
import { DashboardComponent }   from './dashboard.component/dashboard.component';
import { HeroesComponent }      from './heroes.component/heroes.component';
import { HeroDetailComponent }  from './hero-detail.component/hero-detail.component';
import { HeroService }          from './hero.service/hero.service';
import { HeroSearchComponent }  from './hero-search.component/hero-search.component';
import { routing }              from './app.routing';
import { ExponentialStrengthPipe } from './exponential-strength.pipe/exponential-strength.pipe';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    routing
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroDetailComponent,
    HeroesComponent,
    HeroSearchComponent,
    ExponentialStrengthPipe
  ],
  providers: [
    HeroService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
