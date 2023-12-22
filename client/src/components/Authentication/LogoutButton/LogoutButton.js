import React from 'react';
import './LogoutButton.css';

const LogoutButton = () => {
  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');

    // Additional logout logic (e.g., redirect to login page)
    // ...

    console.log('User logged out');
  };

  // Check the presence of the token to determine login/logout status
  const isLoggedIn = localStorage.getItem('token');

  return (
    <a className="logout-button" href="/" onClick={handleLogout}>
      {isLoggedIn ? 'Logout' : 'Login'}
    </a>
  );
};

export default LogoutButton;
