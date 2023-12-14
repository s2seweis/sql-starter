import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserProfile.css';

const UserProfile = (props) => {
  const [formData, setFormData] = useState({
    user_id: props.userid,
    bio: '',
    date_of_birth: '',
    location: '',
    website_url: '',
    profile_picture_url: '',
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [userData, setUserData] = useState([]);
  console.log("line:1", userData);
  const [isLoading, setIsLoading] = useState(true);

  // const dateOfBirthArray = userData.map(item => item.dateOfBirth);
  // console.log("line:501", dateOfBirthArray);

  const dateOfBirthArray = userData.map(item => item.dateOfBirth.substring(0, 10));
  const concatenatedDateOfBirth = dateOfBirthArray.join(', ');
  
  console.log("line:501", concatenatedDateOfBirth);


  // Dummy data to be used in case of no connection
  const dummyUserData = {
    user_id: props.userid,
    bio: 'This is a dummy user.',
    date_of_birth: '1990-01-01',
    location: 'Dummyville',
    website_url: 'https://example.com/dummy_user',
    profile_picture_url: 'https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png',
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Set dummy data as default
        // setFormData(dummyUserData);
        // setUserData([dummyUserData]);

        const response = await axios.get('http://localhost:3005/userprofile');

        if (response.data && response.data.length > 0) {
          const user = response.data.find((profile) => profile.user_id === props.userid);

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
          }
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoading(false);
        setErrorMessage('Failed to fetch user data.');
      }
    };

    fetchUserData();
  }, [props.userid]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

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

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('http://localhost:3005/userprofile', data, config);

      if (res.data.status === 401 || !res.data) {
        console.log('API error, updating dummy data...');
        updateDummyData(formData);
        setErrorMessage('Failed to add user via API. Dummy data updated.');
      } else {
        console.log('Success!');
        setSuccessMessage('User added successfully via API.');
        updateDummyData(formData);
      }
    } catch (error) {
      console.error('Error:', error);
      updateDummyData(formData);
      setErrorMessage('Failed to add user via API. Dummy data updated.');
    }
  };

  const updateDummyData = (newUserData) => {
    const updatedDummyData = [...userData, { user_id: userData.length + 1, ...newUserData }];
    setUserData(updatedDummyData);
  };

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
        <button type="submit">Submit</button>
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
                <img src={user.profile_picture_url} alt={user.full_name} className="user-avatar" />
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
