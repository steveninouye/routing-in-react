import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import 'isomorphic-fetch';
import es6Promise from 'es6-promise';
es6Promise.polyfill();

class FilmDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actor: false
        };
    }

    async componentDidMount() {
        let { id } = this.props.match.params;
        const actorUrl = `https://ghibliapi.herokuapp.com/people/${id}`;
        const actor = await fetch(actorUrl).then((res) => res.json());
        const films = await Promise.all(
            actor.films.map((film) => {
                return fetch(film).then((res) => res.json());
            })
        );
        films.forEach(({ id, title }, idx) => {
            actor.films[idx] = { id, title };
        });
        const { name, classification } = await fetch(actor.species).then(
            (res) => res.json()
        );
        actor.species = { name, classification };
        this.setState({ actor });
    }

    listFilms(films) {
        return films.map((film, i) => (
            <Link to={`/films/${film.id}`} key={i}>
                <li>{film.title}</li>
            </Link>
        ));
    }

    render() {
        if (!this.state.actor) {
            return <p>Loading...</p>;
        } else {
            const {
                name,
                gender,
                age,
                eye_color,
                hair_color,
                films,
                species
            } = this.state.actor;
            return (
                <Fragment>
                    <h1>{name}</h1>
                    <h2>Gender: {gender}</h2>
                    <h2>Age: {age}</h2>
                    <h3>Eye Color: {eye_color}</h3>
                    <h3>Hair Color: {hair_color}</h3>
                    <h3>
                        Species: {species.name}/{species.classification}
                    </h3>
                    <h3>Films:</h3>
                    <ul>{this.listFilms(films)}</ul>
                </Fragment>
            );
        }
    }
}

export default FilmDetails;
