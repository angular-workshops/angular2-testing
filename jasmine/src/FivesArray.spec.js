describe('FivesArray', function() {

  var fives;

  beforeEach(function() {
    fives = new FivesArray();
  });

  describe("create", function() {

    xit('should be empty if 0 is passed', function() {
      var a = fives.create(0);
      expect(a.length).toBe(0);
    })
  });
});
