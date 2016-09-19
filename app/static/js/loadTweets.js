var loadTweets = function (page_id) {
    var success = function (r) {
      log('loadTweets',r);
        if(r.success) {
          loadTemplate(r);
        }
    };
    var error = function(err) {
      log(err);
    };
    vip.loadTweets(page_id,success,error);
};

var loadTemplate = function (r) {
    var tweets = r.data;
    var user_id = r.user_id;
    for(var i = 0; i < tweets.length; i++) {
        var t = tweets[i];
        if (t.transmit == '0') {
            log('不是转发的',t.transmit)
            var temp = insertTweet(t,user_id);
            $('.my-connect').append(temp);
        } else {
            var data = t;
            var tweet = t.tweet;
            log('是转发的',t.transmit)
            var temp = insertTransmit(data,tweet,user_id);
            $('.my-connect').append(temp);
        }
    }
};
