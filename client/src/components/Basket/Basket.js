import React, { useState, useEffect } from 'react';
import { IoIosBasket } from 'react-icons/io';
import './Basket.css';
import axios from 'axios';

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

const Basket = () => {
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [basket, setBasket] = useState([]);
    console.log("line:100", basket);
    const [showBasket, setShowBasket] = useState(false);
    const [basketApi, setBasketApi] = useState([]);
    console.log("line:200", basketApi);
    

    // useEffect(() => {
    //     const fetchProductData = async () => {
    //       try {
    //         const response = await axios.get('http://localhost:3005/basket');
    //         if (response.data && response.data.length > 0) {
    //             setBasketApi(response.data);
    //         }
    //         setIsLoading(false);
    //       } catch (error) {
    //         console.error('Error fetching product data:', error);
    //         setIsLoading(false);
    //       }
    //     };
    
    //     fetchProductData();
    //   }, [basket]);

    useEffect(() => {
        // Get the basket from local storage
        const storedBasket = localStorage.getItem('basketToken');
        
        // If the storedBasket is a string, parse it to an object
        const parsedBasket = typeof storedBasket === 'string' ? JSON.parse(storedBasket) : storedBasket;

        // Set the basket in the component state only if it is not null or an empty array
        if (parsedBasket && parsedBasket.length > 0) {
            setBasket(parsedBasket);
        }
    }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

    // Update the local storage whenever the basket changes
    useEffect(() => {
        localStorage.setItem('basketToken', JSON.stringify(basket));
    }, [basket]);

    const handleRemoveFromBasket = (index) => {
        const updatedBasket = [...basket];
        updatedBasket.splice(index, 1);
        setBasket(updatedBasket);
        setSuccessMessage('Product removed from the basket.');
    };

    const handleIncreaseQuantity = (index) => {
        const updatedBasket = [...basket];
        updatedBasket[index].quantity += 1;
        setBasket(updatedBasket);
    };

    const handleDecreaseQuantity = (index) => {
        const updatedBasket = [...basket];
        if (updatedBasket[index].quantity > 1) {
            updatedBasket[index].quantity -= 1;
            setBasket(updatedBasket);
        }
    };

    const calculateTotalPrice = () => {
        return basket.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const handleToggleBasket = () => {
        setShowBasket(!showBasket);
    };

    return (
        <div className="basket-container">
            <button style={{display:"flex"}} className="toggle-basket-button" onClick={handleToggleBasket}>
                <IoIosBasket className="basket-icon" />
                {basket.length > 0 && <span className="basket-count">{basket.length}</span>}
            </button>

            {showBasket && (
                <div className="basket">
                    <h3>Basket:</h3>

                    {basket.length > 0 ? (
                        <div>
                            {basket.map((item, index) => (
                                <div key={index} className="basket-item">
                                    <p className="basket-item-name">{item.productname}</p>
                                    <p className="basket-item-price">${item.price}</p>
                                    <div className="basket-item-quantity">
                                        <button onClick={() => handleDecreaseQuantity(index)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => handleIncreaseQuantity(index)}>+</button>
                                    </div>
                                    <button onClick={() => handleRemoveFromBasket(index)}>Remove</button>
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

            {isLoading ? (
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
            )}
        </div>
    );
};

export default Basket;
