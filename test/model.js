var co = require('co');
var request = require('cogent');
var assert = require('assert');

var config = require('../config');
var url = 'http://localhost:3000';

describe('Twitter app with koa', function () {

  describe('auth', function () {
    it('should expected response', function (done) {
      co(function *() {
        var options = {
          headers: {
            'consumer_key': config.consumer_key,
            'consumer_secret': config.consumer_secret
          },
          string: true
        };
        var res = yield request(url + '/auth', options);
        assert.deepEqual(res.text, 200);
        done();
      });
    });
  });

});
