from .. import db
import time

def timestamp():
    return int(time.time())

class ReprMixin(object):
    def __repr__(self):
        class_name = self.__class__.__name__
        properties = ('{0} = {1}'.format(k, v) for k, v in self.__dict__.items())
        return '<{0}: \n  {1}\n>'.format(class_name, '\n  '.join(properties))

    # def __repr__(self):
    #     class_name = self.__class__.__name__
    #     return u'<{}: {}>'.format(class_name, self.id)

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

# 在 ReprMixin 后导入所有 model 类
from .user import User
from .tweet import Tweet
from .comment import Comment
