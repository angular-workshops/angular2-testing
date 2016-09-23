describe('toBeSquareRootOf', function() {

  beforeEach(function() {
    jasmine.addMatchers({
      toBeSquareRootOf: function toBeSquareRootOfMatcher() {
        return {
          compare: function toBeSquareRootComparer(actual, expected) {
            return {
              pass: actual * actual === expected
            }
          }
        }
      }
    });
  });

  it('should match that 3 is the square root of 9', function() {
    expect(3).toBeSquareRootOf(9);
  });
});
