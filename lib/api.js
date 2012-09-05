
var api = {
  channels: require("./channels"),
  data: require("./data/data")
};

// Stuff we need to do
api.channels.addChatChannel("lobby");

module.exports = api;