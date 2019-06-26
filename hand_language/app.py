from flask import Flask, request, jsonify
from flask_cors import *
from werkzeug.utils import secure_filename
import os
import random
import base64
import json
import traceback
from PIL import Image, ImageDraw, ImageFont
import tensorflow as tf
import numpy as np
from model_test import predict, load_parameters

def get_b64():
    base64_image = request.data
    imgdata = base64.b64decode(base64_image)
    filename = random.random()
    filename = str(filename) + '.jpg'
    file = open('upload/{}'.format(filename), 'wb')
    file.write(imgdata)
    file.close()
    return filename

def get_pic():
    f = request.files['photo']
    fname = f.filename
    file_dir = os.path.join(basedir, app.config['UPLOAD_FOLDER'])
    f.save(os.path.join(file_dir, fname))
    return fname


def img_to_mat(fname):
	im = Image.open("upload/{}".format(fname))
	mat = np.asarray(im.convert('RGB')) #原始图片
	with tf.Session() as sess:
		image_float = tf.image.convert_image_dtype(im, tf.float32)
		resized = tf.image.resize_images(image_float, [64, 64], method=3)
		resized_im = resized.eval()
		new_mat = np.asarray(resized_im).reshape(1, 64, 64, 3)
	return mat, new_mat

app = Flask(__name__)
CORS(app, supports_credentials=True)
UPLOAD_FOLDER = 'upload'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
basedir = os.path.abspath(os.path.dirname(__file__))

@app.route('/translate', methods=['POST'])  # Your API endpoint URL would consist /predict
def translate():
    if graph_def:
        try:
            file_dir = os.path.join(basedir, app.config['UPLOAD_FOLDER'])
            if not os.path.exists(file_dir):
                os.makedirs(file_dir)
            fname = get_pic()
            mat, new_mat = img_to_mat(fname)
            parameters = load_parameters()
            translate = predict(parameters, new_mat)
            return jsonify({u'预测结果为': str(translate)})
        except:
            return jsonify({'trace': traceback.format_exc()})
    else:
        print('Train the model first')
        return 'No model here to use'

@app.route('/translatehd', methods=['POST'])
def translate_hd():
    if graph_def:
        try:
            filename = get_b64()
            mat, new_mat = img_to_mat(filename)
            parameters = load_parameters()
            translate = predict(parameters, new_mat)
            return jsonify({u'预测结果为': str(translate)})
        except:
            return jsonify({'trace': traceback.format_exc()})
    else:
        print('Train the model first')
        return 'No model here to use'

if __name__ == '__main__':
    try:
        port = int(sys.argv[1])
    except:
        port = 8000
    with tf.gfile.GFile('model/digital_gesture.pb', "rb") as f:  # 读取模型数据
        graph_def = tf.GraphDef()
        graph_def.ParseFromString(f.read())  # 得到模型中的计算图和数据
    with tf.Graph().as_default() as graph:  # 这里的Graph()要有括号，不然会报TypeError
        tf.import_graph_def(graph_def, name="")  # 导入模型中的图到现在这个新的计算图中，不指定名字的话默认是 import
    print('Model loaded')
    # app.run(host='localhost', port=8888, debug=True, ssl_context=('cert.pem', 'key.pem'))
    app.run(host='localhost', port=8888, debug=True)