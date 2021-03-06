var https = require('https');
var thunkify = require('thunkify');

module.exports = function *(bearer, id, count, maxId) {

  count = count || 25;

  var http = thunkify(function (cb) {
    var data = '';
    var options = {
      hostname: 'api.twitter.com',
      path: '/1.1/lists/statuses.json' +
        '?list_id=' + id +
        (maxId ? '&max_id=' + maxId : '') +
        '&count=' + count,
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + bearer,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    };

    var req = https.get(options, function (res) {
      res.setEncoding('utf8');

      res.on('data', function (chunk) {
        data += chunk;
      });

      res.on('end', function () {
        cb(null, data);
      });
    });

    req.on('err', function (e) {
      console.log('Request err: ' + e.message);
    });

    req.end();
  });

  var res = yield http();

  return JSON.parse(res);
};

