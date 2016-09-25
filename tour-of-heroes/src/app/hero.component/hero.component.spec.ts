import { Component } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HeroComponent } from './hero.component';
import { Hero } from '../shared/hero';

@Component({ selector: 'app-test', template: `<app-hero [hero]="hero" (delete)="onDelete($event)"></app-hero>`})
class TestContainerComponent {
  hero: Hero;
  onDeleteClick = jasmine.createSpy('onDelete');
}

describe('HeroComponent', () => {
  let fixture: ComponentFixture<TestContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestContainerComponent, HeroComponent]
    });
    fixture = TestBed.createComponent(TestContainerComponent);
  }));

  it('should display the hero passed in as the hero input', () => {
    fixture.componentInstance.hero = { id: 121, name: 'Mr Hero', strength: 4 };
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('121');
    expect(fixture.nativeElement.textContent).toContain('Mr Hero');
  });

  it('should trigger the delete output when the X button is clicked', () => {
    fixture.componentInstance.hero = { id: 121, name: 'Mr Hero', strength: 4 };
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', { stopPropagation: jasmine.createSpy('stopPropagation') });
    fixture.detectChanges();

    const deleteClickSpy = fixture.componentInstance.onDeleteClick;
    expect(deleteClickSpy).toHaveBeenCalled();

    const clickEvent = deleteClickSpy.mostRecentCall.args[0];
    expect(clickEvent.stopPropagation).toHaveBeenCalled();
  });
});
