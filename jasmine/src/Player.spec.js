describe("Player", function() {
  var player;
  var song;

  beforeEach(function() {
    player = new Player();
    song = new Song();
  });

  describe('play(song)', function() {

    it("should update currentlyPlayingSong and playing", function() {
      player.play(song);
      expect(player.currentlyPlayingSong).toEqual(song);
      expect(player.isPlaying).toBe(true);
    });

    // demonstrates custom matcher
    it('should play the song', function() {
      player.play(song);
      expect(player).toBePlaying(song);
    });
  });

  describe('makeFavorite()', function() {
    // demonstrates use of spies to intercept and test method calls
    it("should update the song that it is a favorite", function() {
      spyOn(song, 'persistFavoriteStatus');

      player.play(song);
      player.makeFavorite();

      expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
    });

    // same as above except with createSpyObj()
    it("should update the song that it is a favorite", function() {
      var song = jasmine.createSpyObj('song', ['persistFavoriteStatus']);

      player.play(song);
      player.makeFavorite();

      expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
    });
  });
});
