var feather = require('../lib/feather').getFeather();

var users = {
  nowakb : {
      profile: {
        firstName: "brad",
        lastName: "nowak",
        avatarURL: ""
      },
      stats: {
        experiencePoints: 15322
      }
    },
  ryedin: {
    profile: {
      firstName: "ryan",
      lastName: "gahl",
      avatarURL: ""
    },
    stats: {
      experiencePoints: 938235
    }
  }
};

function getUserData(userkey, cb) {
  var result = null,
    err = null;

  if (typeof users === "undefined") {
    err = { message: 'No datasource found' };
  }
  else if (typeof userkey === "undefined") {
    err = { message: 'User key was not provided' };
  }
  else {
    // Try to retrieve user
    result = users[userkey];

    if (typeof result === "undefined") {
      err = { message: 'User "' + userkey + '" not found' };
    }
  }

  cb(err, result);
}



module.exports = {

  "get": {

    "/:username/": function(req, res, cb) {

      var myUser = null, 
        err1 = null,
        userName = req.params.username;

      try {

        feather.logger.debug({category: 'rest', message: 'Requesting user ' + userName});

        // TODO: Use Tim's Library
        getUserData(userName, function(err2, user){

          // Set some defaults
          if (user && !user.profile) user.profile = {};
          if (user && !user.stats) user.stats = {};

          if (!err1) cb(err2, user);        
        });

      } catch (ex) {
        err1 = 'Error in _rest/user/:username/ ==> ' + ex.toString();
        cb(err1);
      }

    }

  }
};