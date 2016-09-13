var updateUserData = function() {
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
}

var addUserThings = function() {
    var image= arguments[0]
    log('文件',image)
    var form = {
        'nicheng': $('#id-input-nicheng').val(),
        'portrait': image
    };
    log('form')
    var success = function (r) {
      log('login, ', r);
      if(r.success) {
          alert('添加成功');
          $("#id-button-addUserThings").append(reviewTemplate())
      } else {
          alert('添加失败');
      }
    };
    var error = function (err) {
      log(err);
    };
    log('form')
    vip.userAddThings(form, success, error);
};

var reviewTemplate = function () {
    var time = 1473173073.54224;
    var t = `
        <time data-time="${time}"></time>
    `
    return t
}
