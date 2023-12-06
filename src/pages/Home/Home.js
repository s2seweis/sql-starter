/* eslint-disable */
import React from 'react';
// import { Link } from 'react-router-dom';

import GetReguest from '../../components/GetRequest/GetRequest';
import PostRequest from '../../components/PostRequest/PostRequest';
import UpdateRequest from '../../components/UpdateRequest/UpdateRequest';

const Home = () => {
    return (
        <div style={{margin:"15px"}} className="home-container">
            <h1>Welcome to My React App with Postgre</h1>
            <p>Sending Reuests to the Server and querry for the data in the Postgre database.</p>
            <GetReguest />
            <PostRequest/>
            <UpdateRequest/>
            {/* <Link to="/post-request">
                <button className="primary">Click Me</button>
            </Link> */}
        </div>
    );
};

export default Home;