// this will be written up as demonstration. This is the finished code
describe('join', function() {
  var joiner;

  beforeEach(function() {
    joiner = new Joiner();
  });

  it('should join an array with a separator', function() {
    var joined = joiner.join([1,2], '-');
    expect(joined).toEqual('1-2');
  });

  it('should return an empty string when joining an empty array', function() {
    var joined = joiner.join([], ',');
    expect(joined).toEqual('');
  });

  it('should default to a comma string separator', function() {
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
