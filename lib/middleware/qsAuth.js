
module.exports = function(req, res, next) {

  if (req.query && req.query.user) {
    req.session.user = {
      username: req.query.user,
      profile: {
        firstname: req.query.user,
        lastname: "<undefined>",
      },
      stats: {
        rank: "<undefined>",
        lastgame: "<undefined>",
        totalgamesplayed: "<undefined>"
      }
    };
  }

  next();
};