var upload = function(file) {
        // 要用一个 formdata 对象来装 file
        var fd = new FormData();
        fd.append('uploaded', file);
        $.ajax({
            url: '/api/upload',
            method: 'post',
            // 下面这两个选项一定要加上
            contentType: false,
            processData: false,
            data: fd,
            success: function(r) {
                alertify.success('上传成功', file.name);
                // if(r.success) {
                //     alertify.success('上传成功', file.name);
                //     log('filename',file.name)
                // } else {
                //     alertify.error('上传失败',file.name);
                // }
            }

        });
    };
