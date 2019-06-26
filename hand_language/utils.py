from flask import Flask, request, jsonify
from flask_cors import *
from werkzeug.utils import secure_filename
import os
import base64
import json
import traceback
from PIL import Image, ImageDraw, ImageFont
import tensorflow as tf
import numpy as np
from model_test import predict, load_parameters
import cv2
import random

def img_to_mat(picname):
	im = Image.open("upload/{}".format(picname))
	mat = np.asarray(im.convert('RGB')) #原始图片
	# im.show()
	#新图片
	with tf.Session() as sess:
		image_float = tf.image.convert_image_dtype(im, tf.float32)
		resized = tf.image.resize_images(image_float, [64, 64], method=3)
		resized_im = resized.eval()
		new_mat = np.asarray(resized_im).reshape(1, 64, 64, 3)
		# print(new_mat)
		# scipy.misc.imsave("dataset//new_pic//test.png",resized_im)
	return mat, new_mat

app = Flask(__name__)
CORS(app, supports_credentials=True)
@app.route('/translate', methods=['POST'])  # Your API endpoint URL would consist /predict


def translate():
    try:
        base64_image = request.data
        # imgdata = base64.b64decode(base64_image)
        # filename = random.random()
        # filename = str(filename) + '.jpg'
        # file = open('upload/{}'.format(filename), 'wb')
        # file.write(imgdata)
        # file.close()
        filename = base64_image
        f.save('upload/{}'.format(filename))
        mat, new_mat = img_to_mat(filename)
        parameters = load_parameters()
        translate = predict(parameters, new_mat)
        return jsonify({u'预测结果为': str(translate)})
    except:
        return jsonify({'trace': traceback.format_exc()})

if __name__ == '__main__':
    try:
        port = int(sys.argv[1])
    except:
        port = 8000
    with tf.gfile.GFile('model/digital_gesture.pb', "rb") as f:  # 读取模型数据
        graph_def = tf.GraphDef()
        graph_def.ParseFromString(f.read())  # 得到模型中的计算图和数据
    with tf.Graph().as_default() as graph:  # 这里的Graph()要有括号，不然会报TypeError
        tf.import_graph_def(graph_def, name="")
    print('Model loaded')
    app.run(host='localhost', port=8888, debug=True)
