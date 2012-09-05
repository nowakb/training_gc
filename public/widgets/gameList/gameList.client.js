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

        function refreshGameList(){
          var options = {};
  
          me.server_getAllGames([options], function(args){
            
            var gameList = [];
            var chatLog = me.get("#gameList");

            if (args.success) {
              gameList = args.result;
            } else {
              alert(args.err);
            }

            chatLog.empty();

            for (var i = 0, l = gameList.length; i < l; i++){
              var game = gameList[i];
              var gameItemClass = ( game.active ) ? "gameItemActive" : "gameItemInactive";
              chatLog.append("<span class=\"" + gameItemClass + "\">" + game.name + "</span><br/>");
            }

            chatLog.scrollTop(chatLog.height());
          });
        }

        me.domEvents.bind(me.get("#refreshButton"), "click", function() {
          refreshGameList();
        });        
      }
    }
  });
})();