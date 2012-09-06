
var api = {
  channels: require("./channels"),
  data: require("./data/data"),
  //activeGamesChannel: require("./activeGamesChannel")
};

// Stuff we need to do
api.channels.addChatChannel("lobby");
//api.activeGamesChannel.createChannel();
//api.activeGamesChannel.setGamesRegistry(api.data.activeGames);

module.exports = api;