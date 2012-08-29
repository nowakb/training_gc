feather.ns("training_gc");
(function() {

  var chatChannel = feather.socket.subscribe({id: "lobby"}); // TODO: options based

  training_gc.chat = feather.Widget.create({
    name: "training_gc.chat",
    path: "widgets/chat/",
    prototype: {
      onInit: function() {
        
      },
      onReady: function() {
        var me = this;

        function sendText(){
          var text = me.get("#chatText").val();
          chatChannel.send("message", {message: text});
          appendToLog(text, "sent");
          me.get("#chatText").val("");
        }

        function appendToLog(message, spanClass){
          me.get("#chatLog").append("<span class=\"" + spanClass + "\">" + message + "</span><br/>");
        }

        //when one of my buttons is clicked, send a chat message on the chat channel
        me.domEvents.bind(me.get("#sendButton"), "click", function() {
          sendText();
        });

        me.domEvents.bind(me.get("#chatText"), "keypress", function(event) {
          if (event.keyCode == 13) {
            sendText();
          }
        });

        chatChannel.on("message", function(args) {
          appendToLog(args.data.message, "received");
        });
        
      }
    }
  });
})();