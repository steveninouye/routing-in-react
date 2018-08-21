import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'isomorphic-fetch';
import es6Promise from 'es6-promise';
es6Promise.polyfill();

class FilmList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            films: []
        };
    }

    async componentDidMount() {
        const filmsUrl = 'https://ghibliapi.herokuapp.com/films';
        const response = await fetch(filmsUrl);
        const films = await response.json();
        this.setState({ films });
    }

    render() {
        const films = this.state.films.map((film) => (
            <Link to={`/films/${film.id}`}>
                <div key={film.id} className="film-list-item">
                    <h3>{film.title}</h3>
                    Director: {film.director}
                    <br />
                    Producer: {film.producer}
                    <br />
                    Release Date: {film.release_date}
                    <br />
                    Rating: {film.rt_score}
                    <br />
                    {film.description}
                    <hr />
                </div>
            </Link>
        ));

        return films;
    }
}

export default FilmList;
