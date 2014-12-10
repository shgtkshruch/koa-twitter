var Steady = require('steady');

module.exports = function () {

  new Steady({
    conditions: {
      'max-bottom': 1000,
    },
    throttle: 1000,
    handler: scroll
  });

  function scroll (values, done) {
    var newest = document.getElementById('js-main').lastElementChild;

    var req = new XMLHttpRequest();
    req.open('GET', '/tweets', true);
    req.onreadystatechange = function (e) {
      if (this.status === 200 && this.readyState === 4) {
        console.log(this);
      }
    };
    req.setRequestHeader('newestId', newest.dataset.id);
    req.send();

    done();
  }
};
