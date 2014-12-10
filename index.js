var koa = require('koa');
var app = koa();
var views = require('co-views');
var serve = require('koa-static');
var router = require('koa-router');
var auth = require('./lib/auth');
var lists = require('./lib/lists');
var timeline = require('./lib/timeline');
var model = require('./model/model');
var parse = require('./model/parse');
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
  this.body = yield model.find();
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

  var id = 105094084;
  var until = Date.now() - 60 * 60 * 2 * 1000;
  var oldestTweet = { tweetId: '' };
  var results = [];

  do {
    var tweets = yield timeline(config.bearer, id, 25, oldestTweet.tweetId || '');

    tweets = yield parse(tweets);
    results = results.concat(tweets);

    oldestTweet = tweets[tweets.length - 1];

  } while (oldestTweet.timestamp > until);

  yield model.save(results);

  console.log('Insert ' + results.length + ' tweets to database');

  this.body = 200;
});

app.listen(3000);
