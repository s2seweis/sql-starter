// RegisterForm.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import logo from '../../../assets/logo.png'

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://express-for-postgre-933b44694c3e.herokuapp.com/register', {
    //   const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, full_name: fullName, profile_picture_url: profilePictureUrl, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful registration
        setMessage(data.message);
      } else {
        // Error during registration
        setMessage(data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred during registration.');
    }
  };

  return (
    <div className='register-main'>
      <img className='img-logo' src={logo}></img>
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="fullName">Full Name:</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <label htmlFor="profilePictureUrl">Profile Picture URL:</label>
        <input
          type="text"
          id="profilePictureUrl"
          name="profilePictureUrl"
          value={profilePictureUrl}
          onChange={(e) => setProfilePictureUrl(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className='button-register' type="submit">Register</button>
      </form>

      <div className="message">{message && <p>{message}</p>}</div>

      <div>
        <p>Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
    </div>
  );
};

export default RegisterForm;
