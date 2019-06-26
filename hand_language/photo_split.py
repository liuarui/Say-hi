from PIL import Image
import os

def photo_split():
    dirs = os.listdir('photo_extend')
    counter1 = 1
    counter2 = 1
    index = 'goodbye'
    for file in dirs:
        if counter1 == 1:
            os.mkdir('photo_split/{}'.format(index))
        img = Image.open('photo_extend/{}'.format(file))
        img.save('phtot_split//{}//{}'.format(str(index),file))
        counter1 += 1
        counter2 += 1
        if counter1 ==  2001:
            counter1 = 1
        if counter2 == 2001:
            index = 'hi'
        if counter2 == 4001:
            index = 'say'

if __name__ == '__main__':
    photo_split()
