var assert = require('assert');
var moment = require('../lib/moment');

describe('moment.js', function () {
  describe('unixMillisecond', function () {
    it('should return Unix Millisecond Timestamp', function () {
      var unixTime = moment.unixMillisecond('Mon Sep 10 14:04:58 +0000 2012');
      assert.deepEqual(unixTime, 1347285898000);
    });
  });

  describe('fromNow', function () {
    it('should return one second ago', function () {
      var oneSecoundAgo = moment.fromNow(Date.now() - 1 * 1000);
      assert.deepEqual(oneSecoundAgo, '1秒');
    });

    it('should return one minite ago', function () {
      var oneMiniteAgo = moment.fromNow(Date.now() - 60 * 1000);
      assert.deepEqual(oneMiniteAgo, '1分');
    });

    it('should return one hour ago', function () {
      var oneHourAgo = moment.fromNow(Date.now() - 60 * 60 * 1000);
      assert.deepEqual(oneHourAgo, '1時間');
    });

    it('should return one day ago', function () {
      var oneDayAgo = moment.fromNow(Date.now() - 60 * 60 * 24 * 1000);
      assert.deepEqual(oneDayAgo, '1日');
    });

    it('should return one month ago', function () {
      var oneMonthAgo = moment.fromNow(Date.now() - 60 * 60 * 24 * 31 * 1000);
      assert.deepEqual(oneMonthAgo, '1ヶ月');
    });

    it('should return one year ago', function () {
      var oneYearAgo = moment.fromNow(Date.now() - 60 * 60 * 24 * 365 * 1000);
      assert.deepEqual(oneYearAgo, '1年');
    });
  });
});
