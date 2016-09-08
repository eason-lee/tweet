from ..models import User
from ..models import Tweet
from ..models import Comment
from . import main
from . import current_user
from . import log
from flask import request
from flask import render_template
from flask import redirect


@main.route('/upload', methods=['POST'])
def upload_file():
    print('upload')
    # 通过 request.files 访问上传的文件
    # uploaded 是上传时候的文件名
    file = request.files.get('uploaded')
    print('upload, ', request.files)
    if file:
        filename = file.filename
        print('filename, ', filename)
        # 因为只有 static 文件夹里面的内容是可以直接读取的
        # 所以我们暂时存里面, 方便访问
        # print('现在的地址是',redirect('/static/image/'))
        path = 'app/static/image/'+ filename
        file.save(path)
        return path
    else:
        return '<h1>没有上传</h1>'
