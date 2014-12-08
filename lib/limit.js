var https = require('https');
var config = require('../config');
var util = require('util');

var options = {
  hostname: 'api.twitter.com',
  path: '/1.1/application/rate_limit_status.json',
  headers: {
    'Authorization':'Bearer ' + config.bearer
  }
};

var data = '';
var req = https.request(options, function (res) {
  res.setEncoding('utf8');

  res.on('data', function (chunk) {
    data += chunk;
  });

  res.on('end', function () {
    data = JSON.parse(data);
    console.log(util.inspect(data, {depth: 5}));
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

req.end();
