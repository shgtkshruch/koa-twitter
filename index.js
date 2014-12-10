var koa = require('koa');
var app = koa();
var views = require('co-views');
var serve = require('koa-static');
var router = require('koa-router');
var auth = require('./lib/auth');
var lists = require('./lib/lists');
var timeline = require('./lib/timeline');
var model = require('./model/model');
var select = require('./lib/select');
var config = require('./config');

var render = views('views', {
  ext: 'jade'
});

app.use(router(app));

app.use(serve('public'));

app.get('/', function *() {
  this.body = yield render('index');
});

app.get('/tweets', function *() {
  this.body = yield model.find(this.get('newestId'));
});

app.post('/tweets', function *() {
  var id = 105094084;
  var until = this.get('timestamp');

  var oldTweets = yield model.find();
  var oldestTweet = oldTweets.length > 1 ? oldTweets[0] : {tweetId: ''};

  if (oldestTweet.timestamp < until) {
    this.status = 200;
    this.message = 'Data base has been updated';
  } else {
    var newTweets;
    var results = [];

    do {
      var tweets = yield timeline(config.bearer, id, 200, oldestTweet.tweetId);

      newTweets = yield select(tweets, until, false);

      results = results.concat(newTweets.list);

      oldestTweet = newTweets.list[newTweets.list.length - 1];

    } while (newTweets.still);

    yield model.save(results);

    this.status = 201;
    this.message = 'Successfully update data base';
  }
});

app.get('/auth', function *() {
  var tokens = {
    'consumer_key': config.consumer_key,
    'consumer_secret': config.consumer_secret
  };

  tokens.access_token = yield auth(tokens);

  this.body = tokens;
});

app.get('/config', function *() {
  this.body = yield render('config');
});

app.post('/config/user', function *() {
  console.log(this.get('user-name'));
  this.body = 200;
});

app.post('/config/list', function *() {
  // var lists = yield lists(config.bearer);
  //
  // [].forEach.call(lists, function (list) {
  //   if (list.name === this.get('list-name')) {
  //     timeline(list.id);
  //   }
  // });

});

app.listen(3000);
