var db = require('../db');
var Twitter = require("node-twitter-api");
var twitterCredentials = require('../config/twitterCredentials');
var _requestToken;
var _requestSecret;
var _accessToken;
var _accessSecret;
var User = module.exports

var twitter = new Twitter({
    consumerKey: twitterCredentials.consumerKey,
    consumerSecret: twitterCredentials.consumerSecret,
    callback: twitterCredentials.callback
});


User.createSession = function (userId, screenName) {

  var newSession = {sessionId: _accessToken,
               userId: userId,
               screenName: screenName};

   return db.collection('sessions').insert(newSession)
    .then(function () {
      return newSession;
    });
  };

User.requestToken = function () {
  return new Promise(function (resolve, reject) {
    twitter.getRequestToken(function(err, requestToken, requestSecret) {
        if (err){
          console.log('I am in userModel requestToken err: ',err);
            reject(err);
        }
        else {
            _requestToken = requestToken;
            _requestSecret = requestSecret;
            resolve(requestToken);
        }
    });
  })
};

User.accessToken = function (verifier) {
    console.log('_requestToken: ',_requestToken)
    console.log('_requestSecret: ',_requestSecret)
    return new Promise(function(resolve, reject) {
      twitter.getAccessToken(_requestToken, _requestSecret, verifier, function(err, accessToken, accessSecret) {
        if (err){
          console.log('User.accessToken err: ',err)
          reject(err);
        }
        else {
          console.log('User.accessToken accessToken: ',accessToken);
          _accessToken = accessToken;
          _accessSecret = accessSecret;
          resolve(accessToken);
        }
      });
    }.bind(this));
};


User.timeLine = function () {
  console.log("I am in timeLine in userModel")
    console.log('_accessToken: ',_accessToken)
    console.log('_accessSecret: ',_accessSecret)
  return new Promise(function (resolve, reject) {
    twitter.getTimeline("home_timeline", 
        {count:30},
        _accessToken,
        _accessSecret,
        function(error, data, response) {
            if (error) {
                console.log("error in User.timeLine in userModel : ",error);
                reject(error);
            } else {
                // console.log("data in User.timeLine in userModel: ",data);
                resolve(data);
            }
        }
    );
  })
};

User.verifyCredentials = function () {

    return new Promise(function(resolve, reject) {
      twitter.verifyCredentials(_accessToken, _accessSecret, function(err, user) {
        if (err) reject(err);
        else resolve(user);
      });
    }.bind(this));
};