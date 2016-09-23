describe('Joiner', function() {
  var joiner;

  beforeEach(function() {
    joiner = new Joiner();
  });

  describe('join(array, separator)', function() {

    it('should return a string with each array item joined by the separator', function() {
      var joined = joiner.join([1, 2, 3], '-');
      expect(joined).toEqual('1-2-3');
    });

    it('should return an empty string if array is empty', function() {
      var joined = joiner.join([], ',');
      expect(joined).toEqual('');
    });

    it('should join with a comma if no separator is provided', function() {
      var joined = joiner.join([3,4]);
      expect(joined).toEqual('3,4');
    });

    it('should work with an empty string separator', function() {
      var joined = joiner.join([3,4], '');
      expect(joined).toEqual('34');
    });

    it('should error when not passed an array', function() {
      expect(function() {
        joiner.join({}, ',')
      }).toThrow();
    });
  });
});
