/* eslint-disable */
import React, { useEffect, useState } from 'react';
// import jwtDecode from 'jwt-decode';  
import { jwtDecode } from "jwt-decode";
import { Link } from 'react-router-dom';
import './Home.css';
import ComponentSelector from '../../components/ComponentSelector/ComponentSelector';
import LogoutButton from '../../components/Authentication/LogoutButton/LogoutButton';
import MenuCard from '../../components/MenuCard/MenuCard';
import placeholder from '../../assets/placeholder.svg';

const Home = () => {
    const [token, setToken] = useState(null);
    const [decodedToken, setDecodedToken] = useState(null);
    console.log("line:1", decodedToken);

    useEffect(() => {
        // Function to get the token from local storage
        const getTokenFromLocalStorage = () => {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                setToken(storedToken);
            }
        };

        // Call the function when the component mounts
        getTokenFromLocalStorage();
    }, []);

    useEffect(() => {
        // Function to decode the token
        const decodeToken = () => {
            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    setDecodedToken(decoded);
                } catch (error) {
                    console.error('Error decoding token:', error);
                }
            }
        };

        // Call the function when the token changes
        decodeToken();
    }, [token]);

    return (
        <div style={{ margin: "15px" }} className="home-container">
            <h1>Welcome to My React App with Postgre</h1>
            <p>Sending Requests to the Server and querying for the data in the Postgre database.</p>

            <div className="menu-container">
                <MenuCard title="Home" link="/" imageSrc={placeholder} />
                <MenuCard title="Get Request" link="/get-request" imageSrc={placeholder} />
                <MenuCard title="Post Request" link="/post-request" imageSrc={placeholder} />
                <MenuCard title="Delete Request" link="/delete-request" imageSrc={placeholder} />
                <MenuCard title="Update Request" link="/update-request" imageSrc={placeholder} />
                <MenuCard title="Register" link="/register" imageSrc={placeholder} />
                <MenuCard title="Login" link="/login" imageSrc={placeholder} />
            </div>
        </div>
    );
};

export default Home;
