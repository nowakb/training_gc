
var api = {
  channels: require("./channels"),
  data: require("./data/data"),
  activeGamesChannel: require("activeGamesChannel")
};

// Stuff we need to do
api.channels.addChatChannel("lobby");

api.gamesChannel = activeGamesChannel.gamesChannel;

module.exports = api;