from . import db
from . import ReprMixin
from .. import login_manager
from  werkzeug.security import generate_password_hash
from  werkzeug.security import check_password_hash
from flask_login import UserMixin
import time


class User(db.Model, UserMixin,ReprMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String())
    password_hash = db.Column(db.String(128))
    created_time = db.Column(db.Integer)
    portrait = db.Column(db.String())
    nicheng = db.Column(db.String())
    guanzhu = db.Column(db.Text())
    fans = db.Column(db.Text())
    # 外键关联
    tweets = db.relationship('Tweet', backref='user')

    @staticmethod
    def user_by_name(username):
        return User.query.filter_by(username=username).first()


    def __init__(self, form):
        super(User, self).__init__()
        self.username = form.get('username', '')
        self.password = form.get('password', '')
        self.portrait = form.get('portrait', '')
        self.nicheng = form.get('nicheng', '')
        self.fans = form.get('fans','')
        self.guanzhu = form.get('guanzhu','')
        # 在初始化数据的时候写入 unixtime
        # 这样不依赖数据库的功能, 可以通用
        self.created_time = time.time()

    @property
    def password(self):
        raise AttributeError('不能查看密码')


    @password.setter
    def password(self,password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def json(self):
        # Model 是延迟载入的, 如果没有引用过数据, 就不会从数据库中加载
        # 引用一下 id 这样数据就从数据库中载入了
        self.id
        d = {k:v for k,v in self.__dict__.items() if k not in self.blacklist()}
        print('d',d)
        return d

    def blacklist(self):
        b = [
            '_sa_instance_state',
            'password',
        ]
        return b

    # def cread_relation_table():


    def validate_auth(self, form):
        username = form.get('username', '')
        password = form.get('password', '')
        username_equals = self.username == username
        password_equals = self.verify_password(password)
        print('validate auth', username, password, username_equals, password_equals)
        return username_equals and password_equals

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def updates(self,form):
        User.query.filter_by(id = self.id).update(form)
        db.session.commit()

    # 验证注册用户的合法性
    def register_validate(self):
        min_len = 3
        valid_username = User.query.filter_by(username=self.username).first() == None
        valid_username_len = len(self.username) >= min_len
        # valid_password_len = len(self.password) >= min_len
        msgs = []
        if not valid_username:
            message = '用户名已经存在'
            msgs.append(message)
        elif not valid_username_len:
            message = '用户名长度必须大于等于 3'
            msgs.append(message)
        # elif not valid_password_len:
        #     message = '密码长度必须大于等于 3'
        #     msgs.append(message)
        status = valid_username and valid_username_len
        return status, msgs

    def list_fans(self):
        if "\n" not in self.fans:
            fans = [self.fans]
        else:
            fans = self.fans.split('\n')
            fans = fans
        return fans

    def list_guanzhu(self):
        if "\n" not in self.guanzhu:
            guanzhu = [self.guanzhu]
        else:
            guanzhu = self.guanzhu.split('\n')
        return guanzhu



@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))