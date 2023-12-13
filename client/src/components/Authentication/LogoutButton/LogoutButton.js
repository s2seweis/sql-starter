import React, { useState } from 'react';
import './LogoutButton.css';

const LogoutButton = () => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');

    // Additional logout logic (e.g., redirect to login page)
    // ...

    // Update state to trigger re-render
    setIsLoggedOut(true);

    console.log('User logged out');
  };

  // Use a key to force a remount of the component
  const key = isLoggedOut ? 'loggedOut' : 'loggedIn';

  return (
    <a key={key} className="logout-button" href="/" onClick={handleLogout}>
      Logout
    </a>
  );
};

export default LogoutButton;
