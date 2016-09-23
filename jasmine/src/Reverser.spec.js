describe('Reverser', function() {
  var reverser;

  beforeEach(function() {
    reverser = new Reverser();
  });

  describe('reverseNumber(n)', function() {

    it('should return "0" for 0', function() {
      expect(reverser.reverseNumber(0)).toBe("0");
    });

    it('should return "333" for 333', function() {
      expect(reverser.reverseNumber(333)).toBe("333");
    });

    it('should return "123" for 321', function() {
      expect(reverser.reverseNumber(321)).toBe("123");
    });

    it('should return "12.3" for 3.21', function() {
      expect(reverser.reverseNumber(3.21)).toBe("12.3");
    });

    it('should return "5-" for -5', function() {
      expect(reverser.reverseNumber(-5)).toBe("5-");
    });
  });
});
