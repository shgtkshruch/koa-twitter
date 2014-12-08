var https = require('https');
var config = require('../config');

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
    console.log(data);
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

req.end();
