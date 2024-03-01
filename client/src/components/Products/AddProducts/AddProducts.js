import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './AddProducts.css';

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

const AddProducts = () => {
  const [formData, setFormData] = useState({
    ProductName: '',
    Price: '',
    Category: null,
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [productData, setProductData] = useState([]);
  // console.log("line:1", productData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get('https://express-for-postgre-933b44694c3e.herokuapp.com/login/product');
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Use a regular expression to allow any characters for ProductName
    const newValue = name === 'ProductName' ? value : value.replace(/[^0-9.]/g, '');

    setFormData((prevFormData) => ({ ...prevFormData, [name]: newValue }));
  };

  const handleCategoryChange = (selectedOption) => {
    setFormData({ ...formData, Category: selectedOption });
  };

  const addProductData = async (e) => {
    e.preventDefault();

    if (!formData.ProductName || !formData.Price || !formData.Category) {
      console.error('Product name, price, and category are required.');
      return;
    }

    const data = {
      ProductName: formData.ProductName,
      Price: formData.Price,
      Category: formData.Category.value,
    };

    try {
      const res = await axios.post('https://express-for-postgre-933b44694c3e.herokuapp.com/login/product', data);

      if (res.data.status === 401 || !res.data) {
        console.log('API error, updating dummy data...');
        updateDummyData(formData);
        setErrorMessage('Failed to add product via API. Dummy data updated.');
      } else {
        setSuccessMessage('Product added successfully via API.');
        updateDummyData(formData);
      }
    } catch (error) {
      updateDummyData(formData);
      setErrorMessage('Failed to add product via API. Dummy data updated.');
    }
  };

  const updateDummyData = (newProductData) => {
    const updatedDummyData = [...productDataDummy, { ProductID: productDataDummy.length + 1, ...newProductData }];
    setProductData(updatedDummyData);
  };

  return (
    <div className="post-request-container">
      <h2 className="products-heading">Add AddProducts</h2>
      <form className='form-post' onSubmit={addProductData}>
        <div className="form-group">
          <label htmlFor="ProductName">Product Name:</label>
          <input
            type="text"
            id="ProductName"
            name="ProductName"
            value={formData.ProductName}
            onChange={handleInputChange}
            required
            placeholder="Enter product name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="Price">Price:</label>
          <input
            type="text"
            id="Price"
            name="Price"
            value={formData.Price}
            onChange={handleInputChange}
            required
            pattern="^\d+(\.\d{1,2})?$"
            placeholder="Enter price"
          />
        </div>
        <div className="form-group">
          <label htmlFor="Category">Category:</label>
          <Select
            id="Category"
            name="Category"
            value={formData.Category}
            onChange={handleCategoryChange}
            options={categoryOptions}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Add Product</button>
        </div>
      </form>
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

export default AddProducts;
