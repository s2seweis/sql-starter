import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Playground.css';

const GetUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://express-for-postgre-933b44694c3e.herokuapp.com/login/users'); // Assuming your API is hosted at '/api'
        // for fix the error with the proxi, use an other node version then 18
        setUsers(response.data);
      } catch (error) {
        console.error('Error getting users:', error.message);
        // Handle error, show a message to the user, etc.
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that the effect runs only once, similar to componentDidMount

  return (
    <div>
      <h1>Users List</h1>
      <div>
        {users.map((user) => (
          <div className='card-container' key={user.user_id}>
            <strong>Username:</strong> {user.username} <br />
            <strong>Email:</strong> {user.email} <br />
            <strong>Full Name:</strong> {user.fullName} <br />
            <strong>Profile Picture URL:</strong> {user.profilePictureUrl} <br />
            <strong>Created At:</strong> {user.createdAt} <br />
            <strong>Updated At:</strong> {user.updatedAt}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetUsers;
