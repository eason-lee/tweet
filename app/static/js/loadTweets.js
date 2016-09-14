var loadTweets = function () {
    var success = function (r) {
      log('loadTweets',r);
        if(r.success) {
          loadTemplate(r.data);
        }
    };
    var error = function(err) {
      log(err);
    };
    vip.loadTweets(success,error);
};

var loadTemplate = function (tweets) {
    for(var i = 0; i < tweets.length; i++) {
        var t = tweets[i];
        if (t.transmit == '0') {
            insertTweet(t);
        } else {
            var data = t;
            var tweet = t.tweet;
            
            insertTransmit(data,tweet);
        }
    }
};
