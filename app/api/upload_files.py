from .. import UPLOAD_FOLDER
from . import main
from . import log

from flask import jsonify
from flask import request
import os
from werkzeug import secure_filename

ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

@main.route('/upload', methods=['POST'])
def upload_file():
    file = request.files.get('uploaded')
    r = dict(
        success= True,
        message= '',
    )
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(path)
        r['message'] = filename
    else:
        r['success'] = False
    print('r',r)
    log('r',r)
    return jsonify(r)