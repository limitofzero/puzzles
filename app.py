import json
import os
from flask import Flask, render_template

app = Flask(__name__, static_folder="static/dist/assets", template_folder="static/dist")


@app.route('/')
def index():
    return render_template("index.html")

@app.route('/puzzles')
def retPuzzles():
    site_root = os.path.realpath(os.path.dirname(__file__))
    json_url = os.path.join(site_root, "static/src", "puzzles.json")
    data = json.load(open(json_url))
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response

if __name__ == '__main__':
    app.run()
