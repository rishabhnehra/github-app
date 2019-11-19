import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'

import './index.css';
import App from './App';
import Header from './Header'
import Search from './Search'

ReactDOM.render(
    <Router>
        <Header />
        <Switch>
            <Route path="/">
                <Search />
            </Route>
        </Switch>
    </Router>, document.getElementById('root'));
