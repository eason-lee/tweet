// 加关注
var addGuanzhu = function(user_id,form) {
    var success = function (r) {
        log('comment, ', r);
        if(r.success) {
            alertify.success(r.message);

        } else {
            alertify.error(r.message);
        }
    };
    var error = function (err) {
        log(err);
    };
    log('user_id',user_id);
    vip.userAddRelation(form, user_id, success, error);
};
