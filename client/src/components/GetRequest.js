import React, { useState, useEffect } from 'react';

const GetReguest = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Define an async function to fetch data from the API
    const fetchUsers = async () => {
      try {
        // Make a GET request to the /users route
        const response = await fetch('/users');

        // Parse the JSON response
        const data = await response.json();

        // Update the state with the fetched users
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    // Call the async function
    fetchUsers();
  }, []); // The empty array ensures that this effect runs once after the initial render

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {/* Render the list of users */}
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GetReguest;
