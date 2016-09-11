from flask import render_template
from flask import Blueprint
from flask import abort

from sqlalchemy import and_
from ..models import User
from ..models import Tweet
from .. import db
from ..api import current_user

main = Blueprint('controllers', __name__)


def cutList(t,count):
    if len(t) < count:
        return t
    else:
        s = (t[n:n+count] for n in range(0,len(t)+1,count))
        return s


@main.route('/plaza')
def plaza_view():
    u = current_user()
    u.guanzhu_count = len(u.list_guanzhu())
    u.fans_count = len(u.list_fans())
    tweets = Tweet.query.all()
    t1 = Tweet.query.filter_by(id=1).first()
    tweets.remove(t1)
    tweets.sort(key=lambda t: t.created_time,reverse=True)
    for t in tweets:
        t.transmit_count = t.transmit_count()
        t.comments_count = t.comments_count()
        t.comments.sort(key=lambda c: c.created_time, reverse=True)
        if len(t.comments) > 5:
            t.comments = next(cutList(t.comments,5))
        if t.transmit == '0':
            t.timage = t.list_image()
        else:
            tweet_id = int(t.transmit)
            transmit = Tweet.query.filter_by(id=tweet_id).first()
            if transmit is None:
                transmit = Tweet.query.filter_by(id=9).first()
            else:
                t.transmit_nicheng = transmit.user.nicheng
            t.timage = transmit.list_image()
            t.tweet = transmit
    return render_template('plaza.html', tweets=tweets,user=u)


@main.route('/timeline')
def user_timeline_view():
    u = current_user()
    if u is None :
        abort(401)
    if u.guanzhu == [] or u.guanzhu is None:
        tweets = u.tweets
    else:
        guanzhu_id = u.guanzhu.split('\n')
        gid = [ int(x) for x in guanzhu_id if x != '']
        guanzhu_tweets = Tweet.query.filter(Tweet.user_id.in_(gid)).all()
        tweets = u.tweets + guanzhu_tweets
    u.guanzhu_count = len(u.list_guanzhu())
    u.fans_count = len(u.list_fans())
    tweets.sort(key=lambda t: t.created_time,reverse=True)
    for t in tweets:
        t.transmit_count = t.transmit_count()
        t.comments_count = t.comments_count()
        t.comments.sort(key=lambda c: c.created_time, reverse=True)
        if len(t.comments) > 5:
            t.comments = next(cutList(t.comments,5))
        if t.transmit != '0':
            tweet_id = int(t.transmit)
            transmit = Tweet.query.filter_by(id=tweet_id).first()
            if transmit is None:
                transmit = Tweet.query.filter_by(id=9).first()
            else:
                t.transmit_nicheng = transmit.user.nicheng
            t.timage = transmit.list_image()
            t.tweet = transmit
    return render_template('timeline.html', tweets=tweets,user=u)

@main.route('/accounts')
def user_accounts_view():
    u = current_user()
    return render_template('accounts.html', user=u)
