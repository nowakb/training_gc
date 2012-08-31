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
    {name: "Magic", numberOfPlayers: 6},
    {name: "Fruit Ninja", numberOfPlayers:  4},
    {name: "Dance Party", numberOfPlayers: 8},
    {name: "Sing Snap", numberOfPlayers: 25}
    ];

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
            clientOptions: {
              container: $("<div/>").appendTo(me.get("#gameLineItems")),
              game: g,
              parent: me,
              id: "gameLine" + g.guid,
              on: {
                join: function(args) {
                    me.get("#joinedGame").html("<p>" + args + "</p>");
                }
              }
            }
          });
        }
        
        function updateGameLine(g) {
          var gameLine = me.children && me.children.findById("gameLine" + g.guid);
          if(gameLine) {
            gameLine.updateData(g);
            if (g.DeleteMe) {
              gameLine.dispose();
              var newGames = [];
              for (var j = 0; j < me.games.length; j++) {
                if (!me.games[j].DeleteMe)
                  newGames.push(me.games[i])
              }
              me.games = newGames;
            }
          } else {
            appendGameLine(g);
          } 
        }
        
        //debugger;       
        for(var i=0; i<me.games.length; i++) {
          updateGameLine(me.games[i]);
        }
        
        me.domEvents.bind(me.get("#addnewgame"), 'click', function() {
          addNewGames(me.games, 1);
          updateGameLine(me.games[me.games.length - 1]);
        });
        
        me.domEvents.bind(me.get("#updategame"), 'click', function() {
          getMockGameData(me.games, 0)
          debugger;
          for(i = 0; i < me.games.length; i++) {
            var game = me.games[i];
            updateGameLine(game);
          }
        });
        
      }
    }
  });
})();

function getMockGameData(games, addCount) {
  debugger;
  if (games == undefined)
    games = [];
  
  if (addCount == undefined)
    addCount = randomFromTo(2, 4);
  if (games.length + addCount == 11 && addCount > 0) 
    alert("you can't add any more games.");

  games = addNewGames(games, addCount);

  if (addCount == 0) {
    debugger;
    var countAdd = randomFromTo(1, 2);
    var countRemove = randomFromTo(1, 2);
    if ((countAdd + games.length - 1) > 11) 
      countAdd = 0;
     if ((games.length - countRemove + countAdd) < 1)
       countRemove = 0;

    countAdd = 0;
    //countRemove = 0;
    var i;

    // update stats on current games
    for (i = 0; i < games.length; i++) {
      var g = games[i];
      var waiting = getCurrentlyPlaying(g.numberOfPlayers + 1);
      if (waiting == g.numberOfPlayers)
        g.DeleteMe = true;
      g.currentlyWaiting = waiting;
    }

    //     // remove games
    //  for (i = 0; i < countRemove; i++) {
    //    var k = randomFromTo(0, games.length - 1);
    //    games[k].DeleteMe = true;
    // }

    // add new games
    addNewGames(games, countAdd);
  }

  return games;
}

function getCurrentlyPlaying(numberOfPlayers) {
  return randomFromTo(1, numberOfPlayers - 1);
}

function randomFromTo(from, to){
  return Math.floor(Math.random() * (to - from + 1) + from);
}

function addNewGames(games, addCount) {
  // add up new games
  for (var j = 0; j < addCount; j++) {
    do {
      var freeIndex = true;
      var k = randomFromTo(0, masterGames.length - 1); 
      var masterGame = masterGames[k];

      for (var l = 0; l < games.length; l++) {
        if (masterGame.name == games[l].name) {
          freeIndex = false;
          break;
        }
      }
    } while (!freeIndex)

    var game = masterGames[k];
    game.guid = k;
    var waiting = getCurrentlyPlaying(game.numberOfPlayers);

    game.currentlyWaiting = waiting;
    if (waiting < game.numberOfPlayers)
      games.push(game);
  }

  return games;
}
