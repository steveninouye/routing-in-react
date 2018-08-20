import React, { Component } from 'react';

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
        ));

        return films;
    }
}

export default FilmList;
