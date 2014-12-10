var thunkify = require('thunkify');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var collectionName = 'tweets';

var connect = thunkify(function (cb) {
  var url = 'mongodb://localhost:27017/twitter';
  MongoClient.connect(url, function (err, db) {
    cb(err, db);
  });
});

var upsert = thunkify(function (db, tweet, cb) {
  db.collection(collectionName)
    .update({tweetId: tweet.tweetId}, tweet, {upsert: true}, function (err, res) {
    cb(err, res);
  });
});

var find = thunkify(function (db, query, cb) {
  db.collection(collectionName)
    .find(query)
    .sort({timestamp: 1})
    .limit(10)
    .toArray(function (err, docs) {
    cb(err, docs);
  });
});

module.exports = {
  save: function *(tweets) {
    var db = yield connect();

    for (var i = 0, l = tweets.length; i < l; i ++) {
      yield upsert(db, tweets[i]);
    }

    db.close();
  },

  find: function *(id) {
    var db = yield connect();
    var res;

    if (id) {
      var newest = yield find(db, {_id: new ObjectID(id)});
      res = yield find(db, {timestamp: {$gt : newest[0].timestamp}});
    } else {
      res = yield find(db, {});
    }

    db.close();

    return res;
  }
};
