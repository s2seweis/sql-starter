import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './PostRequest.css';

const userDataDummy = [
  {
    id: 1,
    name: 'John Doe',
    age: 30,
    isAuthenticated: true,
  },
  {
    id: 2,
    name: 'Jane Smith',
    age: 18,
    isAuthenticated: true,
  },
  {
    id: 3,
    name: 'Bob Johnson',
    age: 12,
    isAuthenticated: true,
  },
  {
    id: 4,
    name: 'Alice Williams',
    age: 40,
    isAuthenticated: true,
  },
  {
    id: 5,
    name: 'Charlie Brown',
    age: 50,
    isAuthenticated: true,
  },
  {
    id: 6,
    name: 'Eva Martinez',
    age: 23,
    isAuthenticated: true,
  },
];

const PostRequest = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    isAuthenticated: true,
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [userData, setUserData] = useState(userDataDummy); // Set initial state to userDataDummy
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/users');
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
    setFormData({ ...formData, [name]: value });
  };

  const addUserData = async (e) => {
    e.preventDefault();

    var data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('age', formData.age);
    data.append('isAuthenticated', formData.isAuthenticated);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      const res = await axios.post('/users', data, config);

      if (res.data.status === 401 || !res.data) {
        console.log('API error, updating dummy data...');
        // If API call fails, update the dummy data instead
        updateDummyData(formData);
        setErrorMessage('Failed to add user via API. Dummy data updated.');
      } else {
        console.log('line:100, success!');
        setSuccessMessage('User added successfully via API.');
        // If API call succeeds, update the dummy data with the new user
        updateDummyData(formData);
      }
    } catch (error) {
      console.error('Error:', error);
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

  const isAuthenticatedOptions = [
    { value: true, label: 'True' },
    { value: false, label: 'False' },
  ];

  return (
    <div className="post-request-container">
      <h2 className="users-heading">Add Users</h2>
      <form className='form-post' onSubmit={addUserData}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
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
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="isAuthenticated">Is Authenticated:</label>
          <Select
            id="isAuthenticated"
            name="isAuthenticated"
            value={isAuthenticatedOptions.find(option => option.value === formData.isAuthenticated)}
            onChange={(selectedOption) => setFormData({ ...formData, isAuthenticated: selectedOption.value })}
            options={isAuthenticatedOptions}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* Display user data */}
      <div style={{ marginTop: '20px' }}>
        <h3>User Data:</h3>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {userData.map((user) => (
              <div key={user.id}>{`${user.name}, Age: ${user.age}, Authenticated: ${user.isAuthenticated}`}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostRequest;
