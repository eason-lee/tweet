/*TMODJS:{"version":5,"md5":"e6db91c3d92e1f43c1664fbb32427bf6"}*/
template('addTweetTemplate',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,id=$data.id,uportrait=$data.uportrait,user_id=$data.user_id,unicheng=$data.unicheng,time=$data.time,content=$data.content,$each=$utils.$each,image=$data.image,value=$data.value,i=$data.i,current_user=$data.current_user,praise=$data.praise,transmit_count=$data.transmit_count,comments_count=$data.comments_count,$out='';$out+=' <div id="id-div-tweet-body" class="my-content-tweet"> <div class="modal fade" id="id-div-guanzhu-';
$out+=$escape(id);
$out+='" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"> <div class="my-modal-guanzhu"> <img src=';
$out+=$escape(uportrait);
$out+=' class="my-portrait-guanzhu img-thumbnail"> <div class="my-guanzhu-button"> <button class="class-button-guanzhu btn btn-primary" data-id="';
$out+=$escape(user_id);
$out+='" data-dismiss="modal" type="button" >关注</button> <button class="class-button-qxguanzhu btn btn-primary" data-id="';
$out+=$escape(user_id);
$out+='" data-dismiss="modal" type="button" >取消关注</button> </div> </div> </div> <div class="my-tweet-portrait"> <img class="img-portrait" src=';
$out+=$escape(uportrait);
$out+=' data-id="';
$out+=$escape(user_id);
$out+='" data-toggle="modal" data-target="#id-div-guanzhu-';
$out+=$escape(id);
$out+='" > <h4 class="my-tweet-nicheng">';
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
$out+='"> </div> </div> </div> </div> ';
if(user_id == current_user ){
$out+=' <div class="my-selftweet-button"> <button class=\'button-tweet-edit my-transmit-button button btn btn-info\'data-id=\'';
$out+=$escape(id);
$out+='\'>编辑</button> <button class=\'button-tweet-delete my-transmit-button button btn btn-danger\'data-id="';
$out+=$escape(id);
$out+='">删除</button> </div> ';
}else{
$out+=' <button type="button" class="my-button btn btn-warning"> <span class="glyphicon glyphicon-star-empty"></span> 收藏 </button> <button class="button-tweet-praise my-button button btn btn-success" data-id="';
$out+=$escape(id);
$out+='" value="';
$out+=$escape(praise);
$out+='"><span class="glyphicon glyphicon-thumbs-up"></span> ';
$out+=$escape(praise);
$out+=' </button> <button id="id-button-transmit-';
$out+=$escape(id);
$out+='" class="button-tweet-transmit my-button button btn btn-info" data-id="';
$out+=$escape(id);
$out+='" value="';
$out+=$escape(transmit_count);
$out+='" data-toggle="modal" data-target="#myModal"> <span class="glyphicon glyphicon-new-window"></span> ';
$out+=$escape(transmit_count);
$out+=' </button> <button id="id-button-comment-';
$out+=$escape(id);
$out+='" class="button-tweet-comment my-button button btn btn-primary" data-id="';
$out+=$escape(id);
$out+='" value="';
$out+=$escape(comments_count);
$out+='" data-toggle="collapse" data-target="#collapseExample-';
$out+=$escape(id);
$out+='" aria-expanded="false" aria-controls="collapseExample"><span class="glyphicon glyphicon-comment"> </span> ';
$out+=$escape(comments_count);
$out+=' </button> ';
}
$out+=' </div> ';
return new String($out);
});