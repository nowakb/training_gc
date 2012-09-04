feather.ns("training_gc");
(function() {
  training_gc.statTest = feather.Widget.create({
    name: "training_gc.statTest",
    path: "widgets/statTest/",
    prototype: {
      onInit: function() {
        
      },
      onReady: function() {
        var me = this;

        var gameChannel = feather.socket.subscribe({id: "games"});
        var myUsername = feather.util.qs.user || "honeypotter";

        me.domEvents.bind(me.get('#sendstats'), 'click', function() {
          debugger;
          var text = me.get('#statinput').val();
          var stat = JSON.parse(text);
          gameChannel.send('stats', stat);
        });
      }
    }
  });
})();