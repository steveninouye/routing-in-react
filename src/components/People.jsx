import React, { Fragment } from 'react';
import PeopleList from './PeopleList';

const People = (props) => {
    return (
        <Fragment>
            <h1>Actors</h1>
            <PeopleList />
        </Fragment>
    );
};

export default People;
