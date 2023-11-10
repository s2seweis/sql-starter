import React, { useState, useEffect } from 'react';
import './GetRequest.css';  // Import the CSS file

const userDataDummy = [
  {
    "id": 1,
    "name": "John Doe"
  },
  {
    "id": 2,
    "name": "Jane Smith"
  },
  {
    "id": 3,
    "name": "Bob Johnson"
  },
  {
    "id": 4,
    "name": "Alice Williams"
  },
  {
    "id": 5,
    "name": "Charlie Brown"
  },
  {
    "id": 6,
    "name": "Eva Martinez"
  }
];

const GetRequest = () => {
  const [users, setUsers] = useState([]);
  const [dummyUsers, setDummyUsers] = useState([...userDataDummy]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/users');
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      // Delete the user from the API
      await fetch(`/users/${userId}`, {
        method: 'DELETE',
      });

      // Update the state to remove the deleted user from the API data
      setUsers(users.filter(user => user.id !== userId));

      // Update the dummy data by removing the deleted user
      setDummyUsers(dummyUsers.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="container">
      <h4 className="heading">Get Request</h4>
      <h2 className="users-heading">Users</h2>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : users.length > 0 ? (
        <div>
          {users.map(user => (
            <div key={user.id} className="user-container">
              <span className="user-name">{user.name}</span>
              <button onClick={() => handleDeleteUser(user.id)} className="delete-button">Delete</button>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>No users available from the API. Displaying dummy data:</p>
          <div>
            {dummyUsers.map(user => (
              <div key={user.id} className="user-container">
                <span className="user-name">{user.name}</span>
                <button onClick={() => handleDeleteUser(user.id)} className="delete-button">Delete</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GetRequest;
