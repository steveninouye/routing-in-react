import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'isomorphic-fetch';
import es6Promise from 'es6-promise';
es6Promise.polyfill();

class PeopleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            people: []
        };
        this.listFilmTitles = this.listFilmTitles.bind(this);
    }

    async componentDidMount() {
        const peopleUrl = 'https://ghibliapi.herokuapp.com/people';
        const people = await fetch(peopleUrl).then((res) => res.json());
        people.forEach(async (person, idx) => {
            const films = await Promise.all(
                person.films.map((film) => fetch(film).then((r) => r.json()))
            );
            people[idx].film_titles = films.map((e) => e.title);
            this.setState({ people });
        });
    }

    listFilmTitles(person) {
        if (person.film_titles) {
            return person.film_titles.map((e, i) => <li key={i}>{e}</li>);
        }
    }

    render() {
        const people = this.state.people.map((person) => (
            <Link to={`/people/${person.id}`} key={person.id}>
                <div className="person-list-item">
                    <h3>{person.name}</h3>
                    Gender: {person.gender}
                    <br />
                    Age: {person.age}
                    <br />
                    Eye Color: {person.eye_color}
                    <br />
                    Hair Color: {person.hair_color}
                    <br />
                    Films: <ul>{this.listFilmTitles(person)}</ul>
                    <hr />
                </div>
            </Link>
        ));

        return people;
    }
}

export default PeopleList;
