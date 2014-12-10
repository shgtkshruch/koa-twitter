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
    console.log('scroll');
    done();
  }
};
