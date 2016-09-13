// 加关注
var addGuanzhu = function(user_id,form) {
    var success = function (r) {
        log('comment, ', r);
        if(r.success) {
            log('成功');
        } else {
            log('失败');
        }
    };
    var error = function (err) {
        log(err);
    };
    log('user_id',user_id);
    vip.userAddRelation(form, user_id, success, error);
};
