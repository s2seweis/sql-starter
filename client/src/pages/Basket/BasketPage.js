import React, { useState, useEffect } from 'react';
// import { IoIosBasket } from 'react-icons/io';
// import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import './BasketPage.css';

const BasketPage = (props) => {
    console.log("line:100", props);

    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [showBasket, setShowBasket] = useState(true);

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

    return (
        <div className="basket-container" style={{ width: "100%", justifyContent: "center", display:"block" }}>
       
            {showBasket && (
                <div style={{ margin: "10px", position:"relative"}} className="basket">
                    <h3>BasketPage:</h3>

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
                            <p className='p-basket-page'>Total Price: ${calculateTotalPrice()}</p>
                        </div>
                    ) : (
                        <p>Your basket is empty.</p>
                    )}
                </div>

            )}

            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <div className='checkout' style={{marginTop:"25px", border:"1px solid #ddd", margin:"10px", borderRadius:"8px", padding:"20px"}}>
                <a href='/checkout' style={{textDecoration:"underline"}}>Checkout Now</a>
            </div>
        </div>
    );
};

export default BasketPage;