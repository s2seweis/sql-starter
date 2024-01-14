/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Ensure that you use jwtDecode correctly
import { useNavigate } from 'react-router-dom';
import './Home.css';
import ComponentSelector from '../../components/ComponentSelector/ComponentSelector';
import LogoutButton from '../../components/Authentication/LogoutButton/LogoutButton';
import { MenuCard, MenuCard1 } from '../../components/MenuCard/MenuCard';
import placeholder from '../../assets/placeholder.svg';

const Home = () => {
    const [token, setToken] = useState(null);
    const [decodedToken, setDecodedToken] = useState(null);
    const [shouldRerender, setShouldRerender] = useState(false);
    const navigate = useNavigate();

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
        <div style={{ margin: '15px' }} className="home-container">
            <h1>Welcome to My React App with Postgre</h1>
            <p>Sending Requests to the Server and querying for the data in the Postgre database.</p>

            <div className="menu-container">
                <MenuCard title="Home" link="/" imageSrc={placeholder} />
                {/* <MenuCard title="Get Request" link="/get-request" imageSrc={placeholder} /> */}
                {/* <MenuCard title="Post Request" link="/post-request" imageSrc={placeholder} /> */}
                {/* <MenuCard title="Delete Request" link="/delete-request" imageSrc={placeholder} /> */}
                <MenuCard title="Users" link="/update-request" imageSrc={placeholder} />
                <MenuCard title="Register" link="/register" imageSrc={placeholder} />
                <MenuCard title="Login" link="/login" imageSrc={placeholder} />
                <MenuCard1 title="User Profile" imageSrc={placeholder} href="/userprofile" />
                <MenuCard1 title="Contact Informations" imageSrc={placeholder} href="/contact-informations" />
                <MenuCard1 title="Account Status" imageSrc={placeholder} href="/account-status" />
                <MenuCard1 title="Notification Preferences" imageSrc={placeholder} href="/notification-preferences" />
                <MenuCard1 title="User Preferences" imageSrc={placeholder} href="/user-preferences" />
                <MenuCard1 title="Add Products" imageSrc={placeholder} href="/products" />
                <MenuCard1 title="Update Products" imageSrc={placeholder} href="/update-products" />
                <MenuCard1 title="Overview Products" imageSrc={placeholder} href="/page-products" />
                <MenuCard1 title="Basket" imageSrc={placeholder} href="/basket-page" />
                <MenuCard1 title="Checkout" imageSrc={placeholder} href="/checkout" />
                <MenuCard1 title="Typscript" imageSrc={placeholder} href="/typescript" />
                <MenuCard1 title="Ckeckout Page" imageSrc={placeholder} href="/checkoutpage" />
            </div>
        </div>
    );
};

export default Home;
