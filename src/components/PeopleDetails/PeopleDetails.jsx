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
        const response = await fetch(actorUrl);
        const actor = await response.json();
        const promises = [];
        actor.films.forEach((film) => {
            promises.push(fetch(film));
        });
        Promise.all(promises)
            .then((res) => {
                let cache = [];
                res.forEach((r) => {
                    cache.push(r.json());
                });
                return Promise.all(cache);
            })
            .then(async (filmsArr) => {
                filmsArr.forEach((film, idx) => {
                    let { id, title } = film;
                    actor.films[idx] = { id, title };
                });
                const res = await fetch(actor.species);
                const { name, classification } = await res.json();
                actor.species = {
                    name,
                    classification
                };
                this.setState({ actor });
            });
    }

    listFilms(films) {
        return films.map((f, i) => (
            <Link to={`/films/${f.id}`}>
                <li key={i}>{f.title}</li>
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
