var moment = require('../../../lib/moment');

module.exports = function () {

  var main = document.querySelector('#js-main');

  Handlebars.registerHelper('fromNow', function (timestamp) {
    return moment.fromNow(timestamp);
  });

  var req = new XMLHttpRequest();

  req.open('GET', '/tweets', true);
  req.onreadystatechange = function (e) {
    if (this.status === 200 && this.readyState === 4) {
      var tweetsList = JSON.parse(this.responseText);
      var html = Handlebars.templates['tweets.hbs'](tweetsList);
      main.innerHTML = html;
    }
  };
  req.send();
};
