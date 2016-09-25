from . import *



class Comment(db.Model,ReprMixin):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String(128))
    created_time = db.Column(db.Integer, default=0)
    tweet_id = db.Column(db.Integer, db.ForeignKey('tweets.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __init__(self, form):
        self.comment = form.get('comment', '')
        # self.created_time = time.strftime('%Y-%m-%d %H:%M:%S')
        self.created_time = timestamp()

    def json(self):
        extra = dict(
            tweet_id=self.tweet_id,
        )
        d = {k:v for k,v in self.__dict__.items() if k not in self.blacklist()}
        d.update(extra)
        return d

    def blacklist(self):
        b = [
            '_sa_instance_state',
        ]
        return b

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
