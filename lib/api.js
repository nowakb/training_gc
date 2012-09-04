
var api = {
  channels: require("./channels")
};

// Stuff we need to do
api.channels.addChatChannel("lobby");
api.channels.addStatsChannel("games");

module.exports = api;