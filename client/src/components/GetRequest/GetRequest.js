import React, { useState, useEffect } from 'react';

const GetRequest = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false); // Set loading to false if there's an error
      }
    };

    // Call the async function
    fetchUsers();
  }, []); // The empty array ensures that this effect runs once after the initial render

  return (
    <div style={{ marginBottom: '100px' }}>
      <h2>Users</h2>
      {/* Display loading message if data is being fetched */}
      {loading ? (
        <p>Loading...</p>
      ) : users.length > 0 ? ( // Check if users array is not empty
        <ul>
          {/* Render the list of users */}
          {users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      ) : (
        <p>No users available</p>
      )}
    </div>
  );
};

export default GetRequest;
