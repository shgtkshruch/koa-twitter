var expandURL = require('../lib/shorturl');

module.exports = function *(tweets) {
  var tws = [];

  for (var i = 0, l = tweets.length; i < l; i ++) {
    var r = {};
    var tw = tweets[i];

    r.user = tw.user.name;
    r.body = tw.text;
    r.retweetCount = tw.retweet_count;
    r.favoriteCount = tw.favorite_count;
    r.rewtweeted = tw.retweeted;

    r.date = tw.created_at.slice(4);

    var urls = tw.entities.urls;
    if (urls.length > 0) {
      var start = urls[0].indices[0];
      var end = urls[0].indices[1];

      r.url = yield expandURL(urls[0].expanded_url);
      start = r.body.slice(0, start).trim();
      end = r.body.slice(end, 140).trim();
      r.body = start.length > 0 ? 
        end.length > 0 ? start + ' ' + end : start :
        end;
    }

    tws.push(r);
  }

  return tws;
};
