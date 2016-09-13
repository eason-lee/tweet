// 添加微博到页面
  var insertTweet = function(tweet) {
      var t = tweet;
      var time = formatTime(t.created_time)
      log('图片url',t.image)
      if(t.image != '') {
          var image = t.image.split('\n');
      } else {
          var image = t.image;
      }
      var data = {
          content: t.content,
          image: image,
          time: time,
          id: t.id,
          uportrait: t.portrait,
          unicheng: t.nicheng,
          user_id: t.user_id,
      };
      log('data',data)
      var tweet = template('addTweetTemplate', data);
      $('.my-connect').prepend(tweet);
      $('#id-input-tweet').val("")
      $('#id-input-file').val("")
  };
  // 添加微博
  var addNewTweet = function() {
      var images= arguments[0]
      log('文件',images)
      var form = {
          'content': $('#id-input-tweet').val(),
          'image': images
      };
      if(form.content == '') {
          var selector = '#id-input-tweet'
          $(selector).css('background-color','#ffd2d2');
          setTimeout(function(){$(selector).css('background-color','white')},800);
      } else {
          var success = function (r) {
            log('login, ', r);
            if(r.success) {
                insertTweet(r.data);
            } else {
                log(r.message);
            }
          };
          var error = function (err) {
            log(err);
          };
          log('form')
          vip.tweetAdd(form, success, error);
          image_urls = new Array();
      }
  };

var image_urls = new Array();

var sendPicture = function () {
    var fileTag =$('#id-input-file')[0];
    var files = fileTag.files;
    var numberOfFiles = files.length;
    for (var i = 0; i < numberOfFiles; i++) {
        var file = files[i];
        log('上传的文件: ', file.name);
        upload(file);
        var image_url = '/static/image/' + file.name;
        image_urls.push(image_url);
    };
};
