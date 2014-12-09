var url = require('url');
var request = require('request');
var thunkify = require('thunkify');

module.exports = function (uri) {

  return thunkify(function (cb) {
    if (/^https?:\/\/\w{1,5}\.\w{2}\/[\w\d]{5,9}$/.test(uri)) {
      var options = {
        method: 'HEAD',
        url: url.parse(uri).protocol ? uri : 'http://' + uri,
        // followAllRedirects: true
      };
      request(options, function (err, res) {
        cb(err, res.request.href);
      });
    } else {
      cb(null, uri);
    }
  })();
};
