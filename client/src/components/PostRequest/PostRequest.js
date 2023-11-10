import React, { useState } from 'react';
import axios from 'axios';
import './PostRequest.css';

const PostRequest = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const addUserData = async (e) => {
    e.preventDefault();

    var data = new FormData();
    data.append('photo', 'data');

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const res = await axios.post('/users', data, config);

    if (res.data.status === 401 || !res.data) {
      console.log('error');
    } else {
      console.log('line:100, !success!');
    }
  };

  return (
    <div style={{ marginTop: '15px' }}>
      <h4>Post request</h4>
      <h2>User Form</h2>
      <form className='form-post' onSubmit={addUserData}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default PostRequest;
