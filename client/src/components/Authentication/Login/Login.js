import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Remove useNavigate
import './Login.css';
import logo from '../../../assets/logo.png';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://express-for-postgre-933b44694c3e.herokuapp.com/login', {
      // const response = await fetch('http://localhost:3005/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      // console.log("line:6", data);
      localStorage.setItem('token', data.token);

      if (response.ok) {
        // Successful login
        setMessage(data.message);

        // Use regular anchor tag for redirection
        window.location.href = '/';
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
    <div className='login-main-margin'>
      <div className='login-main'>
        <div className="login-container-img">
          <img className='img-logo-login' src={logo} alt="Logo" />
        </div>
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

            <button className='button-login' type="submit">Login</button>
          </form>

          <div className="message">{message && <p>{message}</p>}</div>
          <div>
            <p>Already have an account? <Link to="/register">Register here</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
