import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Alert from './components/Layout/Alert';
import User from './components/Users/User';

import Home from './components/pages/Home';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';

import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';

import './App.css';

const App = () => {
    return (
        <GithubState>
            <AlertState>
                <Router>
                    <Navbar />
                    <div className='container'>
                        <Alert />
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route exact path='/about' component={About} />
                            <Route exact path='/user/:login' component={User} />} />
                            <Route component={NotFound} />} />
                        </Switch>
                    </div>
                </Router>
            </AlertState>
        </GithubState>
    );
};

export default App;
