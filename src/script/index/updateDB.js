var moment = require('moment');

module.exports = function () {
  var cal = document.getElementById('js-cal');
  var btn = cal.querySelector('button');
  var input = cal.querySelector('input[type="datetime-local"]');

  input.value = moment(cal.dataset.timestamp, 'x').format('YYYY-MM-DDTHH:mm');

  cal.addEventListener('submit', function (e) {
    e.preventDefault();

    var unixTime = input.valueAsNumber - 60 * 60 * 9 * 1000;

    var req = new XMLHttpRequest();
    req.open('POST', '/tweets', true);
    req.onreadystatechange= function (e) {
      if (200 <= this.status < 300 && this.readyState === 4) {
        console.log(this);
      }
    };
    req.setRequestHeader('timestamp', unixTime);
    req.send();
  });
};
