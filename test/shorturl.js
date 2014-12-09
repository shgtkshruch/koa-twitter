var co = require('co');
var url = require('url');
var assert = require('assert');
var shortUrl = require('../lib/shorturl');

describe('shorturl', function () {

  it('should expand buff.ly url', function (done) {
    co(function *() {
      var shorturl = 'http://buff.ly/1BtOnpb';
      var host =  'www.sitepoint.com';
      var expandUrl = yield shortUrl(shorturl);
      assert.deepEqual(url.parse(expandUrl).host, host);
      done();
    });
  });

  it('should expand bit.ly url', function (done) {
    co(function *() {
      var shorturl = 'http://bit.ly/1IpX45Z';
      var host = 'www.webdesignerdepot.com';
      var expandUrl = yield shortUrl(shorturl);
      assert.deepEqual(url.parse(expandUrl).host, host);
      done();
    });
  });

  it('should expand j.mp url', function (done) {
    co(function *() {
      var shorturl = 'http://j.mp/1HXpTq2';
      var host = 'googledevjp.blogspot.jp';
      var expandUrl = yield shortUrl(shorturl);
      assert.deepEqual(url.parse(expandUrl).host, host);
      done();
    });
  });

  it('should expand fb.me url', function (done) {
    co(function *() {
      var shorturl = 'http://fb.me/3GZzflPMs';
      var host = 'html5experts.jp';
      var expandUrl = yield shortUrl(shorturl);
      assert.deepEqual(url.parse(expandUrl).host, host);
      done();
    });
  });

  it('should return original url', function (done) {
    co(function *() {
      var shorturl = 'http://unroll.me';
      var expandUrl = yield shortUrl(shorturl);
      assert.deepEqual(expandUrl, shorturl);
      done();
    });
  });
});
