// LoginForm.js
import React, { useState } from 'react';
import './Login.css'; // Import the stylesheet

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3005/login', {
      // const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("line:6", data);
      localStorage.setItem('token', data.token);

      if (response.ok) {
        // Successful login
        setMessage(data.message);
      } else {
        // Error during login
        setMessage(data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred during login.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
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

        <button type="submit">Login</button>
      </form>

      <div className="message">{message && <p>{message}</p>}</div>
    </div>
  );
};

export default LoginForm;
