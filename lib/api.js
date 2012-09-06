
var api = {
  channels: require("./channels"),
  data: require("./data/data")
};

// Stuff we need to do
api.channels.addChatChannel("lobby");
api.channels.addGamesChannel();

api.channels.statsChannel = statsChannel;

module.exports = api;