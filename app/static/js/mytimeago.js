
var longTimeAgo = function() {
  var timeAgo = function(time, ago) {
    return Math.round(time) + ago;
  };

  $('time').each(function(i, e){
    var past = parseInt(e.dataset.time);
    var now = Math.round(new Date().getTime() / 1000);
    var seconds = now - past;
    var ago = seconds / 60;
    // log('time ago', e, past, now, ago);
    var oneHour = 60;
    var oneDay = oneHour * 24;
    // var oneWeek = oneDay * 7;
    var oneMonth = oneDay * 30;
    var oneYear = oneMonth * 12;
    var s = '';
    if(seconds < 60) {
      s = timeAgo(seconds, ' 秒前')
    } else if (ago < oneHour) {
      s = timeAgo(ago, ' 分钟前');
    } else if (ago < oneDay) {
      s = timeAgo(ago/oneHour, ' 小时前');
    } else if (ago < oneMonth) {
      s = timeAgo(ago / oneDay, ' 天前');
    } else if (ago < oneYear) {
      s = timeAgo(ago / oneMonth, ' 月前');
    }
    $(e).text(s);
  });
};
