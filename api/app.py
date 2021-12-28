import io
import numpy as np

from PIL import Image

from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import cross_origin

from models import fruit_predictor
from utils import preprocess_image


app = Flask(__name__)

@app.route("/predict", methods=["POST"])
@cross_origin()
def predict():
    file = request.files['image'].read()
    image = Image.open(io.BytesIO(file))
    processed_image = preprocess_image(image, target_size=(64, 64))

    predictions = fruit_predictor.predict(processed_image).tolist()

    classes = [
        'maçã',
        'banana',
        'uva',
        'kiwi',
        'limão siciliano',
        'laranja',
        'mamão papaia',
        'abacaxi',
        'morango',
        'tomate'
    ]

    predicted_class_indice = int(np.argmax(predictions, axis = -1))
    predicted_class = classes[predicted_class_indice]

    response = {
        'classes': classes,
        'predictions': predictions[0],
        'predicted_class': predicted_class
    }

    return jsonify(response)

