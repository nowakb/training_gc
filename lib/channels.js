var _ = require("underscore");
var feather = require("./feather").getFeather();

var channels = {};
var chatoptions = {
  messages: ["message","alert"]
};

channels.addChatChannel = function(id){
  var options = _.extend(_.clone(chatoptions), {id: id});
  return feather.socket.addChannel(options);
};

module.exports = channels;