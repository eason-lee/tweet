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
    c = Comment(form)
    c.tweet = t
    c.user = u
    c.save()
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
    print('form',form)
    t.praise = form['praise']
    t.save()
    r = dict(
        success=True,
        data=t.json(),
    )
    print('addprise',r['data'])
    return jsonify(r)


# 转发
@main.route('/tweet/transmit/<tweet_id>', methods=['POST'])
def tweet_transmit(tweet_id):
    u = current_user()
    form = request.get_json()
    print('form.',form)
    form['transmit'] = tweet_id
    t = Tweet(form)
    t.user = u
    t.save()
    t.json()
    print('t.json',t.json())
    t.nicheng = u.nicheng
    t.portrait = u.portrait
    tweet = Tweet.query.filter_by(id=tweet_id).first()
    tweet.transmit_count = tweet.transmit_count()
    tweet.comments_count = tweet.comments_count()
    tuser = User.query.filter_by(id=tweet.user_id).first()
    nicheng = tuser.nicheng
    print('tweet.json', tweet.json())
    r = {
        'success': True,
        'data': t.json(),
        'tweet': tweet.json(),
        'nicheng': nicheng,
    }
    return jsonify(r)