from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
from server.gpt import gpt

app = Flask(__name__, template_folder='./', static_folder='./site')
CORS(app)

@app.route('/api', methods=['POST'])
def main():
    data = request.get_json()
    data = gpt(data['promt'], data['context'])
    return [data], 200


@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(port=5000)