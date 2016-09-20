import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
// ANGULARCONNECT: REMOVE THIS FOR THE STARTING POINT
import { Location } from '@angular/common';

import { Hero }        from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.heroService.getHero(id)
        .then(hero => this.hero = hero);
    });
  }

  save(): void {
    this.heroService.update(this.hero)
      .then(() => this.goBack); // ANGULARCONNECT: the lambda in here is to fix a context issue
  }

  goBack(): void {
    // ANGULARCONNECT: REMOVE THIS FOR THE STARTING POINT, COMMENT IN THE OTHER LINE
    this.location.back();
    // window.history.back();
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
