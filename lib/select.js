var shorturl = require('../lib/shorturl');
var moment = require('../lib/moment');

module.exports = function *(tweets, until, expandURL) {

  expandURL = expandURL || false;

  var tws = {};
  tws.list = [];
  tws.still = true;

  for (var i = 0, l = tweets.length; i < l; i ++) {
    var r = {};
    var tw = tweets[i];

    r.timestamp = moment.unixMillisecond(tw.created_at);

    if (r.timestamp < until) {
      tws.still = false;
      break;
    }

    r.tweetId = tw.id;
    r.user = tw.user.name;
    r.body = tw.text;
    r.retweetCount = tw.retweet_count;
    r.favoriteCount = tw.favorite_count;
    r.rewtweeted = tw.retweeted;
    r.profileImg = tw.user.profile_image_url_https;

    var urls = tw.entities.urls;
    if (urls.length > 0) {
      var start = urls[0].indices[0];
      var end = urls[0].indices[1];
      var url = urls[0].expanded_url;

      r.url = expandURL ? yield shorturl(url) : url;

      start = r.body.slice(0, start).trim();
      end = r.body.slice(end, 140).trim();
      r.body = start.length > 0 ? 
        end.length > 0 ? start + ' ' + end : start :
        end;
    }

    tws.list.push(r);
  }

  return tws;
};
