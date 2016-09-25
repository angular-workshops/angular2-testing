import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router }            from '@angular/router';

import { Hero }                from '../shared/hero';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls:  ['./hero.component.css']
})
export class HeroComponent implements OnInit {
  @Input() hero: Hero;
  @Output() delete = new EventEmitter();

  constructor() { 
    console.log(4);
  }

  ngOnInit(): void { 
    console.log(4.5);
   }

  onButtonClick(): void {
    this.delete.next(this.hero);
  }

}
