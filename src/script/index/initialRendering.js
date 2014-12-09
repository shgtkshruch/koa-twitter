module.exports = function () {
  var main = document.querySelector('#js-main');
  var req = new XMLHttpRequest();

  req.open('GET', '/tweets', true);
  req.onreadystatechange = function (e) {
    if (this.status === 200 && this.readyState === 4) {
      var data = JSON.parse(this.responseText);
      var res = Handlebars.templates['tweets.hbs'](data);
      main.innerHTML = res;
    }
  };
  req.send();
};
