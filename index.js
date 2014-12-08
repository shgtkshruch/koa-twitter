var koa = require('koa');
var app = koa();
var views = require('co-views');
var serve = require('koa-static');
var router = require('koa-router');
var auth = require('./lib/auth');
var config = require('./config');

var render = views('views', {
  ext: 'jade'
});

app.use(router(app));

app.use(serve('public'));

app.get('/', function *() {
  this.body = yield render('index');
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
  console.log(this.get('list-name'));
  this.body = 200;
});

app.listen(3000);
