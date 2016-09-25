from . import *

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
    return jsonify(r)