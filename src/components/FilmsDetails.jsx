import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FilmDetails extends Component {
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
        return <h1>film details</h1>;
    }
}

export default FilmDetails;
