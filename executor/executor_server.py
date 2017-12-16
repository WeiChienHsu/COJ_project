import json
from flask import Flask
app = Flask(__name__)
from flask import jsonify
from flask import request

@app.route('/')
def hello():
    return 'hello world'

@app.route('/results', methods=['POST'])
def results():
    data = request.get_json()
    if 'code' not in data or 'lang' not in data:
        return 'You should provide "code" and "lang"'
    code = data['code']
    lang = data['lang']
    print("API got called with code: %s in %s" % (code, lang))
    return jsonify({'build': 'build jajaja', 'run': 'run from oajsfoaij'})


if __name__ == '__main__':
    app.run(debug=True)