var _ = require("underscore");
var feather = require("./feather").getFeather();

var gamesChannelOptions = {
  messages: ["add", "update", "remove", "notify"],
  allowDirectMessaging: true,
  id = "games";
};

var gameChannel = feather.socket.addChannel(gamesChannelOptions);

module.exports =  gameChannel;

