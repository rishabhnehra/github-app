import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'

import './index.css';
import Header from './Header'
import Search from './Search'
import Profile from './Profile'
import Repository from './Repository'

ReactDOM.render(
    <Router>
        <Header />
        <Switch>
            <Route path="/profile/:username/:repo" component={Repository} />
            <Route path="/profile/:username" component={Profile} />
            <Route path="/" component={Search} />
        </Switch>
    </Router>, document.getElementById('root'));
