import React from 'react';
import bb8 from '../assets/images/bb8.gif';

const Loading = () => (
  <section className="loading">
    <img src={bb8} className="image" alt="Imagem de loading" />
    <h1 className="text">Loading...</h1>
  </section>

);

export default Loading;
