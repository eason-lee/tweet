from flask import request
from flask import url_for
from flask import jsonify
from flask import session
from flask import Blueprint

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



def log(*args):
    try:
        frame = inspect.getframeinfo(inspect.currentframe().f_back)
        line_number = frame[1]
        for line in frame[3]:
            begin = line.find('(') + 1
            end = line.rfind(')')
            nameList = line[begin:end].split(',')
            for name, value in zip(nameList, args):
                print(''.join([colored("debug ", "blue"), colored("{}".format(name), attrs=['bold']),
                               colored(" ---> ", "white"), colored('{}    {}  {}'.format(value, type(value), line_number))]))
    except:
        print(colored("debug ", "red") + "something wrong")

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
