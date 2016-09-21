
// this will be written up as demonstration. This is the finished code
describe("join", function() {
  var fives;

  beforeEach(function() {
    fives = new FivesArray();
  });

  beforeEach(function () {
    jasmine.addMatchers({
      toBeEmptyArray: function () {
        return {
          compare: function (actual, expected) {
            var array = actual;

            return {
              pass: array.length === 0,
              message: 'Expected [' + array + '] to have no elements'

            };
          }
        };
      }
    });
  });

  xit('should be empty if 0 is passed', function() {
    var a = fives.create(0);
    expect(a.length).toBe(0);
  })

  // with a custom matcher
  xit('should be empty if 0 is passed [custom matcher]', function() {
    var a = fives.create(0);
    expect(a).toBeEmptyArray();
  })

});





