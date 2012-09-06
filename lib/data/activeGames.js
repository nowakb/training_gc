var feather = require("../feather").getFeather();

var games = [
  {id: 1, name: "Chess", active: true},
  {id: 2, name: "Checkers", active: false},
  {id: 3, name: "Othello", active: true},
  {id: 4, name: "Battleship", active: true}
];

var game = {
  getActive: function(cb) {
    var result = [];
    for (var i = 0, l = games.length; i < l; i++){
      var game = games[i];
      if (game.active) {
        result.push(game);
      }
    }
    cb(null, result);
  },
  getWaiting: function(cb) {
    var result = [];
    for (var i = 0, l = games.length; i < l; i++){
      var game = games[i];
      if (!game.active) {
        result.push(game);
      }
    }
    cb(null, result);
  },
  getAll: function(cb) {
    var result = [];
    for (var i = 0, l = games.length; i < l; i++){
      var game = games[i];
      result.push(game);
    }
    cb(null, result);
  },
  create: function(game) {
    // TODO: Do Something
  },
  update: function(id, game) {
    // TODO: Do Something
  },
  delete: function(id) {
    // TODO: Do Something
  }
};

module.exports = game;