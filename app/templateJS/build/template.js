/*TMODJS:{"version":"1.0.0"}*/
!function () {

    function template (filename, content) {
        return (
            /string|function/.test(typeof content)
            ? compile : renderFile
        )(filename, content);
    };


    var cache = template.cache = {};
    var String = this.String;

    function toString (value, type) {

        if (typeof value !== 'string') {

            type = typeof value;
            if (type === 'number') {
                value += '';
            } else if (type === 'function') {
                value = toString(value.call(value));
            } else {
                value = '';
            }
        }

        return value;

    };


    var escapeMap = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    };


    function escapeFn (s) {
        return escapeMap[s];
    }


    function escapeHTML (content) {
        return toString(content)
        .replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
    };


    var isArray = Array.isArray || function(obj) {
        return ({}).toString.call(obj) === '[object Array]';
    };


    function each (data, callback) {
        if (isArray(data)) {
            for (var i = 0, len = data.length; i < len; i++) {
                callback.call(data, data[i], i, data);
            }
        } else {
            for (i in data) {
                callback.call(data, data[i], i);
            }
        }
    };


    function resolve (from, to) {
        var DOUBLE_DOT_RE = /(\/)[^/]+\1\.\.\1/;
        var dirname = ('./' + from).replace(/[^/]+$/, "");
        var filename = dirname + to;
        filename = filename.replace(/\/\.\//g, "/");
        while (filename.match(DOUBLE_DOT_RE)) {
            filename = filename.replace(DOUBLE_DOT_RE, "/");
        }
        return filename;
    };


    var utils = template.utils = {

        $helpers: {},

        $include: function (filename, data, from) {
            filename = resolve(from, filename);
            return renderFile(filename, data);
        },

        $string: toString,

        $escape: escapeHTML,

        $each: each
        
    };


    var helpers = template.helpers = utils.$helpers;


    function renderFile (filename, data) {
        var fn = template.get(filename) || showDebugInfo({
            filename: filename,
            name: 'Render Error',
            message: 'Template not found'
        });
        return data ? fn(data) : fn; 
    };


    function compile (filename, fn) {

        if (typeof fn === 'string') {
            var string = fn;
            fn = function () {
                return new String(string);
            };
        }

        var render = cache[filename] = function (data) {
            try {
                return new fn(data, filename) + '';
            } catch (e) {
                return showDebugInfo(e)();
            }
        };

        render.prototype = fn.prototype = utils;
        render.toString = function () {
            return fn + '';
        };

        return render;
    };


    function showDebugInfo (e) {

        var type = "{Template Error}";
        var message = e.stack || '';

        if (message) {
            // 利用报错堆栈信息
            message = message.split('\n').slice(0,2).join('\n');
        } else {
            // 调试版本，直接给出模板语句行
            for (var name in e) {
                message += "<" + name + ">\n" + e[name] + "\n\n";
            }  
        }

        return function () {
            if (typeof console === "object") {
                console.error(type + "\n\n" + message);
            }
            return type;
        };
    };


    template.get = function (filename) {
        return cache[filename.replace(/^\.\//, '')];
    };


    template.helper = function (name, helper) {
        helpers[name] = helper;
    };


    if (typeof define === 'function') {define(function() {return template;});} else if (typeof exports !== 'undefined') {module.exports = template;} else {this.template = template;}
    
    /*v:1*/
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
});/*v:1*/
template('transmitTweetTemplate',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,dportrait=$data.dportrait,did=$data.did,dnicheng=$data.dnicheng,dtime=$data.dtime,dcontent=$data.dcontent,tnicheng=$data.tnicheng,ttime=$data.ttime,tcontent=$data.tcontent,$each=$utils.$each,timage=$data.timage,value=$data.value,i=$data.i,tid=$data.tid,tpraise=$data.tpraise,ttransmit=$data.ttransmit,tcomments=$data.tcomments,$out='';$out+=' <div id="id-div-tweet-body" class="my-tweet-transmit"> <div class="my-transmit-top"> <div class="my-tweet-transmit-portrait-1"> <img src=';
$out+=$escape(dportrait);
$out+=' data-id="';
$out+=$escape(did);
$out+='" data-toggle="modal" data-target=".bs-example-modal-sm" class="img-portrait"> <h4 class="my-tweet-nicheng">';
$out+=$escape(dnicheng);
$out+=' <small><footer class="my-tweet-time">微博创建于 <cite title="Source Title">';
$out+=$escape(dtime);
$out+='</cite></footer></small> </h4> </div> <p class="my-tweet-transmit-content"> ';
$out+=$escape(dcontent);
$out+=' <p> </div> <div class="my-transmit-content-tweet"> <div class="my-tweet-transmit-portrait-2"> <h4 class="my-tweet-nicheng">';
$out+=$escape(tnicheng);
$out+=' <small><footer class="my-tweet-time">微博创建于 <cite title="Source Title">';
$out+=$escape(ttime);
$out+='</cite></footer></small> </h4> </div> <div class="my-transmit-tweet-contents"> <p class=".my-tweet-content"> ';
$out+=$escape(tcontent);
$out+=' <p> <div class="my-tweet-image"> ';
$each(timage,function(value,i){
$out+=' <img src=';
$out+=$escape(value);
$out+=' id=';
$out+=$escape(i);
$out+=' class="my-image"> ';
});
$out+=' </div> </div> <div class="my-tweet-buttons"> <button type="button" class="my-button btn btn-warning"> <span class="glyphicon glyphicon-star-empty"></span> 收藏 </button> <button class=" my-button button btn btn-success" data-id="';
$out+=$escape(tid);
$out+='" value="';
$out+=$escape(tpraise);
$out+='"><span class="glyphicon glyphicon-thumbs-up"></span> ';
$out+=$escape(tpraise);
$out+=' </button> <button class=" my-button button btn btn-info" data-id="';
$out+=$escape(tid);
$out+='" data-target="#myModal"><span class="glyphicon glyphicon-new-window"></span> ';
$out+=$escape(ttransmit);
$out+=' </button> <button class="button-tweet-comment my-button button btn btn-primary" data-id="';
$out+=$escape(tid);
$out+='" data-toggle="collapse" data-target="#collapseExample-';
$out+=$escape(tid);
$out+='" aria-expanded="false" aria-controls="collapseExample"> <span class="glyphicon glyphicon-comment"></span> ';
$out+=$escape(tcomments);
$out+=' </button> </div> </div> <div class="my-transmit-bottom"> <button class=\'button-tweet-edit my-transmit-button button btn btn-info\' data-id=\'';
$out+=$escape(did);
$out+='\'>编辑</button> <button class=\'button-tweet-delete my-transmit-button button btn btn-danger\' data-id="';
$out+=$escape(did);
$out+='">删除</button> </div> </div> ';
return new String($out);
});

}()