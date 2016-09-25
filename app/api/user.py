from ..models import User
from ..models import Tweet
from ..models import Comment
from . import main
from . import current_user

from flask import request
from flask import jsonify
from flask import abort
from flask import render_template
from flask import redirect

# 把列表转换成数据库可存储的字符串
def format_str(list):
    if '' in list:
        list.remove('')
    str = '\n'.join(list)
    return str

# 添加关注
@main.route('/user/addRelation/<user_id>', methods=['POST'])
def user_addRelation(user_id):
    # 当前用户即为fans
    fans = current_user()
    if fans is None :
        abort(401)
    # 找到被关注者
    u = User.query.filter_by(id=user_id).first()
    form = request.get_json()
    print('form',form)
    if fans.id == u.id:
        message = '不能关注自己'
    else:
        gz = form['fans']
        if gz == '+1':
            # 添加粉丝
            gz = str(fans.id)
            ufans = u.list_fans()
            if gz not in ufans:
                ufans.append(gz)
                u.fans = format_str(ufans)
                u.save()
            # 添加关注
            fs = str(u.id)
            fguanzhu = fans.list_guanzhu()
            if fs not in fguanzhu:
                fguanzhu.append(fs)
                fans.guanzhu = format_str(fguanzhu)
                fans.save()
            message = '关注成功'
        elif gz == '-1':
            # 删除粉丝
            fd = str(fans.id)
            ufans = u.list_fans()
            if fd in ufans:
                ufans.remove(fd)
                u.fans = format_str(ufans)
                u.save()
            # 删除关注
            ud = str(u.id)
            fguanzhu = fans.list_guanzhu()
            if ud in fguanzhu:
                fguanzhu.remove(ud)
                fans.guanzhu = format_str(fguanzhu)
                fans.save()
            message = '已取消关注'
    r = dict(
        success=True,
        message = message,
    )
    return jsonify(r)


def del_form_empty(form):
    f = form.copy()
    for k in form.keys():
        if form[k] is '' :
            del f[k]
    return f

# 添加头像、昵称
@main.route('/user/addthings', methods=['POST'])
def user_addthings():
    u = current_user()
    form = request.get_json()
    print('form',form)
    form = del_form_empty(form)
    u.updates(form)
    r = dict(
        success=True,
        data='更新成功',
    )
    return jsonify(r)


