// 更新赞
var insertPraise = function(praiseButton,praise) {
    var p = praiseButton;
    var tweet_id = $(p).attr('data-id');
    var template = `
    <button  class="button-tweet-praise my-button button btn btn-success"  data-id="${tweet_id}" value="${praise}">
        ${praise} <span class="glyphicon glyphicon-thumbs-up"></span>
    </button>
    `;
    p.replaceWith(template);
};

// 获取赞
var praiseTweet = function(praiseButton) {
    var p = praiseButton
    var form = {
        praise : parseInt(p.val()) + 1
    };
    var success = function (r) {
        if(r.success) {
            var praise = r.data.praise;
            insertPraise(p,praise);
        }
    };
    var error = function(err) {
      log(err);
    };
    var tweet_id = $(p).attr('data-id');
    vip.tweetAddPraise(form,tweet_id,success,error);
};
