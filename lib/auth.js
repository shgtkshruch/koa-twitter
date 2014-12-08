var https = require('https');
var config = require('../config.json');

var bearer = new Buffer(config.consumer_key + ':' + config.consumer_secret).toString('base64');

var options = {
  hostname: 'api.twitter.com',
  path: '/oauth2/token',
  method: 'POST',
  headers: {
    'Authorization': 'Basic ' + bearer,
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
};
var body = 'grant_type=client_credentials';

var data = '';
var req = https.request(options, function (res) {
  res.setEncoding('utf8');

  res.on('data', function (chunk) {
    data += chunk;
  });

  res.on('end', function () {
    console.log(data);
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

req.write(body);

req.end();
