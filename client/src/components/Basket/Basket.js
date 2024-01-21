import React, { useState, useEffect } from 'react';
import { IoIosBasket } from 'react-icons/io';
import './Basket.css';
// import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { FaTimes } from 'react-icons/fa'; // Import the close icon

const Basket = (props) => {
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [showBasket, setShowBasket] = useState(false);
    const [decodedToken, setDecodedToken] = useState(null);

    useEffect(() => {
        // Function to get and decode the token
        const getDecodedToken = () => {
            // Get the JWT from local storage
            const token = localStorage.getItem('token');

            // Check if the token exists
            if (token) {
                try {
                    // Decode the token using jwt-decode
                    const decodedToken = jwtDecode(token);

                    // Set the decoded token in the state
                    setDecodedToken(decodedToken);
                } catch (error) {
                    console.error('Error decoding token:', error);
                    setDecodedToken(null); // Set null in case of an error
                }
            } else {
                console.error('Token not found in local storage.');
                setDecodedToken(null); // Set null if the token is not found
            }
        };

        // Call the function when the component mounts
        getDecodedToken();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const calculateTotalPrice = () => {
        return props.basketApi.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const basketItemCount = props.basketApi.reduce((count, item) => count + item.quantity, 0);
    console.log("line:200", basketItemCount);

    const handleToggleBasket = () => {
        setShowBasket(!showBasket);
    };

    return (
        <div className="basket-container" style={{marginTop:"5px"}}>
            {/* <h5>React & Postgre SQL</h5> */}
            <button style={{ display: "flex", width:"40px", padding:"5px", height:"30px", alignItems:"center" }} className="toggle-basket-button" onClick={handleToggleBasket}>
                <IoIosBasket className="basket-icon" />
                {props.basketApi.length > -1 && <span className="basket-count">{basketItemCount}</span>}
            </button>

            {showBasket && (
                <div style={{ marginLeft: "20px" }} className="basket">

                    <div className='basket-title' style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h3>Basket:</h3>
                        <button className='button-basket' onClick={handleToggleBasket}>
                            <FaTimes />
                        </button>
                    </div>

                    {props.basketApi.length > 0 ? (
                        <div>
                            {props.basketApi.map((item, index) => (
                                <div key={index} className="basket-item">
                                    <p className="basket-item-name">{item.productname}</p>
                                    <p className="basket-item-price">${item.price}</p>
                                    <div className="basket-item-quantity">
                                        <button onClick={() => props.handleDecreaseQuantity(index)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => props.handleIncreaseQuantity(index)}>+</button>
                                    </div>
                                    <button onClick={() => props.handleRemoveFromBasket(index)}>Remove</button>
                                </div>
                            ))}
                            <p className='p-basket'>Total Price1: ${calculateTotalPrice()}</p>
                            <div className='checkout' style={{ marginTop: "25px", border: "1px solid #ddd", margin: "10px", borderRadius: "8px", padding: "20px" }}>
                                <a href='/basket-page' style={{ textDecoration: "underline" }}>Go to Basket</a>
                            </div>
                        </div>
                    ) : (
                        <p>Your basket is empty.</p>
                    )}
                </div>
            )}

            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}

        </div>
    );
};

export default Basket;