var db = require('monk')('localhost/twitter');
var wrap = require('co-monk');
var tweets = wrap(db.get('tweets'));

module.exports = {
  save: function *(tws) {
    for (var i = 0, l = tws.length; i < l; i ++) {
      yield tweets.findAndModify(
          { tweetId: tws[i].tweetId },
          tws[i],
          { upsert: true }
      );
    }
  },

  find: function *(id) {
    var res;

    if (id) {
      var oldest = yield tweets.find({ _id: id });
      res = yield tweets.find(
          { timestamp: { $gt: oldest[0].timestamp } },
          { limit: 10, sort: { timestamp: 1 } }
      );
    } else {
      res = yield tweets.find(
          {},
          { sort: { timestamp: 1 }, limit: 10 }
      );
    }

    return res;
  },

  remove: function *(id) {
    var delTarget = yield tweets.find({ _id: id });
    var removeNum = yield tweets.remove(
        { timestamp: { $lte: delTarget[0].timestamp } }
    );

    return removeNum;
  }
};
