var User = require('./userModel.js'),
    Q    = require('q'),
    jwt  = require('jwt-simple');

module.exports = {

  userAccessToken: '',

  signin: function (req, res, next) {
    console.log("i am in userController")
    User.requestToken()
      .then(function (requestToken) {
        res.send(requestToken);
      })
      .catch(function (error) {
        next(error);
      });
  },

  getAccessToken: function (req, res, next) {
    console.log("i am in userController getAccessToken")
    User.accessToken(req.body.oauth_verifier)
      .then(function (accessToken) {
        //user credentials have been verified by twitter 
        // res.cookie('sessionId', accessToken);
        // res.send(accessToken);
        return accessToken
      })
      .then(function(session){
        //res.cookie('sessionId', session.sessionId);
        res.send(session);
      })
      .catch(function (error) {
        next(error);
      });
  },

  getUserTimeline: function (req, res, next) {
    console.log("i am in userController getUserTimeline")
    User.timeLine()
      .then(function (userTimeline) {
        res.send(userTimeline);
      })
      .catch(function (error) {
        next(error);
      });
  },
};
