import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { ExponentialStrengthPipe } from './exponential-strength.pipe';

@Component({
  template: '<span>strength: {{5 | exponentialStrength:2 }}</span>'
})
class ContainerComponent {
}

describe('exponential-strength.pipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ExponentialStrengthPipe,
        ContainerComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  it('should show the strength', () => {
    let fixture = TestBed.createComponent(ContainerComponent);
    let element = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(element.textContent).toContain('25');
  });

});
