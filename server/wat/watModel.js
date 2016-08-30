var db = require('../db');
var PersonalityInsightsV2 = require('watson-developer-cloud/personality-insights/v2');

var Wat = module.exports;

// npm install watson-developer-cloud
 
var personality_insights = new PersonalityInsightsV2({
  //you get this for your bluemix app
  username: '',
  password: ''

});

// use callWat(data) to get data from watson | TODO: add a callback or a promise structure
Wat.callWat = function(bigData){

  var data = bigData || "-_-" // <-- big data goes here
  // make a call to watson
  personality_insights.profile({
    text: `${data}`,
    language: 'en' },
    function (err, response) {
      if (err)
        console.log('error:', err);
      else
        console.log(JSON.stringify(response, null, 2));
        // TODO:
        // Store info in database
        // call callback or return a promise
  });

}






