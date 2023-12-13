import React from 'react';
import { FaCode, FaCogs, FaUser } from 'react-icons/fa'; // Import the desired icons

export const userDropdownItems = [
  { id: 1, text: 'Home', url: '/', icon: <FaCode /> },
  { id: 2, text: 'Get Request', url: '/get-request', icon: <FaCode /> },
  { id: 3, text: 'Post Request', url: '/post-request', icon: <FaCode /> },
  { id: 4, text: 'Delete Request', url: '/delete-request', icon: <FaCode /> },
  { id: 5, text: 'Update Request', url: '/update-request', icon: <FaCode /> },
  { id: 6, text: 'Register', url: '/register', icon: <FaCode /> },
  { id: 7, text: 'Login', url: '/login', icon: <FaCode /> }
  // Add more dropdown items as needed
];

export const adminDropdownItems = [
  { id: 1, text: 'Profile', url: '/profile', icon: <FaUser /> },
  { id: 2, text: 'Admin', url: '/admin', icon: <FaCogs /> },
  // Add more dropdown items as needed
];
