var users = {
  nowakb : {
    profile: {
      firstname: "bradley",
      lastname: "nowak",
    },
    stats: {
      rank: "Private",
      lastgame: "Astroids",
      totalgamesplayed: "29"

    }
  },
  ryedin: {
    profile: {
      firstname: "ryan",
      lastname: "gahl",
    },
    stats: {
      rank: "Captain",
      lastgame: "Seaquest",
      totalgamesplayed: "1204"
    }
  }
};

function getUserData(userkey, cb) {
  var result = null,
    err = null;

  // walk the store object to find the requested data element
  try {
    if (typeof users === "undefined") throw new Error('No datasource found');

    result = users[userkey];
    if (typeof result === "undefined") throw new Error('User not found');

  } catch (ex) {
    err = "data not found";
  }


  cb(err, result);
}

exports.getWidget = function(feather, cb) {
  cb(null, {
    name: "training_gc.profile",
    path: "widgets/profile/",
    prototype: {

      onRender: function(render) {
        var me = this;

        render();
      }, 
      getUserInfo: feather.Widget.serverMethod(function(_cb) {
        var me = this;
        var err = null,
          result = null;

        try {
          // TODO: Pull username from Session
          debugger;
          var myUsername = "nowakb";
          if (me && me.request && me.request.session && me.request.session.username)
            myUsername = me.request.session.username;

          getUserData(myUsername, function(err, user) {
            if (err) throw err;
            result = user;
          });
        }
        catch (ex) {
          err="Bad thing happened: " + ex.message;         
        }

        _cb(err, result);
      })
    }
  });
};