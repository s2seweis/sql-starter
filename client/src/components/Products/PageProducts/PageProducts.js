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

const PageProducts = (props) => {
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
  console.log("line:1", basketApi);
  const [showBasket, setShowBasket] = useState(false);

  useEffect(() => {
    const fetchProductDataNew = async () => {
      try {
        if (props.userid) {
          const response = await axios.get(`http://localhost:3005/basket/${props.userid}`);
          
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
  }, [props.userid]);

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

  // ### working so far
  const handleAddToBasket = async (product) => {
    try {
      const existingProductIndex = basketApi.findIndex((item) => item.productid === product.productid);

      if (existingProductIndex !== -1) {
        const updatedBasket = [...basketApi];
        updatedBasket[existingProductIndex].quantity += 1;
        setBasketApi(updatedBasket);
        setSuccessMessage(`Added ${product.productname} to the basket.`);
      } else {
        const response = await axios.post(`http://localhost:3005/basket/add`, {
          userid: props.userid,
          productid: product.productid,
          productname: product.productname,
          price: product.price,
          category: product.category,
          quantity: 1,
        });

        if (response.data) {
          setBasketApi((prevBasket) => [...prevBasket, { ...product, quantity: 1 }]);
          setSuccessMessage(`Added ${product.productname} to the basket.`);
        } else {
          setErrorMessage('Failed to add the product to the basket.');
        }
      }
    } catch (error) {
      console.error('Error adding product to basket:', error);
      setErrorMessage('Failed to add the product to the basket.');
    }
  };

  const handleRemoveFromBasket = async (index) => {
    try {
      const productToRemove = basketApi[index];
      const response = await axios.post(`http://localhost:3005/basket/remove`, {
        userid: props.userid,
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
        userid: props.userid,
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
          userid: props.userid,
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
    return basketApi.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const basketItemCount = basketApi.reduce((count, item) => count + item.quantity, 0);

  const handleToggleBasket = () => {
    setShowBasket(!showBasket);
  };

  // ### New useEffect Hook

  useEffect(() => {
    const updateQuantity = async () => {
      try {
        if (props.userid && basketApi.length > 0) {
          // Assuming you want to update the quantity for all items in the basket
          const updatePromises = basketApi.map(async (item) => {
            const response = await axios.post('http://localhost:3005/basket/updateQuantity', {
              userid: props.userid,
              productid: item.productid,
              quantity: item.quantity,
            });

            return response.data;
          });

          const updatedBasketItems = await Promise.all(updatePromises);

          // Check if the basket data needs to be updated
          if (!areArraysEqual(basketApi, updatedBasketItems)) {
            // Assuming the response structure is an array of updated items
            setBasketApi(updatedBasketItems);
          }
        }
      } catch (error) {
        console.error('Error updating basket quantities:', error);
        setErrorMessage('Failed to update basket quantities.');
      }
    };

    updateQuantity();
  }, [props.userid, basketApi]); // Dependencies include userid and basketApi

  // Helper function to check if two arrays are equal
  const areArraysEqual = (array1, array2) => {
    return JSON.stringify(array1) === JSON.stringify(array2);
  };

  return (
    <div className="post-request-container">
      <button className="toggle-basket-button" onClick={handleToggleBasket}>
        <IoIosBasket className="basket-icon" />
        {basketItemCount > 0 && <span className="basket-count">{basketItemCount}</span>}
      </button>

      {showBasket && (
        <div className="basket">
          <h3>Basket from the User: {props.userid}</h3>
          {basketApi.length > 0 ? (
            <div>
              {basketApi.map((item, index) => (
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
          <h3>Product Data from the API:</h3>
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
