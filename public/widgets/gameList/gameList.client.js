var masterGames = [ 
    {guid: 0, name: "Ninja", minNumberOfPlayers: 1, maxNumberOfPlayers: 1},
    {guid: 1, name: "Hamburger", minNumberOfPlayers: 1, maxNumberOfPlayers: 4}, 
    {guid: 2, name: "Chess", minNumberOfPlayers: 2, maxNumberOfPlayers: 2},
    {guid: 3, name: "Monster Bowling", minNumberOfPlayers: 2, maxNumberOfPlayers: 6},
    {guid: 4, name: "End Runner", minNumberOfPlayers: 3, maxNumberOfPlayers: 10},
    {guid: 5, name: "Monitor Throwing", minNumberOfPlayers: 2, maxNumberOfPlayers: 10},
    {guid: 6, name: "Grocery Bagger", minNumberOfPlayers: 2, maxNumberOfPlayers: 4},
    {guid: 7, name: "Bug Squash", minNumberOfPlayers: 1, maxNumberOfPlayers: 0},
    {guid: 8, name: "Sally Says", minNumberOfPlayers: 3, maxNumberOfPlayers: 0},
    {guid: 9, name: "Alien Masher", minNumberOfPlayers: 2, maxNumberOfPlayers: 4},
    {guid: 10, name: "Magic", minNumberOfPlayers: 6, maxNumberOfPlayers: 6},
    {guid: 11, name: "Fruit Ninja", minNumberOfPlayers:  1, maxNumberOfPlayers: 4},
    {guid: 12, name: "Dance Party", minNumberOfPlayers: 2, maxNumberOfPlayers: 10},
    {guid: 13, name: "Sing Snap", minNumberOfPlayers: 1, maxNumberOfPlayers: 0},
    {guid: 14, name: "Crates and Barrels", minNumberOfPlayers: 1, maxNumberOfPlayers: 1}
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
          debugger;
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
      var waiting = getCurrentlyPlaying(g.maxNumberOfPlayers + 1);
      if (waiting == g.numberOfPlayers)
        g.DeleteMe = true;
      g.currentlyWaiting = waiting;
    }

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
    var waiting = getCurrentlyPlaying(game.maxNumberOfPlayers);

    game.currentlyWaiting = waiting;
    if (waiting < game.maxNumberOfPlayers)
      games.push(game);
  }

  return games;
}
