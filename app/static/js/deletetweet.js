// 删除微博
var deleteTweet = function(deleteButton) {
    var success = function (r) {
      log('delete',r);
        if(r.success) {
          deleteButton.closest(`#id-div-tweet-body`).remove();
        }
    };
    var error = function(err) {
      log(err);
    };
    var tweet_id = $(deleteButton).attr('data-id');
    vip.tweetDelete(tweet_id,success,error);
};
