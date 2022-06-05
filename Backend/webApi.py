from flask import Flask
from markupsafe import escape
import json
from bertMasked import *

app = Flask(__name__)
##?var=value
@app.route('/bertMasked/<text>')
def masked(text):
    inputText = escape(text)
    result = {}
    result['input'] = inputText
    result['prediction'] = predictToken(inputText, 5)

    json_result = json.dumps(result)
    return json_result

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)