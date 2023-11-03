import React from 'react';
import { Link } from 'react-router-dom';

import GetReguest from '../../components/GetRequest';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to My React App!</h1>
      <p>This is the landing page of my React app.</p>
      <h3>here you see the current users inside the Postgre Database:</h3>
      <GetReguest />
      {/* Use Link component instead of anchor tag */}
      <Link to="/post-request">
        <button className="primary">Click Me</button>
      </Link>
    </div>
  );
};

export default Home;
