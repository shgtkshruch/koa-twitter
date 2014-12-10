var co = require('co');
var parse = require('../model/parse');
var assert = require('assert');

describe('parse', function () {
  var tweets = [{
    created_at: 'Mon Sep 10 14:04:58 +0000 2012',
    user : {
      name: 'hoge'
    },
    retweet_count: 5,
    favorite_count: 2,
    retweeted: true,
    text: 'lorem ipsum http://bit.ly/IrKd8Q',
    entities: {
      urls: [{
        url: 'http://bit.ly/IrKd8Q',
        expanded_url: 'http://www.yahoo.co.jp/',
        indices: [ 12, 33 ]
      }]
    }
  },{
    created_at: 'Mon Sep 10 14:04:58 +0000 2012',
    user : {
      name: 'fuga'
    },
    retweet_count: 0,
    favorite_count: 2,
    retweeted: false,
    text: 'lorem ipsum http://bit.ly/IrKd8Q lorem ipsum',
    entities: {
      urls: [{
        url: 'http://bit.ly/IrKd8Q',
        expanded_url: 'http://bit.ly/IrKd8Q',
        indices: [ 12, 33 ]
      }]
    }
  },{
    created_at: 'Mon Sep 10 14:04:58 +0000 2012',
    user : {
      name: 'piyo'
    },
    retweet_count: 1,
    favorite_count: 1,
    retweeted: false,
    text: 'http://bit.ly/IrKd8Q lorem ipsum',
    entities: {
      urls: [{
        url: 'http://bit.ly/IrKd8Q',
        expanded_url: 'http://www.yahoo.co.jp/',
        indices: [ 0, 21 ]
      }]
    }
  }];
  var tws;

  before(function (done) {
    co(function *() {
      tws = yield parse(tweets, true);
      done();
    });
  });

  it('should return expectd body', function () {
    assert.deepEqual(tws[0].body, 'lorem ipsum');
    assert.deepEqual(tws[1].body, 'lorem ipsum lorem ipsum');
    assert.deepEqual(tws[2].body, 'lorem ipsum');
  });

  it('should return expectd url', function () {
    assert.deepEqual(tws[1].url, 'http://www.yahoo.co.jp/');
  });

  it('should return unix millisecond timestamp', function () {
    assert.deepEqual(tws[0].timestamp, 1347285898000);
  });
});
