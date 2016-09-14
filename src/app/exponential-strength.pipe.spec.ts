import { ExponentialStrengthPipe } from './exponential-strength.pipe';

describe('Pipe: ExponentialStrength', () => {
  it('should raise the value to the power of the exponent parameter', () => {
    let pipe = new ExponentialStrengthPipe();
    expect(pipe.transform(5, '2')).toEqual(25);
  });

  it('should use "1" for the exponent if not provided', () => {
    let pipe = new ExponentialStrengthPipe();
    expect(pipe.transform(5, '')).toEqual(5);
  });
});
