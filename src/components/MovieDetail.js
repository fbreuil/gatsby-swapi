import React from 'react';
import { Link } from "gatsby"

import arrow from '../assets/images/arrow.svg';
import formatDate from '../helpers/formatDate';

const MovieDetail = ({
  filmId,
  title,
  releaseDate,
  director,
  description,
  characters,
}) => (
  <section id="movie-detail">
    <div className="details">
      <Link to="/"><img src={arrow} className="back" alt="Back page icon"/></Link>
      <h1 className="name">{title}</h1>
      <span className="subtitle">{director} - {formatDate(releaseDate)}</span>
      <p className="sinopse">{description}</p>
      <h1>Peoples</h1>
      {characters.map((data, i) => (
        <p key={i}>
          {data.name}
        </p>
      ))}
    </div>
    <div className="cover">
      <img src={require("../assets/images/films/" + filmId + ".jpg")} alt="Cover of movie" className="image" />
    </div>
  </section>

);

export default MovieDetail;
