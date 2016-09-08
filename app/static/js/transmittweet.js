
// 转发微博
var transmitTweet = function() {
    var form = {
        'content': $('#id-input-transmit').val(),
    };
    var success = function (r) {
      log('login, ', r);
      if(r.success) {
          insertTransmit(r.data,r.tweet);
      } else {
          log('转发失败');
      }
    };
    var error = function (err) {
      log(err);
    };
    var tweet_id = tweetTransmitId;
    vip.transmitTweet(form, tweet_id, success, error);
};

var insertTransmit = function(data,tweet,nicheng) {
    var d = data;
    log('data',d);
    var t = tweet;
    var dtime = formatTime(d.created_time);
    var ttime = formatTime(t.created_time);
    if(t.image != '') {
        var timage = t.image.split('\n');
    } else {
        var timage = t.image;
    }
    var datas = {
        dportrait: d.portrait,
        dcontent: d.content,
        did: d.id,
        dtime: dtime,
        dnicheng: d.nicheng,
        tcontent: t.content,
        timage: timage,
        tnicheng: nicheng,
        ttime: ttime,
        tid: t.id,
        tpraise: t.praise,
        tcomment: t.comments_count,
        ttransmit: t.transmit_count,
    };
    log('datas',datas)
    var tweet = template('transmitTweetTemplate', datas);
    $('.my-connect').prepend(tweet);
}
