from flask import request
from flask import url_for
from flask import jsonify
from flask import session
from flask import Blueprint
import time

import inspect
from termcolor import colored
from functools import wraps

from ..models import User

# api 是蓝图的名字
main = Blueprint('api', __name__)


# 通过 session 来获取当前登录的用户
def current_user():
    # print('session, debug', session.permanent)
    id = session.get('id', '')
    u = User.query.filter_by(id=id).first()
    return u



# 用 log 函数把所有输出写入到文件，这样就能很方便地掌控全局了
# 即便你关掉程序，也能再次打开来查看，这就是个时光机
def log(*args, **kwargs):
    format = '%Y/%m/%d %H:%M:%S'
    value = time.localtime(int(time.time()))
    dt = time.strftime(format, value)
    # 中文 windows 平台默认打开的文件编码是 gbk 所以需要指定一下
    with open('log_code.txt', 'a', encoding='utf-8') as f:
        # 通过 file 参数可以把输出写入到文件 f 中
        # 需要注意的是 **kwargs 必须是最后一个参数
        print(dt, *args, file=f, **kwargs)

# 在有些需要用户登录的操作，可以使用这个装饰器
def login_required(f):
    @wraps(f)
    def function(*args, **kwargs):
        if current_user() is None:
            r = {
                'success': False,
                'message': '未登录',
            }
            return jsonify(r)
        return f(*args, **kwargs)
    return function

from . import tweet
from . import upload_files
from . import user
