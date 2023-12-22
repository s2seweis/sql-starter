import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './PostRequest.css';

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

const PostRequest = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    full_name: '',
    profile_picture_url: '',
  });

  // username, email, full_name, profile_picture_url

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [userData, setUserData] = useState(userDataDummy); // Set initial state to userDataDummy
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3005/users');
        if (response.data && response.data.length > 0) {
          setUserData(response.data);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const addUserData = async (e) => {
    e.preventDefault();

    // Check if username is provided before making the API call
    if (!formData.username) {
      console.error('Username is required.');
      return;
    }

    var data = new FormData();
    data.append('username', formData.username);
    data.append('email', formData.email);
    data.append('full_name', formData.full_name);
    data.append('profile_picture_url', formData.profile_picture_url);

    // username, email, full_name, profile_picture_url

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      const res = await axios.post('http://localhost:3005/users', data, config);

      if (res.data.status === 401 || !res.data) {
        console.log('API error, updating dummy data...');
        // If API call fails, update the dummy data instead
        updateDummyData(formData);
        setErrorMessage('Failed to add user via API. Dummy data updated.');
      } else {
        setSuccessMessage('User added successfully via API.');
        // If API call succeeds, update the dummy data with the new user
        updateDummyData(formData);
      }
    } catch (error) {
      // If API call fails, update the dummy data instead
      updateDummyData(formData);
      setErrorMessage('Failed to add user via API. Dummy data updated.');
    }


  };

  const updateDummyData = (newUserData) => {
    // Update the dummy data by adding the new user
    const updatedDummyData = [...userDataDummy, { id: userDataDummy.length + 1, ...newUserData }];
    // Update the state with the new dummy data
    setUserData(updatedDummyData);
  };

  // const isAuthenticatedOptions = [
  //   { value: true, label: 'True' },
  //   { value: false, label: 'False' },
  // ];

  return (
    <div className="post-request-container">
      <h2 className="users-heading">Add Users</h2>
      <form className='form-post' onSubmit={addUserData}>
        <div className="form-group">
          <label htmlFor="name">User Name:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
            placeholder="Enter user name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="Enter new email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="full_name">Full Name:</label>
          <input
            type="full_name"
            id="full_name"
            name="full_name"
            value={formData.full_name}
            onChange={handleInputChange}
            required
            placeholder="Enter full name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Profile Picture URL:</label>
          <input
            type="profile_picture_url"
            id="profile_picture_url"
            name="profile_picture_url"
            value={formData.profile_picture_url}
            onChange={handleInputChange}
            required
            placeholder="Enter profile image url"
          />
        </div>
        {/* <div className="form-group">
          <label htmlFor="isAuthenticated">Is Authenticated:</label>
          <Select
            id="isAuthenticated"
            name="isAuthenticated"
            value={isAuthenticatedOptions.find(option => option.value === formData.isAuthenticated)}
            onChange={(selectedOption) => setFormData({ ...formData, isAuthenticated: selectedOption.value })}
            options={isAuthenticatedOptions}
            required
          />
        </div> */}
        <div className="form-group">
          <button type="submit">Add User</button>
        </div>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* Display user data */}
      {/* <div className="user-data-container">
        <h3>User Data:</h3>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="user-list">
            {userData.map((user) => (
              <div key={user.userId} className="user-card">
                <img src={user.profilePictureUrl} alt={user.fullName} className="user-avatar" />
                <div className="user-info">
                  <p className="user-name">{user.fullName}</p>
                </div>
                  <p className="user-email">{user.email}</p>
              </div>
            ))}
          </div>
        )}
      </div> */}
    </div>
  );
};

export default PostRequest;
