

/* ========== profile.client.js ========== */

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

          me.get('#username').html("brad");

        //  me.options.userName = "brad";
        //  $.tmpl(me.templates.onlineStatus, me).appendTo(me.get('#statusline'));


        //make sure the form is datalinked
        //  me.datalink();
      }
    }
  });
})();