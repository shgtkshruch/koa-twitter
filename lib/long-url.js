var http = require('http');
var thunkify = require('thunkify');

module.exports = function (shortUrl) {

  return thunkify(function (cb) {
    var data = '';
    var options = {
      hostname: 'api.longurl.org',
      path: '/v2/expand?url=' + shortUrl + '&format=json'
    };

    http.get(options, function(res) {
      res.on('data', function(chunk) {
        data += chunk;
      });

      res.on('end', function () {
        url = JSON.parse(data)['long-url'];
        cb(null, url);
      });
    });
  })();
};
