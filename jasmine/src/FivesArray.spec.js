describe('FivesArray', function() {

  var fives;

  beforeEach(function() {
    fives = new FivesArray();
  });

  beforeEach(function () {
    jasmine.addMatchers({
      toBeEmptyArray: function toBeEmptyArrayMatcher() {
        return {
          compare: function isEmptyComparer(array) {
            return {
              pass: array.length === 0,
              message: 'Expected [' + array + '] to have no elements'
            };
          }
        };
      }
    });
  });

  describe("create", function() {

    xit('should be empty if 0 is passed [custom matcher]', function() {
      var a = fives.create(0);
      expect(a).toBeEmptyArray();
    })
  });
});
