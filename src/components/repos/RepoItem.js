import React from 'react';

const RepoItem = ({ repo }) => {
    return (
        <div className='card'>
            <h3>
                <a style={{ color: '#ededed' }} href={repo.html_url}>
                    {repo.name}
                </a>
            </h3>
        </div>
    );
};

export default RepoItem;
