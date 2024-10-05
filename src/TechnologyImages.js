import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = '26806310-9799765406e1766340f03eb4b'; // Reemplaza con tu clave de API de Pixabay
const API_URL = `https://pixabay.com/api/?key=${API_KEY}&q=tecnologia&image_type=photo&per_page=10`;

const TechnologyImages = () => {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState('');
  
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(API_URL);
        setImages(response.data.hits);
        setCurrentImage(response.data.hits[0]?.webformatURL); // Inicializa con la primera imagen
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (images.length > 0) {
        const randomIndex = Math.floor(Math.random() * images.length);
        setCurrentImage(images[randomIndex]?.webformatURL);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [images]);

  return (
    <div className="flex justify-center items-center rounded ">
      {currentImage && (
        <img
          src={currentImage}
          alt="Imagen de tecnología"
          className="w-80 h-80 object-cover rounded-full"
        />
      )}
    </div>
  );
};

export default TechnologyImages;
