import React from 'react';
import bb8 from '../assets/images/bb8.gif';

const Loading = () => (
  <section className="loading">
    <h1 className="title">Loading...</h1>
    <img src={bb8} className="image"/>
  </section>

);

export default Loading;
