import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import Films from './Films';
import People from './People';
import FilmsDetails from './FilmsDetails';
import PeopleDetails from './PeopleDetails';

class App extends Component {
    render() {
        return (
            <Router>
                <Fragment>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/films">Films</Link>
                        </li>
                        <li>
                            <Link to="/people">People</Link>
                        </li>
                    </ul>
                    <Switch>
                        <Route path="/people/:id" component={PeopleDetails} />
                        <Route path="/films/:id" component={FilmsDetails} />
                        <Route path="/people" component={People} />
                        <Route path="/films" component={Films} />
                        <Route path="/" component={Home} />
                    </Switch>
                </Fragment>
            </Router>
        );
    }
}

export default App;
