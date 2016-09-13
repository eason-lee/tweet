// 给按钮绑定事件
    var bindActions = function() {
        // 导航栏
        for(var i = 0; i < 4; i++) {
            if($("#id-li-nav-" + i).text() == $('title').text() ){
                $("#id-li-nav-" + i).addClass('active')
            }
        }
        // 传图片
        $("#id-div-file").hide();
        $(".my-tweet-addPicture-button").on('click',function(){
            $("#id-div-file").toggle();
        });
        // 点击头像
        $(".my-tweet-guanzhu").hide();
        $(".my-portrait").on('mouseover',function(){
            var id = $(this).data('id');
            $("#id-div-guanzhu-" + id).toggle();
        });
        // 评论
        $('.calss-button-comment').on('click', function(){
            var tweetCommentId = $(this).data('id');
            addComment(tweetCommentId);
        });

        // 加关注
        $('.class-button-guanzhu').on('click', function(){
            var user_id = $(this).data('id');
            var form = {
                'fans': '+1'
            };
            addGuanzhu(user_id,form);
        });
        // 取消关注
        $('.class-button-qxguanzhu').on('click', function(){
            var user_id = $(this).data('id');
            var form = {
                'fans': '-1'
            };
            addGuanzhu(user_id,form);
        });
        // 转发
        $('.button-tweet-transmit').on('click', function(){
            tweetTransmitId = $(this).data('id');
        });
        $('#id-button-transmit-submit').on('click', function(){
            transmitTweet();
        });
        // 赞
        $('.button-tweet-praise').on('click', function(){
            var praiseButton = $(this);
            praiseTweet(praiseButton);
        });
        // 发微博
        $('#id-button-tweet-add').on('click', function() {
            addTweet();
        });
        // 删微博
        $('body').on('click', '.button-tweet-delete', function(){
            var deleteButton = $(this);
            deleteTweet(deleteButton);
        });
        // 编辑微博
        $('body').on('click','.button-tweet-edit', function(){
            editTweet();
        });
        // 头像上传
        $('#id-button-addUserThings').on('click', function() {
            var fileTag =$('#id-input-file')[0];
            var files = fileTag.files;
            var numberOfFiles = files.length;
            if(numberOfFiles == 0) {
                log('没有上传头像');
                addUserThings();
            } else {
                for (var i = 0; i < numberOfFiles; i++) {
                    var file = files[i];
                    log('上传的文件: ', file.name);
                    upload(file);
                    portrait_url = '/static/image/' + file.name;
                };
                addUserThings(portrait_url)
            };
        });
    };


    var __main = function() {
        bindActions();
    };

    $(document).ready(function() {
        __main();
    });
