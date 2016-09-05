var db = require('../db');
var bcrypt = require('bcrypt-nodejs');
var YouTube = require('youtube-node');
var Youtube = module.exports

var youTube = new YouTube();

//Add your you tube key here
youTube.setKey('AIzaSyA8861VjFYgXkieX9m5VvnWAOWj2rAqly0');

Youtube.getVideos = function (query, numResults) {
    return new Promise(function(resolve, reject) {
      youTube.search(query, numResults, function(error, videosData) {
        if (error) {
          console.log(error);
          reject(error)
        }
        else {
          console.log(JSON.stringify(videosData, null, 2));
          resolve(videosData);
        }
      });
    }.bind(this));
};
