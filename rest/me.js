var feather = require('../lib/feather').getFeather();

module.exports = {

  "get": {

    "/": function(req, res, cb) {

      var userObject = req.session.user,
        err = null;

      feather.logger.warn({category: 'rest', message: 'someone is getting session info'});

      cb(err, userObject);
    }
  }
};