var _ = require("underscore");
var feather = require("./feather").getFeather();

var channels = {};
var chatoptions = {
  messages: ["message"],
  allowDirectMessaging: true,
  hooks: {
    subscribe: function(args, cb){
      feather.logger.info("SUBSCRIBE: " + args.data.username);
      cb(null, args.data);
    },
    connect: function(args, cb){
      feather.logger.info("CONNECT: " + args.data.username);
      cb(null, args.data);
    },
    disconnect: function(args, cb){
      feather.logger.info("DISCONNECT");
      cb();
    },
    message: function(args, cb){
      feather.logger.info("MESSAGE from '" + args.data.username + "': " + args.data.message);
      cb(null, args.data);
    }
  }
}

channels.addChatChannel = function(id){
  var options = _.extend(_.clone(chatoptions), {id: id});
  return feather.socket.addChannel(options);
};

module.exports = channels;