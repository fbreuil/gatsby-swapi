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

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      films: []
    };

    this.getFilms = this.getFilms.bind(this);
  }

  getFilms() {
    return axios.get(`https://swapi.co/api/films/?search=${this.state.name}`).then(res => {
      const films = res.data.results;
      const keys = Object.keys(films);

      this.setState({
        films: res.data.results,
        keys: keys
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
      this.getFilms()
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
            <input type="search" className="search" placeholder="Procurar filme pelo nome" ref={input => this.search = input} onChange={this.handleInputChange} />
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
                    <h1 className="title">{film.episode_id}</h1>
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

export default Index
