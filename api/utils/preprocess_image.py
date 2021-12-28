import numpy as np

from keras.preprocessing import image
from keras.preprocessing.image import img_to_array


def preprocess_image(image, target_size):
    if image.mode != "RGB":
        image = image.convert("RGB")
    image = image.resize(target_size)
    image = img_to_array(image)
    image = np.array([image])  # Convert single image to a batch.
    image = image.astype('float32') / 255.  # This is VERY important

    return image
