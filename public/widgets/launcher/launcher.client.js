
feather.ns("training_gc");
(function() {
  training_gc.launcher = feather.Widget.create({
    name: "training_gc.launcher",
    path: "widgets/launcher/",
    prototype: {
      onInit: function() {
        
      },
      onReady: function() {
        var me = this;
        var gameStatsRoom = me.options.gamesRoom || "lobby";
        var gameStatsChannel = feather.socket.subscribe({id: gameStatsRoom});
        var myUsername = feather.util.qs.user || "joeschmoe";
        var masterGamesFromRest = 

        $.ajax({
          url: '/_rest/gameInfo/',
          dataType: "json",
          success: function(data) {
             var gameSelect = me.get("#gamesSelect");
             for (var i = 0, len = data.length; i < len; ++i) {
                 var item = data[i];
                 gameSelect.append("<option value=\""+item.guid+"\">"+item.name+"</option>");
             }
         //   alert('Load was performed.'+data);            
            }
        });
        


        function launchGame(){
          var gameName = me.get("#gamesSelect").val();
          gameStatsChannel.send("message", {message: gameName, username: myUsername});
          appendToLog("Me: " + gameName, " launched");
          me.get("#gamesSelect").val("");
          alert('Game Has Launched.'+gameName);            

        }


        function appendToLog(message, spanClass){
          var gameLog = me.get("#gameLog");
          gameLog.append("<span class=\"" + spanClass + "\">" + message + "</span><br/>");
          gameLog.scrollTop(gameLog.height());
        }


        //when one of my buttons is clicked, send a chat message on the chat channel
        me.domEvents.bind(me.get("#launchButton"), "click", function() {
          launchGame();
        });
      }
    }
  });
})();