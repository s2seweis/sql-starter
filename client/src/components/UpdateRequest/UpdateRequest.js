// UpdateRequest.js
import React, { useState, useEffect } from 'react';
import './UpdateRequest.css';

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

const UpdateRequest = () => {
  const [users, setUsers] = useState([]);
  const [dummyUsers, setDummyUsers] = useState([...userDataDummy]);
  const [loading, setLoading] = useState(true);
  const [updateFormData, setUpdateFormData] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showDummyDataMessage, setShowDummyDataMessage] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/users');
        const data = await response.json();
        setUsers(data);
        setLoading(false);
        setShowDummyDataMessage(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
        setDummyUsers(userDataDummy);
        setShowDummyDataMessage(true);
      }
    };

    fetchUsers();
  }, []);

  const handleToggleUpdateForm = (userId) => {
    setSelectedUserId(selectedUserId === userId ? null : userId);
    setUpdateFormData((prevFormData) => ({
      ...prevFormData,
      [userId]: selectedUserId === userId ? {} : { ...dummyUsers.find((user) => user.userId === userId) },
    }));
  };

  const handleUpdateFormDataChange = (userId, field, value) => {
    setUpdateFormData((prevFormData) => ({
      ...prevFormData,
      [userId]: { ...prevFormData[userId], [field]: value },
    }));
  };

  const handleUpdateUser = async (e, userId) => {
    e.preventDefault();
    const { fullName, age, isAuthenticated } = updateFormData[userId];

    try {
      await fetch(`/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, age, isAuthenticated }),
      });

      setDummyUsers((prevDummyUsers) =>
        prevDummyUsers.map((user) =>
          user.userId === userId
            ? { ...user, ...(fullName && { fullName }), ...(age && { age }), ...(isAuthenticated !== undefined && { isAuthenticated }) }
            : user
        )
      );

      setUpdateFormData((prevFormData) => {
        const { [userId]: omit, ...rest } = prevFormData;
        return rest;
      });

      setSelectedUserId(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="update-request-container">
      <h2 className="update-request-heading">Update Users</h2>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : users.length > 0 ? (
        <div>
          {users.map((user) => (
            <div key={user.userId} className={`user-container ${selectedUserId === user.userId ? 'open' : ''}`}>
              <div className="user-info">
                <span className="user-name" onClick={() => handleToggleUpdateForm(user.userId)}>
                  {user.fullName}
                </span>
                <button
                  className={`toggle-button ${selectedUserId === user.userId ? 'red' : ''}`}
                  onClick={() => handleToggleUpdateForm(user.userId)}
                >
                  {selectedUserId === user.userId ? 'Close' : 'Open Profile'}
                </button>
              </div>
              {selectedUserId === user.userId && (
                <form onSubmit={(e) => handleUpdateUser(e, user.userId)} className="update-form">
                  <div className="form-fields">
                    <label htmlFor={`newName_${user.userId}`}>Full Name:</label>
                    <input
                      type="text"
                      id={`newName_${user.userId}`}
                      placeholder="Enter new name"
                      value={updateFormData[user.userId]?.fullName || ''}
                      onChange={(e) => handleUpdateFormDataChange(user.userId, 'fullName', e.target.value)}
                    />
                    <label htmlFor={`newAge_${user.userId}`}>New Age:</label>
                    <input
                      type="number"
                      id={`newAge_${user.userId}`}
                      placeholder="Enter new age"
                      value={updateFormData[user.userId]?.age || ''}
                      onChange={(e) => handleUpdateFormDataChange(user.userId, 'age', e.target.value)}
                    />
                    <label htmlFor={`newIsAuthenticated_${user.userId}`}>Toggle Authentication:</label>
                    <select
                      id={`newIsAuthenticated_${user.userId}`}
                      value={updateFormData[user.userId]?.isAuthenticated || ''}
                      onChange={(e) => handleUpdateFormDataChange(user.userId, 'isAuthenticated', e.target.value)}
                    >
                      <option value={true}>True</option>
                      <option value={false}>False</option>
                    </select>
                  </div>
                  <div className="form-fields">
                    <button type="submit" className="update-button">
                      Update
                    </button>
                    <button type="button" className="close-button" onClick={() => handleToggleUpdateForm(user.userId)}>
                      Close
                    </button>
                  </div>
                </form>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div>
          {showDummyDataMessage && <p>No users available from the API. Displaying dummy data:</p>}
          {dummyUsers.map((user) => (
            <div key={user.userId} className={`user-container ${selectedUserId === user.userId ? 'open' : ''}`}>
              <div className="user-info">
                <span className="user-name" onClick={() => handleToggleUpdateForm(user.userId)}>
                  {user.fullName}
                </span>
                <button
                  className={`toggle-button ${selectedUserId === user.userId ? 'red' : ''}`}
                  onClick={() => handleToggleUpdateForm(user.userId)}
                >
                  {selectedUserId === user.userId ? 'Close' : 'Open Profile'}
                </button>
              </div>
              {selectedUserId === user.userId && (
                <form onSubmit={(e) => handleUpdateUser(e, user.userId)} className="update-form">
                  <div className="form-fields">
                    <label htmlFor={`newName_${user.userId}`}>Full Name:</label>
                    <input
                      type="text"
                      id={`newName_${user.userId}`}
                      placeholder="Enter new name"
                      value={updateFormData[user.userId]?.fullName || ''}
                      onChange={(e) => handleUpdateFormDataChange(user
                        .userId, 'fullName', e.target.value)}
                    />
                    <label htmlFor={`newAge_${user.userId}`}>Email:</label>
                    <input
                      type="text"
                      id={`newAge_${user.userId}`}
                      placeholder="Enter new age"
                      value={updateFormData[user.userId]?.email || ''}
                      onChange={(e) => handleUpdateFormDataChange(user.userId, 'age', e.target.value)}
                    />
                    <label htmlFor={`newIsAuthenticated_${user.userId}`}>Toggle Authentication:</label>

                    <select
                      id={`newIsAuthenticated_${user.userId}`}
                      value={updateFormData[user.userId]?.isAuthenticated || ''}
                      onChange={(e) => handleUpdateFormDataChange(user.userId, 'isAuthenticated', e.target.value)}
                    >
                      <option value={true}>True</option>
                      <option value={false}>False</option>
                    </select>

                  </div>
                  <div className="form-fields">
                    <button type="submit" className="update-button">
                      Update
                    </button>
                    {/* <button type="button" className="close-button" onClick={() => handleToggleUpdateForm(user.userId)}>
                      Close
                    </button> */}
                  </div>
                </form>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpdateRequest;
