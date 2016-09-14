
// 转发微博
var transmitTweet = function() {
    var tweet_id = tweetTransmitId;
    var transmit_count = $('#id-button-transmit-' + tweet_id).val();
    log('transmit_count',transmit_count);
    var form = {
        content: $('#id-input-transmit').val(),
        transmit_count: parseInt(transmit_count) + 1
    };
    var success = function (r) {
      log('login, ', r);
      if(r.success) {
          insertTransmit(r.data,r.tweet,r.user_id);
      } else {
          log('转发失败');
      }
    };
    var error = function (err) {
      log(err);
    };
    vip.transmitTweet(form, tweet_id, success, error);
};

var insertTransmit = function(data,tweet,user_id) {
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
        user_id: d.user_id,
        dtime: dtime,
        dnicheng: d.nicheng,
        dpraise: d.praise,
        dcomment: d.comments_count,
        dtransmit: d.transmit_count,
        tcontent: d.content,
        timage: timage,
        tnicheng: t.nicheng,
        ttime: ttime,
        tid: t.id,
        tpraise: t.praise,
        tcomment: t.comments_count,
        ttransmit: t.transmit_count,
        current_user: user_id,
    };
    log('datas',datas)
    var tweet = template('transmitTweetTemplate', datas);
    $('.my-connect').prepend(tweet);
}
