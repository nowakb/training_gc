exports.getWidget = function(feather, cb) {
  cb(null, {
    name: "training_gc.gameList",
    path: "widgets/gameList/",
    prototype: {
      getAllGames: feather.Widget.serverMethod( function(data, _cb) {

        training.api.data.game.getAll(_cb);
      })
    }
  });
};