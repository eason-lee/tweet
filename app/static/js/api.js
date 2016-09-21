/**
 * Created by gua on 7/11/16 4:28:01
 */

// log
var log = function () {
    console.log(arguments);
};

var formatTime = function(time){
    var unixTimestamp = new Date(time * 1000);
    commonTime = unixTimestamp.toLocaleString();
    return commonTime;
};

// form
var formFromKeys = function(keys, prefix) {
    var form = {};
    for(var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var tagid = prefix + key;
        var value = $('#' + tagid).val();
        if (value.length < 1) {
            // alert('字段不能为空');
            break;
        }
        form[key] = value;
    }
    return form;
};

// vip API
var vip = {
  data:{}
};

vip.ajax = function(url, method, form, success, error) {
    var request = {
        url: url,
        type: method,
        contentType: 'application/json',
        success: function (r) {
            log('vip post success', url, r);
            success(r);
        },
        error: function (err) {
            r = {
                success: false,
                data: err
            };
            log('vip post err', url, err);
            error(r);
        },
    };
    if(method === 'post') {
        var data = JSON.stringify(form);
        request.data = data;
    }
    $.ajax(request);
};

vip.get = function (url, success,error) {
    var method = 'get';
    var form = {};
    this.ajax(url, method, form, success, error);
};

vip.post = function (url, form, success, error) {
    var method = 'post';
    this.ajax(url, method, form, success, error);
};

// API normal
vip.register = function (form, success, error) {
    var url = '/register';
    this.post(url, form, success, error);
};

vip.login = function (form, success, error) {
    var url = '/login';
    this.post(url, form, success, error);
};

// tweet API
vip.tweetAdd = function (form, success, error) {
    var url = '/api/tweet/add';
    this.post(url, form, success, error);
};

vip.tweetDelete = function (tweet_id,success,error) {
    url = '/api/tweet/delete/' + tweet_id;
    this.get(url,success,error);
};

vip.tweetComment = function (form, tweet_id, success, error) {
    var url = 'api/tweet/addComment/' + tweet_id;
    this.post(url,form,success,error);
};

vip.tweetAddPraise = function (form, tweet_id, success, error) {
    var url = 'api/tweet/addPraise/' + tweet_id;
    this.post(url,form,success,error);
};

vip.userAddThings = function (form, success, error) {
    var url = 'api/user/addthings';
    this.post(url,form,success,error);
};

vip.userAddRelation = function (form, user_id, success, error) {
    var url = 'api/user/addRelation/' + user_id;
    this.post(url,form,success,error);
};

vip.transmitTweet = function (form,tweet_id,success,error) {
    var url = 'api/tweet/transmit/' + tweet_id;
    this.post(url,form,success,error);
};

vip.loadTweets = function (page_id,success,error) {
    url = '/api/tweet/loads/'+page_id;
    this.get(url,success,error);
};
