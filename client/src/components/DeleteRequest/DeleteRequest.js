import React, { useState, useEffect } from 'react';
import './DeleteRequest.css';

const userDataDummy = [
  {
    "userId": 1,
    "username": "john_doe",
    "email": "john.doe@example.com",
    "fullName": "John Doe",
    "profilePictureUrl": "https://example.com/john_doe.jpg",
    "createdAt": "2023-01-01T12:00:00Z",
    "updatedAt": "2023-01-01T12:00:00Z"
  },
  {
    "userId": 2,
    "username": "jane_smith",
    "email": "jane.smith@example.com",
    "fullName": "Jane Smith",
    "profilePictureUrl": "https://example.com/jane_smith.jpg",
    "createdAt": "2023-01-02T12:00:00Z",
    "updatedAt": "2023-01-02T12:00:00Z"
  },
  {
    "userId": 3,
    "username": "bob_johnson",
    "email": "bob.johnson@example.com",
    "fullName": "Bob Johnson",
    "profilePictureUrl": "https://example.com/bob_johnson.jpg",
    "createdAt": "2023-01-03T12:00:00Z",
    "updatedAt": "2023-01-03T12:00:00Z"
  },
  {
    "userId": 4,
    "username": "alice_williams",
    "email": "alice.williams@example.com",
    "fullName": "Alice Williams",
    "profilePictureUrl": "https://example.com/alice_williams.jpg",
    "createdAt": "2023-01-04T12:00:00Z",
    "updatedAt": "2023-01-04T12:00:00Z"
  },
  {
    "userId": 5,
    "username": "charlie_brown",
    "email": "charlie.brown@example.com",
    "fullName": "Charlie Brown",
    "profilePictureUrl": "https://example.com/charlie_brown.jpg",
    "createdAt": "2023-01-05T12:00:00Z",
    "updatedAt": "2023-01-05T12:00:00Z"
  }
];

const DeleteRequest = () => {
  const [users, setUsers] = useState([]);
  console.log("line:200", users);
  const [dummyUsers, setDummyUsers] = useState([...userDataDummy]);
  console.log("line:300", dummyUsers);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3005/users');
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
    console.log("line:400", userId);
    try {
      // Delete the user from the API
      await fetch(`http://localhost:3005/users/${userId}`, {
        method: 'DELETE',
      });

      // Update the state to remove the deleted user from the API data
      setUsers(users.filter(user => user.userId !== userId));

      // Update the dummy data by removing the deleted user
      setDummyUsers(dummyUsers.filter(user => user.userId !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="users-heading">Delete Users</h2>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : users.length > 0 ? (
        <div>
          {users.map(user => (
            <div key={user.userId} className="user-container-delete">
              <div className="user-name">{user.fullName}</div>
              <div className="user-name">Id:{user.userId}</div>
              <button onClick={() => handleDeleteUser(user.userId)} className="delete-button">Delete</button>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>No users available from the API. Displaying dummy data:</p>
          <div>
            {dummyUsers.map(user => (
              <div key={user.userId} className="user-container-delete">
                <div className="user-name">{user.fullName}</div>
                <div className="user-name">Id:{user.userId}</div>
                <button onClick={() => handleDeleteUser(user.userId)} className="delete-button">Delete</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteRequest;
