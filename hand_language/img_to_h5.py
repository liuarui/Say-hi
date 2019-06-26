import os
import numpy as np
import h5py
import tensorflow as tf
import imageio
import time
from PIL import Image



def resize_img():
    counter = 1
    dirs = os.listdir('photo_extend2')
    for filename in dirs:
        im = tf.gfile.FastGFile('photo_extend2/{}' .format(filename), 'rb').read()
        print("正在处理第%d张照片"%counter)
        with tf.Session() as sess:
            im_data = tf.image.decode_jpeg(im)
            image_float = tf.image.convert_image_dtype(im_data, tf.float32)
            resized = tf.image.resize_images(image_float, [64,64], method = 3)
            resized_im = resized.eval()
            imageio.imwrite('resized_photo/{}'.format(filename), resized_im)
            counter = counter + 1

def image_to_h5():
    dirs = os.listdir('resized_photo')
    Y = [] #label
    X = [] #data
    print(len(dirs))
    for filename in dirs:
        #将图像存储为num_name_time格式
        label = int(filename.split('_')[0])
        Y.append(label)
        im = Image.open('resized_photo/{}'.format(filename)).convert('RGB')
        mat  = np.asarray(im)
        X.append(mat)

    file = h5py.File('data/data.h5','w')
    file.create_dataset('X', data = np.array(X))
    file.create_dataset('Y', data = np.array(Y))
    file.close()
if __name__ == "__main__":
    print("start.....: " + str((time.strftime('%Y-%m-%d %H:%M:%S'))))
    #resize_img()
    print("end....: " + str((time.strftime('%Y-%m-%d %H:%M:%S'))))
    image_to_h5()
