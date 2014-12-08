var https = require('https');
var thunkify = require('thunkify');

module.exports = function *(config) {
  
  var concat = config.consumer_key + ':' + config.consumer_secret;
  var bearer = new Buffer(concat).toString('base64');

  var options = {
    hostname: 'api.twitter.com',
    path: '/oauth2/token',
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + bearer,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  };

  var http = thunkify(function (cb) {
    var data = '';
    var body = 'grant_type=client_credentials';

    var req = https.request(options, function (res) {
      res.setEncoding('utf8');

      res.on('data', function (chunk) {
        data += chunk;
      });

      res.on('end', function () {
        cb(null, data);
      });
    });

    req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
    });

    req.write(body);

    req.end();
  });

  var token = yield http();

  return JSON.parse(token).access_token;
};
