import React, { useState, useEffect } from 'react';
import './GetRequest.css'; // Import the CSS file

const userDataDummy =
  [
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

const GetRequest = () => {
  const [users, setUsers] = useState([]);
  const [dummyUsers, setDummyUsers] = useState([...userDataDummy]);
  const [loading, setLoading] = useState(true);
  const [expandedUserId, setExpandedUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://express-for-postgre-933b44694c3e.herokuapp.com/users');
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

  const toggleUserDetails = (userId) => {
    setExpandedUserId((prevId) => (prevId === userId ? null : userId));
  };

  return (
    <div className="container">
      <h2 className="users-heading"> Get Users</h2>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : users.length > 0 ? (
        <div>
          {users.map((user) => (
            <div key={user.userId} className="user-container">
              <div className="user-info">
                <label>Name:</label>
                <span className="user-name">{user.fullName}</span>
                <button
                  onClick={() => toggleUserDetails(user.userId)}
                  className={expandedUserId === user.userId ? 'active' : ''}
                >
                  {expandedUserId === user.userId ? 'Close' : 'See Details'}
                </button>
              </div>
              {expandedUserId === user.userId && (
                <div className="user-details">
                  <p>UserName: {user.username}</p>
                  <p>UserId: {user.userId}</p>
                  <p>Email: {user.email}</p>
                  <p>Created: {user.createdAt}</p>
                  <p>Updated: {user.updatedAt}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>No users available from the API. Displaying dummy data:</p>
          <div>
            {dummyUsers.map((user) => (
              <div key={user.userId} className="user-container">
                <div className="user-info">
                <label>Name:</label>
                  <span className="user-name">{user.fullName}</span>
                  <button
                    onClick={() => toggleUserDetails(user.userId)}
                    className={expandedUserId === user.userId ? 'active' : ''}
                  >
                    {expandedUserId === user.userId ? 'Close' : 'See Details'}
                  </button>
                </div>
                {expandedUserId === user.userId && (
                  <div className="user-details">
                    <p>UserName: {user.username}</p>
                    <p>UserId: {user.userId}</p>
                    <p>Email: {user.email}</p>
                    <p>Created: {user.createdAt}</p>
                    <p>Updated: {user.updatedAt}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GetRequest;
