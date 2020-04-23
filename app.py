from flask import Flask, request, render_template, jsonify
import base64
from io import BytesIO
from PIL import Image
import werkzeug
import time
app = Flask(__name__)

@app.route('/')
def hello():
    return render_template('SmartGlasses.html')

@app.route('/signup', methods=['GET','POST'])
def signup():
    if request.method == 'POST':
        file = request.form['file']
        starter = file.find(',')
        image_data = file[starter+1:]
        image_data = bytes(image_data, encoding="ascii")
        im = Image.open(BytesIO(base64.b64decode(image_data)))
        timestr = time.strftime("%Y%m%d-%H%M%S")
        im.save(timestr+'.jpg')
        return jsonify(timestr,request.form['file'])
        
        #Start the Server at http://localhost:5000 then only u can able to access 

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True)

