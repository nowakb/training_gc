

feather.ns("training_gc");
(function() {
  training_gc.profile = feather.Widget.create({
    name: "training_gc.profile",
    path: "widgets/profile/",
    prototype: {
      onInit: function() {
        
      },
      onReady: function() {
        var me = this;

        me.server_getUserInfo(function(args) {

          if (args.success) {

            $.tmpl(me.templates.profileinfo, args.result).appendTo(me.get('#profiledisplay'));


            me.get('#username').html(args.result.profile.firstname);
            me.get('#rank').html(args.result.stats.rank);
          } else {
            me.get('#username').html("Player");
          }
        });
      },
      addActivity: function(activity) {
        var me = this;


      }
    }
  });
})();