// 评论
var commentTemplate = function (data) {
    var t = `
        <div>
            <p class="p-name"> ${ formatTime(data.created_time) } </p>
            <p> ${ data.comment } </p>
        </div>
    `;
    return t;
};

insertComment = function (data) {
    $('#id-div-comments-'+ data.tweet_id).prepend(commentTemplate(data));
    $('#id-input-comment-'+ data.tweet_id).val("");
};

var addComment = function(tweetCommentId) {
    var tweet_id = tweetCommentId
    var comments_count = $('#id-button-comment-' + tweet_id).val();
    var form = {
        comment: $('#id-input-comment-'+ tweet_id).val(),
        comments_count: parseInt(comments_count) + 1
    };
    if(form.comment == "") {
        var selector = '#id-input-comment-'+ tweet_id;
        $(selector).css('background-color','#ffd2d2');
        setTimeout(function(){$(selector).css('background-color','white')},800);
    } else {
        var success = function (r) {
            log('comment, ', r);
            if(r.success) {
                insertComment(r.data);
            } else {
                log(r.comment);
            }
        };
        var error = function (err) {
            log(err);
        };

        log('tweet_id',tweet_id)
        vip.tweetComment(form, tweet_id, success, error);
        };
    }
