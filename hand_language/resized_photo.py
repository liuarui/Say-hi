import os
import tensorflow as tf
import scipy.misc

#resize 图片至64*64
def resize_img():
    counter = 1
    dirs = os.listdir('photo_extend')
    for filename in dirs:
        im = tf.gfile.FastGFile('photo_extend/{}' .format(filename), 'rb').read()
        print("正在处理第%d张照片"%counter)
        with tf.Session() as sess:
            im_data = tf.image.decode_jpeg(im)
            image_float = tf.image.convert_image_dtype(img_data, tf.float32)
            resized = tf.image.resize_images(image_float, [64,64], method = 3)
            resized_im = resized.eval()
            scipy.misc.imsave('resized_photo/{}'.format(filename), resize_im)
            counter = counter + 1

if __name__ == '__main__':
    resize_img
