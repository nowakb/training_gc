var games = [ 
    {name: "Ninja", currentGames: 81, numberOfPlayers: 1, currentlyWaiting: 0},
    {name: "Hamburger", currentGames: 2, numberOfPlayers: 4, currentlyWaiting: 3},
    {name: "Chess", currentGames: 43, numberOfPlayers: 2, currentlyWaiting: 1}
    ];

var newGame = {name: "Magic", currentGames: 1, numberOfPlayers: 2, currentlyWaiting: 1};

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
        
        me.domEvents.bind(me.get("#updateStats"), 'click', function() {
          
          var gameLine;
          feather.Widget.load({
            path: 'widgets/gameLine/',
            serverOptions: {
              gamename: "Magic",
              gameindex: "5",
              currentlyWaiting: "1",
              numberOfPlayers: "2",
              currentGames: "3",
            },
            
            clientOptions: {
              container: $("<div/>").appendTo(me.get("#gameLineItems")),
              
              gamename: "Magic",
              gameindex: "5",
              currentlyWaiting: "1",
              numberOfPlayers: "2",
              currentGames: "3",

              onceState: {
                ready: function() {
                  gameLine = this;
                  
                  gameLine.on("join", function(args) {
                    me.get("#joinedGame").html("<p>" + args + "</p>");
                  });
                  
                }
              }
            }
          });
          
        });
        
      }
    }
  });
})();
