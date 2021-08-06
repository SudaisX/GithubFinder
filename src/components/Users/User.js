import React, { Component } from 'react';
import Repos from '../repos/Repos';
import Spinner from '../Layout/Spinner';
import { Link } from 'react-router-dom';

export class User extends Component {
    componentDidMount() {
        this.props.getUser(this.props.match.params.login);
        this.props.getUserRepos(this.props.match.params.login);
    }

    render() {
        const {
            name,
            avatar_url,
            location,
            bio,
            company,
            blog,
            login,
            html_url,
            followers,
            following,
            public_repos,
            public_gists,
            hireable,
        } = this.props.user;

        const { loading } = this.props;
        if (loading) return <Spinner />;

        return (
            <>
                <Link to='/' className='btn btn-light'>
                    Back to Search
                </Link>
                Hireable:{' '}
                {hireable ? (
                    <i className='fas fa-check text-success' />
                ) : (
                    <i className='fas fa-times-circle text-danger' />
                )}
                <div className='card grid-2'>
                    <div className='all-center'>
                        <img src={avatar_url} className='round-img' style={{ width: '150px' }} alt='' />
                        <h1>{name}</h1>
                        <p>{location}</p>
                    </div>
                    <div>
                        {bio && (
                            <>
                                <h3>Biography:</h3>
                                <p>{bio}</p>
                            </>
                        )}
                        <a href={html_url} className='btn btn-dark my-1'>
                            Visit Github Profile
                        </a>
                        <ul>
                            <li>{login && <strong>Username: {login}</strong>}</li>
                            <li>{company && <strong>Company: {company}</strong>}</li>
                            <li>{blog && <strong>Website: {blog}</strong>}</li>
                        </ul>
                    </div>
                </div>
                <div className='card text-center'>
                    <div className='badge badge-primary'>Followers: {followers}</div>
                    <div className='badge badge-success'>Following: {following}</div>
                    <div className='badge badge-light'>Public Repos: {public_repos}</div>
                    <div className='badge badge-danger'>Public Gists: {public_gists}</div>
                </div>
                <Repos repos={this.props.repos} />
            </>
        );
    }
}

export default User;
