var games = [ 
    {guid: 0, name: "Ninja", currentGames: 81, numberOfPlayers: 1, currentlyWaiting: 0},
    {guid: 1, name: "Hamburger", currentGames: 2, numberOfPlayers: 4, currentlyWaiting: 3},
    {guid: 2, name: "Chess", currentGames: 43, numberOfPlayers: 2, currentlyWaiting: 1}
    ];

var newGame = {guid: 3, name: "Magic", currentGames: 1, numberOfPlayers: 2, currentlyWaiting: 1};

var updateGame = {guid: 1, name: "Hamburger", currentGames: 3, numberOfPlayers: 5, currentlyWaiting: 4};

feather.ns("training_gc");
(function() {
  training_gc.gameList = feather.Widget.create({
    name: "training_gc.gameList",
    path: "widgets/gameList/",
    prototype: {
      onInit: function() {
        
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
          } else {
            appendGameLine(g);
          } 
        }
               
        for(var i=0; i<games.length; i++) {
          updateGameLine(games[i]);
        }
        
        me.domEvents.bind(me.get("#addnewgame"), 'click', function() {
          updateGameLine(newGame);
        });
        
        me.domEvents.bind(me.get("#updategame"), 'click', function() {
          updateGameLine(updateGame);
        });
        
      }
    }
  });
})();
