var thunkify = require('thunkify');
var MongoClient = require('mongodb').MongoClient;

var collectionName = 'tweets';

var connect = thunkify(function (cb) {
  var url = 'mongodb://localhost:27017/twitter';
  MongoClient.connect(url, function (err, db) {
    cb(err, db);
  });
});

var insert = thunkify(function (db, data, cb) {
  db.collection(collectionName)
    .insert(data, function (err, res) {
    cb(err, res);
  });
});

module.exports = {
  save: function *(tweets) {
    var db = yield connect();

    var tws = [];

    for (var i = 0, l = tweets.length; i < l; i ++) {
      var r = {};
      var tw = tweets[i];

      r.user = tw.user.name;
      r.body = tw.text;
      r.retweetCount = tw.retweet_count;
      r.favoriteCount = tw.favorite_count;
      r.rewtweeted = tw.retweeted;

      r.date = tw.created_at.slice(4);

      var urls = tw.entities.urls;
      if (urls.length > 0) {
        r.url = urls[0].url;
      }

      tws.push(r);
    }

    yield insert(db, tws);

    db.close();
  }
};
