from . import *


class Tweet(db.Model, ReprMixin):

    __tablename__ = 'tweets'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(128))
    image = db.Column(db.Text(128))
    created_time = db.Column(db.Integer, default=0)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    praise = db.Column(db.Integer,default=0)
    transmit = db.Column(db.String(128))
    transmit_count = db.Column(db.Integer, default=0)
    comments = db.relationship('Comment',backref='tweet')
    comments_count = db.Column(db.Integer,default=0)

    def __init__(self, form):
        print('tweet init', form)
        content = form.get('content', '')
        image = form.get('image', '')
        praise = form.get('praise',0)
        transmit = form.get('transmit',0)
        transmit_count = form.get('transmit_count', 0)
        comments_count = form.get('comments_count',0)
        self.content = content
        self.created_time = timestamp()
        self.praise = praise
        self.image = image
        self.transmit = transmit
        self.transmit_count = transmit_count
        self.comments_count = comments_count

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
