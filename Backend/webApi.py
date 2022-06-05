from requests import request
from flask import Flask
from flask import request
from markupsafe import escape
import json
from bertMasked import *

app = Flask(__name__)
##?var=value
@app.route('/bertMasked')
def masked():
    result = {}
    result['input'] = ""
    result['prediction'] = ""
    result['error'] = ""

    inputArg = request.args.get('inputText', default = '*', type = str)
    print(f"ETNRADA {inputArg} e argumento {request.args}")

    if inputArg == "*" or None:
        result['error'] = "Invalid Input"
        return json.dumps(result)

    inputText = escape(inputArg)
    if "[MASK]" not in inputText:
        result['error'] = "Invalid Format"
        return json.dumps(result)

    
    result['input'] = inputText
    result['prediction'] = predictToken(inputText, 5)
    return json.dumps(result)

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)