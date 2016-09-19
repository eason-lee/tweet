// 给按钮绑定事件
    var bindActions = function() {
        // 导航栏
        for(var i = 0; i < 4; i++) {
            if($("#id-li-nav-" + i).text() == $('title').text() ){
                $("#id-li-nav-" + i).addClass('active');
            }
        }
        // 发微博
        $('#id-button-tweet-add').on('click', function() {
            addNewTweet(image_urls);
        });
        // 传图片
        $("#id-div-file").hide();
        $(".my-tweet-addPicture-button").on('click',function(){
            $("#id-div-file").toggle();
        });
        $(".my-tweet-sendPicture-button").on('click',function(){
            sendPicture();
            $("#id-div-file").hide();
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
            updateUserData();
        });
        // 鼠标滚动到底部自动加载微博
        // $(window).on('scroll',function() {
        //     var scrollTop = $(this).scrollTop();
        //     var scrollHeight = $(document).height();
        //     var windowHeight = $(this).height();
        //     if(scrollTop + windowHeight == scrollHeight){
        //         log('到底了')
        //         loadTweets();
        //     }
        // });
        // 按钮加载更多微博
        $('.button-tweet-loadTweets').on('click', function() {
          var page_id = $(this).data('id')
          loadTweets(page_id);
        });

    };


    var __main = function() {
        bindActions();
    };

    $(document).ready(function() {
        __main();
    });
