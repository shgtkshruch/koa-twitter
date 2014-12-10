module.exports = function (cb) {
  var req = new XMLHttpRequest();

  req.open('GET', '/tweets', true);
  req.onreadystatechange = function (e) {
    if (this.status === 200 && this.readyState === 4) {
      var tweetsList = JSON.parse(this.responseText);
      cb(tweetsList);
    }
  };
  req.send();
};
