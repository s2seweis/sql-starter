import React, { useState, useEffect } from 'react';
import './UpdateRequest.css';
// import PostRequest from '../PostRequest/PostRequest';
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

  const fetchUsersData = async () => {
    try {
      const response = await fetch('https://express-for-postgre-933b44694c3e.herokuapp.com/users');
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

  useEffect(() => {
    fetchUsersData();
  }, [updateFormData, selectedUserId]);

  const handleToggleUpdateForm = (userId) => {
    setUpdateFormData((prevFormData) => {
      if (selectedUserId !== userId) {
        const userToUpdate = users.length > 0
          ? users.find((user) => user.userId === userId)
          : dummyUsers.find((user) => user.userId === userId);

        return {
          ...prevFormData,
          [userId]: { ...userToUpdate } || {},
        };
      }

      return prevFormData;
    });

    setSelectedUserId((prevUserId) => (prevUserId === userId ? null : userId));
  };

  const handleUpdateFormDataChange = (userId, field, value) => {
    setUpdateFormData((prevFormData) => ({
      ...prevFormData,
      [userId]: { ...prevFormData[userId], [field]: value },
    }));
  };

  const handleUpdateUser = async (e, userId) => {
    e.preventDefault();
    const { username, fullName, email, profilePictureUrl } = updateFormData[userId] || {};

    try {
      await fetch(`https://express-for-postgre-933b44694c3e.herokuapp.com/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, fullName, email, profilePictureUrl }),
      });

      setUpdateFormData((prevFormData) => {
        const { [userId]: omit, ...rest } = prevFormData;
        return rest;
      });

      setSelectedUserId(null);

      fetchUsersData();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      // Delete the user from the API
      // await fetch(`https://express-for-postgre-933b44694c3e.herokuapp.com/delete/${userId}`, {
      //   method: 'DELETE',
      await fetch(`https://express-for-postgre-933b44694c3e.herokuapp.com/users/${userId}`, {
        method: 'DELETE',
      });

      // Update the state to remove the deleted user from the API data
      setUsers(users.filter(user => user.userId !== userId));

      // Update the dummy data by removing the deleted user
      setDummyUsers(dummyUsers.filter(user => user.userId !== userId));
      localStorage.removeItem('token');
      window.location.reload()
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="update-request-container">
      {/* <PostRequest/> */}
      <h2 className="update-request-heading">Update Users</h2>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : users.length > 0 ? (
        <div>
          {users.map((user) => (
            <div key={user.userId} className={`user-container ${selectedUserId === user.userId ? 'open' : ''}`}>
              <div className="user-info">
                <span className="user-name">
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
                    <label htmlFor={`newName_${user.userId}`}>User ID:</label>
                    <input
                      type="number"
                      id={`newName_${user.userId}`}
                      placeholder="Your ID"
                      value={updateFormData[user.userId]?.userId || ''}
                      onChange={(e) => handleUpdateFormDataChange(user.userId, '', e.target.value)}
                      disabled
                    />
                    <label htmlFor={`newName_${user.userId}`}>Username:</label>
                    <input
                      type="text"
                      id={`newName_${user.userId}`}
                      placeholder="Enter new name"
                      value={updateFormData[user.userId]?.username || ''}
                      onChange={(e) => handleUpdateFormDataChange(user.userId, 'username', e.target.value)}
                    />
                    <label htmlFor={`newName_${user.userId}`}>Full Name:</label>
                    <input
                      type="text"
                      id={`newName_${user.userId}`}
                      placeholder="Enter new name"
                      value={updateFormData[user.userId]?.fullName || ''}
                      onChange={(e) => handleUpdateFormDataChange(user.userId, 'fullName', e.target.value)}
                    />
                    <label htmlFor={`newAge_${user.userId}`}>Email:</label>
                    <input
                      type="text"
                      id={`newAge_${user.userId}`}
                      placeholder="Enter Email"
                      value={updateFormData[user.userId]?.email || ''}
                      onChange={(e) => handleUpdateFormDataChange(user.userId, 'email', e.target.value)}
                    />
                    <label htmlFor={`newAge_${user.userId}`}>Profile Picture Url</label>
                    <input
                      type="text"
                      id={`newAge_${user.userId}`}
                      placeholder="Profile Picture Url"
                      value={updateFormData[user.userId]?.profilePictureUrl || ''}
                      onChange={(e) => handleUpdateFormDataChange(user.userId, 'profilePictureUrl', e.target.value)}
                    />
                  </div>
                  <div className="form-fields-second">
                    <button type="submit" className="update-button">
                      Update
                    </button>
                    <button onClick={() => handleDeleteUser(user.userId)} className="delete-button">Delete</button>
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
                <span className="user-name" >
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
                    <label htmlFor={`newName_${user.userId}`}>User ID:</label>
                    <input
                      type="number"
                      id={`newName_${user.userId}`}
                      placeholder="Your ID"
                      value={updateFormData[user.userId]?.userId || ''}
                      onChange={(e) => handleUpdateFormDataChange(user.userId, '', e.target.value)}
                      disabled
                    />
                    <label htmlFor={`newName_${user.userId}`}>Username:</label>
                    <input
                      type="text"
                      id={`newName_${user.userId}`}
                      placeholder="Enter new name"
                      value={updateFormData[user.userId]?.username || ''}
                      onChange={(e) => handleUpdateFormDataChange(user.userId, 'username', e.target.value)}
                    />
                    <label htmlFor={`newName_${user.userId}`}>Full Name:</label>
                    <input
                      type="text"
                      id={`newName_${user.userId}`}
                      placeholder="Enter new name"
                      value={updateFormData[user.userId]?.fullName || ''}
                      onChange={(e) => handleUpdateFormDataChange(user.userId, 'fullName', e.target.value)}
                    />
                    <label htmlFor={`newAge_${user.userId}`}>Email:</label>
                    <input
                      type="text"
                      id={`newAge_${user.userId}`}
                      placeholder="Enter Email"
                      value={updateFormData[user.userId]?.email || ''}
                      onChange={(e) => handleUpdateFormDataChange(user.userId, 'email', e.target.value)}
                    />
                    <label htmlFor={`newAge_${user.userId}`}>Profile Picture Url</label>
                    <input
                      type="text"
                      id={`newAge_${user.userId}`}
                      placeholder="Profile Picture Url"
                      value={updateFormData[user.userId]?.profilePictureUrl || ''}
                      onChange={(e) => handleUpdateFormDataChange(user.userId, 'profilePictureUrl', e.target.value)}
                    />
                  </div>
                  <div className="form-fields-second">
                    <button type="submit" className="update-button">
                      Update
                    </button>
                    <button onClick={() => handleDeleteUser(user.userId)} className="delete-button">Delete</button>
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
