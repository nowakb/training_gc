
module.exports = function(req, res, next) {

  if (req.query && req.query.user) {
    req.session.user = {
      username: req.query.user,
      profile: {
        firstname: "default bob",
        lastname: "smith",
        avatarURL:""
      },
      stats: {
        experiencePoints: 0
      }
    };
  }

  next();
};