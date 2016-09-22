// this code will also be written during the demonstration
describe('Player', function() {
  var player;
  var song;

  beforeEach(function() {
    player = new Player();
    song = new Song();
  });

  //demonstrates use of custom matcher
  it('should be able to play a Song', function() {
    player.play(song);
    expect(player.currentlyPlayingSong).toEqual(song);

    expect(player).toBePlaying(song);
  });

  // demonstrates use of spies to intercept and test method calls
  it('tells the current song if the user has made it a favorite', function() {
    spyOn(song, 'persistFavoriteStatus');

    player.play(song);
    player.makeFavorite();

    expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
  });

  // same as above except with createSpyObj()
  it('tells the current song if the user has made it a favorite', function() {
    var song = jasmine.createSpyObj('song', ['persistFavoriteStatus']);

    player.play(song);
    player.makeFavorite();

    expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
  });

});
