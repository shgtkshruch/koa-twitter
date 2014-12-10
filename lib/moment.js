var moment = require('moment');

moment.locale('jp', {
  relativeTime: {
    past: '%s',
    s: '%d秒',
    m: '1分',
    mm: '%d分',
    h: '1時間',
    hh: '%d時間',
    d: '1日',
    dd: '%d日',
    M: '1ヶ月',
    MM: '%dヶ月',
    y: '1年',
    yy: '%d年'
  }
});

module.exports = {
  unixMillisecond: function (dateTime) {
    var format = 'ddd MMM DD HH:mm:ss ZZ YYYY';
    return moment(dateTime, format).format('x');
  },

  fromNow: function (unixMillisecond) {
    return moment(unixMillisecond, 'x').fromNow();
  }
};
