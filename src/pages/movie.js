import React from 'react'
import Helmet from 'react-helmet'
import axios from "axios"
import 'react-tippy/dist/tippy.css'
import MovieDetail from '../components/MovieDetail';

import Layout from '../components/layout'

import Fade from 'react-reveal/Fade';

class Movie extends React.Component {
  state = {
    title: '',
    director: '',
    releaseDate: '',
    description: '',
    characters: []
  };

  getWithPromiseAll(urls) {
    const promises = urls.map(url => fetch(url))

    return Promise.all(promises)
      .then(responses => Promise.all(responses.map(r => r.json())));
  }

  getMovie(id) {
      return axios.get(`https://swapi.co/api/films/${id}`).then(res => {
          const film = res.data;

          if ( res.data.length === 0 ) {
            this.setState({
              film: [],
            });
            return;
          }

          const charactersUrl = film.characters.slice(0,3);

          return this.getWithPromiseAll(charactersUrl).then( res => {
            const characters = res;
            
            this.setState({
              characters: characters,
              description: film.opening_crawl,
              director: film.director,
              releaseDate: film.release_date,
              title: film.title
            });

          });

      });
  }

  componentDidMount() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let id = params.get('id');

    this.getMovie(id);
  }

  render() {
    const {
      title,
      releaseDate,
      director,
      description,
      characters,
    } = this.state;
    return (
      <Fade top>
        <Layout>
          <Helmet title="SWAPI" />

          <MovieDetail
            title={title}
            director={director}
            releaseDate={releaseDate}
            description={description}
            characters={characters}
          />

        </Layout>
      </Fade>
    )
  }
}

export default Movie
