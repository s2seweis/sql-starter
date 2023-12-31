import React, { useState, useEffect } from 'react';
import { IoIosBasket } from 'react-icons/io';
import './Basket.css';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const productDataDummy = [
    {
        "ProductID": 1,
        "ProductName": "Product1",
        "Price": 19.99,
        "Category": "Nike"
    },
    {
        "ProductID": 2,
        "ProductName": "Product2",
        "Price": 29.99,
        "Category": "Puma"
    },
    {
        "ProductID": 3,
        "ProductName": "Product3",
        "Price": 39.99,
        "Category": "Adidas"
    }
];

const Basket = (props) => {
    console.log("line:400", props.basketApi);
    console.log("line:401", props.handleRemoveFromBasket);
    console.log("line:402", props.handleIncreaseQuantity);
    console.log("line:403", props.handleDecreaseQuantity);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [basket, setBasket] = useState([]);
    const [showBasket, setShowBasket] = useState(false);
    const [basketApi, setBasketApi] = useState([]);

    const [decodedToken, setDecodedToken] = useState(null);
    // console.log("line:999", decodedToken?.user_id);
    // for the userid
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

    useEffect(() => {
        const fetchProductDataNew = async () => {
            try {
                if (decodedToken?.user_id) {
                    const response = await axios.get(`http://localhost:3005/basket/${decodedToken?.user_id}`);

                    if (response.data) {
                        setBasketApi(response.data);
                    } else {
                        setBasketApi(null);
                    }
                }

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching product data:', error);
                setIsLoading(false);
            }
        };

        fetchProductDataNew();
    }, [decodedToken?.user_id]);

    // ### working so far
  
    const handleRemoveFromBasket = async (index) => {
        try {
            const productToRemove = basketApi[index];
            const response = await axios.post(`http://localhost:3005/basket/remove`, {
                userid: decodedToken?.user_id,
                productid: productToRemove.productid,
            });

            if (response.data) {
                const updatedBasket = [...basketApi];
                updatedBasket.splice(index, 1);
                setBasketApi(updatedBasket);
                setSuccessMessage('Product removed from the basket.');
            } else {
                setErrorMessage('Failed to remove the product from the basket.');
            }
        } catch (error) {
            console.error('Error removing product from basket:', error);
            setErrorMessage('Failed to remove the product from the basket.');
        }
    };

    const handleIncreaseQuantity = async (index) => {
        try {
            const updatedBasket = [...basketApi];
            updatedBasket[index].quantity += 1;

            const response = await axios.post(`http://localhost:3005/basket/updateQuantity`, {
                userid: decodedToken?.user_id,
                productid: updatedBasket[index].productid,
                quantity: updatedBasket[index].quantity,
            });

            if (response.data) {
                setBasketApi(updatedBasket);
            } else {
                setErrorMessage('Failed to update the quantity.');
            }
        } catch (error) {
            console.error('Error increasing product quantity:', error);
            setErrorMessage('Failed to update the quantity.');
        }
    };

    const handleDecreaseQuantity = async (index) => {
        try {
            const updatedBasket = [...basketApi];
            if (updatedBasket[index].quantity > 1) {
                updatedBasket[index].quantity -= 1;

                const response = await axios.post(`http://localhost:3005/basket/updateQuantity`, {
                    userid: decodedToken?.user_id,
                    productid: updatedBasket[index].productid,
                    quantity: updatedBasket[index].quantity,
                });

                if (response.data) {
                    setBasketApi(updatedBasket);
                } else {
                    setErrorMessage('Failed to update the quantity.');
                }
            }
        } catch (error) {
            console.error('Error decreasing product quantity:', error);
            setErrorMessage('Failed to update the quantity.');
        }
    };

    const calculateTotalPrice = () => {
        return props.basketApi.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const basketItemCount = props.basketApi.reduce((count, item) => count + item.quantity, 0);
    console.log("line:601", basketItemCount);

    const handleToggleBasket = () => {
        setShowBasket(!showBasket);
    };

    // ### New useEffect Hook


    return (
        <div className="basket-container">
            {/* <h5>React & Postgre SQL</h5> */}
            <button style={{ display: "flex" }} className="toggle-basket-button" onClick={handleToggleBasket}>
                <IoIosBasket className="basket-icon" />
                {props.basketApi.length > 0 && <span className="basket-count">{basketItemCount}</span>}
            </button>

            {showBasket && (
                <div style={{marginLeft:"20px"}} className="basket">
                    <h3>Basket:</h3>

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
                            <p>Total Price: ${calculateTotalPrice()}</p>
                        </div>
                    ) : (
                        <p>Your basket is empty.</p>
                    )}
                </div>
            )}

            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            {/* {isLoading ? (
                <p></p>
            ) : (
                <div className="user-data-container">
                    <h3>Product Data:</h3>
                    <div className="user-list">
                        {productDataDummy.length > 0 ? (
                            productDataDummy.map((product) => (
                                <div key={product.ProductID} className="product-card">
                                    <p className="product-name">{product.ProductName}</p>
                                    <p className="product-price">${product.Price.toFixed(2)}</p>
                                    <p className="product-category">{product.Category}</p>
                                </div>
                            ))
                        ) : (
                            <p>No products available.</p>
                        )}
                    </div>
                </div>
            )} */}
        </div>
    );
};

export default Basket;
