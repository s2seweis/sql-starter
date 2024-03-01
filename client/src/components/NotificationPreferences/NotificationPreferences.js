import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NotificationPreferences.css';
import { useNavigate } from 'react-router-dom';

const NotificationPreferences = (props) => {
  const navigate = useNavigate();

  const [rerenderKey, setRerenderKey] = useState(0);
  const navigateToUserProfile = () => {
    setRerenderKey((prevKey) => prevKey + 1);
  };

  const [formData, setFormData] = useState({
    user_id: props.userid,
    email_notifications: "",
    push_notifications: "",
    sms_notifications: "",
    in_app_notifications: "",
  });

  // console.log("line:1", formData);

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [userPreferences, setUserPreferences] = useState([]);
  // console.log("line:3", userPreferences);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserPreferences = async () => {
      try {
        const response = await axios.get(`https://express-for-postgre-933b44694c3e.herokuapp.com/login/notification-preference`);
        // console.log("line:6", response);
        if (response.data && response.data.length > 0) {
          const userPreference = response.data.find((preference) => preference.userId === props?.userid);
          // console.log("line:2", userPreference);
          if (userPreference) {
            setFormData({
              user_id: userPreference.userId,
              email_notifications: userPreference.emailNotifications ,
              push_notifications: userPreference.pushNotifications ,
              sms_notifications: userPreference.smsNotifications ,
              in_app_notifications: userPreference.inAppNotifications ,
            });
            setUserPreferences([userPreference]);
          } else {
            setFormData((prevFormData) => ({
              ...prevFormData,
              user_id: props.userid,
            }));
          }
        } else {
          setFormData((prevFormData) => ({
            ...prevFormData,
            user_id: props.userid,
          }));
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user preferences:', error);
        setIsLoading(false);
        setErrorMessage('Failed to fetch user preferences.');
      }
    };

    fetchUserPreferences();
  }, [props.userid, rerenderKey]);

  // const handleInputChange = (event) => {
  //   const { name, checked } = event.target;
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: checked,
  //   }));
  // };

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? event.target.checked : value,
    }));
  };

  const addUserPreferences = async (e) => {
    e.preventDefault();

    const data = {
      user_id: formData.user_id,
      email_notifications: formData.email_notifications,
      push_notifications: formData.push_notifications,
      sms_notifications: formData.sms_notifications,
      in_app_notifications: formData.in_app_notifications,
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('https://express-for-postgre-933b44694c3e.herokuapp.com/login/notification-preference', data, config);

      if (res.data.status === 401 || !res.data) {
        setErrorMessage('Failed to add user preferences via API. Dummy data updated.');
      } else {
        setSuccessMessage('User preferences added successfully via API.');
        navigateToUserProfile();
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to add user preferences via API. User preferences already exist.');
    }
  };

  const updateUserPreferences = async (e, userId) => {
    e.preventDefault();

    const data = {
      user_id: formData.user_id,
      email_notifications: formData.email_notifications,
      push_notifications: formData.push_notifications,
      sms_notifications: formData.sms_notifications,
      in_app_notifications: formData.in_app_notifications,
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(`https://express-for-postgre-933b44694c3e.herokuapp.com/login/notification-preference/${userId}`, data, config);

      if (res.data) {
        setSuccessMessage('User preferences updated successfully via API.');
        navigateToUserProfile();
      } else {
        setErrorMessage('Failed to update user preferences via API. Dummy data updated.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to update user preferences via API.');
    }
  };

  const userExists = userPreferences.length > 0;

  return (
    <div className="post-request-container">
      <h2 className="users-heading">User Preferences</h2>
      <form className="form-post" onSubmit={addUserPreferences}>
        <div className="form-group">
          <label htmlFor="user_id">User ID:</label>
          <input
            type="text"
            id="user_id"
            name="user_id"
            value={formData.user_id}
            onChange={() => {}}
            placeholder="Enter user ID"
            disabled
          />
        </div>
        <div className="form-group">
          <label>Email Notifications:</label>
          <input
            type="checkbox"
            id="email_notifications"
            name="email_notifications"
            checked={formData.email_notifications}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Push Notifications:</label>
          <input
            type="checkbox"
            id="push_notifications"
            name="push_notifications"
            checked={formData.push_notifications}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>SMS Notifications:</label>
          <input
            type="checkbox"
            id="sms_notifications"
            name="sms_notifications"
            checked={formData.sms_notifications}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>In-App Notifications:</label>
          <input
            type="checkbox"
            id="in_app_notifications"
            name="in_app_notifications"
            checked={formData.in_app_notifications}
            onChange={handleInputChange}
          />
        </div>

        {!userExists && (
          <button type="submit">
            {userExists ? 'Update' : 'Add User Preferences'}
          </button>
        )}
        {userExists && (
          <button type="button" onClick={(e) => updateUserPreferences(e, formData.user_id)}>
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
            {userPreferences.map((userPreference) => (
              <div key={userPreference.user_id} className="user-card">
                <div className="user-info" style={{ display: "block" }}>
                  <label>User Id:</label>
                  <p className="user-name">{userPreference.user_id}</p>
                  <label>Email Notifications:</label>
                  <p className="user-name">{userPreference.emailNotifications.toString()}</p>
                  <label>Push Notifications:</label>
                  <p className="user-name">{userPreference.pushNotifications.toString()}</p>
                  <label>SMS Notifications:</label>
                  <p className="user-name">{userPreference.smsNotifications.toString()}</p>
                  <label>In-App Notifications:</label>
                  <p className="user-name">{userPreference.inAppNotifications.toString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPreferences;
