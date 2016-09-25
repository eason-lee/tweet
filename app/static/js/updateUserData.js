var updateUserData = function() {
    var fileTag =$('#id-input-portrait')[0];
    var files = fileTag.files;
    var numberOfFiles = files.length;
    if(numberOfFiles == 0) {
        log('没有上传头像');
        addUserThings();
    } else {
        var file = files[0];
        log('上传的文件: ', file.name);
        upload(file);
        portrait_url = '/static/image/' + file.name;
        addUserThings(portrait_url);
    }
};

var addUserThings = function() {
    var image= arguments[0]
    var form = {
        'nicheng': $('#id-input-nicheng').val(),
        'portrait': image
    };
    var success = function (r) {
      if(r.success) {
          alertify.success(r.data);

      } else {
          alertify.error('失败');
      }
    };
    var error = function (err) {
      log(err);
    };
    vip.userAddThings(form, success, error);
};
