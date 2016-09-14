/*TMODJS:{"version":1,"md5":"c68fe7f9265704b82ffddd2520327ef1"}*/
template('addTweetTemplate',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,uportrait=$data.uportrait,user_id=$data.user_id,unicheng=$data.unicheng,time=$data.time,content=$data.content,$each=$utils.$each,image=$data.image,value=$data.value,i=$data.i,id=$data.id,$out='';$out+=' <div id="id-div-tweet-body" class="my-content-tweet"> <div class="my-tweet-portrait"> <img src=';
$out+=$escape(uportrait);
$out+=' data-id="';
$out+=$escape(user_id);
$out+='" data-toggle="modal" data-target=".bs-example-modal-sm" class="img-portrait"> <h4 class="my-tweet-nicheng">';
$out+=$escape(unicheng);
$out+=' <small><footer class="my-tweet-time">微博创建于 <cite title="Source Title">';
$out+=$escape(time);
$out+='</cite></footer></small> </h4> </div> <div class="my-tweet-contents"> <p class=".my-tweet-content"> ';
$out+=$escape(content);
$out+=' <p> <div class="my-tweet-image"> ';
$each(image,function(value,i){
$out+=' <img src=';
$out+=$escape(value);
$out+=' id=';
$out+=$escape(i);
$out+=' class="my-image"> ';
});
$out+=' </div> </div> <div class="my-tweet-buttons"> <div class="my-div-comment"> <div class="collapse" id="collapseExample-';
$out+=$escape(id);
$out+='"> <div class="well"> <input id="id-input-comment-';
$out+=$escape(id);
$out+='" autocomplete="off" class="my-input-warning" type="text"> <button class=\'calss-button-comment my-button button btn btn-default\'data-id=\'';
$out+=$escape(id);
$out+='\'>发布</button> <div id = "id-div-comments-';
$out+=$escape(id);
$out+='"> </div> </div> </div> </div> <div class="my-selftweet-button"> <button class=\'button-tweet-edit my-transmit-button button btn btn-info\' data-id=\'';
$out+=$escape(id);
$out+='\'>编辑</button> <button class=\'button-tweet-delete my-transmit-button button btn btn-danger\' data-id="';
$out+=$escape(id);
$out+='">删除</button> </div> </div> ';
return new String($out);
});