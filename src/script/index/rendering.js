var Steady = require('steady');
var moment = require('../../../lib/moment');

module.exports = function () {

  var main = document.querySelector('#js-main');
  var newest;

  Handlebars.registerHelper('fromNow', function (timestamp) {
    return moment.fromNow(timestamp);
  });

  new Steady({
    conditions: {
      'max-bottom': 1000,
    },
    throttle: 1000,
    handler: steadyScroll
  });

  renderingHandlebars(newest);

  function renderingHandlebars (newest) {
    var req = new XMLHttpRequest();

    req.open('GET', '/tweets', true);
    req.onreadystatechange = function (e) {
      if (this.status === 200 && this.readyState === 4) {
        var tweetsList = JSON.parse(this.responseText);
        var html = Handlebars.templates['tweets.hbs'](tweetsList);
        main.innerHTML += html;
      }
    };
    req.setRequestHeader('newestId', newest ? newest.dataset.id : '');
    req.send();
  }

  function steadyScroll (values, done) {
    newest = document.getElementById('js-main').lastElementChild;
    renderingHandlebars(newest);
    done();
  }
};
