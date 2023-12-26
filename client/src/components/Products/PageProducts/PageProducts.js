import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './PageProducts.css';

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

const categoryOptions = [
  { value: 'nike', label: 'Nike' },
  { value: 'puma', label: 'Puma' },
  { value: 'adidas', label: 'Adidas' },
];

const PageProducts = () => {
  const [formData, setFormData] = useState({
    ProductName: '',
    Price: '',
    Category: null,
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [basket, setBasket] = useState([]);

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

  const handleAddToBasket = (product) => {
    setBasket((prevBasket) => [...prevBasket, { ...product, quantity: 1 }]);
    setSuccessMessage(`Added ${product.productname} to the basket.`);
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

  return (
    <div className="post-request-container">
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
                  <div key={product.ProductID} className="product-card">
                    <p className="product-name">{product.ProductName}</p>
                    <p className="product-price">${product.Price.toFixed(2)}</p>
                    <p className="product-category">{product.Category}</p>
                    <button onClick={() => handleAddToBasket(product)}>Add to Basket</button>
                  </div>
                ))}
              </div>
            )}
          </div>

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
        </div>
      )}
    </div>
  );
};

export default PageProducts;
