import React from 'react';
import { Link } from "gatsby"

import arrow from '../assets/images/arrow.svg';

const MovieDetail = ({
  title,
  releaseDate,
  director,
  description,
  characters,
}) => (
  <section id="movie-detail">
    <Link to="/"><img src={arrow} className="back" alt="Ícone de voltar página"/></Link>
    <h1 className="name">{title}</h1>
    <span className="subtitle">{director} - {releaseDate}</span>
    <p className="sinopse">{description}</p>
    <h1>Personagens</h1>
    {characters.map((data, i) => (
      <p key={i}>
        {data.name}
      </p>
    ))}
  </section>

);

export default MovieDetail;
