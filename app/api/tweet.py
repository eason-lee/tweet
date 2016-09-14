from ..models import User
from ..models import Tweet
from ..models import Comment
from . import main
from . import current_user
from . import log

from flask import request
from flask import jsonify
from flask import abort
from flask import render_template
from flask import redirect


# 添加微博
@main.route('/tweet/add', methods=['POST'])
def tweet_add():
    u = current_user()
    form = request.get_json()
    # log('添加微博',form)
    if 'image' in form:
        image = form['image']
        form['image'] = '\n'.join(image)
    t = Tweet(form)
    t.user = u
    t.save()
    t.portrait = u.portrait
    t.nicheng = u.nicheng
    r = dict(
        success=True,
        data=t.json(),
    )
    return jsonify(r)

# 删除微博
@main.route('/tweet/delete/<tweet_id>')
def tweet_delete(tweet_id):
    t = Tweet.query.filter_by(id=tweet_id).first()
    if t is None:
        abort(404)
    # 获取当前登录的用户, 如果用户没登录或者用户不是这条微博的主人, 就返回 401 错误
    user = current_user()
    if user is None or user.id != t.user_id:
        abort(401)
    else:
        t.delete()
        r = {
            'success': True,
            'message': '成功删除',
        }
    return jsonify(r)


# 添加评论
@main.route('/tweet/addComment/<tweet_id>', methods=['POST'])
def tweet_addComment(tweet_id):
    u = current_user()
    t = Tweet.query.filter_by(id=tweet_id).first()
    if t is None:
        abort(404)
    form = request.get_json()
    t.comments_count = form['comments_count']
    del form['comments_count']
    c = Comment(form)
    c.tweet = t
    c.user = u
    c.save()
    t.save()
    # print('comment',c.comment)
    r = {
        'success': True,
        'data': c.json(),
    }
    return jsonify(r)


# 添加赞
@main.route('/tweet/addPraise/<tweet_id>', methods=['POST'])
def tweet_addPraise(tweet_id):
    t = Tweet.query.filter_by(id=tweet_id).first()
    if t is None:
        abort(404)
    form = request.get_json()
    t.praise = form['praise']
    t.save()
    r = dict(
        success=True,
        data=t.json(),
    )
    return jsonify(r)


# 转发
@main.route('/tweet/transmit/<tweet_id>', methods=['POST'])
def tweet_transmit(tweet_id):
    u = current_user()
    form = request.get_json()
    form['transmit'] = tweet_id
    bt = Tweet.query.filter_by(id=tweet_id).first()
    bt.transmit_count = form['transmit_count']
    t = Tweet(form)
    t.user = u
    t.save()
    bt.save()
    t.json()
    t.nicheng = u.nicheng
    t.portrait = u.portrait
    tweet = Tweet.query.filter_by(id=tweet_id).first()
    tuser = User.query.filter_by(id=tweet.user_id).first()
    tweet.nicheng = tuser.nicheng
    r = {
        'success': True,
        'data': t.json(),
        'tweet': tweet.json(),
        'user_id': u.id,
    }
    return jsonify(r)

# 加载微博
@main.route('/tweet/loads')
def tweet_loads():
    u = current_user()
    ts = Tweet.query.all()
    ts.sort(key=lambda t: t.created_time, reverse=True)
    ts = next(cutList(ts,12))
    for t in ts:
        if t.transmit != '0':
            bt = Tweet.query.filter_by(id=int(t.transmit)).first()
            t.tweet = bt.json()
            bu = User.query.filter_by(id=bt.user_id).first()
            t.nicheng = bu.nicheng
            t.portrait = bu.portrait
    print('ts', ts)
    r = dict(
        success=True,
        data=[t.json() for t in ts],
        user_id = u.id,
    )
    log('data',r['data'])
    print('data',r['data'])
    return jsonify(r)

def cutList(t,count):
    if len(t) < count:
        return t
    else:
        s = (t[n:n+count] for n in range(count,len(t)+1,count))
        return s