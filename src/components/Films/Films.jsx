import React, { Fragment } from 'react';
import FilmList from './FilmList';

const Films = (props) => {
    return (
        <Fragment>
            <h1>Films</h1>
            <FilmList />
        </Fragment>
    );
};

export default Films;
