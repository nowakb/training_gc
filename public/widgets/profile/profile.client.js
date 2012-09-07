

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

            if (data) {
              data.profile.handle = data.username;
              if (data.profile.firstName) {
                data.profile.handle = data.profile.firstName;
              }
            }
            else {
              data = {profile: {handle: "<unknown user>"}, stats: {experiencePoints:0}}
            }

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