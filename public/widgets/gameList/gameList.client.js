var games = [ 
    {name: "Ninja", currentGames: 81, numberOfPlayers: 1, currentlyWaiting: 0},
    {name: "Hamburger", currentGames: 2, numberOfPlayers: 4, currentlyWaiting: 3},
    {name: "Chess", currentGames: 43, numberOfPlayers: 2, currentlyWaiting: 1}
    ];

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
        me.domEvents.bind(me.get("input"), 'click', function() {
          var el = this;
          var idx = el.id.substring(el.id.indexOf("_") + 1);
          var gameName = games[idx].name;

          alert("you want to join " + gameName);
          
        });
      }
    }
  });
})();