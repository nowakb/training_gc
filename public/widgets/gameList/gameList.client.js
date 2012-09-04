

feather.ns("training_gc");
(function() {
  training_gc.gameList = feather.Widget.create({
    name: "training_gc.gameList",
    path: "widgets/gameList/",
    prototype: {
      onInit: function() {
        var me = this;
        me.games = [];
      },
      onReady: function() {
        var me = this;
        debugger;
        var gameChannel = feather.socket.subscribe({id: "games"});
        var myUsername = feather.util.qs.user || "honeypotter";

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
                  var text = '{"action": "update", "guid": "' + g.guid + '", "currentlyWaiting": "' + (g.currentlyWaiting + 1) + '"}'
                  gameChannel.send("message", {message: text, username: myUsername});;
                }
              }
            }
          });
        }
        
        function updateGameLine(g) {
          var gameLine = me.children && me.children.findById("gameLine" + g.guid);

          if(gameLine) {
              g.name = gameLine.options.game.name;
              g.minNumberOfPlayers = gameLine.options.game.minNumberOfPlayers;
              g.maxNumberOfPlayers = gameLine.options.game.maxNumberOfPlayers;
              gameLine.updateData(g);
            
          } else {
            throw "This game does not exist";
          } 
        }

        function removeGameLine(g) {
          var gameLine = me.children && me.children.findById("gameLine" + g.guid);
          if (gameLine)
            gameLine.dispose();
          else 
            throw "This game does not exist";

        }

        gameChannel.on("stats", function(args) {
          debugger;

          if (args.data.action == "new")
            appendGameLine(args.data);
          if (args.data.action == "pau")
            removeGameLine(args.data);
          if (args.data.action == "update")
            updateGameLine(args.data);
        });
      }
    }
  });
})();


