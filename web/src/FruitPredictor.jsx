import React, { useState, useRef } from 'react';

import api from './services/api';

import Modal from './components/Modal';

import './FruitPredictor.css';

import fruitsIcon from './assets/fruits-icon.png';
import aboutIcon from './assets/about-icon.png';


function FruitPredictor() {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  
  const hiddenFileInput = useRef(null);

  const handleClick = (e) => {
    hiddenFileInput.current.click();
  }

  const handleChange = async (e) => {
    setPhotoUrl(URL.createObjectURL(e.target.files[0]));

    const image = e.target.files[0];

    const data = new FormData();
    data.append('image', image);

    setLoading(true);

    api.post('/predict', data)
      .then(response => setPrediction(response.data.predicted_class))
      .finally(() => setLoading(false));
  };

  // if (!image.name.match(/\.(jpg|jpeg|png|gif)$/)) {
  //   console.log('select valid image.');
  //  return false;
  // }

  const handleClose = () => {
    setShow(false);
  }

  const fruits = [
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

  return (
    <div className="container">
      <div className="content">
        <header className="title">
          <h1>Fruit Predictor</h1>
          <div className="about" onClick={() => setShow(true)}>
            <img src={aboutIcon} alt="Sobre" />
          </div>
          <Modal open={show} onClose={handleClose}>
            <header className="modal-header">
              <b>Sobre</b>
            </header>
            <body className="modal-body">
              <p>O Fruit Predictor reconhece as seguintes frutas:</p>
              <ul className="fruits">
                {fruits.map(fruit => (
                  <li>{fruit}</li>
                ))}
              </ul>
            </body>
          </Modal>
        </header>
        <main>
          <div className="panel-container">
            <div className="panel">
              { photoUrl ? (
                <img className="uploaded-image" src={photoUrl} alt="Uploaded Image" />
              ) : (
                <img className="placeholder-image" src={fruitsIcon} alt="Placeholder" />
              )}
            </div>
            { loading ? (
              <p>
                Realizando predição...
              </p>
            ) : (prediction && (
              <p>
                A fruta é: <b>{prediction}</b>!
              </p>
            ))}
          </div>
          <div className="options-container">
            <span className="upload-text">Envie uma foto:</span>
            <input
              accept=".png, .jpg, .jpeg, .bmp, .gif"
              type="file"
              ref={hiddenFileInput}
              onChange={handleChange}
            />
            <button className="upload-button" onClick={handleClick}>
              Enviar
            </button>
            <span className="image-formats">PNG, JPG, JPEG or BMP</span>
          </div>
        </main>
      </div>      
    </div>
  );
}

export default FruitPredictor;
