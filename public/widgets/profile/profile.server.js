exports.getWidget = function(feather, cb) {
  cb(null, {
    name: "training_gc.profile",
    path: "widgets/profile/",
    prototype: {

      onRender: function(render) {
        var me = this;

        render();
      }
    }
  });
};