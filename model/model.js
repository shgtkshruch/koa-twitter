var thunkify = require('thunkify');
var MongoClient = require('mongodb').MongoClient;
var parse = require('./parse');

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

var find = thunkify(function (db, query, cb) {
  db.collection(collectionName)
    .find(query)
    .sort({timestamp: 1})
    .limit(25)
    .toArray(function (err, docs) {
    cb(err, docs);
  });
});

module.exports = {
  save: function *(tweets) {
    var db = yield connect();

    var tws = yield parse(tweets);
    yield insert(db, tws);

    db.close();
  },
  
  find: function *() {
    var db = yield connect();

    var res = yield find(db, {});

    db.close();

    return res;
  }
};
