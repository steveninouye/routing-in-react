import React, { Component, Fragment } from 'react';

class FilmDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actor: {}
        };
    }

    async componentDidMount() {
        const { id } = this.props.match.params;
        const actorUrl = `https://ghibliapi.herokuapp.com/people/${id}`;
        const response = await fetch(actorUrl);
        const actor = await response.json();
        this.setState({ actor });
    }

    render() {
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
            </Fragment>
        );
    }
}

export default FilmDetails;
