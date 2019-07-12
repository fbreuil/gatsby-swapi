import React from 'react'
import Helmet from 'react-helmet'
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

  getMovie(id) {
      return fetch(`https://swapi.co/api/films/${id}`).then(res => res.json())
        .then(resJson =>{ const resCharacters = resJson.characters.map(url =>
        fetch(url)
          .then(data => data.json())
          .then(c => c.name),
      );

      const characters = Promise.all(resCharacters);
      this.setState({
        characters: characters,
        description: resJson.opening_crawl,
        director: resJson.director,
        releaseDate: resJson.release_date,
        title: resJson.title
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
          />

        </Layout>
      </Fade>
    )
  }
}

export default Movie
