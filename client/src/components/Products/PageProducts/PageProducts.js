import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PageProducts.css';
import { IoIosBasket } from 'react-icons/io';

const productDataDummy = [
  {
    "productid": 1,
    "productname": "Product1",
    "price": 19.99,
    "category": "Nike"
  },
  {
    "productid": 2,
    "productname": "Product2",
    "price": 29.99,
    "category": "Puma"
  },
  {
    "productid": 3,
    "productname": "Product3",
    "price": 39.99,
    "category": "Adidas"
  }
];

const categoryOptions = [
  { value: 'nike', label: 'Nike' },
  { value: 'puma', label: 'Puma' },
  { value: 'adidas', label: 'Adidas' },
];

const PageProducts = () => {
  const [formData, setFormData] = useState({
    productname: '',
    price: '',
    category: null,
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [basketApi, setBasketApi] = useState([]);
  console.log("line:100", basketApi);

  // Initialize basket state with data from local storage or an empty array if no token is available
  const [basket, setBasket] = useState(() => {
    const storedBasket = JSON.parse(localStorage.getItem('basketToken')) || [];
    return storedBasket;
  });

  const [showBasket, setShowBasket] = useState(false);

  useEffect(() => {
    const fetchProductDataNew = async () => {
      try {
        const response = await axios.get('http://localhost:3005/basket');
        if (response.data && response.data.length > 0) {
            setBasketApi(response.data);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching product data:', error);
        setIsLoading(false);
      }
    };

    fetchProductDataNew();
  }, []);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get('http://localhost:3005/product');
        if (response.data && response.data.length > 0) {
          setProductData(response.data);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching product data:', error);
        setIsLoading(false);
      }
    };

    fetchProductData();
  }, []);

  useEffect(() => {
    localStorage.setItem('basketToken', JSON.stringify(basket));
  }, [basket]);

  const handleAddToBasket = (product) => {
    const existingProductIndex = basket.findIndex((item) => item.productid === product.productid);

    if (existingProductIndex !== -1) {
      const updatedBasket = [...basket];
      updatedBasket[existingProductIndex].quantity += 1;
      setBasket(updatedBasket);
      setSuccessMessage(`Added ${product.productname} to the basket.`);
    } else {
      setBasket((prevBasket) => [...prevBasket, { ...product, quantity: 1 }]);
      setSuccessMessage(`Added ${product.productname} to the basket.`);
    }
  };

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

  const basketItemCount = basket.reduce((count, item) => count + item.quantity, 0);

  const handleToggleBasket = () => {
    setShowBasket(!showBasket);
  };

  return (
    <div className="post-request-container">
      <button className="toggle-basket-button" onClick={handleToggleBasket}>
        <IoIosBasket className="basket-icon" />
        {basketItemCount > 0 && <span className="basket-count">{basketItemCount}</span>}
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
              <p>Total price: ${calculateTotalPrice()}</p>
            </div>
          ) : (
            <p>Your basket is empty.</p>
          )}
        </div>
      )}

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="user-data-container">
          <h3>Product Data:</h3>
          <div className="user-list">
            {productData.length > 0 ? (
              productData.map((product) => (
                <div key={product.productid} className="product-card">
                  <p className="product-name">{product.productname}</p>
                  <p className="product-price">${product.price}</p>
                  <p className="product-category">{product.category}</p>
                  <button onClick={() => handleAddToBasket(product)}>Add to Basket</button>
                </div>
              ))
            ) : (
              <div>
                <p>No products available. Rendering dummy data:</p>
                {productDataDummy.map((product) => (
                  <div key={product.productid} className="product-card">
                    <p className="product-name">{product.productname}</p>
                    <p className="product-price">${product.price.toFixed(2)}</p>
                    <p className="product-category">{product.category}</p>
                    <button onClick={() => handleAddToBasket(product)}>Add to Basket</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PageProducts;
