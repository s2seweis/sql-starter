import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AccountStatus.css';
import { useNavigate } from 'react-router-dom';

const AccountStatus = (props) => {
  // console.log("line:0", props);
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
    is_active: false,
    is_suspended: false,
    is_deactivated: false,
    last_login: '' || dummy.last_login,
  });

  // console.log("line:1", formData);

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [userData, setUserData] = useState([]);
  // console.log("line:2", userData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/account-status`);
        // console.log("line:3", response);

        if (response.data && response.data.length > 0) {
          const user = response.data.find((profile) => profile.userId === props?.userid);
          // console.log("line:4", user); // Log the found user

          if (user) {
            // Set user data if available
            setFormData({
              user_id: user.userId,
              is_active: user.isActive || false,
              is_suspended: user.isSuspended || false,
              is_deactivated: user.isDeactivated || false,
              last_login: user.lastLogin || '',
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

    // if (!formData.is_active && !formData.is_suspended && !formData.is_deactivated) {
    //   console.error('At least one status property is required.');
    //   return;
    // }

    const data = {
      user_id: formData.user_id,
      is_active: formData.is_active,
      is_suspended: formData.is_suspended,
      is_deactivated: formData.is_deactivated,
      last_login: formData.last_login,
    };

    // console.log("line:5", data);

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('http://localhost:3005/account-status', data, config);

      if (res.data.status === 401 || !res.data) {
        console.log('API error, updating dummy data...');
        setErrorMessage('Failed to add user via API. Dummy data updated.');
      } else {
        console.log('Success!');
        setSuccessMessage('User added successfully via API.');
        navigateToUserProfile();
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to add user via API. Userprofile already exists.');
    }
  };

  const updateUserData = async (e, userId) => {
    e.preventDefault();

    // if (!formData.is_active && !formData.is_suspended && !formData.is_deactivated) {
    //   console.error('At least one status property is required.');
    //   return;
    // }

    const data = {
      user_id: formData.user_id,
      is_active: formData.is_active,
      is_suspended: formData.is_suspended,
      is_deactivated: formData.is_deactivated,
      last_login: formData.last_login,
    };

    // console.log("line:6", data);

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // console.log("line:7", userId);

    try {
      // Ensure that you are using the correct endpoint for updating a user profile
      const res = await axios.put(`http://localhost:3005/account-status/${userId}`, data, config);

      if (res.data) {
        console.log('Success!');
        setSuccessMessage('User updated successfully via API.');
        navigateToUserProfile();
      } else {
        console.log('API error, updating dummy data...');
        setErrorMessage('Failed to update user via API. Dummy data updated.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to update user via API.');
    }
  };

  const userExists = userData.length > 0;

  return (
    <div className="post-request-container">
      <h2 className="users-heading">Account Status Details</h2>
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
          <label htmlFor="is_active">Active:</label>
          <input
            type="checkbox"
            id="is_active"
            name="is_active"
            checked={formData.is_active}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="is_suspended">Suspended:</label>
          <input
            type="checkbox"
            id="is_suspended"
            name="is_suspended"
            checked={formData.is_suspended}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="is_deactivated">Deactivated:</label>
          <input
            type="checkbox"
            id="is_deactivated"
            name="is_deactivated"
            checked={formData.is_deactivated}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="last_login">Last Login:</label>
          <input
            type="text"
            id="last_login"
            name="last_login"
            value={formData.last_login || dummy.last_login}
            onChange={handleInputChange}
            placeholder="Enter last login"
            disabled
          />
        </div>

        {!userExists && (
          <button type="submit">
            {userExists ? 'Update' : 'Add User'}
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
        <h3>User Profile:</h3>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="user-list">
            {userData.map((user) => (
              <div key={user.user_id} className="user-card">
                <div className="user-info" style={{display:"block"}}>
                  <label>User Id:</label>
                  <p className="user-name">{user.userId}</p>
                  <label>Active:</label>
                  <p className="user-name">{user.isActive.toString()}</p>
                  <label>Deactivated:</label>
                  <p className="user-name">{user.isDeactivated.toString()}</p>
                  <label>Suspended:</label>
                  <p className="user-name">{user.isSuspended.toString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountStatus;
