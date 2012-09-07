

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

        $.ajax({
          url: "/_rest/me/",
          success: function(data) {
            $.tmpl(me.templates.userinfo, data).appendTo(me.get('#userdisplay'));
          },
          fail: function(error) {
            alert(error);
          }

        });
      }
      
    }
  });
})();