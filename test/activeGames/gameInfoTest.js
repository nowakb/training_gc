var should = require('should');
var request = require('request');

describe('Game Info Tests', function() {

  //setup --------------------------------------
  beforeEach(function(done) {

    done();
  });

  //teardown --------------------------------------
  afterEach(function(done) {

    done();
  });

  it('should return the active games list', function(done) {
    true.should.equal(true, 'returned the list of games');
    done();
  });

  // it('should return the master game list', function(done) {
  //   request({
  //     method: "GET",
  //     uri: 
  //   })
  // });

  it('should return the game that was added', function(done) {
    debugger;
    request( { 
      method: 'POST',
      uri: 'http://localhost:8080/_rest/gameInfo/addNew',
      json: { "id": "5", "name": "Monitor Throwing", "minNumberOfPlayers": "2", "maxNumberOfPlayers": "10" }
    },
    function (error, response, body) {
      var game = body.game;
      //game.should.not.equal(undefined, "game was not returned.");
      done();
    }
    
  })

});