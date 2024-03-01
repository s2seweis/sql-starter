import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserProfile.css';
import { useNavigate } from 'react-router-dom';

const UserProfile = (props) => {

  const navigate = useNavigate();

  const [rerenderKey, setRerenderKey] = useState(0); // Key to force re-render

  const navigateToUserProfile = () => {
    setRerenderKey((prevKey) => prevKey + 1); // Increment the key to force re-render
  };

  // console.log("line:1", props.userid);

  const [formData, setFormData] = useState({
    user_id: props.userid,
    bio: '',
    date_of_birth: '',
    location: '',
    website_url: '',
    profile_picture_url: '',
  });

  // console.log("line:2", formData);

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [userData, setUserData] = useState([]);
  // console.log("line3", userData);
  const [isLoading, setIsLoading] = useState(true);

  const dateOfBirthArray = userData.map(item => item.dateOfBirth.substring(0, 10));
  const concatenatedDateOfBirth = dateOfBirthArray.join(', ');

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      date_of_birth: concatenatedDateOfBirth || '',
    }));
  }, [concatenatedDateOfBirth]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://express-for-postgre-933b44694c3e.herokuapp.com/userprofile`);
        console.log("line:3", response);

        if (response.data && response.data.length > 0) {
          const user = response.data.find((profile) => profile.userId === props?.userid);
          console.log("line:4", user); // Log the found user

          if (user) {
            // Set user data if available
            setFormData((prevFormData) => ({
              ...prevFormData,
              user_id: user.userId,
              bio: user.bio || '',
              date_of_birth: user.dateOfBirth || '',
              location: user.location || '',
              website_url: user.websiteUrl || '',
              profile_picture_url: user.profilePictureUrl || '',
            }));
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
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  // ### Add UserProfile

  
  const addUserData = async (e) => {
    e.preventDefault();
    
    if (!formData.bio) {
      console.error('Bio is required.');
      return;
    }

    const data = {
      user_id: formData.user_id,
      bio: formData.bio,
      date_of_birth: formData.date_of_birth,
      location: formData.location,
      website_url: formData.website_url,
      profile_picture_url: formData.profile_picture_url,
    };

    console.log("line:5", data);

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('https://express-for-postgre-933b44694c3e.herokuapp.com/userprofile', data, config);

      if (res.data.status === 401 || !res.data) {
        console.log('API error, updating dummy data...');
        setErrorMessage('Failed to add user via API. Dummy data updated.');
      } else {
        console.log('Success!');
        setSuccessMessage('User added successfully via API.');
        // window.location.href = '/userprofile';
        navigateToUserProfile();
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to add user via API. Userprofile already exists.');
    }
  };

 

  // ### Update UserProfile

  const updateUserData = async (e, userId) => {
    e.preventDefault();
    console.log("line:905", userId);

    if (!formData.bio) {
      console.error('Bio is required.');
      return;
    }

    const data = {
      user_id: formData.user_id,
      bio: formData.bio,
      date_of_birth: formData.date_of_birth,
      location: formData.location,
      website_url: formData.website_url,
      profile_picture_url: formData.profile_picture_url,
    };

    console.log("line:901", data);

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    console.log("line:906", userId);

    try {
      // Ensure that you are using the correct endpoint for updating a user profile
      const res = await axios.put(`https://express-for-postgre-933b44694c3e.herokuapp.com/userprofile/${userId}`, data, config);

      if (res.data) {
        console.log('Success!');
        setSuccessMessage('User updated successfully via API.');
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
      <h2 className="users-heading">Add User Profile</h2>
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
          <label htmlFor="date_of_birth">Date of Birth:</label>
          <input
            type="date"
            id="date_of_birth"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Enter user location"
          />
        </div>
        <div className="form-group">
          <label htmlFor="website_url">Website URL:</label>
          <input
            type="text"
            id="website_url"
            name="website_url"
            value={formData.website_url}
            onChange={handleInputChange}
            placeholder="Enter user website URL"
          />
        </div>
        <div className="form-group">
          <label htmlFor="profile_picture_url">Profile Picture URL:</label>
          <input
            type="text"
            id="profile_picture_url"
            name="profile_picture_url"
            value={formData.profile_picture_url}
            onChange={handleInputChange}
            placeholder="Enter profile picture URL"
          />
        </div>
        <div className="form-group">
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Enter user bio"
          />
        </div>
        {/* <button type="submit">Submit</button>
        <button type="button" onClick={(e) => updateUserData(e, formData.user_id)}>Update</button> */}

        {/* <button type="submit">
          {userExists ? 'Update' : 'Submit'}
        </button> */}
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
                <img src={user.profilePictureUrl} alt={user.full_name} className="user-avatar" />
                <div className="user-info">
                  <label>User Id:</label>
                  <p className="user-name">{user.userId}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
