feather.ns("training_gc");
(function() {

  training_gc.chat = feather.Widget.create({
    name: "training_gc.chat",
    path: "widgets/chat/",
    prototype: {
      onInit: function() {
        
      },
      onReady: function() {
        var me = this;
        var myUsername = feather.util.qs.user || "joeschmoe";
        var chatChannel = feather.socket.subscribe({
          id: "lobby", 
          data: {
            username: myUsername
          }
        }); // TODO: "lobby" should be options based

        function sendText(){
          var text = me.get("#chatText").val();
          chatChannel.send("message", {message: text, username: myUsername});
          appendToLog("Me: " + text, "sent");
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
          var user = args.data.username || "???";
          var msg = user + ": " + args.data.message;
          appendToLog(msg, "received");
        });
        
        chatChannel.on("connection", function(args) {
          var user = args.data.username || "???";
          appendToLog("User Joined Chat: " + user, "alert");
        });
        
        chatChannel.on("disconnection", function(args) {
          var user = "???"; // TODO: Find out who disconnected
          appendToLog("User Left Chat: " + user, "alert"); //+ args.data.username
        });
      }
    }
  });
})();