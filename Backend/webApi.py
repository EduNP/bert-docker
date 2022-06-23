from requests import request
from flask import Flask
from flask import request
from flask import make_response
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

    if inputArg == "*" or None:
        result['error'] = "Invalid Input"
        return responseFunc(json.dumps(result))

    inputText = escape(inputArg)
    if "[MASK]" not in inputText:
        result['error'] = "Invalid Format"
        return responseFunc(json.dumps(result))

    
    result['input'] = inputText
    result['prediction'] = predictToken(inputText, 5)
    return responseFunc(json.dumps(result))

def responseFunc(result):
    response = make_response(result)
    #trocar para endereço do react server
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response
    

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)  