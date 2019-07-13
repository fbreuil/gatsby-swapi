import React from 'react'
import Helmet from 'react-helmet'
import axios from "axios"
import 'react-tippy/dist/tippy.css'
import { Tooltip } from 'react-tippy';
import { Link } from "gatsby"

import Layout from '../components/layout'
import Logo from '../components/Logo'

import people from '../assets/images/people.svg';
import movie from '../assets/images/movie.svg';

import Fade from 'react-reveal/Fade';

class People extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      films: [],
      characters: []
    };

    this.getFilms = this.getFilms.bind(this);
  }

  getFilms() {
    return axios.get(`https://swapi.co/api/films/`).then(res => {
      const films = res.data.results;
      const keys = Object.keys(films);
      this.setState({
        films: res.data.results,
        keys: keys
      });
    });
  }

  getWithPromiseAll(urls) {
    const promises = urls.map(url => fetch(url))

    return Promise.all(promises)
      .then(responses => Promise.all(responses.map(r => r.json())));
  }

  getFilmsByPeople() {
    return axios.get(`https://swapi.co/api/people/?search=${this.state.name}`).then(res => {
      const characters = res.data.results;

      if ( characters.length === 0 ) {
        this.setState({
          films: [],
          keys: [],
          characters: []
        });

        return;
      }

      const filmsUrls = characters[0].films;

      return this.getWithPromiseAll(filmsUrls).then( res => {

        const films = res;
        const keys = Object.keys(films);
        console.log(characters)
        this.setState({
          films: res,
          keys: keys,
          characters: characters
        });
      });

    });
  }

  componentWillMount() {
    this.getFilms();
  }

  handleInputChange = () => {
    this.setState({
      name: this.search.value
    }, () => {
      this.getFilmsByPeople();
    })
  }

  render() {
    const { films } = this.state;
    return (
      <Layout>
        <Helmet title="SWAPI" />

        <header id="header">
          <Logo />
          <div className="search-field">
            <input type="search" className="search" placeholder="Procurar filme por personagem" ref={input => this.search = input} onChange={this.handleInputChange} />
            <div className="controls">
              <Link className="button" to="/people">
                <Tooltip
                  title="Filtrar por personagem"
                  position="bottom"
                  trigger="mouseenter"
                  theme="transparent"
                  size="small"
                >
                <img src={people} alt="Ícone representativo de personagem" />
                </Tooltip>
              </Link>
              <span className="divider" />
              <Link className="button" to="/">
                <Tooltip
                  title="Filtrar por nome de filme"
                  position="bottom"
                  trigger="mouseenter"
                  theme="transparent"
                  size="small"
                >
                <img src={movie} alt="Ícone representativo de filme" />
                </Tooltip>
              </Link>
            </div>
          </div>
        </header>

        <section id="movies-container">
          <h1><span className="title">Filmes</span> Star Wars</h1>
          {films.map((film, keys) => {
            return (
              <Fade key={keys}>
              <div className="box-container" key={keys}>
                <Link to={`/movie/?id=${film.episode_id}`}>
                  <div className="box">
                    <img src={require(`../assets/images/films/${film.episode_id}.jpg`)} alt="Imagem da capa do filme" /> <br/>
                    {film.title}
                  </div>
                </Link>
              </div>
              </Fade>
            );
          })}
        </section>

      </Layout>
    )
  }
}

export default People
