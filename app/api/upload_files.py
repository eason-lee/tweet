
from .. import UPLOAD_FOLDER
from . import main

from flask import request
import os
from werkzeug import secure_filename

ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

@main.route('/upload', methods=['POST'])
def upload_file():
    file = request.files.get('uploaded')
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(path)
        return path
    else:
        return '<h1>没有上传</h1>'
