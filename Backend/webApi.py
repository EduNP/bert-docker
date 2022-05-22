from flask import Flask
import json
from bertMasked import *

app = Flask(__name__)

@app.route('/')
def index():
    return "hello"

@app.route('/bertMasked/<text>')
def masked(text):
    inputText = text
    result = {}
    result['input'] = inputText
    result['prediction'] = predictToken(inputText, 5)

    json_result = json.dumps(result)
    return json_result