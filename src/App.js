import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Layout/Navbar';
import Alert from './components/Layout/Alert';
import Users from './components/Users/Users';
import User from './components/Users/User';
import Search from './components/Users/Search';
import About from './components/pages/About';
import './App.css';

class App extends Component {
    state = {
        users: [],
        user: {},
        repos: [],
        loading: false,
        alert: null,
    };

    // Search Github Users
    searchUsers = async text => {
        this.setState({ loading: true });
        const res = await axios.get(
            `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        this.setState({ users: res.data.items, loading: false });
    };

    // Get Single Github User
    getUser = async username => {
        this.setState({ loading: true });
        const res = await axios.get(
            `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        this.setState({ user: res.data, loading: false });
    };

    // Get User's Repos
    getUserRepos = async username => {
        this.setState({ loading: true });
        const res = await axios.get(
            `https://api.github.com/users/${username}/repos?per_page=10&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        this.setState({ repos: res.data, loading: false });
    };

    // Clear users from state
    clearUsers = () => {
        this.setState({ users: [], loading: false });
    };

    // Set Alert
    setAlert = (msg, type) => {
        this.setState({ alert: { msg, type } });
        setTimeout(() => this.setState({ alert: null }), 3000);
    };

    render() {
        return (
            <Router>
                <Navbar />
                <div className='container'>
                    <Alert alert={this.state.alert} />
                    <Switch>
                        <Route
                            exact
                            path='/'
                            render={props => (
                                <>
                                    <Search
                                        searchUsers={this.searchUsers}
                                        clearUsers={this.clearUsers}
                                        showClear={this.state.users.length > 0 ? true : false}
                                        setAlert={this.setAlert}
                                    />
                                    <Users loading={this.state.loading} users={this.state.users} />
                                </>
                            )}
                        />
                        <Route exact path='/about' component={About} />
                        <Route
                            exact
                            path='/user/:login'
                            render={props => (
                                <User
                                    {...props}
                                    getUser={this.getUser}
                                    getUserRepos={this.getUserRepos}
                                    user={this.state.user}
                                    repos={this.state.repos}
                                    loading={this.state.loading}
                                />
                            )}
                        />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
