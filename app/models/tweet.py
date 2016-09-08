from . import db
from . import ReprMixin

import time


class Tweet(db.Model, ReprMixin):

    __tablename__ = 'tweets'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String())
    image = db.Column(db.Text())
    created_time = db.Column(db.Integer, default=0)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    praise = db.Column(db.Integer,default=0)
    transmit = db.Column(db.String())
    comments = db.relationship('Comment',backref='tweet')

    def __init__(self, form):
        print('tweet init', form)
        content = form.get('content', '')
        image = form.get('image', '')
        praise = form.get('praise',0)
        transmit = form.get('transmit',0)
        self.content = content
        self.created_time = time.time()
        self.praise = praise
        self.image = image
        self.transmit = transmit


    def json(self):
        extra = dict(
            user_id=self.user_id,
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

    def list_image(self):
        image = ''
        if self.image == '':
            pass
        else:
            if "\n" in self.image:
                image = self.image.split('\n')
            else:
                image = [self.image]
        return image

    def comments_count(self):
        l = len(self.comments)
        return l

    def transmit_count(self):
        if self.transmit == '0':
            t = 0
        else:
            t = self.transmit.split('\n')
            t = len(t)
        return t