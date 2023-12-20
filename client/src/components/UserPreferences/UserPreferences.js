import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserPreferences.css';
import { useNavigate } from 'react-router-dom';

const UserPreferences = (props) => {
  console.log("line:0", props);
  const navigate = useNavigate();

  const dummy = {
    last_login: "2023-12-19T08:30:00Z"
  };

  const [rerenderKey, setRerenderKey] = useState(0); // Key to force re-render
  const navigateToUserProfile = () => {
    setRerenderKey((prevKey) => prevKey + 1); // Increment the key to force re-render
  };

  const [formData, setFormData] = useState({
    user_id: props.userid,
    theme: '',
    language: '',
    receive_email_notifications: false,
    show_online_status: false,
  });

  console.log("line:1", formData);

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [userData, setUserData] = useState([]);
  console.log("line:2", userData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/user-preference`);
        console.log("line:3", response);

        if (response.data && response.data.length > 0) {
          const user = response.data.find((profile) => profile.userId === props?.userid);
          console.log("line:4", user); // Log the found user

          if (user) {
            // Set user data if available
            setFormData({
              user_id: user.userId,
              theme: user.theme || '',
              language: user.language || '',
              receive_email_notifications: user.receiveEmailNotifications || false,
              show_online_status: user.showOnlineStatus || false,
            });
            setUserData([user]);
          } else {
            // No user profile found, set user_id in formData to props.userid
            setFormData((prevFormData) => ({
              ...prevFormData,
              user_id: props.userid,
            }));
          }
        } else {
          // No user profiles available, set user_id in formData to props.userid
          setFormData((prevFormData) => ({
            ...prevFormData,
            user_id: props.userid,
          }));
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoading(false);
        setErrorMessage('Failed to fetch user data.');
      }
    };

    // Fetch user data when props.userid changes
    fetchUserData();
  }, [props.userid, rerenderKey]);

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? event.target.checked : value,
    }));
  };

  const addUserData = async (e) => {
    e.preventDefault();

    const data = {
      user_id: formData.user_id,
      theme: formData.theme,
      language: formData.language,
      receive_email_notifications: formData.receive_email_notifications,
      show_online_status: formData.show_online_status,
    };

    console.log("line:5", data);

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('http://localhost:3005/user-preference', data, config);

      if (res.data.status === 401 || !res.data) {
        console.log('API error, updating dummy data...');
        setErrorMessage('Failed to add user preferences via API. Dummy data updated.');
      } else {
        console.log('Success!');
        setSuccessMessage('User preferences added successfully via API.');
        navigateToUserProfile();
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to add user preferences via API. User preferences already exist.');
    }
  };

  const updateUserData = async (e, userId) => {
    e.preventDefault();

    const data = {
      user_id: formData.user_id,
      theme: formData.theme,
      language: formData.language,
      receive_email_notifications: formData.receive_email_notifications,
      show_online_status: formData.show_online_status,
    };

    console.log("line:6", data);

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    console.log("line:7", userId);

    try {
      const res = await axios.put(`http://localhost:3005/user-preference/${userId}`, data, config);

      if (res.data) {
        console.log('Success!');
        setSuccessMessage('User preferences updated successfully via API.');
        navigateToUserProfile();
      } else {
        console.log('API error, updating dummy data...');
        setErrorMessage('Failed to update user preferences via API. Dummy data updated.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to update user preferences via API.');
    }
  };

  const userExists = userData.length > 0;

  return (
    <div className="post-request-container">
      <h2 className="users-heading">User Preferences</h2>
      <form className="form-post" onSubmit={addUserData}>
        <div className="form-group">
          <label htmlFor="user_id">User ID:</label>
          <input
            type="text"
            id="user_id"
            name="user_id"
            value={formData.user_id}
            onChange={handleInputChange}
            placeholder="Enter user ID"
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="theme">Theme:</label>
          <input
            type="text"
            id="theme"
            name="theme"
            value={formData.theme}
            onChange={handleInputChange}
            placeholder="Enter theme"
          />
        </div>
        <div className="form-group">
          <label htmlFor="language">Language:</label>
          <input
            type="text"
            id="language"
            name="language"
            value={formData.language}
            onChange={handleInputChange}
            placeholder="Enter language"
          />
        </div>
        <div className="form-group">
          <label htmlFor="receive_email_notifications">Receive Email Notifications:</label>
          <input
            type="checkbox"
            id="receive_email_notifications"
            name="receive_email_notifications"
            checked={formData.receive_email_notifications}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="show_online_status">Show Online Status:</label>
          <input
            type="checkbox"
            id="show_online_status"
            name="show_online_status"
            checked={formData.show_online_status}
            onChange={handleInputChange}
          />
        </div>

        {!userExists && (
          <button type="submit">
            {userExists ? 'Update' : 'Add User Preferences'}
          </button>
        )}
        {userExists && (
          <button type="button" onClick={(e) => updateUserData(e, formData.user_id)}>
            Update
          </button>
        )}
      </form>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="user-data-container">
        <h3>User Preferences:</h3>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="user-list">
            {userData.map((user) => (
              <div key={user.user_id} className="user-card">
                <div className="user-info" style={{ display: "block" }}>
                  <label>User Id:</label>
                  <p className="user-name">{user.userId}</p>
                  <label>Theme:</label>
                  <p className="user-name">{user.theme}</p>
                  <label>Language:</label>
                  <p className="user-name">{user.language}</p>
                  <label>Receive Email Notifications:</label>
                  <p className="user-name">{user.receiveEmailNotifications.toString()}</p>
                  <label>Show Online Status:</label>
                  <p className="user-name">{user.showOnlineStatus.toString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPreferences;
