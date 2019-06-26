from keras.preprocessing.image import ImageDataGenerator , img_to_array , load_img
import os

#对图片进行平移、翻转、缩放处理以扩充数据集
data = ImageDataGenerator(
    rotation_range = 20,
    width_shift_range = 0.15,
    height_shift_range = 0.15,
    zoom_range = 0.15,
    shear_range = 0.2,
    horizontal_flip = True,
    fill_mode = 'nearest'
)
dirs = os.listdir('photo')
print(len(dirs))
for file in dirs:
    img = load_img("photo/{}".format(file))
    x = img_to_array(img)
    #将图像转化为tensor要求对rank4
    x = x.reshape((1,) + x.shape)
    data.fit(x)
    prefix = file.split('.')[0]
    print(prefix)
    counter = 0
    for bantch in data.flow(x, batch_size = 4, save_to_dir = 'photo_extend', save_prefix = prefix, save_format = 'jpg'):
        counter += 1
        if counter > 100:
            break
