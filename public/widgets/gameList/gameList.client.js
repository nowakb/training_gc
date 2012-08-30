var masterGames = [ 
    {name: "Ninja", numberOfPlayers: 1},
    {name: "Hamburger", numberOfPlayers: 4}, 
    {name: "Chess", numberOfPlayers: 2},
    {name: "Monster Bowling", numberOfPlayers: 4},
    {name: "End Runner", numberOfPlayers: 8},
    {name: "Monitor Throwing", numberOfPlayers: 10},
    {name: "Grocery Bagger", numberOfPlayers: 3},
    {name: "Bug Squash", numberOfPlayers: 5},
    {name: "Sally Says", numberOfPlayers: 10},
    {name: "Alien Masher", numberOfPlayers: 2},
    {name: "Magic", numberOfPlayers: 6}
    ];

    // {guid: 0, name: "Ninja", currentGames: 81, numberOfPlayers: 1, currentlyWaiting: 0},
    // {guid: 1, name: "Hamburger", currentGames: 2, numberOfPlayers: 4, currentlyWaiting: 3},
    // {guid: 2, name: "Chess", currentGames: 43, numberOfPlayers: 2, currentlyWaiting: 1}
    



feather.ns("training_gc");
(function() {
  training_gc.gameList = feather.Widget.create({
    name: "training_gc.gameList",
    path: "widgets/gameList/",
    prototype: {
      onInit: function() {
        var me = this;
        me.games = getMockGameData(me.games);
      },
      onReady: function() {
        var me = this;
        
        function appendGameLine(g) {
          feather.Widget.load({
            path: 'widgets/gameLine/',
            serverOptions: {
              game: g
            },
            clientOptions: {
              container: $("<div/>").appendTo(me.get("#gameLineItems")),
              game: g,
              on: {
                join: function(args) {
                    me.get("#joinedGame").html("<p>" + args + "</p>");
                }
              }
            }
          });
        }
        
        for(var i=0; i<games.length; i++) {
          appendGameLine(games[i]);
        }
        
        me.domEvents.bind(me.get("#updateStats"), 'click', function() {
          
          appendGameLine(newGame);
          
        });
        
      }
    }
  });
})();

function getMockGameData(games) {
  debugger;
  if (games == undefined)
    games = [];
  
  var newAddCount = randomFromTo(2, 8);

  // add up new games
  for (var j = 0; j < newAddCount; j++) {
    
    var freeIndex = false;
    do {
      var k = randomFromTo(0, masterGames.length - 1); 
      var masterGame = masterGames[k];
      freeIndex = (games.length == 0);

      for (var l = 0; l < games.length; l++) {
        if (masterGame.name != games[l].name) {
          freeIndex = true;
          break;
        }
      }
    } while (!freeIndex)

    var game = masterGames[k];
    game.currentGames = getCurrentGamesCount(0);
    game.currentlyWaiting = getCurrentlyPlaying(game.numberOfPlayers);
    games.push(game);
  }

  return games;
}

function getCurrentlyPlaying(numberOfPlayers) {
  return randomFromTo(1, numberOfPlayers - 1);
}

function getCurrentGamesCount(starting) {
  var add = randomFromTo(0, 20);
  var remove = randomFromTo(0, 10);
  return starting + add - remove;
}

function randomFromTo(from, to){
  return Math.floor(Math.random() * (to - from + 1) + from);
}
