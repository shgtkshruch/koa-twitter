module.exports = function () {
  var main = document.getElementById('js-main');

  main.addEventListener('click', function (e) {
    var el = e.target;
    if (el.classList.contains('tw__thumb')) {
      var id = el.parentNode.parentNode.dataset.id;
      var req = new XMLHttpRequest();

      req.open('DELETE', '/tweets', true);
      req.onreadystatechange = function (e) {
        if (this.status === 200 && this.readyState === 4) {
          console.log(this);
        }
      };
      req.setRequestHeader('objectId', id);
      req.send();
    }
  });
};
