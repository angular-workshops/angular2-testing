describe("Player", function() {
  var player;
  var song;

  beforeEach(function() {
    player = new Player();
    song = new Song();
  });

  describe('play(song)', function() {

    it("should update currentlyPlayingSong and playing", function() {
    });

    // demonstrates custom matcher
    it('should play the song', function() {
    });
  });

  describe('makeFavorite()', function() {
    // demonstrates use of spies to intercept and test method calls
    it("should update the song that it is a favorite", function() {
    });

    // same as above except with createSpyObj()
    it("should update the song that it is a favorite", function() {
    });
  });
});
