import React from 'react';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to My React App!</h1>
      <p>This is the landing page of my React app.</p>
      <a href="/post-request">
        <button className="primary">Click Me</button>
      </a>
    </div>
  );
};

export default Home;
