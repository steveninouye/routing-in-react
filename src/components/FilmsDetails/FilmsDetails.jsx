import React, { Component, Fragment } from 'react';

class FilmDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            film: {}
        };
    }

    async componentDidMount() {
        const { id } = this.props.match.params;
        const filmUrl = `https://ghibliapi.herokuapp.com/films/${id}`;
        const response = await fetch(filmUrl);
        const film = await response.json();
        this.setState({ film });
    }

    render() {
        const {
            title,
            description,
            director,
            producer,
            release_date,
            rt_score
        } = this.state.film;
        return (
            <Fragment>
                <h1>{title}</h1>
                <h2>Directed By: {director}</h2>
                <h2>Produced By: {producer}</h2>
                <h3>Release Date: {release_date}</h3>
                <h3>Rating: {rt_score}</h3>
                <p>{description}</p>
            </Fragment>
        );
    }
}

export default FilmDetails;
