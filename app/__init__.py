
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import time
from flask_login import LoginManager

login_manager = LoginManager()
login_manager.session_protection = 'strong'
login_manager.login_view = 'auth.login'
# 暴露 db 是因为 models 要使用它
# 但是这时候还没有 app 所以要在 app 初始化之后再初始化这个 db
db = SQLAlchemy()

#服务器
UPLOAD_FOLDER = '/var/www/tweet/app/static/image/'
# 开发
# UPLOAD_FOLDER = 'app/static/image/'

# 把 flask 的初始化放到函数中
# 由外部启动函数来调用
#
def init_app():
    db_path = 'db1.sqlite'
    # 初始化并配置 flask
    app = Flask(__name__)

    # 这一行 加了就没 warning
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
    # 设置你的加密 key
    app.secret_key = 'TODO fixme'
    # sqlite配置
    # app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///{}'.format(db_path)
    # mysql配置
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://book:book@localhost:3306/abc'
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
    app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024
    # 初始化 db
    db.init_app(app)
    db.app = app
    login_manager.init_app(app)
    # 必须在函数中 import 蓝图
    # 否则循环引用(因为蓝图中 import 了 model, model 引用了这个文件里面目的 db)
    from .auth import blue as auth
    from .controllers import main as controllers
    from .api import main as api

    # 注册蓝图
    app.register_blueprint(auth)
    app.register_blueprint(controllers)
    app.register_blueprint(api, url_prefix='/api')

    # 注册jinja2的过滤器
    def format_time(btime):
        btime = btime + 28800
        timegm = time.gmtime(btime)
        ftime = time.strftime("%Y-%m-%d  %H:%M:%S", timegm)
        return ftime
    env = app.jinja_env
    env.filters['format_time'] = format_time

    # 把 app 引用返回
    return app
