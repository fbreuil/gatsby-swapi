import React from 'react'
import Helmet from 'react-helmet'
import axios from "axios"
import 'react-tippy/dist/tippy.css'
import { Tooltip } from 'react-tippy';
import { Link } from "gatsby"

import Layout from '../components/layout'
import Logo from '../components/Logo'
import Loading from '../components/Loading'

import people from '../assets/images/people.svg';
import movie from '../assets/images/movie.svg';

import Fade from 'react-reveal/Fade';

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      isLoading: false,
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
        isLoading: false,
        keys: keys
      });
    });
  }

  componentWillMount() {
    this.setState({isLoading:true});
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
    const { films, isLoading } = this.state;
    let loading;
    if (isLoading) {
      loading = <Loading />
    }
    return (
      <Layout>
        <Helmet title="SWAPI" />

        <header id="header">
          <Logo />
          <div className="search-field">
            <input type="search" className="search" placeholder="Search movie by name" ref={input => this.search = input} onChange={this.handleInputChange} />
            <div className="controls">
              <Link className="button" to="/people">
                <Tooltip
                  title="Filter by people"
                  position="bottom"
                  trigger="mouseenter"
                  theme="transparent"
                  size="small"
                >
                <img src={people} alt="People icon" />
                </Tooltip>
              </Link>
              <span className="divider" />
              <Link className="button" to="/">
                <Tooltip
                  title="Filter by movie name"
                  position="bottom"
                  trigger="mouseenter"
                  theme="transparent"
                  size="small"
                >
                <img src={movie} alt="Movie icon" />
                </Tooltip>
              </Link>
            </div>
          </div>
        </header>

        <section id="movies-container">
          {loading}
          {films.map((film, keys) => {
            return (
              <Fade>
              <div className="box-container" key={keys}>
                <Link to={`/movie/?id=${film.url.slice(27, 28)}`}>
                  <div className="box">
                    <img src={require(`../assets/images/films/${film.episode_id}.jpg`)} alt="Cover of movies" /> <br/>
                  </div>
                  {film.title}
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
