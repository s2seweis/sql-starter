import React from 'react';
import { Link } from 'react-router-dom';

import GetReguest from '../../components/GetRequest/GetRequest';
import PostRequest from '../../components/PostRequest/PostRequest';

const Home = () => {
    return (
        <div style={{margin:"15px"}} className="home-container">
            <h1>Welcome to My React App!</h1>
            <p>This is the landing page of my Client for sending Reuests to the Server</p>
            <h3>here you see the current users inside the Postgre Database:</h3>
            <GetReguest />
            <PostRequest/>
            {/* <Link to="/post-request">
                <button className="primary">Click Me</button>
            </Link> */}
        </div>
    );
};

export default Home;
