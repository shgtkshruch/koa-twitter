var moment = require('../../lib/moment');
var getTweetsList = require('getTweetsList');

var main = document.querySelector('#js-main');

Handlebars.registerHelper('fromNow', function (timestamp) {
  return moment.fromNow(timestamp);
});

getTweetsList(function (tweetsList) {
  var html = Handlebars.templates['tweets.hbs'](tweetsList);
  main.innerHTML = html;
});
