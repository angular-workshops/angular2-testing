import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Hero } from '../shared/hero';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls:  ['./hero.component.css']
})
export class HeroComponent {
  @Input() hero: Hero;
  @Output() delete = new EventEmitter();

  onDelete(): void {
    this.delete.next(this.hero);
  }
}
