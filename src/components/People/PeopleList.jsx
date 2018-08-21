import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
        const response = await fetch(peopleUrl);
        const people = await response.json();
        people.forEach((person, idx) => {
            const promises = [];
            person.films.forEach((film) => promises.push(fetch(film)));
            Promise.all(promises)
                .then((resArr) => {
                    const cache = [];
                    resArr.forEach((res) => cache.push(res.json()));
                    return Promise.all(cache);
                })
                .then((film) => {
                    people[idx].film_titles = film.map((e) => e.title);
                    this.setState({ people });
                });
        });
    }

    listFilmTitles(person) {
        if (person.film_titles) {
            return person.film_titles.map((e, i) => <li key={i}>{e}</li>);
        }
    }

    render() {
        const people = this.state.people.map((person) => (
            <Link to={`/people/${person.id}`}>
                <div key={person.id} className="person-list-item">
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
