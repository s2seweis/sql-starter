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

  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
