var co = require('co');
var parse = require('../model/parse');
var assert = require('assert');

describe('perse', function () {
  var tweets = [{
    created_at: 'DEC',
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
    created_at: 'DEC',
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
    created_at: 'DEC',
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
      tws = yield parse(tweets);
      done();
    });
  });

  it('should return expectd body', function () {
    assert.deepEqual(tws[0].body, 'lorem ipsum');
    assert.deepEqual(tws[1].body, 'lorem ipsum lorem ipsum');
    assert.deepEqual(tws[2].body, 'lorem ipsum');
  });

  it('should return expectd url', function () {
    assert.deepEqual(tws[0].url, 'http://www.yahoo.co.jp/');
  });

});
